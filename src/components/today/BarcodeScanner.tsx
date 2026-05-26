import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useBarcodeScanner } from '../../hooks/useBarcodeScanner';
import { useT } from '../../context/LanguageContext';

interface Props {
  onBarcode: (barcode: string) => void;
  active: boolean;
}

export function BarcodeScanner({ onBarcode, active }: Props) {
  const { videoRef, isScanning, startScan, stopScan, lastResult, error } = useBarcodeScanner();
  const t = useT();

  useEffect(() => {
    if (active) startScan();
    else stopScan();
    return () => stopScan();
  }, [active, startScan, stopScan]);

  useEffect(() => {
    if (lastResult) {
      stopScan();
      onBarcode(lastResult);
    }
  }, [lastResult, stopScan, onBarcode]);

  if (error) {
    return (
      <div
        className="rounded-3xl p-6 text-center"
        style={{ background: '#FFF4DC', border: '2px solid #FFE4A0' }}
      >
        <p className="text-3xl mb-2">📵</p>
        <p className="text-sm font-semibold" style={{ color: '#B87840' }}>
          {error === 'denied' ? t.camera.denied : t.camera.failed}
        </p>
      </div>
    );
  }

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        aspectRatio: '4/3',
        borderRadius: '1.5rem',
        border: '2.5px solid #EDE4FF',
        background: '#1a0a2e',
      }}
    >
      <video ref={videoRef} className="w-full h-full object-cover" playsInline muted />

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="absolute inset-0" style={{ background: 'rgba(61,34,85,0.45)' }} />

        <div
          className="relative"
          style={{ width: '60%', aspectRatio: '3/2' }}
        >
          <div
            className="absolute inset-0 rounded-2xl"
            style={{ border: '2px solid rgba(196,168,255,0.6)' }}
          />
          <span className="absolute top-0 left-0 w-5 h-5 border-t-4 border-l-4 rounded-tl-xl"
            style={{ borderColor: 'var(--pt-text-sec)' }} />
          <span className="absolute top-0 right-0 w-5 h-5 border-t-4 border-r-4 rounded-tr-xl"
            style={{ borderColor: 'var(--pt-text-sec)' }} />
          <span className="absolute bottom-0 left-0 w-5 h-5 border-b-4 border-l-4 rounded-bl-xl"
            style={{ borderColor: 'var(--pt-text-sec)' }} />
          <span className="absolute bottom-0 right-0 w-5 h-5 border-b-4 border-r-4 rounded-br-xl"
            style={{ borderColor: 'var(--pt-text-sec)' }} />

          {isScanning && (
            <motion.div
              className="absolute left-0 right-0 h-0.5 rounded-full"
              style={{ background: 'linear-gradient(to right, transparent, var(--pt-grad-from), var(--pt-grad-to), var(--pt-grad-from), transparent)' }}
              animate={{ y: ['-20px', '40px'] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
            />
          )}
        </div>
      </div>

      {!isScanning && !error && (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-sm font-semibold animate-pulse" style={{ color: 'var(--pt-border)' }}>
            {t.camera.starting}
          </p>
        </div>
      )}
    </div>
  );
}
