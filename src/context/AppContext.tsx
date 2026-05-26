import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { writeBatch, doc, collection } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from './AuthContext';
import { useGoal } from '../hooks/useGoal';
import { useProteinLog } from '../hooks/useProteinLog';
import { useStreak } from '../hooks/useStreak';
import { storageGet } from '../lib/storage';
import { STORAGE_KEYS } from '../constants';
import type { FoodEntry, DayLog, StreakData, BadgeId } from '../types';

const DEFAULT_STREAK: StreakData = {
  currentStreak: 0, longestStreak: 0, lastGoalDate: '',
  badges: [], badgeUnlockDates: {},
};

interface AppContextValue {
  goal: number;
  setGoal: (g: number) => void;
  todayEntries: FoodEntry[];
  todayTotal: number;
  todayPercent: number;
  addEntry: (e: Omit<FoodEntry, 'id' | 'timestamp'>) => void;
  removeEntry: (id: string) => void;
  allLogs: DayLog[];
  streakData: StreakData;
  newlyUnlockedBadges: BadgeId[];
  clearNewBadges: () => void;
  showCelebration: boolean;
  dismissCelebration: () => void;
  dataLoading: boolean;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const uid = user!.uid; // AppProvider is only mounted when user is non-null

  const [goal, setGoal, goalLoading] = useGoal(uid);
  const { allLogs, todayEntries, todayTotal, addEntry, removeEntry, logsLoading } = useProteinLog(uid);
  const { streakData, newlyUnlockedBadges, clearNewBadges, checkAndUpdate } = useStreak(uid, allLogs, goal);
  const [showCelebration, setShowCelebration] = useState(false);
  const wasComplete = useRef(false);

  const todayPercent = goal > 0 ? todayTotal / goal : 0;
  const dataLoading = goalLoading || logsLoading;

  // Migrate localStorage data to Firestore on first ever sign-in
  const migrated = useRef(false);
  useEffect(() => {
    if (dataLoading || migrated.current) return;
    if (goal === 0 && allLogs.length === 0) {
      const localGoal  = storageGet<number>(STORAGE_KEYS.GOAL, 0);
      const localLogs  = storageGet<DayLog[]>(STORAGE_KEYS.FOOD_LOG, []);
      const localStreak = storageGet<StreakData>(STORAGE_KEYS.STREAK, DEFAULT_STREAK);

      if (localGoal > 0 || localLogs.length > 0) {
        migrated.current = true;
        const batch = writeBatch(db);
        if (localGoal > 0) {
          batch.set(doc(db, 'users', uid, 'data', 'settings'), { goal: localGoal }, { merge: true });
        }
        for (const dayLog of localLogs) {
          batch.set(doc(collection(db, 'users', uid, 'days'), dayLog.date), { entries: dayLog.entries });
        }
        if (localStreak.badges.length > 0 || localStreak.currentStreak > 0) {
          batch.set(doc(db, 'users', uid, 'data', 'streak'), localStreak);
        }
        batch.commit();
      }
    }
  }, [uid, dataLoading, goal, allLogs.length]);

  useEffect(() => {
    if (todayPercent >= 1.0 && !wasComplete.current) {
      setShowCelebration(true);
      wasComplete.current = true;
    }
    if (todayPercent < 1.0) wasComplete.current = false;
  }, [todayPercent]);

  useEffect(() => { checkAndUpdate(); }, [allLogs, checkAndUpdate]);

  return (
    <AppContext.Provider value={{
      goal, setGoal,
      todayEntries, todayTotal, todayPercent,
      addEntry, removeEntry, allLogs,
      streakData, newlyUnlockedBadges, clearNewBadges,
      showCelebration, dismissCelebration: () => setShowCelebration(false),
      dataLoading,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
