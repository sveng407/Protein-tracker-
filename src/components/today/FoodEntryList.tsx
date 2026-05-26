import { AnimatePresence } from 'framer-motion';
import type { FoodEntry } from '../../types';
import { FoodEntryItem } from './FoodEntryItem';

interface Props {
  entries: FoodEntry[];
  onRemove: (id: string) => void;
  onEdit: (entry: FoodEntry) => void;
}

export function FoodEntryList({ entries, onRemove, onEdit }: Props) {
  if (entries.length === 0) return null;
  return (
    <div>
      <AnimatePresence>
        {entries.map(e => (
          <FoodEntryItem key={e.id} entry={e} onRemove={onRemove} onEdit={onEdit} />
        ))}
      </AnimatePresence>
    </div>
  );
}
