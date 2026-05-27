import type { FoodEntry } from '../../types';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';

const EMOJI_MAP: Array<[RegExp, string]> = [
  // Protein supplements
  [/protein|whey|casein|shake|supplement|pulver|powder/i, '💪'],
  // Poultry (chicken + turkey; hühn covers Hühnerbrust/Hühnchen)
  [/chicken|hähnchen|hühn|huhn|poulet|geflügel|csirke|pute|truthahn|turkey/i, '🍗'],
  // Red meat
  [/beef|steak|rind|kalb|hackfleisch|marha/i, '🥩'],
  // Pork & cured meats
  [/pork|schwein|ham|schinken|wurst|speck|bacon|salami|chorizo|sertés/i, '🥓'],
  // Fish & seafood (hal\b: HU "hal"/"tonhal" but not "halloumi")
  [/fish|fisch|salmon|lachs|lazac|tuna|thunfisch|tonhal|cod|kabeljau|shrimp|garnele|hering|makrele|mackerel|forelle|tilapia|pangasius|halibut|hal\b/i, '🐟'],
  // Eggs
  [/egg|tojás|\bei\b|eier/i, '🥚'],
  // Cheese (halloumi before fish check)
  [/cheese|käse|sajt|parmesan|mozzarella|cheddar|brie|gouda|feta|halloumi/i, '🧀'],
  // Yogurt & quark
  [/yogurt|yoghurt|joghurt|quark|skyr/i, '🥛'],
  // Milk
  [/milk|milch|\btej\b/i, '🥛'],
  // Soy & tofu
  [/tofu|tempeh|soy\b|soja/i, '🫘'],
  // Beans & lentils
  [/\bbab\b|bean|bohne|lentil|linse|lencse|chickpea|kicher/i, '🫘'],
  // Nuts & seeds
  [/nut|nuss|nüsse|almond|mandel|mandula|walnut|walnuss|dió|peanut|erdnuss|mogyoró|cashew|pistachio|kerne|samen/i, '🥜'],
  // Oats & cereal
  [/oat|hafer|granola|müsli|muesli|porridge/i, '🥣'],
  // Bread
  [/bread|brot|kenyér|toast|brötchen|bagel|baguette|ciabatta/i, '🍞'],
  // Rice
  [/\brice\b|\breis\b|\brizs\b/i, '🍚'],
  // Pasta
  [/pasta|tészta|nudel|spaghetti|penne|lasagne|macaroni/i, '🍝'],
  // Salad
  [/salad|salat/i, '🥗'],
  // Vegetables
  [/broccoli|spinach|spinat|kohl|zucchini|gurke|cucumber|mais|kukorica|\bcorn\b|avocado|gemüse/i, '🥦'],
  // Potato
  [/potato|kartoffel|burgonya|krumpli/i, '🥔'],
  // Apple
  [/apple|apfel|\balma\b/i, '🍎'],
  // Banana
  [/banana|banane|banán/i, '🍌'],
  // Bars & snacks
  [/\bbar\b|riegel|snackbar/i, '🍫'],
  // Soup
  [/soup|suppe|leves/i, '🍲'],
  // Pizza
  [/pizza/i, '🍕'],
  // Burger & sandwich
  [/burger|sandwich/i, '🍔'],
  // Coffee
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
