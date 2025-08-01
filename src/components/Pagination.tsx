import { Button } from './Button';

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
        <Button content="Previous" onClick={onPrev} />
      ) : (
        <Button className="invisible" content="Previous" onClick={() => {}} />
      )}
      {hasNextPage && <Button content="Next" onClick={onNext} />}
    </div>
  );
}
