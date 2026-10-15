import { useState, useEffect } from 'react';

export function useTheme() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    // Use the saved preference; otherwise default to the signature dark macOS theme
    // (intentionally regardless of the OS colour-scheme preference).
    const saved = localStorage.getItem('theme');
    const initial = saved === 'light' || saved === 'dark' ? saved : 'dark';
    setTheme(initial);
    document.documentElement.setAttribute('data-theme', initial);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('theme', next);
    document.documentElement.setAttribute('data-theme', next);
  };

  return { theme, toggleTheme };
}
