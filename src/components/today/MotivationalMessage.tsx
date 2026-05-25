import { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MOTIVATIONAL_MESSAGES } from '../../constants';
import { today } from '../../lib/dateUtils';

interface Props { percent: number; entryCount: number; }

export function MotivationalMessage({ percent, entryCount }: Props) {
  const message = useMemo(() => {
    const pct = Math.floor(percent * 100);
    const bucket = [100, 75, 50, 25, 0].find(t => pct >= t) ?? 0;
    const msgs = MOTIVATIONAL_MESSAGES[bucket];
    const seed = today().replace(/-/g, '') + entryCount;
    return msgs[parseInt(seed.slice(-3)) % msgs.length];
  }, [percent, entryCount]);

  return (
    <AnimatePresence mode="wait">
      <motion.p key={message}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.25 }}
        className="text-center text-sm text-stone-500 mt-3 font-medium px-4"
      >
        {message}
      </motion.p>
    </AnimatePresence>
  );
}
