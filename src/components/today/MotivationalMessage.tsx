import { useMemo } from 'react';
import { MOTIVATIONAL_MESSAGES } from '../../constants';
import { today } from '../../lib/dateUtils';

interface Props {
  percent: number;
  entryCount: number;
}

export function MotivationalMessage({ percent, entryCount }: Props) {
  const message = useMemo(() => {
    const thresholds = [100, 75, 50, 25, 0];
    const pct = Math.floor(percent * 100);
    const bucket = thresholds.find(t => pct >= t) ?? 0;
    const messages = MOTIVATIONAL_MESSAGES[bucket];
    const seed = today().replace(/-/g, '') + entryCount;
    const idx = parseInt(seed.slice(-3)) % messages.length;
    return messages[idx];
  }, [percent, entryCount]);

  return (
    <p className="text-center text-sm text-gray-500 mt-2 font-medium">{message}</p>
  );
}
