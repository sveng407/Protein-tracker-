import { AnimatePresence } from 'framer-motion';
import type { FoodEntry } from '../../types';
import { FoodEntryItem } from './FoodEntryItem';

interface Props {
  entries: FoodEntry[];
  onRemove: (id: string) => void;
}

export function FoodEntryList({ entries, onRemove }: Props) {
  if (entries.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        <p className="text-4xl mb-2">🍽️</p>
        <p className="text-sm">Noch keine Mahlzeiten heute.</p>
        <p className="text-xs mt-1">Tippe + um eine hinzuzufügen.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <AnimatePresence>
        {entries.map(entry => (
          <FoodEntryItem key={entry.id} entry={entry} onRemove={onRemove} />
        ))}
      </AnimatePresence>
    </div>
  );
}
