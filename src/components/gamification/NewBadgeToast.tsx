import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { BadgeId } from '../../types';
import { BADGE_DEFINITIONS } from '../../constants';

interface Props { badgeIds: BadgeId[]; onDismiss: () => void; }

export function NewBadgeToast({ badgeIds, onDismiss }: Props) {
  const badge = badgeIds[0] ? BADGE_DEFINITIONS.find(b => b.id === badgeIds[0]) : null;
  useEffect(() => {
    if (badge) { const t = setTimeout(onDismiss, 3500); return () => clearTimeout(t); }
  }, [badge]);

  return (
    <AnimatePresence>
      {badge && (
        <motion.div
          initial={{ y: -90, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -90, opacity: 0, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 280, damping: 20 }}
          className="fixed top-4 left-4 right-4 z-50 max-w-md mx-auto"
        >
          <div
            className="flex items-center gap-3 px-4 py-3 rounded-3xl"
            style={{ background: 'white', border: '2.5px solid #FFE4EC', boxShadow: '0 8px 32px rgba(255,183,197,0.35)' }}
          >
            <div
              className="w-12 h-12 flex items-center justify-center rounded-2xl text-2xl flex-shrink-0"
              style={{ background: 'linear-gradient(135deg,#FFE4EC,#EDE4FF)' }}
            >
              {badge.emoji}
            </div>
            <div className="flex-1">
              <p className="text-xs font-black uppercase tracking-wide" style={{ color: '#FFB7C5' }}>
                Neues Badge! ✨
              </p>
              <p className="font-black text-sm" style={{ color: '#3D2255' }}>{badge.title}</p>
              <p className="text-xs" style={{ color: '#C4A8FF' }}>{badge.description}</p>
            </div>
            <button onClick={onDismiss} className="text-xl" style={{ color: '#EDE4FF' }}>×</button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
