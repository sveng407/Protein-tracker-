import type { OFFFoodProduct } from '../../types';
import { extractProtein } from '../../lib/openFoodFacts';

interface Props {
  results: OFFFoodProduct[];
  loading: boolean;
  onSelect: (name: string, protein: number) => void;
}

export function FoodSearchResults({ results, loading, onSelect }: Props) {
  if (loading) {
    return (
      <div className="text-center py-4 text-gray-400 text-sm animate-pulse">Suche…</div>
    );
  }

  if (results.length === 0) return null;

  return (
    <div className="mt-2 border border-gray-200 rounded-xl overflow-hidden divide-y divide-gray-100">
      {results.map((p, i) => {
        const protein = extractProtein(p);
        const name = p.product_name || 'Unbekanntes Produkt';
        return (
          <button
            key={i}
            onClick={() => onSelect(name, protein)}
            className="w-full text-left px-4 py-3 bg-white hover:bg-green-50 transition-colors flex justify-between items-center"
          >
            <span className="text-sm font-medium text-gray-800 truncate flex-1 mr-2">{name}</span>
            <span className="text-xs font-semibold text-green-600 whitespace-nowrap">
              {protein.toFixed(1)}g / 100g
            </span>
          </button>
        );
      })}
    </div>
  );
}
