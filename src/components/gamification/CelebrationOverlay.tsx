import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import type { FlowerColor } from '../../lib/flowerUtils';
import { FlowerGrowth } from '../today/FlowerGrowth';

interface Props {
  show: boolean;
  onDismiss: () => void;
  flowerColor?: FlowerColor;
}

export function CelebrationOverlay({ show, onDismiss, flowerColor }: Props) {
  useEffect(() => {
    if (show) {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.55 },
        colors: ['#FF8FAB', '#FFD166', '#52C77F', '#C084FC', '#FB923C'],
      });
      const t = setTimeout(onDismiss, 4500);
      return () => clearTimeout(t);
    }
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: 'rgba(255,253,245,0.75)', backdropFilter: 'blur(6px)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onDismiss}
        >
          <motion.div
            initial={{ scale: 0.4, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 180, damping: 14 }}
            className="bg-white rounded-3xl px-8 py-8 text-center shadow-2xl mx-6 border border-stone-100"
          >
            <div style={{ width: 140, margin: '0 auto -8px' }}>
              <FlowerGrowth percent={1} color={flowerColor} />
            </div>
            <h2 className="text-2xl font-black text-stone-900 mb-1">Blume geerntet!</h2>
            <p className="text-stone-500 text-sm">Du hast dein Tagesziel erreicht 🌸</p>
            <p className="text-stone-300 text-xs mt-4">Tippe um fortzufahren</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
