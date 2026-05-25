import { useState, useCallback } from 'react';
import type { FoodEntry, DayLog } from '../types';
import { storageGet, storageSet } from '../lib/storage';
import { STORAGE_KEYS } from '../constants';
import { today } from '../lib/dateUtils';

export function useProteinLog() {
  const [allLogs, setAllLogs] = useState<DayLog[]>(() =>
    storageGet<DayLog[]>(STORAGE_KEYS.FOOD_LOG, [])
  );

  const todayStr = today();
  const todayLog = allLogs.find(d => d.date === todayStr);
  const todayEntries = todayLog?.entries ?? [];
  const todayTotal = todayEntries.reduce((sum, e) => sum + e.protein, 0);

  const persist = useCallback((logs: DayLog[]) => {
    setAllLogs(logs);
    storageSet(STORAGE_KEYS.FOOD_LOG, logs);
  }, []);

  const addEntry = useCallback((entry: Omit<FoodEntry, 'id' | 'timestamp'>) => {
    const newEntry: FoodEntry = {
      ...entry,
      id: crypto.randomUUID(),
      timestamp: Date.now(),
    };
    setAllLogs(prev => {
      const logs = [...prev];
      const idx = logs.findIndex(d => d.date === todayStr);
      if (idx >= 0) {
        logs[idx] = { ...logs[idx], entries: [...logs[idx].entries, newEntry] };
      } else {
        logs.push({ date: todayStr, entries: [newEntry] });
      }
      storageSet(STORAGE_KEYS.FOOD_LOG, logs);
      return logs;
    });
    return newEntry;
  }, [todayStr]);

  const removeEntry = useCallback((id: string) => {
    setAllLogs(prev => {
      const logs = prev.map(d =>
        d.date === todayStr
          ? { ...d, entries: d.entries.filter(e => e.id !== id) }
          : d
      );
      storageSet(STORAGE_KEYS.FOOD_LOG, logs);
      return logs;
    });
  }, [todayStr]);

  const getDayLog = useCallback((date: string) =>
    allLogs.find(d => d.date === date), [allLogs]);

  return { allLogs, todayEntries, todayTotal, addEntry, removeEntry, getDayLog, persist };
}
