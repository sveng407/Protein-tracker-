import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ManualEntryForm } from './ManualEntryForm';
import { BarcodeScanner } from './BarcodeScanner';
import { fetchByBarcode, extractProtein } from '../../lib/openFoodFacts';

interface Props {
  open: boolean;
  onClose: () => void;
  onAdd: (name: string, protein: number) => void;
}

type Tab = 'search' | 'scan';

export function AddFoodSheet({ open, onClose, onAdd }: Props) {
  const [tab, setTab] = useState<Tab>('search');
  const [scannedName, setScannedName] = useState('');
  const [scannedProtein, setScannedProtein] = useState<number | undefined>();
  const [scanLoading, setScanLoading] = useState(false);
  const [scanError, setScanError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      setTab('search');
      setScannedName('');
      setScannedProtein(undefined);
      setScanError(null);
    }
  }, [open]);

  async function handleBarcode(barcode: string) {
    setScanLoading(true);
    setScanError(null);
    const product = await fetchByBarcode(barcode);
    setScanLoading(false);
    if (!product || !product.product_name) {
      setScanError(`Barcode ${barcode} nicht in der Datenbank. Bitte manuell eingeben.`);
      setTab('search');
      return;
    }
    setScannedName(product.product_name);
    setScannedProtein(extractProtein(product));
    setTab('search');
  }

  function handleAdd(name: string, protein: number) {
    onAdd(name, protein);
    onClose();
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/40 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl shadow-xl max-h-[90vh] overflow-y-auto"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mt-3 mb-4" />
            <div className="px-4 pb-8">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Mahlzeit hinzufügen</h2>

              <div className="flex bg-gray-100 rounded-xl p-1 mb-4">
                {(['search', 'scan'] as Tab[]).map(t => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                      tab === t ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'
                    }`}
                  >
                    {t === 'search' ? '🔍 Suchen' : '📷 Scannen'}
                  </button>
                ))}
              </div>

              {scanError && (
                <div className="mb-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm text-amber-700">
                  {scanError}
                </div>
              )}

              {tab === 'search' && (
                <ManualEntryForm
                  initialName={scannedName}
                  initialProtein={scannedProtein}
                  onAdd={handleAdd}
                  onCancel={onClose}
                />
              )}

              {tab === 'scan' && (
                <div>
                  {scanLoading ? (
                    <div className="text-center py-8 text-gray-400 animate-pulse">
                      <p className="text-4xl mb-2">🔍</p>
                      <p className="text-sm">Produkt wird gesucht…</p>
                    </div>
                  ) : (
                    <BarcodeScanner active={tab === 'scan' && open} onBarcode={handleBarcode} />
                  )}
                  <p className="text-center text-xs text-gray-400 mt-3">
                    Halte den Barcode in den Rahmen
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
