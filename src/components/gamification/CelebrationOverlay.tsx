import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import type { FlowerColor } from '../../lib/flowerUtils';
import { FlowerGrowth } from '../today/FlowerGrowth';
import { useT } from '../../context/LanguageContext';

interface Props { show: boolean; onDismiss: () => void; flowerColor?: FlowerColor; }

export function CelebrationOverlay({ show, onDismiss, flowerColor }: Props) {
  const t = useT();

  useEffect(() => {
    if (show) {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#FFB7C5', '#C4A8FF', '#A8EED4', '#FFE4A0', '#FFB899'],
      });
      const timer = setTimeout(onDismiss, 5000);
      return () => clearTimeout(timer);
    }
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: 'rgba(255,245,250,0.8)', backdropFilter: 'blur(10px)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onDismiss}
        >
          <motion.div
            initial={{ scale: 0.4, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.7, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 16 }}
            className="rounded-4xl px-8 py-8 text-center mx-6"
            style={{
              background: 'white',
              border: '3px solid #FFE4EC',
              boxShadow: '0 12px 60px rgba(255,183,197,0.4)',
            }}
          >
            <div className="text-2xl animate-sparkle" style={{ letterSpacing: 8 }}>✨ ⭐ ✨</div>

            <div style={{ width: 160, margin: '0 auto -8px' }}>
              <FlowerGrowth percent={1} color={flowerColor} />
            </div>

            <h2 className="text-2xl font-black mb-1" style={{ color: '#3D2255' }}>
              {t.celebration.title}
            </h2>
            <p className="text-sm font-semibold" style={{ color: '#C4A8FF' }}>
              {t.celebration.subtitle}
            </p>
            <p className="text-xs mt-3" style={{ color: '#D4C4E8' }}>
              {t.celebration.hint}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
