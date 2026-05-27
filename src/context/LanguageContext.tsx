import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { ReactNode } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from './AuthContext';
import { TRANSLATIONS, detectLang } from '../i18n';
import type { Lang, Translations } from '../i18n';

interface LanguageContextValue {
  lang: Lang;
  t: Translations;
  setLang: (lang: Lang) => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const uid = user?.uid ?? null;
  const [lang, setLangState] = useState<Lang>(() => {
    const detected = detectLang();
    document.documentElement.lang = detected;
    return detected;
  });

  // One-time fetch on login — getDoc instead of onSnapshot to avoid overwriting
  // a language change the user just made in another tab before the write completes.
  useEffect(() => {
    if (!uid) return;
    getDoc(doc(db, 'users', uid, 'data', 'settings')).then(snap => {
      const saved = snap.data()?.lang as Lang | undefined;
      if (saved && saved in TRANSLATIONS) {
        document.documentElement.lang = saved;
        setLangState(saved);
        localStorage.setItem('pt_language', saved);
      }
    });
  }, [uid]);

  const setLang = useCallback((l: Lang) => {
    document.documentElement.lang = l;
    localStorage.setItem('pt_language', l);
    setLangState(l);
    if (uid) {
      setDoc(doc(db, 'users', uid, 'data', 'settings'), { lang: l }, { merge: true });
    }
  }, [uid]);

  return (
    <LanguageContext.Provider value={{ lang, t: TRANSLATIONS[lang], setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useT(): Translations {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useT must be used inside LanguageProvider');
  return ctx.t;
}

export function useLang(): { lang: Lang; setLang: (l: Lang) => void } {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be used inside LanguageProvider');
  return { lang: ctx.lang, setLang: ctx.setLang };
}
