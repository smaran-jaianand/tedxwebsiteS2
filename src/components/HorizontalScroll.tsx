import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText, ScrollTrigger);

export const HorizontalScroll: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const wrapper = sectionRef.current;
    const text = textRef.current;

    if (!wrapper || !text) return;

    let cancelled = false;

    // GSAP context for clean React lifecycle scoping
    const ctx = gsap.context(() => {
      const split = SplitText.create(text, { type: 'words' });

      // Travel to the actual end of the rendered sentence. A fixed xPercent
      // stops at different words when viewport width or browser zoom changes.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          pin: true,
          start: 'top top',
          end: '+=3600px',
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Smooth horizontal translation of the main heading
      tl.to(text, {
        // Keep the entire final word well clear of the clipped right edge.
        x: () => window.innerWidth * 0.3 - text.scrollWidth,
        ease: 'none',
        duration: 1,
      }, 0);

      // Smooth word-level dynamic wave within the same timeline (0 extra ScrollTriggers)
      tl.from(split.words, {
        yPercent: (i) => (i % 2 === 0 ? 35 : -35),
        opacity: 0.6,
        stagger: {
          each: 0.035,
          from: 'start',
        },
        duration: 0.6,
        ease: 'power1.out',
      }, 0);

      // Font loading can change the text width after the first measurement.
      // Refresh once so the full city name still lands within the viewport.
      document.fonts?.ready.then(() => {
        if (!cancelled) ScrollTrigger.refresh();
      });
    }, sectionRef);

    return () => {
      cancelled = true;
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} id="scroller" className="Horizontal">
      <div className="container" style={{ maxWidth: '100%' }}>
        <h3 ref={textRef} className="Horizontal__text heading-xl" style={{ willChange: 'transform' }}>
          ΜΕRΑΚΙ • TO PUT SOMETHING OF YOURSELF INTO YOUR WORK • SOUL • CREATIVITY • LOVE • 9TH OCTOBER 2026 • TEDxSIU HYDERABAD
        </h3>
      </div>
    </section>
  );
};
