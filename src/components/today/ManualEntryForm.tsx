import { useState, useEffect, useRef } from 'react';
import { searchByName } from '../../lib/openFoodFacts';
import type { OFFFoodProduct } from '../../types';
import { FoodSearchResults } from './FoodSearchResults';

interface Props {
  initialName?: string;
  initialProtein?: number;
  onAdd: (name: string, protein: number) => void;
  onCancel: () => void;
}

export function ManualEntryForm({ initialName = '', initialProtein, onAdd, onCancel }: Props) {
  const [name, setName] = useState(initialName);
  const [portionG, setPortionG] = useState(100);
  const [proteinPer100, setProteinPer100] = useState<number | ''>(initialProtein ?? '');
  const [results, setResults] = useState<OFFFoodProduct[]>([]);
  const [searching, setSearching] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const totalProtein = typeof proteinPer100 === 'number'
    ? Math.round((proteinPer100 * portionG) / 100 * 10) / 10
    : 0;

  useEffect(() => {
    if (initialName) {
      setName(initialName);
    }
  }, [initialName]);

  function handleNameChange(val: string) {
    setName(val);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      if (val.length >= 2) {
        setSearching(true);
        const r = await searchByName(val);
        setResults(r.filter(p => p.product_name));
        setSearching(false);
      } else {
        setResults([]);
      }
    }, 400);
  }

  function handleSelect(pName: string, protein: number) {
    setName(pName);
    setProteinPer100(protein);
    setResults([]);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || totalProtein <= 0) return;
    onAdd(name.trim(), totalProtein);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Lebensmittel</label>
        <input
          type="text"
          value={name}
          onChange={e => handleNameChange(e.target.value)}
          placeholder="z.B. Hähnchenbrust, Quark…"
          className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          autoFocus
        />
        <FoodSearchResults results={results} loading={searching} onSelect={handleSelect} />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Protein / 100g</label>
          <input
            type="number"
            min="0"
            max="100"
            step="0.1"
            value={proteinPer100}
            onChange={e => setProteinPer100(e.target.value === '' ? '' : parseFloat(e.target.value))}
            placeholder="g"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Portion (g)</label>
          <input
            type="number"
            min="1"
            max="2000"
            value={portionG}
            onChange={e => setPortionG(parseInt(e.target.value) || 100)}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>
      </div>

      {totalProtein > 0 && (
        <div className="bg-green-50 rounded-xl px-4 py-3 text-center">
          <span className="text-2xl font-bold text-green-600">{totalProtein}g</span>
          <span className="text-sm text-gray-500 ml-2">Protein</span>
        </div>
      )}

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-3 rounded-xl border border-gray-300 text-sm font-medium text-gray-600"
        >
          Abbrechen
        </button>
        <button
          type="submit"
          disabled={!name.trim() || totalProtein <= 0}
          className="flex-1 py-3 rounded-xl bg-green-500 text-white text-sm font-medium disabled:opacity-40"
        >
          Hinzufügen
        </button>
      </div>
    </form>
  );
}
