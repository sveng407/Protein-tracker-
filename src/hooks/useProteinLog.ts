import { useEffect, useState, useCallback } from 'react';
import { collection, doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { FoodEntry, DayLog, MealType } from '../types';
import { today } from '../lib/dateUtils';

export function useProteinLog(uid: string) {
  const [allLogs, setAllLogs] = useState<DayLog[]>([]);
  const [logsLoading, setLogsLoading] = useState(true);

  useEffect(() => {
    const ref = collection(db, 'users', uid, 'days');
    const unsub = onSnapshot(ref, (snap) => {
      const logs: DayLog[] = snap.docs.map(d => ({
        date: d.id,
        entries: ((d.data().entries ?? []) as Partial<FoodEntry>[]).map(e => ({
          ...e as FoodEntry,
          mealType: (e.mealType as MealType | undefined) ?? 'snack',
        })),
      }));
      logs.sort((a, b) => a.date.localeCompare(b.date));
      setAllLogs(logs);
      setLogsLoading(false);
    });
    return unsub;
  }, [uid]);

  const todayStr = today();
  const todayEntries = allLogs.find(d => d.date === todayStr)?.entries ?? [];
  const todayTotal = todayEntries.reduce((s, e) => s + e.protein, 0);

  const addEntry = useCallback(async (entry: Omit<FoodEntry, 'id' | 'timestamp'>, date: string) => {
    const newEntry: FoodEntry = { ...entry, id: crypto.randomUUID(), timestamp: Date.now() };
    const dayRef = doc(db, 'users', uid, 'days', date);
    const currentEntries = allLogs.find(d => d.date === date)?.entries ?? [];
    await setDoc(dayRef, { entries: [...currentEntries, newEntry] });
    // onSnapshot fires automatically from Firestore local cache — no optimistic update needed
  }, [uid, allLogs]);

  const removeEntry = useCallback(async (id: string) => {
    const dayLog = allLogs.find(d => d.entries.some(e => e.id === id));
    if (!dayLog) return;
    const dayRef = doc(db, 'users', uid, 'days', dayLog.date);
    const filtered = dayLog.entries.filter(e => e.id !== id);
    await setDoc(dayRef, { entries: filtered });
  }, [uid, allLogs]);

  const updateEntry = useCallback(async (id: string, fields: Partial<Omit<FoodEntry, 'id' | 'timestamp'>>) => {
    const dayLog = allLogs.find(d => d.entries.some(e => e.id === id));
    if (!dayLog) return;
    const dayRef = doc(db, 'users', uid, 'days', dayLog.date);
    await setDoc(dayRef, {
      entries: dayLog.entries.map(e => e.id === id ? { ...e, ...fields } : e),
    });
  }, [uid, allLogs]);

  return { allLogs, todayEntries, todayTotal, addEntry, removeEntry, updateEntry, logsLoading };
}
