import { useApp } from '../context/AppContext';
import { GardenGrid } from '../components/history/GardenGrid';
import { GOAL_MET_THRESHOLD } from '../constants';
import { today } from '../lib/dateUtils';

export function HistoryPage() {
  const { allLogs, goal, streakData } = useApp();

  const completedDays = allLogs.filter(d => {
    if (d.date === today()) return false;
    const total = d.entries.reduce((s, e) => s + e.protein, 0);
    return total >= goal * GOAL_MET_THRESHOLD;
  }).length;

  return (
    <div className="max-w-md mx-auto px-4 pt-5 pb-28">
      <div className="mb-5">
        <h1 className="text-2xl font-black text-stone-900 tracking-tight">Mein Garten 🌻</h1>
        <p className="text-sm text-stone-400 mt-0.5">
          {completedDays === 0
            ? 'Noch keine Blume geerntet — fang heute an!'
            : `${completedDays} Blume${completedDays !== 1 ? 'n' : ''} gesammelt`}
        </p>
        {streakData.longestStreak > 0 && (
          <div className="mt-2 inline-flex items-center gap-1.5 bg-amber-50 border border-amber-200 rounded-full px-3 py-1">
            <span>🏆</span>
            <span className="text-xs font-semibold text-amber-700">
              Rekord-Streak: {streakData.longestStreak} Tage
            </span>
          </div>
        )}
      </div>
      <GardenGrid logs={allLogs} goal={goal} />
    </div>
  );
}
