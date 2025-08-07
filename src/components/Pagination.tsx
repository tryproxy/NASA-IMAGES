import { Button } from '../shared/ui/kit/Button';

export function Pagination({
  hasNextPage,
  hasPrevPage,
  onNext,
  onPrev,
}: {
  hasPrevPage: boolean;
  hasNextPage: boolean;
  onNext: () => void;
  onPrev: () => void;
}) {
  return (
    <div className="flex gap-4 pt-4">
      {hasPrevPage ? (
        <Button
          className="border border-[var(--color-border)] bg-transparent text-[var(--color-surface2)] hover:bg-[var(--color-surface2)] hover:text-[var(--color-surface)]"
          content="Back"
          onClick={onPrev}
        />
      ) : (
        <Button className="invisible" content="Previous" onClick={() => {}} />
      )}
      {hasNextPage && (
        <Button
          className="border border-[var(--color-border)] bg-transparent text-[var(--color-surface2)] hover:bg-[var(--color-surface2)] hover:text-[var(--color-surface)]"
          content="Next"
          onClick={onNext}
        />
      )}
    </div>
  );
}
