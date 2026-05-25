import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ManualEntryForm } from './ManualEntryForm';
import { BarcodeScanner } from './BarcodeScanner';
import { fetchByBarcode, extractProtein } from '../../lib/openFoodFacts';
import { useT } from '../../context/LanguageContext';

interface Props {
  open: boolean;
  onClose: () => void;
  onAdd: (name: string, protein: number) => void;
}

type Tab = 'search' | 'scan';

export function AddFoodSheet({ open, onClose, onAdd }: Props) {
  const t = useT();
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
      setScanError(t.addSheet.notFound(barcode));
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
            className="fixed inset-0 z-40"
            style={{ background: 'rgba(61,34,85,0.35)', backdropFilter: 'blur(3px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed bottom-0 left-0 right-0 z-50 max-h-[90vh] overflow-y-auto"
            style={{ background: '#FFF5FA', borderRadius: '2rem 2rem 0 0', boxShadow: '0 -8px 40px rgba(196,168,255,0.25)' }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="w-10 h-1.5 rounded-full mx-auto mt-3 mb-4" style={{ background: '#EDE4FF' }} />
            <div className="px-4 pb-8">
              <h2 className="text-lg font-black mb-4" style={{ color: '#3D2255' }}>
                {t.addSheet.title}
              </h2>

              <div className="flex rounded-3xl p-1 mb-4" style={{ background: '#EDE4FF' }}>
                {(['search', 'scan'] as Tab[]).map(tabKey => (
                  <button key={tabKey} onClick={() => setTab(tabKey)}
                    className="flex-1 py-2 rounded-2xl text-sm font-black transition-all"
                    style={tab === tabKey
                      ? { background: 'white', color: '#9B7BE0', boxShadow: '0 2px 8px rgba(196,168,255,0.3)' }
                      : { color: '#C4A8FF' }
                    }
                  >
                    {tabKey === 'search' ? t.addSheet.tabSearch : t.addSheet.tabScan}
                  </button>
                ))}
              </div>

              {scanError && (
                <div className="mb-3 rounded-2xl px-4 py-3 text-sm font-semibold"
                  style={{ background: '#FFF4DC', border: '2px solid #FFE4A0', color: '#B87840' }}
                >
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
