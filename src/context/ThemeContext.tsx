import React, { createContext, useContext, useEffect, useState } from 'react';

interface ThemeCtx { isDark: boolean; toggleDark: () => void; }
const Ctx = createContext<ThemeCtx>({ isDark: false, toggleDark: () => {} });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(() => localStorage.getItem('pt_dark') === '1');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('pt_dark', isDark ? '1' : '0');
  }, [isDark]);

  return (
    <Ctx.Provider value={{ isDark, toggleDark: () => setIsDark(d => !d) }}>
      {children}
    </Ctx.Provider>
  );
}

export function useTheme() { return useContext(Ctx); }
