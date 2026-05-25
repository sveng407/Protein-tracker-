import { AnimatePresence } from 'framer-motion';
import type { FoodEntry } from '../../types';
import { FoodEntryItem } from './FoodEntryItem';

interface Props { entries: FoodEntry[]; onRemove: (id: string) => void; }

export function FoodEntryList({ entries, onRemove }: Props) {
  if (entries.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-4xl mb-2">🌱</p>
        <p className="text-sm font-bold" style={{ color: '#C4A8FF' }}>Noch nichts gegessen?</p>
        <p className="text-xs mt-1" style={{ color: '#D4C4E8' }}>Tippe ＋ um eine Mahlzeit hinzuzufügen!</p>
      </div>
    );
  }
  return (
    <div>
      <AnimatePresence>
        {entries.map(e => <FoodEntryItem key={e.id} entry={e} onRemove={onRemove} />)}
      </AnimatePresence>
    </div>
  );
}
