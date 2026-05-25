import type { Badge } from '../types';

export const STORAGE_KEYS = {
  GOAL: 'pt_userGoal',
  FOOD_LOG: 'pt_foodLog',
  STREAK: 'pt_streakData',
} as const;

export const GOAL_MET_THRESHOLD = 0.8;

export const MOTIVATIONAL_MESSAGES: Record<number, string[]> = {
  0:   ['Dein Samen wartet... pflanz was! 🌱', 'Alles beginnt mit dem ersten Gramm.', 'Zeit zum Wachsen!'],
  25:  ['Der erste Trieb zeigt sich! 🌿', 'Deine Pflanze wacht auf!', 'Kleiner Spross, großes Potential!'],
  50:  ['Blätter sprießen! 🍃', 'Halbzeit — die Knospe naht!', 'Deine Pflanze bekommt Form!'],
  75:  ['Die Knospe schwillt an! 🌸', 'Fast! Noch ein paar Gramm bis zur Blüte!', 'Gleich erblüht sie...'],
  100: ['Heute eine Blume geerntet! 🌺', 'Wunderschön! Dein Garten wächst!', 'Volle Blüte — du bist unschlagbar! ✨'],
};

export const BADGE_DEFINITIONS: Badge[] = [
  { id: 'first-log',  title: 'Erster Samen',   description: 'Erste Mahlzeit geloggt',              emoji: '🌱' },
  { id: 'first-goal', title: 'Erste Blüte',    description: 'Tagesziel zum ersten Mal erreicht',    emoji: '🌸' },
  { id: 'streak-3',   title: 'Mini-Strauß',    description: '3 Blumen in Folge gesammelt',          emoji: '💐' },
  { id: 'streak-7',   title: 'Wochenstrauß',   description: '7 Blumen gesammelt',                   emoji: '🌻' },
  { id: 'streak-30',  title: 'Vollgarten',     description: '30 Blumen — dein Garten blüht!',       emoji: '🪴' },
  { id: 'century',    title: 'Protein-Profi',  description: '100g Protein an einem einzigen Tag',   emoji: '💎' },
  { id: 'comeback',   title: 'Neuanfang',      description: 'Nach einer Pause wieder gestartet',    emoji: '🦋' },
];
