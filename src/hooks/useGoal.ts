import { useEffect, useState, useCallback } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export function useGoal(uid: string) {
  const [goal, setGoalState] = useState(0);
  const [goalLoading, setGoalLoading] = useState(true);

  // onSnapshot keeps the goal live so changes from another device appear immediately
  useEffect(() => {
    const ref = doc(db, 'users', uid, 'data', 'settings');
    const unsub = onSnapshot(ref, (snap) => {
      setGoalState(snap.data()?.goal ?? 0);
      setGoalLoading(false);
    });
    return unsub;
  }, [uid]);

  const setGoal = useCallback(async (g: number) => {
    setGoalState(g);
    await setDoc(doc(db, 'users', uid, 'data', 'settings'), { goal: g }, { merge: true });
  }, [uid]);

  return [goal, setGoal, goalLoading] as const;
}
