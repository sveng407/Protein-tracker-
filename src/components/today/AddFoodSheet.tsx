import { useState, useEffect } from 'react';
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
  recentFoods: string[];
}

type Tab = 'search' | 'scan';
const MEAL_TYPES: MealType[] = ['breakfast', 'lunch', 'dinner', 'snack'];
const MEAL_EMOJI: Record<MealType, string> = {
  breakfast: '🌅', lunch: '🌞', dinner: '🌙', snack: '🍿',
};

function guessMealType(): MealType {
  const h = new Date().getHours();
  if (h >= 5  && h < 10) return 'breakfast';
  if (h >= 11 && h < 15) return 'lunch';
  if (h >= 17 && h < 22) return 'dinner';
  return 'snack';
}

export function AddFoodSheet({ open, onClose, onAdd, recentFoods }: Props) {
  const t = useT();
  const { user } = useAuth();
  const uid = user?.uid ?? '';

  const [tab, setTab] = useState<Tab>('search');
  const [mealType, setMealType] = useState<MealType>(guessMealType);
  const [scannedName, setScannedName] = useState('');
  const [scannedProtein, setScannedProtein] = useState<number | undefined>();
  const [scannedBarcode, setScannedBarcode] = useState<string | null>(null);
  const [scanLoading, setScanLoading] = useState(false);
  const [scanError, setScanError] = useState<string | null>(null);
  const [chipKey, setChipKey] = useState(0);
  const [prefillName, setPrefillName] = useState('');

  useEffect(() => {
    if (!open) {
      setTab('search');
      setMealType(guessMealType());
      setScannedName('');
      setScannedProtein(undefined);
      setScannedBarcode(null);
      setScanError(null);
      setPrefillName('');
    }
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
    setScannedName(product.product_name);
    setScannedProtein(extractProtein(product));
    setScannedBarcode(null);
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

  function handleChipClick(name: string) {
    setPrefillName(name);
    setScannedName('');
    setScannedProtein(undefined);
    setChipKey(k => k + 1);
  }

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
            style={{ background: '#FFF5FA', borderRadius: '2rem 2rem 0 0', boxShadow: '0 -8px 40px rgba(196,168,255,0.25)' }}
            initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="w-10 h-1.5 rounded-full mx-auto mt-3 mb-4" style={{ background: '#EDE4FF' }} />
            <div className="px-4 pb-10">
              <h2 className="text-lg font-black mb-3" style={{ color: '#3D2255' }}>
                {t.addSheet.title}
              </h2>

              {/* Meal type picker */}
              <div className="flex gap-2 mb-1">
                {MEAL_TYPES.map(m => (
                  <motion.button
                    key={m}
                    onClick={() => setMealType(m)}
                    whileTap={{ scale: 0.9 }}
                    className="flex-1 py-2.5 rounded-2xl flex items-center justify-center"
                    style={{
                      background: mealType === m ? 'linear-gradient(135deg,#FFE4EC,#EDE4FF)' : '#F5F0FF',
                      border: mealType === m ? '2px solid #C4A8FF' : '2px solid transparent',
                      fontSize: '1.25rem',
                    }}
                  >
                    {MEAL_EMOJI[m]}
                  </motion.button>
                ))}
              </div>
              <p className="text-xs font-black text-center mb-4" style={{ color: '#9B7BE0' }}>
                {t.mealTypes[mealType]}
              </p>

              {/* Recent foods chips */}
              {recentFoods.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs font-black uppercase tracking-wide mb-2" style={{ color: '#C4A8FF' }}>
                    {t.addSheet.recentFoods}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {recentFoods.slice(0, 6).map(name => (
                      <motion.button
                        key={name}
                        whileTap={{ scale: 0.92 }}
                        onClick={() => handleChipClick(name)}
                        className="px-3 py-1.5 rounded-2xl text-xs font-bold"
                        style={{ background: '#EDE4FF', color: '#9B7BE0', border: '1.5px solid #D4BAFF' }}
                      >
                        {name}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab switcher */}
              <div className="flex rounded-3xl p-1 mb-4" style={{ background: '#EDE4FF' }}>
                {(['search', 'scan'] as Tab[]).map(tabKey => (
                  <button key={tabKey} onClick={() => setTab(tabKey)}
                    className="flex-1 py-2 rounded-2xl text-sm font-black transition-all"
                    style={tab === tabKey
                      ? { background: 'white', color: '#9B7BE0', boxShadow: '0 2px 8px rgba(196,168,255,0.3)' }
                      : { color: '#C4A8FF' }}
                  >
                    {tabKey === 'search' ? t.addSheet.tabSearch : t.addSheet.tabScan}
                  </button>
                ))}
              </div>

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

              {tab === 'search' && (
                <ManualEntryForm
                  key={chipKey}
                  initialName={prefillName || scannedName}
                  initialProtein={scannedProtein}
                  onAdd={handleAdd}
                  onCancel={onClose}
                />
              )}

              {tab === 'scan' && (
                <div>
                  {scanLoading ? (
                    <div className="text-center py-8 animate-pulse">
                      <p className="text-4xl mb-2">🔍</p>
                      <p className="text-sm font-semibold" style={{ color: '#C4A8FF' }}>
                        {t.addSheet.scanLoading}
                      </p>
                    </div>
                  ) : (
                    <BarcodeScanner active={tab === 'scan' && open} onBarcode={handleBarcode} />
                  )}
                  <p className="text-center text-xs mt-3 font-medium" style={{ color: '#C4A8CC' }}>
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
