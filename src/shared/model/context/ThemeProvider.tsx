'use client';

import { useEffect } from 'react';
import { ThemeContext } from './useThemeContext';
import { useTheme } from '@/shared/hooks/useTheme';

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);
  return <ThemeContext value={{ theme, toggleTheme }}>{children}</ThemeContext>;
};
