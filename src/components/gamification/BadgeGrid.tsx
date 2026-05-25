import { BADGE_DEFINITIONS } from '../../constants';
import type { StreakData } from '../../types';
import { BadgeCard } from './BadgeCard';

interface Props {
  streakData: StreakData;
}

export function BadgeGrid({ streakData }: Props) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {BADGE_DEFINITIONS.map(badge => (
        <BadgeCard
          key={badge.id}
          badge={badge}
          unlocked={streakData.badges.includes(badge.id)}
          unlockedDate={streakData.badgeUnlockDates[badge.id]}
        />
      ))}
    </div>
  );
}
