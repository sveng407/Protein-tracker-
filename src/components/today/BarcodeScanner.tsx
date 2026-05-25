import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useBarcodeScanner } from '../../hooks/useBarcodeScanner';

interface Props {
  onBarcode: (barcode: string) => void;
  active: boolean;
}

export function BarcodeScanner({ onBarcode, active }: Props) {
  const { videoRef, isScanning, startScan, stopScan, lastResult, error } = useBarcodeScanner();

  useEffect(() => {
    if (active) startScan();
    else stopScan();
    return () => stopScan();
  }, [active]);

  useEffect(() => {
    if (lastResult) {
      stopScan();
      onBarcode(lastResult);
    }
  }, [lastResult]);

  if (error) {
    return (
      <div className="bg-red-50 rounded-xl p-4 text-center text-sm text-red-600">
        <p className="text-2xl mb-2">📵</p>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden">
      <video ref={videoRef} className="w-full h-full object-cover" playsInline muted />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative w-2/3 h-1/2 border-2 border-white rounded-lg">
          <span className="absolute -top-1 -left-1 w-4 h-4 border-t-4 border-l-4 border-green-400 rounded-tl" />
          <span className="absolute -top-1 -right-1 w-4 h-4 border-t-4 border-r-4 border-green-400 rounded-tr" />
          <span className="absolute -bottom-1 -left-1 w-4 h-4 border-b-4 border-l-4 border-green-400 rounded-bl" />
          <span className="absolute -bottom-1 -right-1 w-4 h-4 border-b-4 border-r-4 border-green-400 rounded-br" />
        </div>
        {isScanning && (
          <motion.div
            className="absolute w-2/3 h-0.5 bg-green-400 opacity-80"
            animate={{ y: ['-100%', '100%'] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
          />
        )}
      </div>
      {!isScanning && !error && (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-white text-sm animate-pulse">Kamera wird gestartet…</p>
        </div>
      )}
    </div>
  );
}
