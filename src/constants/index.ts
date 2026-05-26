import type { Badge } from '../types';

export const STORAGE_KEYS = {
  GOAL: 'pt_userGoal',
  FOOD_LOG: 'pt_foodLog',
  STREAK: 'pt_streakData',
} as const;

export const GOAL_MET_THRESHOLD = 0.8;

export const BADGE_DEFINITIONS: Badge[] = [
  { id: 'first-log',    emoji: '🌱' },
  { id: 'first-goal',   emoji: '🌸' },
  { id: 'log-10',       emoji: '📝' },
  { id: 'log-50',       emoji: '📚' },
  { id: 'streak-3',     emoji: '💐' },
  { id: 'streak-7',     emoji: '🌻' },
  { id: 'streak-14',    emoji: '🌿' },
  { id: 'streak-30',    emoji: '🪴' },
  { id: 'perfect-week', emoji: '⭐' },
  { id: 'century',      emoji: '💎' },
  { id: 'protein-200',  emoji: '🏋️' },
  { id: 'variety',      emoji: '🎨' },
  { id: 'early-bird',   emoji: '🌅' },
  { id: 'comeback',     emoji: '🦋' },
  { id: 'pro-member',  emoji: '👑' },
];
