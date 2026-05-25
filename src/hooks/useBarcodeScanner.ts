import { useRef, useState, useCallback } from 'react';
import { BrowserMultiFormatReader } from '@zxing/library';

export function useBarcodeScanner() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const readerRef = useRef<BrowserMultiFormatReader | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [lastResult, setLastResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const startScan = useCallback(async () => {
    setError(null);
    setLastResult(null);
    try {
      const reader = new BrowserMultiFormatReader();
      readerRef.current = reader;
      setIsScanning(true);
      await reader.decodeFromVideoDevice(
        null,
        videoRef.current!,
        (result, err) => {
          if (result) {
            setLastResult(result.getText());
          }
          if (err && !(err.name === 'NotFoundException')) {
            // NotFoundException fires every frame with no barcode — ignore it
          }
        }
      );
    } catch (e: unknown) {
      setIsScanning(false);
      if (e instanceof Error && e.name === 'NotAllowedError') {
        setError('Kamerazugriff verweigert. Bitte erlaube den Kamerazugriff in den Einstellungen.');
      } else {
        setError('Kamera konnte nicht gestartet werden.');
      }
    }
  }, []);

  const stopScan = useCallback(() => {
    readerRef.current?.reset();
    readerRef.current = null;
    setIsScanning(false);
  }, []);

  return { videoRef, isScanning, startScan, stopScan, lastResult, error };
}
