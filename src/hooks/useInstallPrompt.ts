import { useState, useEffect } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

declare global {
  interface Window {
    __pwaPrompt?: BeforeInstallPromptEvent;
  }
}

export type InstallState =
  | 'installed'  // running as standalone PWA
  | 'native'     // Chrome/Android – prompt available, one tap to install
  | 'android'    // Android browser but no prompt yet – show menu instructions
  | 'ios'        // Safari iOS – show Share → Add to Home Screen guide
  | 'unsupported'; // desktop/other – hide section

function isStandalone() {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (navigator as Navigator & { standalone?: boolean }).standalone === true
  );
}

function isIOS() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) &&
    !(window as Window & { MSStream?: unknown }).MSStream;
}

function isAndroid() {
  return /Android/.test(navigator.userAgent);
}

export function useInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(
    window.__pwaPrompt ?? null
  );
  const [installState, setInstallState] = useState<InstallState>(() => {
    if (isStandalone()) return 'installed';
    if (window.__pwaPrompt)  return 'native';
    if (isIOS())             return 'ios';
    if (isAndroid())         return 'android';
    return 'unsupported';
  });

  useEffect(() => {
    // Already resolved at init time
    if (installState !== 'unsupported' && installState !== 'android') return;

    function onPromptReady(e: Event) {
      const prompt = (e as CustomEvent).detail as BeforeInstallPromptEvent;
      setDeferredPrompt(prompt);
      setInstallState('native');
    }

    // Also listen for the raw event (belt-and-suspenders)
    function onBeforeInstall(e: Event) {
      e.preventDefault();
      window.__pwaPrompt = e as BeforeInstallPromptEvent;
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setInstallState('native');
    }

    window.addEventListener('pwa-prompt-ready', onPromptReady);
    window.addEventListener('beforeinstallprompt', onBeforeInstall);
    return () => {
      window.removeEventListener('pwa-prompt-ready', onPromptReady);
      window.removeEventListener('beforeinstallprompt', onBeforeInstall);
    };
  }, [installState]);

  async function triggerInstall() {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setInstallState('installed');
      setDeferredPrompt(null);
      window.__pwaPrompt = undefined;
    }
  }

  return { installState, triggerInstall };
}
