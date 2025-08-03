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
    }
  };

  return (
    <div className="fixed bottom-10 left-10 z-50 flex flex-col items-center justify-center rounded-sm bg-[var(--color-fg)] p-2 text-[var(--color-bg)]">
      <p>{`You selected: ${count} items`}</p>
      <Button onClick={clear} content={'Unselect'} />

      <a
        ref={ref}
        className="flex text-[var(--color-bg)] underline hover:text-blue-800"
        onClick={handleDownload}
      >
        Download as CSV
      </a>
    </div>
  );
}
