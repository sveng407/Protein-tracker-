import type { DayLog } from '../../types';
import { formatDate } from '../../lib/dateUtils';
import { ProgressBar } from '../today/ProgressBar';
import { GOAL_MET_THRESHOLD } from '../../constants';

interface Props {
  log: DayLog;
  goal: number;
}

export function DayCard({ log, goal }: Props) {
  const total = log.entries.reduce((s, e) => s + e.protein, 0);
  const percent = goal > 0 ? total / goal : 0;
  const goalMet = percent >= GOAL_MET_THRESHOLD;

  return (
    <div className="bg-white rounded-2xl px-4 py-4 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="font-semibold text-gray-900 capitalize">{formatDate(log.date, 'de-DE')}</p>
          <p className="text-xs text-gray-400">{log.entries.length} Mahlzeit{log.entries.length !== 1 ? 'en' : ''}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-bold text-gray-900">{total}g</span>
          {goalMet && <span className="text-green-500 text-lg">✓</span>}
        </div>
      </div>
      <ProgressBar percent={percent} />
      {goal > 0 && (
        <p className="text-xs text-gray-400 mt-1.5 text-right">
          {Math.round(percent * 100)}% von {goal}g
        </p>
      )}
    </div>
  );
}
