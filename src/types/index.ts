export interface FoodEntry {
  id: string;
  name: string;
  protein: number;
  timestamp: number;
  barcode?: string;
}

export interface DayLog {
  date: string; // "YYYY-MM-DD"
  entries: FoodEntry[];
}

export type BadgeId =
  | 'first-log'
  | 'first-goal'
  | 'streak-3'
  | 'streak-7'
  | 'streak-30'
  | 'century'
  | 'comeback';

export interface Badge {
  id: BadgeId;
  title: string;
  description: string;
  emoji: string;
}

export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastGoalDate: string;
  badges: BadgeId[];
  badgeUnlockDates: Partial<Record<BadgeId, string>>;
}

export interface OFFFoodProduct {
  product_name: string;
  nutriments: {
    proteins_100g?: number;
    proteins?: number;
  };
  serving_size?: string;
  image_url?: string;
}
