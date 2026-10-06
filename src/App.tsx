import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CountdownSection } from './components/CountdownSection';
import { ThemeManifesto } from './components/ThemeManifesto';
import { HorizontalScroll } from './components/HorizontalScroll';
import { Schedule } from './components/Schedule';
import { LegacyBanner } from './components/LegacyBanner';
import { Venue } from './components/Venue';
import { Footer } from './components/Footer';
import { MacDock } from './components/MacDock';
import { Speakers } from './components/Speakers';
import { Team } from './components/Team';
import { SeasonOneArchive } from './components/SeasonOneArchive';
import { LandingPreloader } from './components/LandingPreloader';
import { PageTransition } from './components/PageTransition';
import { ImageSkeletons } from './components/ImageSkeletons';
import { shouldShowLandingPreloader } from './components/preloaderState';
import { currentRoute } from './sitePath';

// These two sections pull in the heaviest interactive dependencies (Motion and
// the animated wall). Keep them out of the critical path until they are needed.
const MerakiGallery = lazy(() => import('./components/MerakiGallery'));
const DitherVeil = lazy(() => import('./components/DitherVeil'));
const GalleryPlaceholder = () => (
  <section
    aria-hidden="true"
    style={{ minHeight: 780, position: 'relative' }}
  />
);

const DeferredGallery = () => {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsReady(true);
        observer.disconnect();
      },
      { rootMargin: '1200px 0px' },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sentinelRef}>
      {isReady ? (
        <Suspense fallback={<GalleryPlaceholder />}>
          <MerakiGallery />
        </Suspense>
      ) : (
        <GalleryPlaceholder />
      )}
    </div>
  );
};

export function App() {
  const route = currentRoute();
  const isSpeakersPage = route === '/speakers';
  const isTeamPage = route === '/team';
  const isArchivePage = route === '/archive';
  const [shouldPlayPreloader] = useState(shouldShowLandingPreloader);
  const [isSiteRevealed, setIsSiteRevealed] = useState(() => !shouldPlayPreloader);
  const [isPreloaderVisible, setIsPreloaderVisible] = useState(shouldPlayPreloader);
  const revealSite = useCallback(() => setIsSiteRevealed(true), []);
  const finishPreloader = useCallback(() => {
    setIsSiteRevealed(true);
    setIsPreloaderVisible(false);
  }, []);

  useEffect(() => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);
    // Eliminate per-frame misfire warnings
    gsap.config({ nullTargetWarn: false });

    // Pure Dark Mode for TEDx Meraki
    document.documentElement.setAttribute('data-theme', 'dark');
    document.body.classList.add('dark');
    localStorage.setItem('tedx-theme', 'dark');

    // Intercept anchor-hash clicks and use GSAP smooth scroll
    // so CSS scroll-behavior: smooth isn't needed (which breaks ScrollTrigger pins)
    const handleAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as Element).closest('a[href^="#"]');
      if (!anchor) return;
      const id = (anchor.getAttribute('href') ?? '').slice(1);
      const target = document.getElementById(id) || document.querySelector(`.${id}`);
      if (!target) return;
      e.preventDefault();
      gsap.to(window, { scrollTo: { y: target, offsetY: 80 }, duration: 0.9, ease: 'power2.inOut' });
    };
    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <>
    <ImageSkeletons />
    <div
      aria-hidden={!isSiteRevealed}
      style={{
        position: 'relative',
        minHeight: '100vh',
        backgroundColor: 'var(--bg-dark)',
        visibility: isSiteRevealed ? 'visible' : 'hidden',
      }}
    >

      <div className="site-dither-veil" aria-hidden="true">
        <Suspense fallback={null}>
          <DitherVeil
            src="https://images.unsplash.com/photo-1737071371043-761e02b1ef95?q=80&w=1400&auto=format&fit=crop"
            pattern="floyd"
            pixelSize={3}
            inkColor="#050507"
            paperColor="#35131b"
            revealRadius={220}
            softness={0.62}
            linger={0.9}
            fit="cover"
            rimColor="#e2c17c"
            palette="duotone"
            levels={2}
            contrast={1.12}
            brightness={-0.1}
            rim={0.08}
            reverse={false}
            wander={false}
            clickBurst
          />
        </Suspense>
      </div>
      <div className="site-dither-shade" aria-hidden="true" />

      {/* Ambient Grid and Glow Effects */}
      <div className="bg-ambient-grid" />
      <div
        className="glow-orb-meraki"
        style={{ top: '-150px', left: '50%', transform: 'translateX(-50%)' }}
      />
      <div
        className="glow-orb-meraki"
        style={{ top: '45%', right: '-200px', width: '600px', height: '600px' }}
      />
      <div
        className="glow-orb-meraki"
        style={{ bottom: '10%', left: '-150px', width: '500px', height: '500px' }}
      />

      {/* Minimal Top Header */}
      <Navbar activePage={isSpeakersPage ? 'speakers' : isTeamPage ? 'team' : isArchivePage ? 'archive' : 'home'} />

      {/* Page Sections */}
      <main style={{ position: 'relative', zIndex: 1 }}>
        {isSpeakersPage ? (
          <Speakers />
        ) : isTeamPage ? (
          <Team />
        ) : isArchivePage ? (
          <SeasonOneArchive />
        ) : (
          <>
        {/* Minimal Hero */}
        <Hero />

        {/* Dedicated Separate Countdown Section */}
        <CountdownSection />

        {/* Theme Manifesto */}
        <ThemeManifesto />

        {/* Horizontal SplitText containerAnimation element with Meraki theme */}
        <HorizontalScroll />

        {/* Schedule holding area — details will be added once confirmed */}
        <Schedule />

        {/* Season 1 Legacy Archive Showcase */}
        <LegacyBanner />

        {/* Endless Perspective DriftWall Gallery */}
        <DeferredGallery />

        {/* Campus Venue */}
        <Venue />
          </>
        )}
      </main>

      {/* Themed macOS Dock at bottom */}
      <MacDock />

      {/* Footer */}
      <Footer />

    </div>
    {isPreloaderVisible && (
      <LandingPreloader
        onReveal={revealSite}
        onComplete={finishPreloader}
      />
    )}
    <PageTransition />
    </>
  );
}

export default App;
