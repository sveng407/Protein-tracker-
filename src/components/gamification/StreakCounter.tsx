import { motion } from 'framer-motion';

interface Props {
  streak: number;
}

export function StreakCounter({ streak }: Props) {
  if (streak === 0) return null;

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="flex items-center gap-1.5 bg-orange-50 border border-orange-200 rounded-full px-3 py-1.5"
    >
      <span className="text-lg">🔥</span>
      <span className="font-bold text-orange-600 text-sm">{streak}</span>
      <span className="text-xs text-orange-500">Tage</span>
    </motion.div>
  );
}
