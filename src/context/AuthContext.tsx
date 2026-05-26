import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut as firebaseSignOut,
  deleteUser,
  reauthenticateWithPopup,
} from 'firebase/auth';
import type { User } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { doc, collection, getDocs, writeBatch } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface AuthContextValue {
  user: User | null;
  authLoading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  deleteAccount: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setAuthLoading(false);
    });
    return unsub;
  }, []);

  async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  }

  async function signOut() {
    await firebaseSignOut(auth);
  }

  async function deleteAccount() {
    const u = auth.currentUser;
    if (!u) return;
    // Delete all Firestore data
    const batch = writeBatch(db);
    const dataRef = collection(db, 'users', u.uid, 'data');
    const daysRef = collection(db, 'users', u.uid, 'days');
    const [dataDocs, daysDocs] = await Promise.all([getDocs(dataRef), getDocs(daysRef)]);
    dataDocs.forEach(d => batch.delete(d.ref));
    daysDocs.forEach(d => batch.delete(d.ref));
    batch.delete(doc(db, 'users', u.uid));
    await batch.commit();
    // Delete Firebase Auth account (requires recent login)
    try {
      await deleteUser(u);
    } catch (err: unknown) {
      if ((err as { code?: string }).code === 'auth/requires-recent-login') {
        const provider = new GoogleAuthProvider();
        await reauthenticateWithPopup(u, provider);
        await deleteUser(u);
      } else {
        throw err;
      }
    }
  }

  return (
    <AuthContext.Provider value={{ user, authLoading, signInWithGoogle, signOut, deleteAccount }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
