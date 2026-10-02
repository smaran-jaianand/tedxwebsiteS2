import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Heart, Flame } from 'lucide-react';
import { sitePath } from '../sitePath';

gsap.registerPlugin(ScrollTrigger);

export const ThemeManifesto: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const artGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in text blocks
      gsap.from('.manifesto-reveal', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        opacity: 0,
        y: 40,
        duration: 1,
        stagger: 0.18,
        ease: 'power3.out',
      });

      // Reveal 3 Pillars
      if (cardsRef.current) {
        gsap.from(cardsRef.current.children, {
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
          },
          opacity: 0,
          y: 45,
          duration: 0.85,
          stagger: 0.15,
          ease: 'power3.out',
        });
      }

      // Reveal Art gallery
      if (artGridRef.current) {
        gsap.from(artGridRef.current.children, {
          scrollTrigger: {
            trigger: artGridRef.current,
            start: 'top 85%',
          },
          opacity: 0,
          scale: 0.95,
          duration: 0.9,
          stagger: 0.2,
          ease: 'power2.out',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const pillars = [
    {
      greek: 'ΨΥΧΗ',
      english: 'Psyche',
      subtitle: 'SOUL & ESSENCE',
      icon: Flame,
      color: 'var(--ted-red-light)',
      description:
        'The invisible breath. When a scientist or storyteller ceases to merely report facts and instead embeds their deepest existential triumphs and vulnerabilities into the talk.',
    },
    {
      greek: 'ΔΗΜΙΟΥΡΓΙΑ',
      english: 'Demiurgia',
      subtitle: 'CREATIVITY & CRAFT',
      icon: Sparkles,
      color: 'var(--greek-gold)',
      description:
        'The divine audacity to make. The painstaking chisel of the sculptor, the generative code of the architect, and the radical courage to shape uncharted futures.',
    },
    {
      greek: 'ΑΓΑΠΗ',
      english: 'Agapé',
      subtitle: 'LOVE & DEVOTION',
      icon: Heart,
      color: '#ff6b81',
      description:
        'Unconditional devotion to the human journey. Ideas worth spreading are not conceived in vanity, but in fierce, compassionate devotion to leaving the world more enlightened.',
    },
  ];

  return (
    <section id="theme" ref={sectionRef} className="section-padding" style={{ position: 'relative' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 64px' }}>
          <h2
            className="manifesto-reveal editorial-heading"
            style={{
              fontSize: 'clamp(32px, 5vw, 56px)',
              fontFamily: 'var(--font-classical)',
              letterSpacing: '0.08em',
              marginBottom: '20px',
              textTransform: 'uppercase',
            }}
          >
            To Put <em>Yourself</em><br />Into Your Work
          </h2>
          <p
            className="manifesto-reveal"
            style={{
              fontSize: 'clamp(17px, 2vw, 20px)',
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-editorial)',
              fontStyle: 'italic',
              lineHeight: 1.7,
            }}
          >
            "Meraki is doing something with total devotion, with absolute love, and leaving an indelible piece of your soul forever interwoven with the outcome."
          </p>
        </div>

        {/* 3 Pillars of Meraki */}
        <div
          ref={cardsRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '28px',
            marginBottom: '80px',
          }}
        >
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="glass-panel"
                style={{
                  padding: '36px 30px',
                  borderRadius: '20px',
                  position: 'relative',
                  overflow: 'hidden',
                  border: '1px solid rgba(226, 193, 124, 0.2)',
                  background: 'linear-gradient(160deg, rgba(18, 18, 25, 0.85) 0%, rgba(10, 10, 14, 0.95) 100%)',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: '16px',
                    right: '20px',
                    fontSize: '36px',
                    fontFamily: 'var(--font-classical)',
                    fontWeight: 900,
                    color: 'rgba(255, 255, 255, 0.04)',
                    letterSpacing: '0.1em',
                  }}
                >
                  {pillar.greek}
                </div>

                <div
                  style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '14px',
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: `1px solid ${pillar.color}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '24px',
                    color: pillar.color,
                  }}
                >
                  <Icon size={26} />
                </div>

                <div style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: pillar.color, fontWeight: 700, letterSpacing: '0.1em', marginBottom: '6px' }}>
                  {pillar.subtitle}
                </div>

                <h3 style={{ fontSize: '24px', fontFamily: 'var(--font-classical)', color: '#fff', marginBottom: '14px' }}>
                  {pillar.english}
                </h3>

                <p style={{ fontSize: '15px', color: '#cbd5e1', lineHeight: 1.65 }}>
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Mythological Narrative: Persephone, Hades & The Sacred Pomegranate */}
        <div
          ref={artGridRef}
          className="glass-panel"
          style={{
            padding: '48px 40px',
            borderRadius: '24px',
            border: '1px solid rgba(226, 193, 124, 0.3)',
            background: 'linear-gradient(135deg, rgba(20, 20, 28, 0.95) 0%, rgba(10, 10, 15, 0.98) 100%)',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '48px',
              alignItems: 'center',
            }}
          >
            <div>
              <h3
                className="editorial-heading editorial-heading--compact"
                style={{
                  fontSize: 'clamp(26px, 3.5vw, 38px)',
                  fontFamily: 'var(--font-classical)',
                  letterSpacing: '0.04em',
                  marginBottom: '18px',
                  color: '#fff',
                }}
              >
                The Pomegranate & The Return to <em>Light</em>
              </h3>

              <p style={{ color: '#cbd5e1', fontSize: '16px', lineHeight: 1.8, marginBottom: '20px' }}>
                In ancient Hellenic lore, Persephone’s choice to taste the seeds of the pomegranate tied her between realms. It was not a tale of despair, but of profound devotion: navigating the shadows of the underworld to herald the return of spring, fertility, and renewal.
              </p>

              <p style={{ color: '#94a3b8', fontSize: '15px', lineHeight: 1.7, marginBottom: '28px' }}>
                On <strong>9th October at TEDxSIU Hyderabad</strong>, our thinkers, artists, and catalysts mirror this timeless journey. They bring forward ideas refined in the shadows of tireless iteration — arriving on the red dot to plant seeds that flourish across generations.
              </p>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '24px',
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                  paddingTop: '20px',
                }}
              >
                <div>
                  <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--greek-gold)', fontFamily: 'var(--font-classical)' }}>
                    9 OCT
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>Curtains Rise</div>
                </div>
                <div style={{ height: '36px', width: '1px', background: 'rgba(255, 255, 255, 0.1)' }} />
                <div>
                  <div style={{ fontSize: '24px', fontWeight: 800, color: '#fff', fontFamily: 'var(--font-classical)' }}>
                    18 MIN
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>Pure Essence</div>
                </div>
                <div style={{ height: '36px', width: '1px', background: 'rgba(255, 255, 255, 0.1)' }} />
                <div>
                  <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--ted-red-light)', fontFamily: 'var(--font-classical)' }}>
                    SOUL
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>The Meraki Creed</div>
                </div>
              </div>
            </div>

            {/* Classical Artwork Displays */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '18px' }}>
              <div
                style={{
                  borderRadius: '16px',
                  overflow: 'hidden',
                  height: '240px',
                  border: '1px solid rgba(226, 193, 124, 0.25)',
                  position: 'relative',
                  background: '#08080a',
                }}
              >
                <img
                  src={sitePath('theme/halo_renaissance.png')}
                  alt="Sacred Devotion - Halo Artwork"
                  loading="lazy"
                  decoding="async"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)',
                    display: 'flex',
                    alignItems: 'flex-end',
                    padding: '12px',
                  }}
                >
                  <span style={{ fontSize: '11px', color: 'var(--greek-gold)', fontFamily: 'var(--font-classical)', letterSpacing: '0.08em' }}>
                    DEVOTION TO CRAFT
                  </span>
                </div>
              </div>

              <div
                style={{
                  borderRadius: '16px',
                  overflow: 'hidden',
                  height: '240px',
                  border: '1px solid rgba(235, 0, 40, 0.3)',
                  position: 'relative',
                  background: '#08080a',
                }}
              >
                <img
                  src={sitePath('theme/renaissance_creation.jpg')}
                  alt="Meraki Classical Renaissance Art"
                  loading="lazy"
                  decoding="async"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)',
                    display: 'flex',
                    alignItems: 'flex-end',
                    padding: '12px',
                  }}
                >
                  <span style={{ fontSize: '11px', color: 'var(--ted-red-light)', fontFamily: 'var(--font-classical)', letterSpacing: '0.08em' }}>
                    SOUL • CREATIVITY • LOVE
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
