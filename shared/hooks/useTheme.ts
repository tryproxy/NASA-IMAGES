'use client';

import { useState } from 'react';

export const useTheme = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  const toggleTheme = () =>
    theme === 'dark' ? setTheme('light') : setTheme('dark');

  return { theme, toggleTheme };
};
