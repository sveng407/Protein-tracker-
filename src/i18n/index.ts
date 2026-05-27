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
    greetingPrefix: string;
    greeting: string;
    mealsTitle: string;
    addMeal: string;
    totalGrams: string;
    noEntries: string;
    noEntriesHint: string;
    dateToday: string;
    dateYesterday: string;
    dateTomorrow: string;
  };

  mealTypes: {
    breakfast: string;
    lunch: string;
    dinner: string;
    snack: string;
  };

  settings: {
    title: string;
    language: string;
    goal: string;
    goalHint: string;
    account: string;
    signOut: string;
    deleteAccount: string;
    deleteConfirm: string;
    deleteCancel: string;
    deleteConfirmBtn: string;
    legalSection: string;
    legalImpressum: string;
    legalDatenschutz: string;
    legalAgb: string;
    savedLabel: string;
    install: string;
    installButton: string;
    installDone: string;
    installIosStep1: string;
    installIosStep2: string;
    installIosStep3: string;
    installAndroidStep1: string;
    installAndroidStep2: string;
    darkMode: string;
    darkModeOn: string;
    darkModeOff: string;
    themeSection: string;
    themeDefault: string;
    themeDark: string;
    offCredit: string;
    appVersion: string;
  };

  addSheet: {
    title: string;
    editTitle: string;
    tabSearch: string;
    tabScan: string;
    foodLabel: string;
    foodPlaceholder: string;
    proteinLabel: string;
    portionLabel: string;
    addButton: string;
    saveButton: string;
    cancelButton: string;
    scanHint: string;
    scanLoading: string;
    proteinSuffix: string;
    notFound: (barcode: string) => string;
    recentFoods: string;
    barcodeSaved: string;
    contributeLabel: string;
    contributeHint: string;
  };

  search: {
    loading: string;
    unknownProduct: string;
    noResults: string;
    addToOff: string;
  };

  camera: {
    denied: string;
    failed: string;
    starting: string;
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
    settings: string;
  };

  history: {
    title: string;
    noFlowers: string;
    flowers: (n: number) => string;
    record: (n: number) => string;
    gardenEmpty: string;
    gardenEmptyHint: string;
    lockedTitle: (n: number) => string;
    lockedHint: string;
  };

  motivational: Record<number, string[]>;

  installBanner: {
    title: string;
    perks: string[];
    installBtn: string;
    iosBtn: string;
    dismiss: string;
    iosSheet: {
      title: string;
      steps: string[];
    };
  };

  auth: {
    headline: string;
    subtitle: string;
    signInButton: string;
    signOutButton: string;
    loading: string;
    error: string;
    consentPrivacy: string;
    consentPrivacyLink: string;
    consentTerms: string;
    consentTermsLink: string;
    consentHint: string;
    consentAlreadyGiven: string;
    webViewTitle: string;
    webViewHint: string;
    webViewOpen: string;
  };

  pro: {
    title: string;
    subtitle: string;
    perk1: string;
    perk2: string;
    perk3: string;
    perk4: string;
    price: string;
    upgradeBtn: string;
    dismiss: string;
    checkoutTitle: string;
    cardNumber: string;
    expiry: string;
    cvv: string;
    cardName: string;
    coupon: string;
    payBtn: string;
    processing: string;
    successMsg: string;
    settingsSection: string;
    activeUntil: (date: string) => string;
    cancelBtn: string;
    cancelConfirm: string;
    cancelConfirmBtn: string;
    back: string;
    freeHint: string;
    unlockBtn: string;
    statusPro: string;
    statusFree: string;
  };
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
    greetingPrefix: 'Hallo',
    greeting: 'Hallo! 🌸',
    mealsTitle: 'Mahlzeiten',
    addMeal: 'Mahlzeit hinzufügen',
    totalGrams: 'g',
    noEntries: 'Noch nichts eingetragen',
    noEntriesHint: 'Tippe ＋ um eine Mahlzeit hinzuzufügen!',
    dateToday: 'Heute',
    dateYesterday: 'Gestern',
    dateTomorrow: 'Morgen',
  },

  mealTypes: {
    breakfast: '🌅 Frühstück',
    lunch:     '🌞 Mittagessen',
    dinner:    '🌙 Abendessen',
    snack:     '🍿 Snack',
  },

  settings: {
    title:          'Einstellungen',
    language:       'Sprache',
    goal:           'Protein-Ziel (g/Tag)',
    goalHint:       'Änderung wird sofort gespeichert',
    account:        'Account',
    signOut:        'Abmelden',
    deleteAccount:  'Account löschen',
    deleteConfirm:  'Alle Daten werden unwiderruflich gelöscht. Fortfahren?',
    deleteCancel:   'Abbrechen',
    deleteConfirmBtn: 'Löschen',
    legalSection:   'Rechtliches',
    legalImpressum:  'Impressum',
    legalDatenschutz: 'Datenschutzerklärung',
    legalAgb:        'AGB & Widerrufsrecht',
    savedLabel:     'Gespeichert ✓',
    install:             'App installieren',
    installButton:       'Zum Home-Bildschirm hinzufügen',
    installDone:         '✓ App ist bereits installiert',
    installIosStep1:     'Tippe unten auf das Teilen-Symbol ⬆️',
    installIosStep2:     'Wähle „Zum Home-Bildschirm"',
    installIosStep3:     'Tippe „Hinzufügen" — fertig! 🌸',
    installAndroidStep1: 'Tippe oben auf ⋮ (Menü)',
    installAndroidStep2: 'Wähle „App installieren" oder „Zum Startbildschirm"',
    darkMode:            'Darstellung',
    darkModeOn:          'Dunkelmodus',
    darkModeOff:         'Hellmodus',
    themeSection:        'Design',
    themeDefault:        'Standard',
    themeDark:           'Dunkel',
    offCredit:           'Nährwertdaten: Open Food Facts',
    appVersion:          'Version',
  },

  addSheet: {
    title: 'Mahlzeit hinzufügen 🍽️',
    editTitle: 'Eintrag bearbeiten ✏️',
    tabSearch: '🔍 Suchen',
    tabScan: '📷 Scannen',
    foodLabel: 'Lebensmittel',
    foodPlaceholder: 'z.B. Hähnchenbrust, Quark…',
    proteinLabel: 'Protein / 100g',
    portionLabel: 'Portion (g)',
    addButton: 'Hinzufügen 🌸',
    saveButton: 'Speichern ✓',
    cancelButton: 'Abbrechen',
    scanHint: 'Halte den Barcode in den Rahmen',
    scanLoading: 'Produkt wird gesucht…',
    proteinSuffix: 'Protein ✨',
    notFound: (barcode) => `Barcode ${barcode} nicht in der Datenbank. Bitte manuell eingeben.`,
    recentFoods: 'Zuletzt gegessen',
    barcodeSaved: '🔗 Barcode wird gespeichert',
    contributeLabel: 'Eiweißdaten zu Open Food Facts beitragen 🌱',
    contributeHint: 'Dieses Produkt hat keine Eiweißangaben. Deine Eingabe hilft allen!',
  },

  search: {
    loading: 'Suche…',
    unknownProduct: 'Unbekanntes Produkt',
    noResults: 'Nicht gefunden – bitte manuell eingeben.',
    addToOff: 'Auf Open Food Facts hinzufügen ↗',
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
    gardenEmpty: 'Dein Garten ist noch leer',
    gardenEmptyHint: 'Erreiche dein Ziel — und pflück deine erste Blume!',
    lockedTitle: (n) => `${n} ältere Tag${n !== 1 ? 'e' : ''} gesperrt`,
    lockedHint: 'Mit Pro siehst du deinen gesamten Verlauf.',
  },

  badges: {
    title: 'Errungenschaften 🏅',
    empty: 'Deine Reise beginnt jetzt! ✨',
    progress: (n, total) => `${n} von ${total} freigeschaltet 💕`,
    locked: '🔒',
    newBadge: 'Neues Badge! ✨',
    definitions: {
      'first-log':    { title: 'Erster Samen',     description: 'Erste Mahlzeit geloggt' },
      'first-goal':   { title: 'Erste Blüte',      description: 'Tagesziel zum ersten Mal erreicht' },
      'log-10':       { title: 'Fleißige Biene',   description: '10 Mahlzeiten eingetragen' },
      'log-50':       { title: 'Profi-Logger',     description: '50 Mahlzeiten eingetragen' },
      'streak-3':     { title: 'Mini-Strauß',      description: '3 Tage Tagesziel erreicht' },
      'streak-7':     { title: 'Wochenstrauß',     description: '7 Tage in Folge' },
      'streak-14':    { title: 'Zwei-Wochen-Held', description: '14 Tage in Folge' },
      'streak-30':    { title: 'Vollgarten',       description: '30 Tage — dein Garten blüht!' },
      'perfect-week': { title: 'Perfekte Woche',   description: '7 Tage alle bei 100% des Ziels' },
      'century':      { title: 'Protein-Profi',    description: '100g Protein an einem Tag' },
      'protein-200':  { title: 'Protein-Beast',    description: '200g Protein an einem einzigen Tag' },
      'variety':      { title: 'Bunte Mahlzeiten', description: 'Alle 4 Mahlzeitentypen an einem Tag' },
      'early-bird':   { title: 'Frühaufsteher',    description: 'Frühstück vor 9 Uhr eingetragen' },
      'comeback':     { title: 'Neuanfang',        description: 'Nach einer Pause wieder gestartet' },
      'pro-member':   { title: 'Pro-Mitglied',     description: 'Auf Pro gewechselt — unbegrenzte Einträge!' },
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
    settings: 'Einstellungen',
  },

  motivational: {
    0:   ['Dein Samen wartet... pflanz was! 🌱', 'Alles beginnt mit dem ersten Gramm.', 'Zeit zum Wachsen!'],
    25:  ['Der erste Trieb zeigt sich! 🌿', 'Deine Pflanze wacht auf!', 'Kleiner Spross, großes Potential!'],
    50:  ['Blätter sprießen! 🍃', 'Halbzeit — die Knospe naht!', 'Deine Pflanze bekommt Form!'],
    75:  ['Die Knospe schwillt an! 🌸', 'Fast! Noch ein paar Gramm bis zur Blüte!', 'Gleich erblüht sie...'],
    100: ['Heute eine Blume geerntet! 🌺', 'Wunderschön! Dein Garten wächst!', 'Volle Blüte — du bist unschlagbar! ✨'],
  },

  installBanner: {
    title: 'Immer dabei — auch offline 🌸',
    perks: ['Auf dem Home-Bildschirm', 'Blitzschnell — kein Browser nötig', 'Auch ohne Internet'],
    installBtn: 'App installieren',
    iosBtn: 'Wie installiere ich?',
    dismiss: 'Später',
    iosSheet: {
      title: 'In 3 Schritten installieren',
      steps: ['Tippe unten auf ⬆️ Teilen', 'Wähle „Zum Home-Bildschirm"', 'Tippe „Hinzufügen" — fertig! 🌸'],
    },
  },

  auth: {
    headline:          'Willkommen zurück! 🌸',
    subtitle:          'Melde dich an, um deinen Garten zu pflegen.',
    signInButton:      'Mit Google anmelden',
    signOutButton:     'Abmelden',
    loading:           'Laden…',
    error:             'Anmeldung fehlgeschlagen. Bitte erneut versuchen.',
    consentPrivacy:    'Ich habe die {link} gelesen und akzeptiere sie.',
    consentPrivacyLink:'Datenschutzerklärung',
    consentTerms:      'Ich akzeptiere die {link}.',
    consentTermsLink:  'AGB',
    consentHint:       'Bitte beide Felder bestätigen, um fortzufahren.',
    consentAlreadyGiven: 'Einverständnis bereits erteilt',
    webViewTitle:      'In-App-Browser erkannt',
    webViewHint:       'Google erlaubt keine Anmeldung aus Apps heraus. Bitte öffne den Link in Safari oder Chrome.',
    webViewOpen:       '🌐 Im Browser öffnen',
  },

  pro: {
    title:          'Unbegrenzte Blüten',
    subtitle:       'Du hast dein Tageslimit erreicht',
    perk1:          'Unbegrenzte Einträge pro Tag',
    perk2:          'Vollständiger Verlauf (Free: 7 Tage)',
    perk3:          'Exklusives 👑 Pro-Badge',
    perk4:          'Alle 14 Achievements freischaltbar',
    price:          '€4,99 / Monat',
    upgradeBtn:     'Jetzt upgraden 🌸',
    dismiss:        'Vielleicht später',
    checkoutTitle:  'Pro freischalten',
    cardNumber:     'Kartennummer',
    expiry:         'Ablaufdatum',
    cvv:            'CVV',
    cardName:       'Name auf der Karte',
    coupon:         'Gutscheincode (optional)',
    payBtn:         '€4,99 jetzt zahlen',
    processing:     'Zahlung wird verarbeitet…',
    successMsg:     'Pro aktiviert! 🎉',
    settingsSection:'Abonnement',
    activeUntil:    (date) => `Aktiv bis: ${date}`,
    cancelBtn:      'Abo kündigen',
    cancelConfirm:  'Wirklich kündigen? Du verlierst sofort den Pro-Zugang.',
    cancelConfirmBtn: 'Kündigen',
    back:           'Zurück',
    freeHint:       '1 Eintrag pro Tag · Upgrade für unbegrenzt',
    unlockBtn:      'Pro freischalten',
    statusPro:      'PRO',
    statusFree:     'KOSTENLOS',
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
    greetingPrefix: 'Hi',
    greeting: 'Hello! 🌸',
    mealsTitle: 'Meals',
    addMeal: 'Add meal',
    totalGrams: 'g',
    noEntries: 'Nothing logged yet',
    noEntriesHint: 'Tap ＋ to add a meal!',
    dateToday: 'Today',
    dateYesterday: 'Yesterday',
    dateTomorrow: 'Tomorrow',
  },

  mealTypes: {
    breakfast: '🌅 Breakfast',
    lunch:     '🌞 Lunch',
    dinner:    '🌙 Dinner',
    snack:     '🍿 Snack',
  },

  settings: {
    title:          'Settings',
    language:       'Language',
    goal:           'Daily protein goal (g)',
    goalHint:       'Saved automatically',
    account:        'Account',
    signOut:        'Sign out',
    deleteAccount:  'Delete account',
    deleteConfirm:  'All data will be permanently deleted. Continue?',
    deleteCancel:   'Cancel',
    deleteConfirmBtn: 'Delete',
    legalSection:   'Legal',
    legalImpressum:  'Imprint',
    legalDatenschutz: 'Privacy Policy',
    legalAgb:        'Terms & Right of Withdrawal',
    savedLabel:     'Saved ✓',
    install:             'Install app',
    installButton:       'Add to Home Screen',
    installDone:         '✓ App already installed',
    installIosStep1:     'Tap the Share icon at the bottom ⬆️',
    installIosStep2:     'Choose "Add to Home Screen"',
    installIosStep3:     'Tap "Add" — done! 🌸',
    installAndroidStep1: 'Tap ⋮ (menu) at the top right',
    installAndroidStep2: 'Choose "Install app" or "Add to Home screen"',
    darkMode:            'Appearance',
    darkModeOn:          'Dark mode',
    darkModeOff:         'Light mode',
    themeSection:        'Appearance',
    themeDefault:        'Default',
    themeDark:           'Dark',
    offCredit:           'Nutritional data: Open Food Facts',
    appVersion:          'Version',
  },

  addSheet: {
    title: 'Add meal 🍽️',
    editTitle: 'Edit entry ✏️',
    tabSearch: '🔍 Search',
    tabScan: '📷 Scan',
    foodLabel: 'Food',
    foodPlaceholder: 'e.g. Chicken breast, Cottage cheese…',
    proteinLabel: 'Protein / 100g',
    portionLabel: 'Portion (g)',
    addButton: 'Add 🌸',
    saveButton: 'Save ✓',
    cancelButton: 'Cancel',
    scanHint: 'Hold the barcode inside the frame',
    scanLoading: 'Searching product…',
    proteinSuffix: 'Protein ✨',
    notFound: (barcode) => `Barcode ${barcode} not found in database. Please enter manually.`,
    recentFoods: 'Recently eaten',
    barcodeSaved: '🔗 Barcode will be saved',
    contributeLabel: 'Contribute protein data to Open Food Facts 🌱',
    contributeHint: 'This product has no protein data. Your entry helps everyone!',
  },

  search: {
    loading: 'Searching…',
    unknownProduct: 'Unknown product',
    noResults: 'Not found – please enter manually.',
    addToOff: 'Add to Open Food Facts ↗',
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
    gardenEmpty: 'Your garden is empty',
    gardenEmptyHint: 'Reach your goal — and pick your first flower!',
    lockedTitle: (n) => `${n} older day${n !== 1 ? 's' : ''} locked`,
    lockedHint: 'Upgrade to Pro to see your full history.',
  },

  badges: {
    title: 'Achievements 🏅',
    empty: 'Your journey begins now! ✨',
    progress: (n, total) => `${n} of ${total} unlocked 💕`,
    locked: '🔒',
    newBadge: 'New Badge! ✨',
    definitions: {
      'first-log':    { title: 'First Seed',      description: 'First meal logged' },
      'first-goal':   { title: 'First Bloom',     description: 'Daily goal reached for the first time' },
      'log-10':       { title: 'Getting Started', description: '10 meals logged' },
      'log-50':       { title: 'Pro Logger',       description: '50 meals logged' },
      'streak-3':     { title: 'Mini Bouquet',    description: '3 days goal reached in a row' },
      'streak-7':     { title: 'Weekly Bouquet',  description: '7 days in a row' },
      'streak-14':    { title: 'Two-Week Hero',   description: '14 days in a row' },
      'streak-30':    { title: 'Full Garden',     description: '30 days — your garden is blooming!' },
      'perfect-week': { title: 'Perfect Week',    description: '7 days all at 100% of goal' },
      'century':      { title: 'Protein Pro',     description: '100g protein in one day' },
      'protein-200':  { title: 'Protein Beast',   description: '200g protein in a single day' },
      'variety':      { title: 'Full Day',        description: 'All 4 meal types in a single day' },
      'early-bird':   { title: 'Early Bird',      description: 'Logged breakfast before 9am' },
      'comeback':     { title: 'Fresh Start',     description: 'Started again after a break' },
      'pro-member':   { title: 'Pro Member',      description: 'Upgraded to Pro — unlimited entries!' },
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
    settings: 'Settings',
  },

  motivational: {
    0:   ['Your seed is waiting... plant something! 🌱', 'Everything starts with the first gram.', 'Time to grow!'],
    25:  ['First sprout appears! 🌿', 'Your plant is waking up!', 'Little sprout, big potential!'],
    50:  ['Leaves are sprouting! 🍃', 'Halfway — the bud is near!', 'Your plant is taking shape!'],
    75:  ['The bud is swelling! 🌸', 'Almost! Just a few more grams to bloom!', 'About to blossom...'],
    100: ["Today's flower harvested! 🌺", 'Beautiful! Your garden grows!', "Full bloom — you're unstoppable! ✨"],
  },

  installBanner: {
    title: 'Always with you — even offline 🌸',
    perks: ['On your Home Screen', 'Lightning fast — no browser needed', 'Works without internet'],
    installBtn: 'Install app',
    iosBtn: 'How to install?',
    dismiss: 'Later',
    iosSheet: {
      title: 'Install in 3 steps',
      steps: ['Tap ⬆️ Share at the bottom', 'Choose "Add to Home Screen"', 'Tap "Add" — done! 🌸'],
    },
  },

  auth: {
    headline:          'Welcome back! 🌸',
    subtitle:          'Sign in to tend to your garden.',
    signInButton:      'Sign in with Google',
    signOutButton:     'Sign out',
    loading:           'Loading…',
    error:             'Sign-in failed. Please try again.',
    consentPrivacy:    'I have read and accept the {link}.',
    consentPrivacyLink:'Privacy Policy',
    consentTerms:      'I accept the {link}.',
    consentTermsLink:  'Terms of Service',
    consentHint:       'Please confirm both fields to continue.',
    consentAlreadyGiven: 'Previously agreed',
    webViewTitle:      'In-app browser detected',
    webViewHint:       'Google does not allow sign-in from within apps. Please open the link in Safari or Chrome.',
    webViewOpen:       '🌐 Open in browser',
  },

  pro: {
    title:          'Unlimited Blooms',
    subtitle:       'You have reached your daily limit',
    perk1:          'Unlimited entries per day',
    perk2:          'Full history (Free: 7 days only)',
    perk3:          'Exclusive 👑 Pro badge',
    perk4:          'All 14 achievements unlockable',
    price:          '€4.99 / month',
    upgradeBtn:     'Upgrade now 🌸',
    dismiss:        'Maybe later',
    checkoutTitle:  'Unlock Pro',
    cardNumber:     'Card number',
    expiry:         'Expiry date',
    cvv:            'CVV',
    cardName:       'Name on card',
    coupon:         'Coupon code (optional)',
    payBtn:         'Pay €4.99 now',
    processing:     'Processing payment…',
    successMsg:     'Pro activated! 🎉',
    settingsSection:'Subscription',
    activeUntil:    (date) => `Active until: ${date}`,
    cancelBtn:      'Cancel subscription',
    cancelConfirm:  'Really cancel? You will lose Pro access immediately.',
    cancelConfirmBtn: 'Confirm cancellation',
    back:           'Back',
    freeHint:       '1 entry per day · Upgrade for unlimited',
    unlockBtn:      'Unlock Pro',
    statusPro:      'PRO',
    statusFree:     'FREE',
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
    greetingPrefix: 'Szia',
    greeting: 'Szia! 🌸',
    mealsTitle: 'Étkezések',
    addMeal: 'Étkezés hozzáadása',
    totalGrams: 'g',
    noEntries: 'Még semmi nincs rögzítve',
    noEntriesHint: 'Nyomd meg a ＋ gombot az étkezés hozzáadásához!',
    dateToday: 'Ma',
    dateYesterday: 'Tegnap',
    dateTomorrow: 'Holnap',
  },

  mealTypes: {
    breakfast: '🌅 Reggeli',
    lunch:     '🌞 Ebéd',
    dinner:    '🌙 Vacsora',
    snack:     '🍿 Snack',
  },

  settings: {
    title:          'Beállítások',
    language:       'Nyelv',
    goal:           'Napi fehérje cél (g)',
    goalHint:       'Automatikusan mentve',
    account:        'Fiók',
    signOut:        'Kijelentkezés',
    deleteAccount:  'Fiók törlése',
    deleteConfirm:  'Minden adat véglegesen törlődik. Folytatja?',
    deleteCancel:   'Mégsem',
    deleteConfirmBtn: 'Törlés',
    legalSection:   'Jogi',
    legalImpressum:  'Impresszum',
    legalDatenschutz: 'Adatvédelmi tájékoztató',
    legalAgb:        'ÁSZF & Elállási jog',
    savedLabel:     'Mentve ✓',
    install:             'App telepítése',
    installButton:       'Kezdőképernyőre helyezés',
    installDone:         '✓ Az app már telepítve van',
    installIosStep1:     'Nyomd meg a Megosztás ikont alul ⬆️',
    installIosStep2:     'Válaszd a „Kezdőképernyőre"',
    installIosStep3:     'Nyomd meg a „Hozzáadás"-t — kész! 🌸',
    installAndroidStep1: 'Nyomd meg a ⋮ (menü) gombot',
    installAndroidStep2: 'Válaszd az „App telepítése" vagy „Kezdőképernyőre"',
    darkMode:            'Megjelenés',
    darkModeOn:          'Sötét mód',
    darkModeOff:         'Világos mód',
    themeSection:        'Megjelenés',
    themeDefault:        'Alapértelmezett',
    themeDark:           'Sötét',
    offCredit:           'Tápértékadatok: Open Food Facts',
    appVersion:          'Verzió',
  },

  addSheet: {
    title: 'Étkezés hozzáadása 🍽️',
    editTitle: 'Bejegyzés szerkesztése ✏️',
    tabSearch: '🔍 Keresés',
    tabScan: '📷 Szkennelés',
    foodLabel: 'Étel',
    foodPlaceholder: 'pl. Csirkemell, Túró…',
    proteinLabel: 'Fehérje / 100g',
    portionLabel: 'Adag (g)',
    addButton: 'Hozzáadás 🌸',
    saveButton: 'Mentés ✓',
    cancelButton: 'Mégse',
    scanHint: 'Tartsd a vonalkódot a keretbe',
    scanLoading: 'Termék keresése…',
    proteinSuffix: 'Fehérje ✨',
    notFound: (barcode) => `A(z) ${barcode} vonalkód nincs az adatbázisban. Kérjük, adja meg kézzel.`,
    recentFoods: 'Nemrég evett',
    barcodeSaved: '🔗 Vonalkód mentve lesz',
    contributeLabel: 'Fehérjeadatok hozzáadása az Open Food Facts-hoz 🌱',
    contributeHint: 'Ennek a terméknek nincs fehérjeadata. A te bejegyzésed mindenkinek segít!',
  },

  search: {
    loading: 'Keresés…',
    unknownProduct: 'Ismeretlen termék',
    noResults: 'Nem található – kérd meg kézzel.',
    addToOff: 'Hozzáadás az Open Food Facts-hoz ↗',
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
    gardenEmpty: 'A kerted még üres',
    gardenEmptyHint: 'Érd el a célodat — és szedd az első virágod!',
    lockedTitle: (n) => `${n} régebbi nap zárolva`,
    lockedHint: 'Pro-val láthatod a teljes előzményed.',
  },

  badges: {
    title: 'Teljesítmények 🏅',
    empty: 'Az utad most kezdődik! ✨',
    progress: (n, total) => `${n} / ${total} feloldva 💕`,
    locked: '🔒',
    newBadge: 'Új jutalom! ✨',
    definitions: {
      'first-log':    { title: 'Első mag',          description: 'Első étkezés naplózva' },
      'first-goal':   { title: 'Első virágzás',     description: 'Napi cél először elérve' },
      'log-10':       { title: 'Jó kezdés',         description: '10 étkezés naplózva' },
      'log-50':       { title: 'Profi naplózó',     description: '50 étkezés naplózva' },
      'streak-3':     { title: 'Mini csokor',       description: '3 napig egymás után cél elérve' },
      'streak-7':     { title: 'Heti csokor',       description: '7 nap egymás után' },
      'streak-14':    { title: 'Kéthetes hős',      description: '14 nap egymás után' },
      'streak-30':    { title: 'Teljes kert',       description: '30 nap — a kerted virágzik!' },
      'perfect-week': { title: 'Tökéletes hét',     description: '7 nap mindegyike 100%-on' },
      'century':      { title: 'Fehérje-profi',     description: '100g fehérje egy nap alatt' },
      'protein-200':  { title: 'Fehérje-szörny',    description: '200g fehérje egyetlen nap alatt' },
      'variety':      { title: 'Teljes nap',        description: 'Mind a 4 étkezéstípus egy nap' },
      'early-bird':   { title: 'Korai madár',       description: 'Reggeli 9 előtt naplózva' },
      'comeback':     { title: 'Új kezdet',         description: 'Szünet után visszatért' },
      'pro-member':   { title: 'Pro tag',            description: 'Frissítettél Próra — korlátlan bejegyzések!' },
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
    settings: 'Beállítások',
  },

  motivational: {
    0:   ['A magod vár... ültesd el! 🌱', 'Minden az első grammal kezdődik.', 'Ideje növekedni!'],
    25:  ['Az első hajtás megjelenik! 🌿', 'A növényed ébred!', 'Kis hajtás, nagy lehetőség!'],
    50:  ['Levelek szikráznak! 🍃', 'Félúton — a bimbó közeledik!', 'A növényed formát ölt!'],
    75:  ['A bimbó dagad! 🌸', 'Majdnem! Még néhány gramm a virágzásig!', 'Mindjárt kinyílik...'],
    100: ['Ma egy virágot szedtünk! 🌺', 'Gyönyörű! A kerted nő!', 'Teljes virágzás — te vagy a legjobb! ✨'],
  },

  auth: {
    headline:          'Üdv újra! 🌸',
    subtitle:          'Jelentkezz be a kertedhez.',
    signInButton:      'Bejelentkezés Google-lel',
    signOutButton:     'Kijelentkezés',
    loading:           'Betöltés…',
    error:             'Bejelentkezés sikertelen. Kérjük, próbálja újra.',
    consentPrivacy:    'Elolvastam és elfogadom az {link}.',
    consentPrivacyLink:'Adatvédelmi tájékoztatót',
    consentTerms:      'Elfogadom az {link}.',
    consentTermsLink:  'ÁSZF-et',
    consentHint:       'A folytatáshoz mindkét mezőt be kell jelölni.',
    consentAlreadyGiven: 'Hozzájárulás korábban megadva',
    webViewTitle:      'Beépített böngésző észlelve',
    webViewHint:       'A Google nem engedélyezi a bejelentkezést alkalmazásokon belül. Kérjük, nyisd meg a linket Safariban vagy Chrome-ban.',
    webViewOpen:       '🌐 Megnyitás böngészőben',
  },

  installBanner: {
    title: 'Mindig veled — offline is 🌸',
    perks: ['Kezdőképernyőn', 'Villámgyors — böngésző nélkül', 'Internet nélkül is működik'],
    installBtn: 'App telepítése',
    iosBtn: 'Hogyan telepítsem?',
    dismiss: 'Később',
    iosSheet: {
      title: '3 lépéses telepítés',
      steps: ['Nyomd meg a ⬆️ Megosztás ikont', 'Válaszd a „Kezdőképernyőre"', 'Nyomd meg a „Hozzáadás"-t — kész! 🌸'],
    },
  },

  pro: {
    title:          'Korlátlan virágok',
    subtitle:       'Elérted a napi limitedet',
    perk1:          'Korlátlan bejegyzések naponta',
    perk2:          'Teljes előzmény (Free: csak 7 nap)',
    perk3:          'Exkluzív 👑 Pro jelvény',
    perk4:          'Mind a 14 achievement feloldható',
    price:          '€4,99 / hó',
    upgradeBtn:     'Frissítés most 🌸',
    dismiss:        'Talán később',
    checkoutTitle:  'Pro feloldása',
    cardNumber:     'Kártyaszám',
    expiry:         'Lejárati dátum',
    cvv:            'CVV',
    cardName:       'Kártyán lévő név',
    coupon:         'Kuponkód (opcionális)',
    payBtn:         '€4,99 fizetése most',
    processing:     'Fizetés feldolgozása…',
    successMsg:     'Pro aktiválva! 🎉',
    settingsSection:'Előfizetés',
    activeUntil:    (date) => `Aktív eddig: ${date}`,
    cancelBtn:      'Előfizetés lemondása',
    cancelConfirm:  'Biztosan lemondod? Azonnal elveszíted a Pro hozzáférést.',
    cancelConfirmBtn: 'Lemondás',
    back:           'Vissza',
    freeHint:       '1 bejegyzés naponta · Frissíts korlátlanhoz',
    unlockBtn:      'Pro feloldása',
    statusPro:      'PRO',
    statusFree:     'INGYENES',
  },
};

export const TRANSLATIONS: Record<Lang, Translations> = { de, en, hu };

function detectLang(): Lang {
  const stored = localStorage.getItem('pt_language') as Lang | null;
  if (stored && stored in TRANSLATIONS) return stored;
  const nav = navigator.language.slice(0, 2).toLowerCase();
  if (nav === 'de') return 'de';
  if (nav === 'en') return 'en';
  return 'hu';
}

export { detectLang };
