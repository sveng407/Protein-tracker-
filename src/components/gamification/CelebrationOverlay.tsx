import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

interface Props {
  show: boolean;
  onDismiss: () => void;
}

export function CelebrationOverlay({ show, onDismiss }: Props) {
  useEffect(() => {
    if (show) {
      confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
      const timer = setTimeout(onDismiss, 4000);
      return () => clearTimeout(timer);
    }
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onDismiss}
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="bg-white rounded-3xl px-8 py-10 text-center shadow-2xl mx-4"
          >
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Tagesziel erreicht!</h2>
            <p className="text-gray-500 text-sm">Du hast dein Proteinziel geknackt!</p>
            <p className="text-gray-400 text-xs mt-4">Tippe um fortzufahren</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
