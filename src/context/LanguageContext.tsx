import { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import { TRANSLATIONS, detectLang } from '../i18n';
import type { Lang, Translations } from '../i18n';

interface LanguageContextValue {
  lang: Lang;
  t: Translations;
  setLang: (lang: Lang) => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectLang);

  const setLang = useCallback((l: Lang) => {
    localStorage.setItem('pt_language', l);
    setLangState(l);
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, t: TRANSLATIONS[lang], setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useT(): Translations {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useT must be used inside LanguageProvider');
  return ctx.t;
}

export function useLang(): { lang: Lang; setLang: (l: Lang) => void } {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be used inside LanguageProvider');
  return { lang: ctx.lang, setLang: ctx.setLang };
}
