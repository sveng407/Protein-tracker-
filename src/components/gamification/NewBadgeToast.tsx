import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { BadgeId } from '../../types';
import { BADGE_DEFINITIONS } from '../../constants';

interface Props {
  badgeIds: BadgeId[];
  onDismiss: () => void;
}

export function NewBadgeToast({ badgeIds, onDismiss }: Props) {
  const badge = badgeIds[0] ? BADGE_DEFINITIONS.find(b => b.id === badgeIds[0]) : null;

  useEffect(() => {
    if (badge) {
      const t = setTimeout(onDismiss, 3500);
      return () => clearTimeout(t);
    }
  }, [badge]);

  return (
    <AnimatePresence>
      {badge && (
        <motion.div
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          className="fixed top-4 left-4 right-4 z-50 max-w-md mx-auto"
        >
          <div className="bg-white rounded-2xl shadow-xl border border-yellow-200 px-4 py-3 flex items-center gap-3">
            <div className="text-3xl">{badge.emoji}</div>
            <div className="flex-1">
              <p className="text-xs font-semibold text-yellow-600 uppercase tracking-wide">Neues Badge!</p>
              <p className="font-bold text-gray-900">{badge.title}</p>
              <p className="text-xs text-gray-500">{badge.description}</p>
            </div>
            <button onClick={onDismiss} className="text-gray-300 hover:text-gray-500 text-lg">×</button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
