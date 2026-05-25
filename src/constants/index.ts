import type { Badge } from '../types';

export const STORAGE_KEYS = {
  GOAL: 'pt_userGoal',
  FOOD_LOG: 'pt_foodLog',
  STREAK: 'pt_streakData',
} as const;

export const GOAL_MET_THRESHOLD = 0.8;

export const MOTIVATIONAL_MESSAGES: Record<number, string[]> = {
  0: ['Every gram counts. Let\'s go! 💪', 'Start your day strong!', 'Time to fuel up!'],
  25: ['Good start! Keep building.', 'You\'re on your way! 🚀', 'Nice work so far!'],
  50: ['Halfway there! Great work! ⚡', '50% done — push through!', 'You\'re killing it!'],
  75: ['Almost there! Don\'t stop now! 🔥', '75% — you\'re crushing it!', 'Final stretch!'],
  100: ['GOAL SMASHED! 🎉', 'You\'re a protein machine!', 'Perfect day! 🏆'],
};

export const BADGE_DEFINITIONS: Badge[] = [
  { id: 'first-log',  title: 'First Bite',    description: 'Log your first food item',          emoji: '🍽️' },
  { id: 'first-goal', title: 'Goal Getter',   description: 'Hit your daily protein goal',       emoji: '🎯' },
  { id: 'streak-3',   title: 'Hat Trick',     description: '3-day streak achieved',             emoji: '🔥' },
  { id: 'streak-7',   title: 'Week Warrior',  description: '7-day streak achieved',             emoji: '⚔️' },
  { id: 'streak-30',  title: 'Iron Will',     description: '30-day streak achieved',            emoji: '🏆' },
  { id: 'century',    title: 'Century Club',  description: 'Log 100g+ protein in one day',     emoji: '💯' },
  { id: 'comeback',   title: 'Comeback Kid',  description: 'Return after breaking a streak',   emoji: '🦅' },
];
