import type { DayLog } from '../../types';
import { DayCard } from './DayCard';
import { today } from '../../lib/dateUtils';

interface Props {
  logs: DayLog[];
  goal: number;
}

export function HistoryList({ logs, goal }: Props) {
  const t = today();
  const pastLogs = logs
    .filter(d => d.date !== t && d.entries.length > 0)
    .sort((a, b) => b.date.localeCompare(a.date));

  if (pastLogs.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        <p className="text-4xl mb-2">📅</p>
        <p className="text-sm">Noch keine vergangenen Tage.</p>
        <p className="text-xs mt-1">Tracke täglich um deinen Verlauf zu sehen.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {pastLogs.map(log => (
        <DayCard key={log.date} log={log} goal={goal} />
      ))}
    </div>
  );
}
