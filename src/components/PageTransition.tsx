import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import { sitePath } from '../sitePath';

const TRANSITION_KEY = 'tedx-page-transition';
const DIRECTION_KEY = 'tedx-transition-direction';
const MODE_KEY = 'tedx-transition-mode';
const TEMPORAL_EXIT_DURATION = 3600;
const TEMPORAL_ENTRY_DURATION = 960;
const PAGE_EXIT_DURATION = 420;
const PAGE_ENTRY_DURATION = 480;

type TransitionPhase = 'idle' | 'entering' | 'leaving';
type TimeDirection = 'back' | 'future';
type TransitionMode = 'page' | 'temporal';

const readSessionValue = (key: string) => {
  try {
    return sessionStorage.getItem(key);
  } catch {
    return null;
  }
};

const readTransitionArrival = () => readSessionValue(TRANSITION_KEY) === 'true';
const readTransitionDirection = (): TimeDirection =>
  readSessionValue(DIRECTION_KEY) === 'back' ? 'back' : 'future';
const readTransitionMode = (): TransitionMode =>
  readSessionValue(MODE_KEY) === 'temporal' ? 'temporal' : 'page';

const TedxTimeMark = ({ compact = false }: { compact?: boolean }) => (
  <svg
    className={compact ? 'page-fade__xmark' : 'time-jump__xmark'}
    viewBox="0 0 76 52"
    aria-hidden="true"
    focusable="false"
  >
    {!compact && <path className="time-jump__xframe" d="M10 3h56l7 7v32l-7 7H10l-7-7V10z" />}
    {!compact && <path className="time-jump__xcorners" d="M12 8h13M51 8h13M12 44h13M51 44h13" />}
    <path className={compact ? 'page-fade__xglyph' : 'time-jump__xglyph'} d="M23 14h11.2L38 20.6 41.8 14H53L44 26l9 12H41.8L38 31.4 34.2 38H23l9-12z" />
  </svg>
);

export const PageTransition = () => {
  const [phase, setPhase] = useState<TransitionPhase>(() =>
    readTransitionArrival() ? 'entering' : 'idle',
  );
  const [direction, setDirection] = useState<TimeDirection>(readTransitionDirection);
  const [mode, setMode] = useState<TransitionMode>(readTransitionMode);
  const [message, setMessage] = useState(() =>
    readTransitionDirection() === 'back' ? 'GOING BACK IN TIME' : 'GOING INTO THE FUTURE',
  );

  useEffect(() => {
    if (phase !== 'entering') return;

    try {
      sessionStorage.removeItem(TRANSITION_KEY);
      sessionStorage.removeItem(DIRECTION_KEY);
      sessionStorage.removeItem(MODE_KEY);
    } catch {
      // Storage may be unavailable in private browsing. The animation can still finish.
    }

    const duration = mode === 'temporal' ? TEMPORAL_ENTRY_DURATION : PAGE_ENTRY_DURATION;
    const timer = window.setTimeout(() => setPhase('idle'), duration);
    return () => window.clearTimeout(timer);
  }, [mode, phase]);

  useEffect(() => {
    const handleNavigation = (event: MouseEvent) => {
      if (
        event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey ||
        event.shiftKey || event.altKey
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

      const currentQueryPage = new URLSearchParams(window.location.search).get('page');
      const nextQueryPage = nextUrl.searchParams.get('page');
      const isArchiveDestination = nextQueryPage === 'archive';
      const isLeavingArchive = currentQueryPage === 'archive' && nextQueryPage !== 'archive';
      const isLegacySeasonOneSite = nextUrl.pathname.includes('season1');
      const isSeasonSwitch = isArchiveDestination || isLeavingArchive || isLegacySeasonOneSite;
      const nextMode: TransitionMode = isSeasonSwitch ? 'temporal' : 'page';
      const nextDirection: TimeDirection = isArchiveDestination || isLegacySeasonOneSite ? 'back' : 'future';

      event.preventDefault();
      setMode(nextMode);
      setDirection(nextDirection);
      setMessage(nextDirection === 'back' ? 'OPENING THE ARCHIVE' : 'GOING INTO THE FUTURE');
      setPhase('leaving');

      try {
        sessionStorage.setItem(TRANSITION_KEY, 'true');
        sessionStorage.setItem(DIRECTION_KEY, nextDirection);
        sessionStorage.setItem(MODE_KEY, nextMode);
      } catch {
        // Navigation still works when session storage is unavailable.
      }

      const duration = nextMode === 'temporal' ? TEMPORAL_EXIT_DURATION : PAGE_EXIT_DURATION;
      window.setTimeout(() => window.location.assign(nextUrl.href), duration);
    };

    document.addEventListener('click', handleNavigation);
    return () => document.removeEventListener('click', handleNavigation);
  }, []);

  return (
    <div
      className={`page-transition page-transition--${phase} page-transition--${mode} page-transition--${direction}`}
      aria-hidden={phase === 'idle'}
      aria-live="polite"
    >
      <div className="page-transition__void" />

      <div className="page-fade" aria-hidden="true">
        <TedxTimeMark compact />
        <span className="page-fade__line" />
      </div>

      <div className="page-transition__timecode">TEDxSIU HYDERABAD · TEMPORAL ARCHIVE</div>
      <div className="time-jump" aria-label={message}>
        <div className="time-jump__slideshow" aria-hidden="true">
          {[
            'season1/img/sliderimgs/maingate.jpeg',
            'season1/img/sliderimgs/audi.jpeg',
            'season1/img/sliderimgs/insideaudi.jpeg',
            'season1/img/sliderimgs/allhostels.jpeg',
          ].map((src, index) => (
            <figure key={src} style={{ '--slide-index': index } as CSSProperties}>
              <img src={sitePath(src)} alt="" />
              <span>ARCHIVE FRAME · 0{index + 1}</span>
            </figure>
          ))}
        </div>
        <p className="time-jump__message">{message}</p>
        <div className="time-jump__rail-row">
          <span className="time-jump__era time-jump__era--one"><b>1</b><small>SEASON ONE</small></span>
          <div className="time-jump__track" aria-hidden="true">
            <span className="time-jump__ticks" />
            <span className="time-jump__progress" />
            <span className="time-jump__traveller"><span className="time-jump__core"><TedxTimeMark /></span></span>
          </div>
          <span className="time-jump__era time-jump__era--two"><b>2</b><small>MERAKI</small></span>
        </div>
        <div className="time-jump__direction">
          <span>{direction === 'back' ? 'PAST' : 'ORIGIN'}</span>
          <span>{direction === 'back' ? 'REWINDING THE ARCHIVE' : 'ADVANCING THE STORY'}</span>
          <span>{direction === 'back' ? 'PRESENT' : 'FUTURE'}</span>
        </div>
      </div>
      <div className="page-transition__coordinates"><span>09 · 10</span><span>HYDERABAD</span></div>
    </div>
  );
};

export default PageTransition;
