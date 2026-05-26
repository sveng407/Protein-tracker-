import React, { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'default' | 'dark' | 'carley' | 'vera';

interface ThemeCtx {
  theme: Theme;
  setTheme: (t: Theme) => void;
  isDark: boolean;
}

const THEMES: Theme[] = ['default', 'dark', 'carley', 'vera'];
const Ctx = createContext<ThemeCtx>({ theme: 'default', setTheme: () => {}, isDark: false });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    const saved = localStorage.getItem('pt_theme') as Theme | null;
    if (saved && THEMES.includes(saved)) return saved;
    if (localStorage.getItem('pt_dark') === '1') return 'dark';
    return 'default';
  });

  useEffect(() => {
    const el = document.documentElement;
    el.classList.remove('dark', 'carley', 'vera');
    if (theme !== 'default') el.classList.add(theme);
    localStorage.setItem('pt_theme', theme);
  }, [theme]);

  return (
    <Ctx.Provider value={{ theme, setTheme: setThemeState, isDark: theme === 'dark' }}>
      {children}
    </Ctx.Provider>
  );
}

export function useTheme() { return useContext(Ctx); }
