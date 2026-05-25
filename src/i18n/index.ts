import type { BadgeId } from '../types';

export type Lang = 'de' | 'en' | 'hu';

interface BadgeTranslation { title: string; description: string; }

export interface Translations {
  lang: Lang;
  locale: string;

  onboarding: {
    headline: string;
    subtitle: string;
    goalLabel: string;
    goalUnit: string;
    goalNote: string;
    startButton: string;
  };

  today: {
    greeting: string;
    mealsTitle: string;
    addMeal: string;
    totalGrams: string;
  };

  addSheet: {
    title: string;
    tabSearch: string;
    tabScan: string;
    foodLabel: string;
    foodPlaceholder: string;
    proteinLabel: string;
    portionLabel: string;
    addButton: string;
    cancelButton: string;
    scanHint: string;
    scanLoading: string;
    proteinSuffix: string;
    notFound: (barcode: string) => string;
  };

  search: {
    loading: string;
    unknownProduct: string;
  };

  camera: {
    denied: string;
    failed: string;
    starting: string;
  };

  history: {
    title: string;
    noFlowers: string;
    flowers: (n: number) => string;
    record: (n: number) => string;
  };

  badges: {
    title: string;
    empty: string;
    progress: (n: number, total: number) => string;
    locked: string;
    newBadge: string;
    definitions: Record<BadgeId, BadgeTranslation>;
  };

  celebration: {
    title: string;
    subtitle: string;
    hint: string;
  };

  streak: {
    day: (n: number) => string;
  };

  nav: {
    today: string;
    garden: string;
    badges: string;
  };

  motivational: Record<number, string[]>;
}

const de: Translations = {
  lang: 'de',
  locale: 'de-DE',

  onboarding: {
    headline: 'Lass uns blühen! 🌸',
    subtitle: 'Jeden Tag, den du dein Proteinziel erreichst,\nwächst in deinem Garten eine neue Blume.',
    goalLabel: '✨ Dein tägliches Ziel ✨',
    goalUnit: 'Protein pro Tag',
    goalNote: 'Ziel jederzeit änderbar 💕',
    startButton: 'Garten anlegen 🌱',
  },

  today: {
    greeting: 'Hallo! 🌸',
    mealsTitle: 'Heutige Mahlzeiten',
    addMeal: 'Mahlzeit hinzufügen',
    totalGrams: 'g',
  },

  addSheet: {
    title: 'Mahlzeit hinzufügen 🍽️',
    tabSearch: '🔍 Suchen',
    tabScan: '📷 Scannen',
    foodLabel: 'Lebensmittel',
    foodPlaceholder: 'z.B. Hähnchenbrust, Quark…',
    proteinLabel: 'Protein / 100g',
    portionLabel: 'Portion (g)',
    addButton: 'Hinzufügen 🌸',
    cancelButton: 'Abbrechen',
    scanHint: 'Halte den Barcode in den Rahmen',
    scanLoading: 'Produkt wird gesucht…',
    proteinSuffix: 'Protein ✨',
    notFound: (barcode) => `Barcode ${barcode} nicht in der Datenbank. Bitte manuell eingeben.`,
  },

  search: {
    loading: 'Suche…',
    unknownProduct: 'Unbekanntes Produkt',
  },

  camera: {
    denied: 'Kamerazugriff verweigert. Bitte erlaube den Kamerazugriff in den Einstellungen.',
    failed: 'Kamera konnte nicht gestartet werden.',
    starting: 'Kamera wird gestartet…',
  },

  history: {
    title: 'Mein Garten 🌻',
    noFlowers: 'Noch keine Blume — fang heute an! 🌱',
    flowers: (n) => `${n} Blume${n !== 1 ? 'n' : ''} gesammelt 💕`,
    record: (n) => `Rekord: ${n} Tage`,
  },

  badges: {
    title: 'Errungenschaften 🏅',
    empty: 'Deine Reise beginnt jetzt! ✨',
    progress: (n, total) => `${n} von ${total} freigeschaltet 💕`,
    locked: '🔒',
    newBadge: 'Neues Badge! ✨',
    definitions: {
      'first-log':  { title: 'Erster Samen',  description: 'Erste Mahlzeit geloggt' },
      'first-goal': { title: 'Erste Blüte',   description: 'Tagesziel zum ersten Mal erreicht' },
      'streak-3':   { title: 'Mini-Strauß',   description: '3 Blumen in Folge gesammelt' },
      'streak-7':   { title: 'Wochenstrauß',  description: '7 Blumen gesammelt' },
      'streak-30':  { title: 'Vollgarten',    description: '30 Blumen — dein Garten blüht!' },
      'century':    { title: 'Protein-Profi', description: '100g Protein an einem einzigen Tag' },
      'comeback':   { title: 'Neuanfang',     description: 'Nach einer Pause wieder gestartet' },
    },
  },

  celebration: {
    title: 'Blume geerntet!',
    subtitle: 'Tagesziel erreicht 💕',
    hint: 'Tippe um fortzufahren',
  },

  streak: {
    day: (n) => n === 1 ? 'Tag' : 'Tage',
  },

  nav: {
    today: 'Heute',
    garden: 'Garten',
    badges: 'Erfolge',
  },

  motivational: {
    0:   ['Dein Samen wartet... pflanz was! 🌱', 'Alles beginnt mit dem ersten Gramm.', 'Zeit zum Wachsen!'],
    25:  ['Der erste Trieb zeigt sich! 🌿', 'Deine Pflanze wacht auf!', 'Kleiner Spross, großes Potential!'],
    50:  ['Blätter sprießen! 🍃', 'Halbzeit — die Knospe naht!', 'Deine Pflanze bekommt Form!'],
    75:  ['Die Knospe schwillt an! 🌸', 'Fast! Noch ein paar Gramm bis zur Blüte!', 'Gleich erblüht sie...'],
    100: ['Heute eine Blume geerntet! 🌺', 'Wunderschön! Dein Garten wächst!', 'Volle Blüte — du bist unschlagbar! ✨'],
  },
};

const en: Translations = {
  lang: 'en',
  locale: 'en-GB',

  onboarding: {
    headline: "Let's bloom! 🌸",
    subtitle: 'Every day you reach your protein goal,\na new flower grows in your garden.',
    goalLabel: '✨ Your daily goal ✨',
    goalUnit: 'Protein per day',
    goalNote: 'Goal can be changed anytime 💕',
    startButton: 'Create garden 🌱',
  },

  today: {
    greeting: 'Hello! 🌸',
    mealsTitle: "Today's meals",
    addMeal: 'Add meal',
    totalGrams: 'g',
  },

  addSheet: {
    title: 'Add meal 🍽️',
    tabSearch: '🔍 Search',
    tabScan: '📷 Scan',
    foodLabel: 'Food',
    foodPlaceholder: 'e.g. Chicken breast, Cottage cheese…',
    proteinLabel: 'Protein / 100g',
    portionLabel: 'Portion (g)',
    addButton: 'Add 🌸',
    cancelButton: 'Cancel',
    scanHint: 'Hold the barcode inside the frame',
    scanLoading: 'Searching product…',
    proteinSuffix: 'Protein ✨',
    notFound: (barcode) => `Barcode ${barcode} not found in database. Please enter manually.`,
  },

  search: {
    loading: 'Searching…',
    unknownProduct: 'Unknown product',
  },

  camera: {
    denied: 'Camera access denied. Please allow camera access in settings.',
    failed: 'Camera could not be started.',
    starting: 'Starting camera…',
  },

  history: {
    title: 'My Garden 🌻',
    noFlowers: 'No flowers yet — start today! 🌱',
    flowers: (n) => `${n} flower${n !== 1 ? 's' : ''} collected 💕`,
    record: (n) => `Record: ${n} days`,
  },

  badges: {
    title: 'Achievements 🏅',
    empty: 'Your journey begins now! ✨',
    progress: (n, total) => `${n} of ${total} unlocked 💕`,
    locked: '🔒',
    newBadge: 'New Badge! ✨',
    definitions: {
      'first-log':  { title: 'First Seed',    description: 'First meal logged' },
      'first-goal': { title: 'First Bloom',   description: 'Daily goal reached for the first time' },
      'streak-3':   { title: 'Mini Bouquet',  description: '3 flowers collected in a row' },
      'streak-7':   { title: 'Weekly Bouquet',description: '7 flowers collected' },
      'streak-30':  { title: 'Full Garden',   description: '30 flowers — your garden is blooming!' },
      'century':    { title: 'Protein Pro',   description: '100g protein in a single day' },
      'comeback':   { title: 'Fresh Start',   description: 'Started again after a break' },
    },
  },

  celebration: {
    title: 'Flower harvested!',
    subtitle: 'Daily goal reached 💕',
    hint: 'Tap to continue',
  },

  streak: {
    day: (n) => n === 1 ? 'day' : 'days',
  },

  nav: {
    today: 'Today',
    garden: 'Garden',
    badges: 'Badges',
  },

  motivational: {
    0:   ['Your seed is waiting... plant something! 🌱', 'Everything starts with the first gram.', 'Time to grow!'],
    25:  ['First sprout appears! 🌿', 'Your plant is waking up!', 'Little sprout, big potential!'],
    50:  ['Leaves are sprouting! 🍃', 'Halfway — the bud is near!', 'Your plant is taking shape!'],
    75:  ['The bud is swelling! 🌸', 'Almost! Just a few more grams to bloom!', 'About to blossom...'],
    100: ["Today's flower harvested! 🌺", 'Beautiful! Your garden grows!', "Full bloom — you're unstoppable! ✨"],
  },
};

const hu: Translations = {
  lang: 'hu',
  locale: 'hu-HU',

  onboarding: {
    headline: 'Virágozzunk! 🌸',
    subtitle: 'Minden nap, amelyen eléred a fehérjecélodat,\negy új virág nő a kertedben.',
    goalLabel: '✨ Napi célod ✨',
    goalUnit: 'Fehérje naponta',
    goalNote: 'A cél bármikor módosítható 💕',
    startButton: 'Kert létrehozása 🌱',
  },

  today: {
    greeting: 'Szia! 🌸',
    mealsTitle: 'Mai étkezések',
    addMeal: 'Étkezés hozzáadása',
    totalGrams: 'g',
  },

  addSheet: {
    title: 'Étkezés hozzáadása 🍽️',
    tabSearch: '🔍 Keresés',
    tabScan: '📷 Szkennelés',
    foodLabel: 'Étel',
    foodPlaceholder: 'pl. Csirkemell, Túró…',
    proteinLabel: 'Fehérje / 100g',
    portionLabel: 'Adag (g)',
    addButton: 'Hozzáadás 🌸',
    cancelButton: 'Mégse',
    scanHint: 'Tartsd a vonalkódot a keretbe',
    scanLoading: 'Termék keresése…',
    proteinSuffix: 'Fehérje ✨',
    notFound: (barcode) => `A(z) ${barcode} vonalkód nincs az adatbázisban. Kérjük, adja meg kézzel.`,
  },

  search: {
    loading: 'Keresés…',
    unknownProduct: 'Ismeretlen termék',
  },

  camera: {
    denied: 'Kameraengedély megtagadva. Kérjük, engedélyezze a kamera-hozzáférést a beállításokban.',
    failed: 'A kamera nem indítható el.',
    starting: 'Kamera indítása…',
  },

  history: {
    title: 'Kertem 🌻',
    noFlowers: 'Még nincs virág — kezdj ma! 🌱',
    flowers: (n) => `${n} virág összegyűjtve 💕`,
    record: (n) => `Rekord: ${n} nap`,
  },

  badges: {
    title: 'Teljesítmények 🏅',
    empty: 'Az utad most kezdődik! ✨',
    progress: (n, total) => `${n} / ${total} feloldva 💕`,
    locked: '🔒',
    newBadge: 'Új jutalom! ✨',
    definitions: {
      'first-log':  { title: 'Első mag',       description: 'Első étkezés naplózva' },
      'first-goal': { title: 'Első virágzás',  description: 'Napi cél először elérve' },
      'streak-3':   { title: 'Mini csokor',    description: '3 virág egymás után gyűjtve' },
      'streak-7':   { title: 'Heti csokor',    description: '7 virág összegyűjtve' },
      'streak-30':  { title: 'Teljes kert',    description: '30 virág — a kerted virágzik!' },
      'century':    { title: 'Fehérje-profi',  description: '100g fehérje egyetlen nap alatt' },
      'comeback':   { title: 'Új kezdet',      description: 'Szünet után újrakezdte' },
    },
  },

  celebration: {
    title: 'Virág betakarítva!',
    subtitle: 'Napi cél elérve 💕',
    hint: 'Koppints a folytatáshoz',
  },

  streak: {
    day: () => 'nap',
  },

  nav: {
    today: 'Ma',
    garden: 'Kert',
    badges: 'Jutalmak',
  },

  motivational: {
    0:   ['A magod vár... ültesd el! 🌱', 'Minden az első grammal kezdődik.', 'Ideje növekedni!'],
    25:  ['Az első hajtás megjelenik! 🌿', 'A növényed ébred!', 'Kis hajtás, nagy lehetőség!'],
    50:  ['Levelek szikráznak! 🍃', 'Félúton — a bimbó közeledik!', 'A növényed formát ölt!'],
    75:  ['A bimbó dagad! 🌸', 'Majdnem! Még néhány gramm a virágzásig!', 'Mindjárt kinyílik...'],
    100: ['Ma egy virágot szedtünk! 🌺', 'Gyönyörű! A kerted nő!', 'Teljes virágzás — te vagy a legjobb! ✨'],
  },
};

export const TRANSLATIONS: Record<Lang, Translations> = { de, en, hu };

function detectLang(): Lang {
  const stored = localStorage.getItem('pt_language') as Lang | null;
  if (stored && stored in TRANSLATIONS) return stored;
  const nav = navigator.language.slice(0, 2).toLowerCase();
  if (nav === 'de') return 'de';
  if (nav === 'hu') return 'hu';
  return 'en';
}

export { detectLang };
