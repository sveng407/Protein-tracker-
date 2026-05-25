import { motion } from 'framer-motion';

interface Props { streak: number; }

export function StreakCounter({ streak }: Props) {
  if (streak === 0) return null;
  return (
    <motion.div
      initial={{ scale: 0.7, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="flex items-center gap-1.5 bg-orange-50 border border-orange-200 rounded-full px-3 py-1.5"
    >
      <motion.span
        animate={{ rotate: [0, -10, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
        className="text-base"
      >
        🔥
      </motion.span>
      <span className="font-black text-orange-600 text-sm">{streak}</span>
      <span className="text-xs text-orange-400 font-medium">
        {streak === 1 ? 'Tag' : 'Tage'}
      </span>
    </motion.div>
  );
}
