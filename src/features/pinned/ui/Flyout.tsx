'use client';

import { Button } from '@/shared/ui-kit/Button';
import { pinnedItemsStore } from '../model/pinnedItemsStore';
import { exportCsvAction } from '@/app/actions';

export function Flyout() {
  const items = pinnedItemsStore((state) => state.saved);
  const clear = pinnedItemsStore((state) => state.clear);
  const count = Object.keys(items).length;

  const pinsCount = Object.keys(items).length;

  if (pinsCount === 0) return null;

  const handleDownload = async (e: React.MouseEvent) => {
    e.preventDefault();
    const csv = await exportCsvAction(items);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${count}_items.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    clear();

    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return (
    <div className="fixed bottom-10 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center justify-center gap-2 rounded-xl bg-[var(--color-surface3)] p-2 text-[var(--color-fg)]">
      <div className="flex flex-row items-center justify-center gap-2">
        <Button
          onClick={clear}
          content={'Unselect'}
          className="link border border-[var(--color-danger)] bg-transparent text-[var(--color-danger)] hover:bg-[var(--color-danger)] hover:text-[var(--color-surface)]"
        />

        <a
          className="inline-block rounded-sm border px-4 py-2 text-sm transition-colors hover:cursor-pointer hover:bg-[var(--color-fg)] hover:text-[var(--color-surface)]"
          onClick={handleDownload}
        >
          Download as CSV
        </a>
      </div>
      <p>{`You selected: ${count} items`}</p>
    </div>
  );
}
