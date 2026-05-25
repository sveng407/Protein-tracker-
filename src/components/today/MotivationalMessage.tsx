import { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { today } from '../../lib/dateUtils';
import { useT } from '../../context/LanguageContext';

interface Props { percent: number; entryCount: number; }

export function MotivationalMessage({ percent, entryCount }: Props) {
  const t = useT();

  const message = useMemo(() => {
    const pct = Math.floor(percent * 100);
    const bucket = [100, 75, 50, 25, 0].find(threshold => pct >= threshold) ?? 0;
    const msgs = t.motivational[bucket];
    const seed = today().replace(/-/g, '') + entryCount;
    return msgs[parseInt(seed.slice(-3)) % msgs.length];
  }, [percent, entryCount, t]);

  return (
    <AnimatePresence mode="wait">
      <motion.p key={message}
        initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
        transition={{ duration: 0.22 }}
        className="text-center text-xs font-semibold mt-2 px-2"
        style={{ color: '#C4A8CC' }}
      >
        {message}
      </motion.p>
    </AnimatePresence>
  );
}
