import { useApp } from '../context/AppContext';
import { useT } from '../context/LanguageContext';
import { GardenGrid } from '../components/history/GardenGrid';
import { GOAL_MET_THRESHOLD } from '../constants';
import { today } from '../lib/dateUtils';

export function HistoryPage() {
  const t = useT();
  const { allLogs, goal, streakData } = useApp();

  const completedDays = allLogs.filter(d => {
    if (d.date === today()) return false;
    const total = d.entries.reduce((s, e) => s + e.protein, 0);
    return total >= goal * GOAL_MET_THRESHOLD;
  }).length;

  return (
    <div className="max-w-md mx-auto px-4 pt-5 pb-28">
      <div className="mb-5">
        <h1 className="text-2xl font-black tracking-tight" style={{ color: '#3D2255' }}>
          {t.history.title}
        </h1>
        <p className="text-sm font-semibold mt-0.5" style={{ color: '#C4A8FF' }}>
          {completedDays === 0
            ? t.history.noFlowers
            : t.history.flowers(completedDays)}
        </p>
        {streakData.longestStreak > 0 && (
          <div
            className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full"
            style={{ background: 'linear-gradient(135deg,#FFE4A0,#FFD4A8)', border: '2px solid #FFB899' }}
          >
            <span>🏆</span>
            <span className="text-xs font-black" style={{ color: '#B87840' }}>
              {t.history.record(streakData.longestStreak)}
            </span>
          </div>
        )}
      </div>
      <GardenGrid logs={allLogs} goal={goal} />
    </div>
  );
}
