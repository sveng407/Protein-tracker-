import { useEffect, useState, useCallback } from 'react';
import { collection, doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { FoodEntry, DayLog } from '../types';
import { today } from '../lib/dateUtils';

export function useProteinLog(uid: string) {
  const [allLogs, setAllLogs] = useState<DayLog[]>([]);
  const [logsLoading, setLogsLoading] = useState(true);

  useEffect(() => {
    const ref = collection(db, 'users', uid, 'days');
    const unsub = onSnapshot(ref, (snap) => {
      const logs: DayLog[] = snap.docs.map(d => ({
        date: d.id,
        entries: (d.data().entries ?? []) as FoodEntry[],
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

  const addEntry = useCallback(async (entry: Omit<FoodEntry, 'id' | 'timestamp'>) => {
    const newEntry: FoodEntry = {
      ...entry,
      id: crypto.randomUUID(),
      timestamp: Date.now(),
    };
    const dayDoc = doc(db, 'users', uid, 'days', todayStr);
    // Optimistic local update — Firestore listener will confirm
    setAllLogs(prev => {
      const logs = [...prev];
      const idx = logs.findIndex(d => d.date === todayStr);
      if (idx >= 0) {
        logs[idx] = { ...logs[idx], entries: [...logs[idx].entries, newEntry] };
      } else {
        logs.push({ date: todayStr, entries: [newEntry] });
      }
      return logs;
    });
    const currentEntries = allLogs.find(d => d.date === todayStr)?.entries ?? [];
    await setDoc(dayDoc, { entries: [...currentEntries, newEntry] });
  }, [uid, todayStr, allLogs]);

  const removeEntry = useCallback(async (id: string) => {
    const dayDoc = doc(db, 'users', uid, 'days', todayStr);
    const currentEntries = allLogs.find(d => d.date === todayStr)?.entries ?? [];
    const filtered = currentEntries.filter(e => e.id !== id);
    setAllLogs(prev =>
      prev.map(d => d.date === todayStr ? { ...d, entries: filtered } : d)
    );
    await setDoc(dayDoc, { entries: filtered });
  }, [uid, todayStr, allLogs]);

  return { allLogs, todayEntries, todayTotal, addEntry, removeEntry, logsLoading };
}
