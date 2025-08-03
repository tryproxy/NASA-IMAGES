import { useRef } from 'react';
import { generateCsvString } from '../shared/api/nasa/lib/generateCsvString';
import { usePinnedItemsStore } from '../shared/model/usePinnedItemsStore';
import { Button } from './Button';

export function Flyout() {
  const ref = useRef<HTMLAnchorElement>(null);
  const items = usePinnedItemsStore((state) => state.saved);
  const clear = usePinnedItemsStore((state) => state.clear);
  const count = Object.keys(items).length;

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
