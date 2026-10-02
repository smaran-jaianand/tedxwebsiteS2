import { useEffect, useState } from 'react';
import { SequentialLoader } from './SequentialLoader';
import { markLandingPreloaderSeen, shouldShowLandingPreloader } from './preloaderState';

/**
 * A once-per-tab arrival sequence. It intentionally owns no navigation state:
 * all existing links continue to use the browser's normal behaviour.
 */
export function LandingPreloader({
  onReveal,
  onComplete,
}: {
  onReveal: () => void;
  onComplete: () => void;
}) {
  const [shouldShow] = useState(shouldShowLandingPreloader);
  useEffect(() => {
    if (!shouldShow) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [shouldShow]);

  useEffect(() => {
    if (!shouldShow) {
      onReveal();
      onComplete();
      return;
    }

    markLandingPreloaderSeen();

  }, [onComplete, onReveal, shouldShow]);

  return shouldShow ? <SequentialLoader onReveal={onReveal} onComplete={onComplete} /> : null;
}
