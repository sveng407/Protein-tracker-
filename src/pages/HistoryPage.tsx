import { useApp } from '../context/AppContext';
import { PageShell } from '../components/layout/PageShell';
import { HistoryList } from '../components/history/HistoryList';

export function HistoryPage() {
  const { allLogs, goal, streakData } = useApp();

  return (
    <PageShell>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold text-gray-900">Verlauf</h1>
        {streakData.longestStreak > 0 && (
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <span>🏆</span>
            <span>Beste Streak: {streakData.longestStreak} Tage</span>
          </div>
        )}
      </div>
      <HistoryList logs={allLogs} goal={goal} />
    </PageShell>
  );
}
