import { useCallback, useState } from 'react';
import { LOCAL_STORAGE_KEY } from '../constants';

export const useSearchHistory = () => {
  const [history, setHistory] = useState<string[]>([]);

  const loadHistory = useCallback(() => {
    const searchHistory = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (searchHistory) {
      try {
        const parsedSearchHistory = JSON.parse(searchHistory) as string[];
        setHistory(parsedSearchHistory);
      } catch (e) {
        if (e instanceof Error) {
          console.error(e.message);
          throw e;
        }
      }
    }
  }, []);

  const saveHistory = (query: string) => {
    if (query.trim().length === 0) return;

    setHistory((prev) => {
      const updatedHistory = [
        query.trim(),
        ...prev.filter((entry) => entry !== query.trim()),
      ];

      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedHistory));

      return updatedHistory;
    });
  };

  const removeEntry = (index: number | string) => {
    setHistory((prev) => {
      const updatedHistory = prev.filter((_, idx) => idx !== index);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedHistory));
      return updatedHistory;
    });
  };

  return { loadHistory, saveHistory, removeEntry, history };
};
