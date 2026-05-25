import { motion } from 'framer-motion';

interface ProgressBarProps {
  percent: number; // 0-1+
}

function barColor(p: number): string {
  if (p >= 1.0) return 'bg-green-600';
  if (p >= 0.67) return 'bg-green-400';
  if (p >= 0.33) return 'bg-yellow-400';
  return 'bg-red-400';
}

export function ProgressBar({ percent }: ProgressBarProps) {
  const clamped = Math.min(percent, 1);
  return (
    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
      <motion.div
        className={`h-full rounded-full ${barColor(percent)} ${percent >= 1 ? 'animate-pulse' : ''}`}
        animate={{ width: `${clamped * 100}%` }}
        transition={{ type: 'spring', stiffness: 80, damping: 20 }}
        initial={{ width: '0%' }}
      />
    </div>
  );
}
