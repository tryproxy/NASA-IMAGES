import { create } from 'zustand';
import type { NasaItem } from '../api/nasa/types';

interface PinnedItemsStore {
  saved: Record<string, NasaItem>;
  has: (id: string) => boolean;
  add: (item: NasaItem) => void;
  remove: (id: string) => void;
  clear: () => void;
}

const initialState: Record<string, NasaItem> = {};

export const usePinnedItemsStore = create<PinnedItemsStore>((set, get) => ({
  saved: initialState,
  has: (id) => id in get().saved,

  add: (item) =>
    set((state) => ({
      saved: {
        ...state.saved,
        [item.nasa_id]: item,
      },
    })),

  remove: (id) =>
    set(({ saved }) => ({
      saved: Object.fromEntries(
        Object.entries(saved).filter(([key]) => key !== id)
      ),
    })),

  clear: () => set(() => ({ saved: {} })),
}));
