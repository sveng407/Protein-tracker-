import { useState, useCallback } from 'react';
import type { DayLog, StreakData, BadgeId } from '../types';
import { storageGet, storageSet } from '../lib/storage';
import { STORAGE_KEYS, GOAL_MET_THRESHOLD } from '../constants';
import { today, yesterday } from '../lib/dateUtils';

const DEFAULT_STREAK: StreakData = {
  currentStreak: 0,
  longestStreak: 0,
  lastGoalDate: '',
  badges: [],
  badgeUnlockDates: {},
};

function calcStreak(goalDates: string[]): number {
  if (goalDates.length === 0) return 0;
  const sorted = [...goalDates].sort().reverse();
  const t = today();
  const y = yesterday();
  if (sorted[0] !== t && sorted[0] !== y) return 0;
  let streak = 1;
  for (let i = 1; i < sorted.length; i++) {
    const prev = new Date(sorted[i - 1] + 'T12:00:00');
    const curr = new Date(sorted[i] + 'T12:00:00');
    const diff = Math.round((prev.getTime() - curr.getTime()) / 86400000);
    if (diff === 1) streak++;
    else break;
  }
  return streak;
}

export function useStreak(allLogs: DayLog[], goal: number) {
  const [streakData, setStreakData] = useState<StreakData>(() =>
    storageGet<StreakData>(STORAGE_KEYS.STREAK, DEFAULT_STREAK)
  );
  const [newlyUnlockedBadges, setNewlyUnlockedBadges] = useState<BadgeId[]>([]);

  const checkAndUpdate = useCallback(() => {
    if (goal <= 0) return;

    const goalDates = allLogs
      .filter(d => d.entries.reduce((s, e) => s + e.protein, 0) >= goal * GOAL_MET_THRESHOLD)
      .map(d => d.date);

    const currentStreak = calcStreak(goalDates);
    const totalEntries = allLogs.flatMap(d => d.entries).length;
    const todayTotal = allLogs.find(d => d.date === today())?.entries.reduce((s, e) => s + e.protein, 0) ?? 0;
    const maxDayTotal = Math.max(...allLogs.map(d => d.entries.reduce((s, e) => s + e.protein, 0)), 0);

    setStreakData(prev => {
      const hadStreak = prev.currentStreak > 0;
      const newBadges: BadgeId[] = [];
      const badges = [...prev.badges];
      const unlockDates = { ...prev.badgeUnlockDates };
      const t = today();

      const award = (id: BadgeId) => {
        if (!badges.includes(id)) {
          badges.push(id);
          unlockDates[id] = t;
          newBadges.push(id);
        }
      };

      if (totalEntries >= 1) award('first-log');
      if (todayTotal >= goal) award('first-goal');
      if (currentStreak >= 3) award('streak-3');
      if (currentStreak >= 7) award('streak-7');
      if (currentStreak >= 30) award('streak-30');
      if (maxDayTotal >= 100) award('century');
      // comeback: had a streak, streak reset to 0, now logging again
      if (hadStreak && prev.currentStreak === 0 && currentStreak === 0 && totalEntries > 0) {
        award('comeback');
      }

      const longestStreak = Math.max(prev.longestStreak, currentStreak);
      const lastGoalDate = goalDates.includes(t) ? t : prev.lastGoalDate;

      const next: StreakData = {
        currentStreak,
        longestStreak,
        lastGoalDate,
        badges,
        badgeUnlockDates: unlockDates,
      };

      storageSet(STORAGE_KEYS.STREAK, next);
      if (newBadges.length > 0) setNewlyUnlockedBadges(newBadges);
      return next;
    });
  }, [allLogs, goal]);

  const clearNewBadges = useCallback(() => setNewlyUnlockedBadges([]), []);

  return { streakData, newlyUnlockedBadges, clearNewBadges, checkAndUpdate };
}
