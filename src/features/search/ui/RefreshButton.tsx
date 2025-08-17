'use client';

import { Button } from '@/shared/ui-kit/Button';
import { useEffect, useState } from 'react';

export function RefreshButton({
  isRefetching,
  dataUpdatedAt,
  onClick,
}: {
  isRefetching: boolean;
  dataUpdatedAt: number;
  onClick: () => void;
}) {
  const [lastUpdatedAt, setLastUpdatedAt] = useState<number | null>(null);

  useEffect(() => {
    if (isRefetching) {
      setLastUpdatedAt(dataUpdatedAt);
    }
  }, [isRefetching, dataUpdatedAt]);

  return (
    <div className="flex w-full max-w-screen-xl items-center justify-between px-2">
      <div className="text-xs opacity-40">
        Last updated:{' '}
        {lastUpdatedAt
          ? new Date(lastUpdatedAt).toLocaleTimeString()
          : '--:--:--'}
      </div>
      <div className="flex items-center gap-2">
        {isRefetching && <span className="text-xs">Refetching...</span>}
        <Button onClick={onClick} content="Refetch" />
      </div>
    </div>
  );
}
