import type { FoodEntry } from '../../types';
import { motion } from 'framer-motion';

interface Props { entry: FoodEntry; onRemove: (id: string) => void; }

export function FoodEntryItem({ entry, onRemove }: Props) {
  return (
    <motion.div layout
      initial={{ opacity: 0, y: -8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: -16, scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className="flex items-center justify-between bg-white rounded-2xl px-4 py-3.5 shadow-sm border border-stone-100"
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <span className="text-lg">🥩</span>
        <div className="min-w-0">
          <p className="font-semibold text-stone-800 truncate text-sm">{entry.name}</p>
          <p className="text-xs text-stone-400">
            {new Date(entry.timestamp).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3 ml-2">
        <span className="font-black text-green-600 text-sm whitespace-nowrap">{entry.protein}g</span>
        <button onClick={() => onRemove(entry.id)}
          className="w-6 h-6 flex items-center justify-center rounded-full text-stone-300 hover:text-rose-400 hover:bg-rose-50 transition-colors text-lg leading-none"
          aria-label="Eintrag löschen"
        >
          ×
        </button>
      </div>
    </motion.div>
  );
}
