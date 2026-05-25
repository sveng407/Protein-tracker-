import type { FoodEntry } from '../../types';
import { motion } from 'framer-motion';

interface Props {
  entry: FoodEntry;
  onRemove: (id: string) => void;
}

export function FoodEntryItem({ entry, onRemove }: Props) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex items-center justify-between bg-white rounded-xl px-4 py-3 shadow-sm border border-gray-100"
    >
      <div className="flex-1 min-w-0">
        <p className="font-medium text-gray-900 truncate">{entry.name}</p>
        <p className="text-xs text-gray-400">
          {new Date(entry.timestamp).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
      <div className="flex items-center gap-3 ml-2">
        <span className="font-bold text-green-600 text-sm whitespace-nowrap">{entry.protein}g</span>
        <button
          onClick={() => onRemove(entry.id)}
          className="text-gray-300 hover:text-red-400 transition-colors text-lg leading-none"
          aria-label="Eintrag löschen"
        >
          ×
        </button>
      </div>
    </motion.div>
  );
}
