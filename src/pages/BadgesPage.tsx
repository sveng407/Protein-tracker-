import { useApp } from '../context/AppContext';
import { PageShell } from '../components/layout/PageShell';
import { BadgeGrid } from '../components/gamification/BadgeGrid';
import { BADGE_DEFINITIONS } from '../constants';

export function BadgesPage() {
  const { streakData } = useApp();
  const unlocked = streakData.badges.length;
  const total = BADGE_DEFINITIONS.length;

  return (
    <PageShell>
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-xl font-bold text-gray-900">Badges</h1>
        <span className="text-sm text-gray-400">{unlocked}/{total}</span>
      </div>
      <p className="text-xs text-gray-400 mb-4">
        Erreiche Ziele um Badges freizuschalten.
      </p>
      <BadgeGrid streakData={streakData} />
    </PageShell>
  );
}
