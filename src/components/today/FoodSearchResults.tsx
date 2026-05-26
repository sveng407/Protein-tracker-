import type { OFFFoodProduct } from '../../types';
import { extractProtein } from '../../lib/openFoodFacts';
import { useT } from '../../context/LanguageContext';

interface Props {
  results: OFFFoodProduct[];
  loading: boolean;
  onSelect: (name: string, protein: number) => void;
}

export function FoodSearchResults({ results, loading, onSelect }: Props) {
  const t = useT();

  if (loading) {
    return (
      <div
        className="text-center py-4 text-sm animate-pulse mt-2 rounded-2xl"
        style={{ color: 'var(--pt-text-sec)', background: 'var(--pt-surface)' }}
      >
        {t.search.loading}
      </div>
    );
  }

  if (results.length === 0) return null;

  return (
    <div
      className="mt-2 rounded-2xl overflow-hidden"
      style={{ border: '2px solid var(--pt-border)' }}
    >
      {results.map((p, i) => {
        const protein = extractProtein(p);
        const name = p.product_name || t.search.unknownProduct;
        return (
          <button
            key={i}
            onClick={() => onSelect(name, protein)}
            className="w-full text-left px-4 py-3 flex justify-between items-center transition-all"
            style={{
              background: 'var(--pt-card)',
              borderBottom: i < results.length - 1 ? '1.5px solid #F0E8FF' : 'none',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--pt-surface)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'white')}
          >
            <span
              className="text-sm font-semibold truncate flex-1 mr-2"
              style={{ color: 'var(--pt-text)' }}
            >
              {name}
            </span>
            <span
              className="text-xs font-black whitespace-nowrap px-2 py-0.5 rounded-full"
              style={{ background: 'var(--pt-border)', color: 'var(--pt-accent)' }}
            >
              {protein.toFixed(1)}g / 100g
            </span>
          </button>
        );
      })}
    </div>
  );
}
