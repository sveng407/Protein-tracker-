import type { FoodEntry } from '../../types';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';

const EMOJI_MAP: Array<[RegExp, string]> = [
  [/protein|whey|casein|shake|supplement|pulver|powder/i, '💪'],
  [/chicken|hähnchen|huhn|poulet|geflügel/i, '🍗'],
  [/turkey|pute|truthahn/i, '🍗'],
  [/beef|steak|rind|kalb|hackfleisch/i, '🥩'],
  [/pork|schwein|ham|schinken|wurst|speck|bacon|salami|chorizo/i, '🥓'],
  [/fish|fisch|salmon|lachs|tuna|thunfisch|cod|kabeljau|shrimp|garnele|hering|makrele|mackerel|tilapia|pangasius/i, '🐟'],
  [/egg|ei\b|eier/i, '🥚'],
  [/cheese|käse|parmesan|mozzarella|cheddar|brie|gouda|feta/i, '🧀'],
  [/yogurt|yoghurt|joghurt|quark|skyr/i, '🥛'],
  [/milk|milch/i, '🥛'],
  [/tofu|tempeh|soy\b|soja/i, '🫘'],
  [/bean|bohne|lentil|linse|chickpea|kicher|legume/i, '🫘'],
  [/nut|nuss|nüsse|almond|mandel|walnut|walnuss|peanut|erdnuss|cashew|pistachio/i, '🥜'],
  [/oat|hafer|granola|müsli|muesli|porridge/i, '🥣'],
  [/bread|brot|toast|brötchen|bagel|baguette|ciabatta/i, '🍞'],
  [/rice|reis/i, '🍚'],
  [/pasta|nudel|spaghetti|penne|lasagne|macaroni/i, '🍝'],
  [/salad|salat/i, '🥗'],
  [/broccoli|spinach|spinat|kohl|zucchini|gurke|cucumber/i, '🥦'],
  [/potato|kartoffel/i, '🥔'],
  [/apple|apfel/i, '🍎'],
  [/banana|banane/i, '🍌'],
  [/bar\b|riegel|snackbar/i, '🍫'],
  [/soup|suppe/i, '🍲'],
  [/pizza/i, '🍕'],
  [/burger|sandwich/i, '🍔'],
  [/coffee|kaffee|café/i, '☕'],
];
const FALLBACK_ICONS = ['🥩', '🍗', '🥚', '🧀', '🫘', '🥜'];
function iconForEntry(name: string, id: string) {
  for (const [re, emoji] of EMOJI_MAP) {
    if (re.test(name)) return emoji;
  }
  const n = id.charCodeAt(0) + id.charCodeAt(id.length - 1);
  return FALLBACK_ICONS[n % FALLBACK_ICONS.length];
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
          {iconForEntry(entry.name, entry.id)}
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
