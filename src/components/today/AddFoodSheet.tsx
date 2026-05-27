import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useAuth } from '../../context/AuthContext';
import { useT } from '../../context/LanguageContext';
import { ManualEntryForm } from './ManualEntryForm';
import { BarcodeScanner } from './BarcodeScanner';
import { fetchByBarcode, extractProtein } from '../../lib/openFoodFacts';
import type { MealType, FoodEntry } from '../../types';

interface Props {
  open: boolean;
  onClose: () => void;
  onAdd: (entry: Omit<FoodEntry, 'id' | 'timestamp'>) => void;
  recentFoods: Array<{ name: string; protein: number; mealType: MealType }>;
  editEntry?: FoodEntry;
}

type Tab = 'search' | 'scan';
const MEAL_TYPES: MealType[] = ['breakfast', 'lunch', 'dinner', 'snack'];

function guessMealType(): MealType {
  const h = new Date().getHours();
  if (h >= 5  && h < 10) return 'breakfast';
  if (h >= 11 && h < 15) return 'lunch';
  if (h >= 17 && h < 22) return 'dinner';
  return 'snack';
}

export function AddFoodSheet({ open, onClose, onAdd, recentFoods, editEntry }: Props) {
  const t = useT();
  const { user } = useAuth();
  const uid = user?.uid ?? '';

  const [tab, setTab] = useState<Tab>('search');
  const [mealType, setMealType] = useState<MealType>(guessMealType);
  const [scannedName, setScannedName] = useState('');
  const [scannedProtein, setScannedProtein] = useState<number | undefined>();
  const [scannedBarcode, setScannedBarcode] = useState<string | null>(null);
  const [contribBarcode, setContribBarcode] = useState<string | null>(null);
  const [scanLoading, setScanLoading] = useState(false);
  const [scanError, setScanError] = useState<string | null>(null);

  // Track whether we pushed a history state for back-button support
  const pushedHistory = useRef(false);

  useEffect(() => {
    if (open) {
      // Initialize from editEntry or defaults
      setTab('search');
      setMealType(editEntry?.mealType ?? guessMealType());
      setScannedName(editEntry?.name ?? '');
      setScannedProtein(editEntry?.protein);
      setScannedBarcode(null);
      setContribBarcode(null);
      setScanError(null);

      // Push a synthetic history entry so the OS back button closes the sheet
      // instead of navigating away. When the sheet closes programmatically
      // (overlay tap, Cancel) the cleanup calls history.go(-1) to discard it.
      history.pushState({ __sheet: true }, '');
      pushedHistory.current = true;

      function handlePop() {
        pushedHistory.current = false;
        onClose();
      }
      window.addEventListener('popstate', handlePop);
      return () => {
        window.removeEventListener('popstate', handlePop);
        if (pushedHistory.current) {
          pushedHistory.current = false;
          history.go(-1);
        }
      };
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  async function handleBarcode(barcode: string) {
    setScanLoading(true);
    setScanError(null);
    const product = await fetchByBarcode(barcode);
    setScanLoading(false);
    if (!product || !product.product_name) {
      setScanError(t.addSheet.notFound(barcode));
      setScannedBarcode(barcode);
      setTab('search');
      return;
    }
    const protein = extractProtein(product);
    setScannedName(product.product_name);
    setScannedProtein(protein);
    setScannedBarcode(null);
    setContribBarcode(protein === 0 ? barcode : null);
    setTab('search');
  }

  function handleAdd(name: string, protein: number, proteinPer100g: number) {
    if (scannedBarcode && uid) {
      setDoc(doc(db, 'users', uid, 'customBarcodes', scannedBarcode), {
        name, proteinPer100g, savedAt: Date.now(),
      });
    }
    onAdd({ name, protein, mealType });
    onClose();
  }

  const isEdit = !!editEntry;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-40"
            style={{ background: 'rgba(61,34,85,0.35)', backdropFilter: 'blur(3px)' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed bottom-0 left-0 right-0 z-50 max-h-[92vh] overflow-y-auto"
            style={{ background: 'var(--pt-card)', borderRadius: '2rem 2rem 0 0', boxShadow: '0 -8px 40px rgba(196,168,255,0.25)' }}
            initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="w-10 h-1.5 rounded-full mx-auto mt-3 mb-4" style={{ background: 'var(--pt-border)' }} />
            <div className="px-4 pb-10">
              <h2 className="text-lg font-black mb-3" style={{ color: 'var(--pt-text)' }}>
                {isEdit ? t.addSheet.editTitle : t.addSheet.title}
              </h2>

              {/* Meal type picker — 2×2 grid with emoji + label */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                {MEAL_TYPES.map(m => {
                  const label = t.mealTypes[m];
                  const [emoji, ...words] = label.split(' ');
                  return (
                    <motion.button
                      key={m}
                      onClick={() => setMealType(m)}
                      whileTap={{ scale: 0.94 }}
                      className="py-2.5 px-3 rounded-2xl flex items-center gap-2"
                      style={{
                        background: mealType === m ? 'linear-gradient(135deg,#FFE4EC,#EDE4FF)' : 'var(--pt-surface)',
                        border: mealType === m ? '2px solid var(--pt-text-sec)' : '2px solid transparent',
                        color: mealType === m ? 'var(--pt-accent)' : 'var(--pt-text-muted)',
                      }}
                    >
                      <span style={{ fontSize: '1.1rem' }}>{emoji}</span>
                      <span className="text-xs font-black">{words.join(' ')}</span>
                    </motion.button>
                  );
                })}
              </div>

              {/* Recent foods — one-tap quick-add (only when not editing) */}
              {!isEdit && recentFoods.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs font-black uppercase tracking-wide mb-2" style={{ color: 'var(--pt-text-sec)' }}>
                    {t.addSheet.recentFoods}
                  </p>
                  <div className="flex flex-col gap-2">
                    {recentFoods.slice(0, 5).map(food => (
                      <motion.button
                        key={food.name}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => {
                          onAdd({ name: food.name, protein: food.protein, mealType });
                          onClose();
                        }}
                        className="flex items-center justify-between px-4 py-2.5 rounded-2xl"
                        style={{ background: 'var(--pt-surface)', border: '1.5px solid var(--pt-border)' }}
                      >
                        <span className="text-sm font-bold" style={{ color: 'var(--pt-text)' }}>{food.name}</span>
                        <span className="text-sm font-black" style={{ color: 'var(--pt-accent)' }}>{food.protein}g</span>
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab switcher — hidden in edit mode */}
              {!isEdit && (
                <div className="flex rounded-3xl p-1 mb-4" style={{ background: 'var(--pt-border)' }}>
                  {(['search', 'scan'] as Tab[]).map(tabKey => (
                    <button key={tabKey} onClick={() => setTab(tabKey)}
                      className="flex-1 py-2 rounded-2xl text-sm font-black transition-all"
                      style={tab === tabKey
                        ? { background: 'var(--pt-card)', color: 'var(--pt-accent)', boxShadow: '0 2px 8px rgba(196,168,255,0.3)' }
                        : { color: 'var(--pt-text-sec)' }}
                    >
                      {tabKey === 'search' ? t.addSheet.tabSearch : t.addSheet.tabScan}
                    </button>
                  ))}
                </div>
              )}

              {scanError && (
                <div className="mb-3 rounded-2xl px-4 py-3 text-sm font-semibold"
                  style={{ background: '#FFF4DC', border: '2px solid #FFE4A0', color: '#B87840' }}>
                  {scanError}
                </div>
              )}

              {scannedBarcode && (
                <div className="mb-3 rounded-2xl px-4 py-2 text-xs font-semibold"
                  style={{ background: '#F0FFF8', border: '2px solid #A8EED4', color: '#4CAF85' }}>
                  {t.addSheet.barcodeSaved}
                </div>
              )}

              {(tab === 'search' || isEdit) && (
                <ManualEntryForm
                  key={editEntry?.id ?? scannedName}
                  initialName={scannedName}
                  initialProtein={scannedProtein}
                  contributeBarcode={contribBarcode ?? undefined}
                  onAdd={handleAdd}
                  onCancel={onClose}
                  submitLabel={isEdit ? t.addSheet.saveButton : t.addSheet.addButton}
                />
              )}

              {tab === 'scan' && !isEdit && (
                <div>
                  {scanLoading ? (
                    <div className="text-center py-8 animate-pulse">
                      <p className="text-4xl mb-2">🔍</p>
                      <p className="text-sm font-semibold" style={{ color: 'var(--pt-text-sec)' }}>
                        {t.addSheet.scanLoading}
                      </p>
                    </div>
                  ) : (
                    <BarcodeScanner active={tab === 'scan' && open} onBarcode={handleBarcode} />
                  )}
                  <p className="text-center text-xs mt-3 font-medium" style={{ color: 'var(--pt-text-muted)' }}>
                    {t.addSheet.scanHint}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
