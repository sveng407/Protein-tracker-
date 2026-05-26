import type { FoodEntry } from '../../types';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';

const FOOD_ICONS = ['🥩', '🐟', '🥚', '🧀', '🫘', '🥛', '🍗', '🥜'];
function iconForEntry(id: string) {
  const n = id.charCodeAt(0) + id.charCodeAt(id.length - 1);
  return FOOD_ICONS[n % FOOD_ICONS.length];
}

interface Props {
  entry: FoodEntry;
  onRemove: (id: string) => void;
  onEdit: (entry: FoodEntry) => void;
}

export function FoodEntryItem({ entry, onRemove, onEdit }: Props) {
  const { goal } = useApp();
  const pct = goal > 0 ? Math.round(entry.protein / goal * 100) : 0;
  return (
    <motion.div layout
      initial={{ opacity: 0, y: -10, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: -20, scale: 0.93 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className="flex items-center justify-between px-4 py-3 rounded-3xl mb-2"
      style={{ background: 'var(--pt-input-bg)', border: '2px solid var(--pt-border)' }}
    >
      <button
        onClick={() => onEdit(entry)}
        className="flex items-center gap-3 min-w-0 flex-1 text-left"
      >
        <span
          className="w-9 h-9 flex items-center justify-center rounded-2xl text-lg flex-shrink-0"
          style={{ background: 'linear-gradient(135deg,#FFE4EC,#EDE4FF)' }}
        >
          {iconForEntry(entry.id)}
        </span>
        <div className="min-w-0">
          <p className="text-sm font-bold truncate" style={{ color: 'var(--pt-text)' }}>{entry.name}</p>
          <p className="text-xs font-medium" style={{ color: 'var(--pt-text-sec)' }}>
            {new Date(entry.timestamp).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
      </button>
      <div className="flex items-center gap-2 ml-2 flex-shrink-0">
        <span
          className="text-xs font-black px-2.5 py-1 rounded-full"
          style={{ background: 'var(--pt-border)', color: 'var(--pt-accent)' }}
        >
          +{pct}%
        </span>
        <button onClick={() => onRemove(entry.id)}
          className="w-7 h-7 flex items-center justify-center rounded-full text-base transition-colors"
          style={{ color: '#E4C4D4' }}
          aria-label="Löschen"
        >
          ×
        </button>
      </div>
    </motion.div>
  );
}
