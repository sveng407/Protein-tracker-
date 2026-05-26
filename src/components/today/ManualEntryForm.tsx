import { useState, useEffect, useRef } from 'react';
import { searchByName } from '../../lib/openFoodFacts';
import type { OFFFoodProduct } from '../../types';
import { FoodSearchResults } from './FoodSearchResults';
import { useT } from '../../context/LanguageContext';

interface Props {
  initialName?: string;
  initialProtein?: number;
  onAdd: (name: string, protein: number, proteinPer100g: number) => void;
  onCancel: () => void;
  submitLabel?: string;
}

const inputStyle = {
  background: 'var(--pt-input-bg)',
  border: '2px solid var(--pt-input-border)',
  borderRadius: '1rem',
  padding: '0.75rem 1rem',
  fontSize: '0.875rem',
  width: '100%',
  outline: 'none',
  color: 'var(--pt-text)',
  fontWeight: 600,
} as React.CSSProperties;

const focusStyle = '2px solid var(--pt-text-sec)';

export function ManualEntryForm({ initialName = '', initialProtein, onAdd, onCancel, submitLabel }: Props) {
  const t = useT();
  const [name, setName] = useState(initialName);
  const [portionG, setPortionG] = useState<number | ''>(100);
  const [proteinPer100, setProteinPer100] = useState<number | ''>(initialProtein ?? '');
  const [results, setResults] = useState<OFFFoodProduct[]>([]);
  const [searching, setSearching] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const totalProtein =
    typeof proteinPer100 === 'number' && typeof portionG === 'number'
      ? Math.round((proteinPer100 * portionG) / 100 * 10) / 10
      : 0;

  useEffect(() => { if (initialName) setName(initialName); }, [initialName]);
  useEffect(() => { if (initialProtein !== undefined) setProteinPer100(initialProtein); }, [initialProtein]);

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
    onAdd(name.trim(), totalProtein, typeof proteinPer100 === 'number' ? proteinPer100 : 0);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className="block text-xs font-black mb-1.5 uppercase tracking-wide" style={{ color: 'var(--pt-text-sec)' }}>
          {t.addSheet.foodLabel}
        </label>
        <input
          type="text"
          value={name}
          onChange={e => handleNameChange(e.target.value)}
          placeholder={t.addSheet.foodPlaceholder}
          style={inputStyle}
          onFocus={e => (e.target.style.border = focusStyle)}
          onBlur={e => (e.target.style.border = '2px solid var(--pt-input-border)')}
          autoFocus
        />
        <FoodSearchResults results={results} loading={searching} onSelect={handleSelect} />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-black mb-1.5 uppercase tracking-wide" style={{ color: 'var(--pt-text-sec)' }}>
            {t.addSheet.proteinLabel}
          </label>
          <input
            type="number" min="0" max="100" step="0.1"
            value={proteinPer100}
            onChange={e => setProteinPer100(e.target.value === '' ? '' : parseFloat(e.target.value))}
            placeholder="g"
            style={inputStyle}
            onFocus={e => (e.target.style.border = focusStyle)}
            onBlur={e => (e.target.style.border = '2px solid var(--pt-input-border)')}
          />
        </div>
        <div>
          <label className="block text-xs font-black mb-1.5 uppercase tracking-wide" style={{ color: 'var(--pt-text-sec)' }}>
            {t.addSheet.portionLabel}
          </label>
          <input
            type="number" min="1" max="2000"
            value={portionG}
            onChange={e => setPortionG(e.target.value === '' ? '' : parseInt(e.target.value))}
            style={inputStyle}
            onFocus={e => (e.target.style.border = focusStyle)}
            onBlur={e => (e.target.style.border = '2px solid var(--pt-input-border)')}
          />
        </div>
      </div>

      {totalProtein > 0 && (
        <div className="rounded-3xl px-4 py-3 text-center"
          style={{ background: 'linear-gradient(135deg,#FFE4EC,#EDE4FF)', border: '2px solid #FFD4E8' }}
        >
          <span className="text-2xl font-black" style={{ color: 'var(--pt-accent)' }}>{totalProtein}g</span>
          <span className="text-sm font-semibold ml-2" style={{ color: 'var(--pt-text-sec)' }}>{t.addSheet.proteinSuffix}</span>
        </div>
      )}

      <div className="flex gap-3">
        <button type="button" onClick={onCancel}
          className="flex-1 py-3 rounded-3xl text-sm font-black"
          style={{ border: '2px solid var(--pt-border)', color: 'var(--pt-text-sec)', background: 'var(--pt-card)' }}
        >
          {t.addSheet.cancelButton}
        </button>
        <button type="submit"
          disabled={!name.trim() || totalProtein <= 0}
          className="flex-1 py-3 rounded-3xl text-sm font-black text-white disabled:opacity-40"
          style={{ background: 'linear-gradient(135deg,#FFB7C5,#C4A8FF)', boxShadow: '0 3px 14px rgba(196,168,255,0.4)' }}
        >
          {submitLabel ?? t.addSheet.addButton}
        </button>
      </div>
    </form>
  );
}
