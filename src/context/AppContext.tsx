import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { writeBatch, doc, collection } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from './AuthContext';
import { useGoal } from '../hooks/useGoal';
import { useProteinLog } from '../hooks/useProteinLog';
import { useStreak } from '../hooks/useStreak';
import { storageGet } from '../lib/storage';
import { STORAGE_KEYS } from '../constants';
import type { FoodEntry, DayLog, StreakData, BadgeId, MealType } from '../types';

const DEFAULT_STREAK: StreakData = {
  currentStreak: 0, longestStreak: 0, lastGoalDate: '',
  badges: [], badgeUnlockDates: {},
};

interface AppContextValue {
  goal: number;
  setGoal: (g: number) => void;
  todayTotal: number;
  todayPercent: number;
  addEntry: (e: Omit<FoodEntry, 'id' | 'timestamp'>, date: string) => Promise<void>;
  removeEntry: (id: string) => Promise<void>;
  updateEntry: (id: string, fields: Partial<Omit<FoodEntry, 'id' | 'timestamp'>>) => Promise<void>;
  allLogs: DayLog[];
  recentFoods: Array<{ name: string; protein: number; mealType: MealType }>;
  firstName: string;
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
  const uid = user!.uid;
  const firstName = user?.displayName?.split(' ')[0] ?? '';

  const [goal, setGoal, goalLoading] = useGoal(uid);
  const { allLogs, todayTotal, addEntry, removeEntry, updateEntry, logsLoading } = useProteinLog(uid);
  const { streakData, newlyUnlockedBadges, clearNewBadges, checkAndUpdate } = useStreak(uid, allLogs, goal);
  const [showCelebration, setShowCelebration] = useState(false);
  const wasComplete = useRef(false);

  const todayPercent = goal > 0 ? todayTotal / goal : 0;
  const dataLoading = goalLoading || logsLoading;

  // Last 10 unique foods sorted by recency — shown as one-tap quick-add chips
  const recentFoods = useMemo(() => {
    const seen = new Set<string>();
    const foods: Array<{ name: string; protein: number; mealType: MealType }> = [];
    [...allLogs]
      .sort((a, b) => b.date.localeCompare(a.date))
      .flatMap(d => [...d.entries].sort((a, b) => b.timestamp - a.timestamp))
      .forEach(e => {
        if (!seen.has(e.name.toLowerCase())) {
          seen.add(e.name.toLowerCase());
          foods.push({ name: e.name, protein: e.protein, mealType: e.mealType });
        }
      });
    return foods.slice(0, 10);
  }, [allLogs]);

  // One-time migration: if the user has existing data in localStorage (from the
  // pre-Firebase version of the app), batch-write it to Firestore on first sign-in.
  const migrated = useRef(false);
  useEffect(() => {
    if (dataLoading || migrated.current) return;
    if (goal === 0 && allLogs.length === 0) {
      const localGoal   = storageGet<number>(STORAGE_KEYS.GOAL, 0);
      const localLogs   = storageGet<DayLog[]>(STORAGE_KEYS.FOOD_LOG, []);
      const localStreak = storageGet<StreakData>(STORAGE_KEYS.STREAK, DEFAULT_STREAK);
      if (localGoal > 0 || localLogs.length > 0) {
        migrated.current = true;
        const batch = writeBatch(db);
        if (localGoal > 0) {
          batch.set(doc(db, 'users', uid, 'data', 'settings'), { goal: localGoal }, { merge: true });
        }
        for (const dayLog of localLogs) {
          const entries = dayLog.entries.map(e => ({
            ...e,
            mealType: (e as FoodEntry & { mealType?: MealType }).mealType ?? 'snack',
          }));
          batch.set(doc(collection(db, 'users', uid, 'days'), dayLog.date), { entries });
        }
        if (localStreak.badges.length > 0 || localStreak.currentStreak > 0) {
          batch.set(doc(db, 'users', uid, 'data', 'streak'), localStreak);
        }
        batch.commit();
      }
    }
  }, [uid, dataLoading, goal, allLogs.length]);

  // Show the celebration overlay once per session when the daily goal is first reached
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
      todayTotal, todayPercent,
      addEntry, removeEntry, updateEntry, allLogs, recentFoods,
      firstName,
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
