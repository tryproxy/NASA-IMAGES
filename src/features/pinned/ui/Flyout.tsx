import { useRef } from 'react';
import { Button } from '../../../shared/ui/kit/Button';
import { pinnedItemsStore } from '../model/pinnedItemsStore';
import { generateCsvString } from '../lib/generateCsvString';

export function Flyout() {
  const ref = useRef<HTMLAnchorElement>(null);
  const items = pinnedItemsStore((state) => state.saved);
  const clear = pinnedItemsStore((state) => state.clear);
  const count = Object.keys(items).length;

  const pinsCount = Object.keys(items).length;

  if (pinsCount === 0) return null;

  const handleDownload = () => {
    const csv = generateCsvString(items);
    const url = URL.createObjectURL(
      new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    );

    if (ref.current) {
      ref.current.href = url;
      ref.current.download = `${count}_items.csv`;

      setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 1000);
    }
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
          ref={ref}
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
