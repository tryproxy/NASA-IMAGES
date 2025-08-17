'use client';

import { useEffect, useState } from 'react';

export const useImageLoadEffect = ({ src }: { src?: string }) => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'loaded' | 'error'>(
    'idle'
  );

  useEffect(() => {
    if (!src) {
      setStatus('idle');
      return;
    }

    setStatus('loading');

    let active = true;
    const image = new Image();

    const handleLoad = () => active && setStatus('loaded');
    const handleError = () => active && setStatus('error');

    image.onload = handleLoad;
    image.onerror = handleError;

    image.src = src;

    if (image.complete && image.naturalWidth > 0) {
      handleLoad();
    }

    return () => {
      active = false;
      image.onload = null;
      image.onerror = null;
    };
  }, [src]);

  return { status };
};
