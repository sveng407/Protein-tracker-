import { AnimatePresence } from 'framer-motion';
import type { FoodEntry } from '../../types';
import { FoodEntryItem } from './FoodEntryItem';

interface Props { entries: FoodEntry[]; onRemove: (id: string) => void; }

export function FoodEntryList({ entries, onRemove }: Props) {
  if (entries.length === 0) return null;
  return (
    <div>
      <AnimatePresence>
        {entries.map(e => <FoodEntryItem key={e.id} entry={e} onRemove={onRemove} />)}
      </AnimatePresence>
    </div>
  );
}
