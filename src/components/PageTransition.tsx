import { useEffect, useState } from 'react';

const TRANSITION_KEY = 'tedx-page-transition';
const EXIT_DURATION = 460;
const ENTRY_DURATION = 720;

const readTransitionArrival = () => {
  try {
    return sessionStorage.getItem(TRANSITION_KEY) === 'true';
  } catch {
    return false;
  }
};

export const PageTransition = () => {
  const [phase, setPhase] = useState<'idle' | 'entering' | 'leaving'>(() =>
    readTransitionArrival() ? 'entering' : 'idle',
  );
  const [destination, setDestination] = useState('MERAKI · SEASON TWO');

  useEffect(() => {
    if (phase !== 'entering') return;

    try {
      sessionStorage.removeItem(TRANSITION_KEY);
    } catch {
      // Storage may be unavailable in private browsing. The animation can still finish.
    }

    const timer = window.setTimeout(() => setPhase('idle'), ENTRY_DURATION);
    return () => window.clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    const handleNavigation = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) return;

      const target = event.target as Element | null;
      const anchor = target?.closest<HTMLAnchorElement>('a[href]');
      if (!anchor || anchor.target === '_blank' || anchor.hasAttribute('download')) return;

      const rawHref = anchor.getAttribute('href');
      if (!rawHref || rawHref.startsWith('#') || rawHref.startsWith('mailto:') || rawHref.startsWith('tel:')) return;

      const nextUrl = new URL(anchor.href, window.location.href);
      if (nextUrl.origin !== window.location.origin) return;

      const currentPage = `${window.location.pathname}${window.location.search}`;
      const nextPage = `${nextUrl.pathname}${nextUrl.search}`;
      if (currentPage === nextPage) return;

      event.preventDefault();
      setDestination(nextUrl.pathname.includes('season1') ? 'SEASON ONE ARCHIVE' : 'MERAKI · SEASON TWO');
      setPhase('leaving');

      try {
        sessionStorage.setItem(TRANSITION_KEY, 'true');
      } catch {
        // Navigation still works when session storage is unavailable.
      }

      window.setTimeout(() => window.location.assign(nextUrl.href), EXIT_DURATION);
    };

    document.addEventListener('click', handleNavigation);
    return () => document.removeEventListener('click', handleNavigation);
  }, []);

  return (
    <div
      className={`page-transition page-transition--${phase}`}
      aria-hidden={phase === 'idle'}
      aria-live="polite"
    >
      <div className="page-transition__grain" />
      <div className="page-transition__topline">
        <span>TEDxSIU HYDERABAD</span>
        <span>{destination}</span>
      </div>
      <div className="page-transition__skeleton" aria-label="Loading page">
        <div className="page-transition__eyebrow skeleton-shimmer" />
        <div className="page-transition__headline skeleton-shimmer" />
        <div className="page-transition__headline page-transition__headline--short skeleton-shimmer" />
        <div className="page-transition__copy skeleton-shimmer" />
        <div className="page-transition__cards">
          <div className="page-transition__card skeleton-shimmer" />
          <div className="page-transition__card skeleton-shimmer" />
          <div className="page-transition__card skeleton-shimmer" />
        </div>
      </div>
      <div className="page-transition__status">
        <span className="page-transition__mark">×</span>
        <span>CURATING THE NEXT FRAME</span>
      </div>
    </div>
  );
};

export default PageTransition;
