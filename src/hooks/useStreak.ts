import { useEffect, useState, useCallback, useRef } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { DayLog, StreakData, BadgeId } from '../types';
import { GOAL_MET_THRESHOLD } from '../constants';
import { today, yesterday } from '../lib/dateUtils';

const DEFAULT_STREAK: StreakData = {
  currentStreak: 0,
  longestStreak: 0,
  lastGoalDate: '',
  badges: [],
  badgeUnlockDates: {},
};

// Returns the length of the most recent consecutive run of dates ending today or yesterday.
function calcStreak(goalDates: string[]): number {
  if (goalDates.length === 0) return 0;
  const sorted = [...goalDates].sort().reverse();
  const t = today();
  const y = yesterday();
  // Streak breaks if the most recent qualifying day is older than yesterday
  if (sorted[0] !== t && sorted[0] !== y) return 0;
  let streak = 1;
  for (let i = 1; i < sorted.length; i++) {
    const prev = new Date(sorted[i - 1] + 'T12:00:00');
    const curr = new Date(sorted[i] + 'T12:00:00');
    if (Math.round((prev.getTime() - curr.getTime()) / 86400000) === 1) streak++;
    else break;
  }
  return streak;
}

export function useStreak(uid: string, allLogs: DayLog[], goal: number) {
  const [streakData, setStreakData] = useState<StreakData>(DEFAULT_STREAK);
  const [newlyUnlockedBadges, setNewlyUnlockedBadges] = useState<BadgeId[]>([]);

  // Mirror of streakData in a ref so checkAndUpdate can read the current value
  // without it becoming a stale closure dependency. React's setState updater
  // must be a pure function — we use this ref for side-effectful logic instead.
  const streakRef = useRef<StreakData>(DEFAULT_STREAK);

  // Load persisted streak from Firestore once on mount
  const initialized = useRef(false);
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    getDoc(doc(db, 'users', uid, 'data', 'streak')).then(snap => {
      if (snap.exists()) {
        const data = snap.data() as StreakData;
        streakRef.current = data;
        setStreakData(data);
      }
    });
  }, [uid]);

  const checkAndUpdate = useCallback((isPro?: boolean) => {
    if (goal <= 0) return;

    const prev = streakRef.current;
    const t = today();

    // Days where protein >= 80% of goal (counts toward streak)
    const goalDates = allLogs
      .filter(d => d.entries.reduce((s, e) => s + e.protein, 0) >= goal * GOAL_MET_THRESHOLD)
      .map(d => d.date);

    // Days where protein >= 100% of goal (used for perfect-week badge)
    const strictDates = allLogs
      .filter(d => d.entries.reduce((s, e) => s + e.protein, 0) >= goal)
      .map(d => d.date);

    const currentStreak  = calcStreak(goalDates);
    const strictStreak   = calcStreak(strictDates);
    const totalEntries   = allLogs.flatMap(d => d.entries).length;
    const todayTotal     = allLogs.find(d => d.date === t)?.entries.reduce((s, e) => s + e.protein, 0) ?? 0;
    const maxDayTotal    = allLogs.reduce((max, d) => {
      const dayTotal = d.entries.reduce((s, e) => s + e.protein, 0);
      return Math.max(max, dayTotal);
    }, 0);

    const newBadges: BadgeId[] = [];
    const badges      = [...prev.badges];
    const unlockDates = { ...prev.badgeUnlockDates };

    const award = (id: BadgeId) => {
      if (!badges.includes(id)) {
        badges.push(id);
        unlockDates[id] = t;
        newBadges.push(id);
      }
    };

    // ── Milestones ──
    if (totalEntries >= 1)   award('first-log');
    if (todayTotal >= goal)  award('first-goal');
    if (totalEntries >= 10)  award('log-10');
    if (totalEntries >= 50)  award('log-50');

    // ── Streak badges ──
    if (currentStreak >= 3)  award('streak-3');
    if (currentStreak >= 7)  award('streak-7');
    if (currentStreak >= 14) award('streak-14');
    if (currentStreak >= 30) award('streak-30');

    // ── Quality badges ──
    if (strictStreak >= 7)   award('perfect-week');
    if (maxDayTotal >= 100)  award('century');
    if (maxDayTotal >= 200)  award('protein-200');

    // ── Variety: all 4 meal types in a single day ──
    const hasVariety = allLogs.some(d => {
      const types = new Set(d.entries.map(e => e.mealType));
      return types.has('breakfast') && types.has('lunch') && types.has('dinner') && types.has('snack');
    });
    if (hasVariety) award('variety');

    // ── Early bird: logged breakfast before 9am ──
    const hasEarlyBird = allLogs.some(d =>
      d.entries.some(e => e.mealType === 'breakfast' && new Date(e.timestamp).getHours() < 9)
    );
    if (hasEarlyBird) award('early-bird');

    // ── Comeback: had a 3+ streak before, broke it, now logging again ──
    // currentStreak <= 1 means either day 0 or first day of a new run after a gap
    if (prev.longestStreak >= 3 && currentStreak <= 1 && totalEntries > 0) award('comeback');

    // ── Pro member badge ──
    if (isPro) award('pro-member');

    const longestStreak = Math.max(prev.longestStreak, currentStreak);
    const lastGoalDate  = goalDates.includes(t) ? t : prev.lastGoalDate;

    const next: StreakData = { currentStreak, longestStreak, lastGoalDate, badges, badgeUnlockDates: unlockDates };

    // Update ref first so the next checkAndUpdate call sees the latest value
    streakRef.current = next;
    setStreakData(next);

    // Firestore write and badge notification are safe here — outside any state updater
    setDoc(doc(db, 'users', uid, 'data', 'streak'), next);
    if (newBadges.length > 0) setNewlyUnlockedBadges(newBadges);
  }, [uid, allLogs, goal]);

  const clearNewBadges = useCallback(() => setNewlyUnlockedBadges([]), []);

  return { streakData, newlyUnlockedBadges, clearNewBadges, checkAndUpdate };
}
