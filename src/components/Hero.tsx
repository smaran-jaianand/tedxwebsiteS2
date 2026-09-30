import React, { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';
import { sitePath } from '../sitePath';

export const Hero: React.FC = () => {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Anime.js kinetic staggered letter animation for m e r a k i
    if (headlineRef.current) {
      const chars = headlineRef.current.querySelectorAll('.meraki-char');
      if (chars.length > 0) {
        animate(chars, {
          opacity: [0, 1],
          translateY: [40, 0],
          scale: [0.85, 1],
          delay: stagger(80, { start: 150 }),
          duration: 1000,
          ease: 'out(3)',
        });
      }
    }
  }, []);

  const merakiChars = ['m', 'e', 'r', 'a', 'k', 'i'];

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '92vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '110px',
        paddingBottom: '60px',
        overflow: 'hidden',
      }}
    >
      {/* Background Sacred Halo Aureole */}
      <div
        ref={haloRef}
        className="sacred-halo"
        style={{
          position: 'absolute',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '740px',
          height: '740px',
          pointerEvents: 'none',
          zIndex: 0,
          opacity: 0.35,
          background: `radial-gradient(circle, rgba(226, 193, 124, 0.2) 0%, rgba(235, 0, 40, 0.12) 45%, transparent 70%), url("${sitePath('theme/halo_renaissance.png')}") center/contain no-repeat`,
        }}
      />

      <div className="glow-orb-meraki" style={{ top: '15%', left: '50%', transform: 'translateX(-50%)' }} />

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '50px',
            alignItems: 'center',
          }}
        >
          {/* Left: Minimal Typography & Concept */}
          <div>
            {/* Kinetic Meraki Title */}
            <h1
              ref={headlineRef}
              style={{
                fontSize: 'clamp(54px, 8.5vw, 100px)',
                fontFamily: 'var(--font-classical)',
                fontWeight: 600,
                lineHeight: 0.95,
                letterSpacing: '0.22em',
                marginBottom: '14px',
                color: 'var(--text-main)',
                textTransform: 'lowercase',
              }}
            >
              {merakiChars.map((char, index) => (
                <span key={index} className="meraki-char" style={{ display: 'inline-block' }}>
                  {char}
                </span>
              ))}
            </h1>

            {/* Phonetic & Origin */}
            <div
              style={{
                fontSize: 'clamp(18px, 2.2vw, 22px)',
                color: 'var(--greek-gold)',
                fontFamily: 'var(--font-editorial)',
                letterSpacing: '0.1em',
                marginBottom: '22px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <span>[may - rah - kee]</span>
              <span style={{ fontSize: '14px', color: 'var(--text-faint)' }}>•</span>
              <span style={{ fontStyle: 'italic' }}>Greek</span>
            </div>

            {/* Minimal Definition Callout */}
            <div
              style={{
                borderLeft: '2px solid var(--ted-red)',
                paddingLeft: '20px',
              }}
            >
              <p
                style={{
                  fontSize: 'clamp(17px, 2vw, 20px)',
                  color: 'var(--text-main)',
                  fontFamily: 'var(--font-editorial)',
                  fontStyle: 'italic',
                  lineHeight: 1.5,
                  marginBottom: '6px',
                }}
              >
                (n.) to put something of yourself into your work.
              </p>
              <p
                style={{
                  fontSize: '14px',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--ted-red)',
                  fontFamily: 'var(--font-classical)',
                  fontWeight: 700,
                }}
              >
                Soul. Creativity. Love.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
