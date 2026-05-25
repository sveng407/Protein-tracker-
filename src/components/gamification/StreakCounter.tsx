import { motion } from 'framer-motion';
import { useT } from '../../context/LanguageContext';

export function StreakCounter({ streak }: { streak: number }) {
  const t = useT();
  if (streak === 0) return null;

  return (
    <motion.div
      initial={{ scale: 0.6, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 16 }}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
      style={{ background: 'linear-gradient(135deg,#FFE4A0,#FFD4A8)', border: '2px solid #FFB899' }}
    >
      <motion.span
        animate={{ rotate: [0, -12, 12, 0] }}
        transition={{ repeat: Infinity, duration: 2.5 }}
        className="text-base"
      >
        🔥
      </motion.span>
      <span className="text-sm font-black" style={{ color: '#B87840' }}>{streak}</span>
      <span className="text-xs font-bold" style={{ color: '#D4A060' }}>
        {t.streak.day(streak)}
      </span>
    </motion.div>
  );
}
