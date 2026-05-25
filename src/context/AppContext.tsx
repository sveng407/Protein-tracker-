import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import type { FoodEntry, DayLog, StreakData, BadgeId } from '../types';
import { useGoal } from '../hooks/useGoal';
import { useProteinLog } from '../hooks/useProteinLog';
import { useStreak } from '../hooks/useStreak';

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
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [goal, setGoal] = useGoal();
  const { allLogs, todayEntries, todayTotal, addEntry, removeEntry } = useProteinLog();
  const { streakData, newlyUnlockedBadges, clearNewBadges, checkAndUpdate } = useStreak(allLogs, goal);
  const [showCelebration, setShowCelebration] = useState(false);
  const wasComplete = useRef(false);

  const todayPercent = goal > 0 ? todayTotal / goal : 0;

  useEffect(() => {
    if (todayPercent >= 1.0 && !wasComplete.current) {
      setShowCelebration(true);
      wasComplete.current = true;
    }
    if (todayPercent < 1.0) {
      wasComplete.current = false;
    }
  }, [todayPercent]);

  useEffect(() => {
    checkAndUpdate();
  }, [allLogs, checkAndUpdate]);

  const dismissCelebration = () => setShowCelebration(false);

  return (
    <AppContext.Provider value={{
      goal, setGoal,
      todayEntries, todayTotal, todayPercent,
      addEntry, removeEntry,
      allLogs,
      streakData, newlyUnlockedBadges, clearNewBadges,
      showCelebration, dismissCelebration,
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
