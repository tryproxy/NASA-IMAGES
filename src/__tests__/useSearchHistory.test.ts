import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { useSearchHistory } from '../features/search/hooks/useSearchHistory';
import { LOCAL_STORAGE_KEY } from '@/features/search/model/constants';

describe('useSearchHistory', () => {
  beforeEach(() => localStorage.clear());

  it('initializes with empty history', () => {
    const { result } = renderHook(() => useSearchHistory());
    expect(result.current.history).toEqual([]);
  });

  it('loads history from localStorage', () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(['moon']));
    const { result } = renderHook(() => useSearchHistory());
    act(() => {
      result.current.loadHistory();
    });
    expect(result.current.history).toEqual(['moon']);
  });

  it('saves query and removes duplicate', () => {
    const { result } = renderHook(() => useSearchHistory());

    act(() => {
      result.current.saveHistory('mars');
      result.current.saveHistory('jupiter');
      result.current.saveHistory('mars');
    });

    expect(result.current.history).toEqual(['mars', 'jupiter']);
  });

  it('removes entry by index', () => {
    const { result } = renderHook(() => useSearchHistory());

    act(() => {
      result.current.saveHistory('moon');
      result.current.saveHistory('earth');
      result.current.removeEntry(0);
    });

    expect(result.current.history).toEqual(['moon']);
  });
});
