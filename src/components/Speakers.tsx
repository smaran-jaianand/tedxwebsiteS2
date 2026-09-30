import React, { useState, useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';
import { ArrowRight, X, Sparkles } from 'lucide-react';

interface Speaker {
  id: string;
  name: string;
  role: string;
  category: 'soul' | 'science' | 'mythos' | 'design';
  talkTitle: string;
  abstract: string;
  avatarUrl: string;
}

const SPEAKERS_DATA: Speaker[] = [
  {
    id: 'sp-1',
    name: 'Dr. Helene Vassos',
    role: 'Classical Hellenist & Comparative Mythologist',
    category: 'mythos',
    talkTitle: 'The Pomegranate Covenant: Why Ancient Rituals Hold The Key to Modern Loneliness',
    abstract:
      'Exploring how the Eleusinian mysteries and the myth of Persephone provide a psychological map for navigating existential burnout and rediscovering communion in fractured societies.',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'sp-2',
    name: 'Arjun Somayaji',
    role: 'Biophilic Ceramicist & Sacred Geometry Sculptor',
    category: 'soul',
    talkTitle: 'The Fingerprints of God: Pouring Soul into Inorganic Earth',
    abstract:
      'When an artisan sculpts clay with relentless devotion, a physical imprint of their consciousness survives across centuries. An intimate demonstration of Meraki through tactile materiality.',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'sp-3',
    name: 'Dr. Thalia Sterling',
    role: 'Astrophysicist & Cosmic Ray Sensor Architect',
    category: 'science',
    talkTitle: 'Listening to Dead Stars: 30 Years Listening for Pulsar Harmonics',
    abstract:
      'What drives a researcher to spend three decades decoding silent interstellar whispers? A testament to scientific love, obsessive curiosity, and cosmic humility.',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'sp-4',
    name: 'Lysander Croft',
    role: 'Generative Sound Architect & Psychoacoustics Master',
    category: 'design',
    talkTitle: 'The Golden Ratio in Sound: Resonating With The Human Heart',
    abstract:
      'Synthesizing classical modal tunings with algorithmic acoustic spaces to induce deep states of contemplative calm and neurological restoration.',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'sp-5',
    name: 'Meera Nambiar',
    role: 'Grassroots Agro-Ecologist & Seed Keeper',
    category: 'soul',
    talkTitle: 'The Living Archive: Why Saving 1,000 Heirloom Seeds is An Act of Love',
    abstract:
      'Protecting ancient biodiversity from corporate monopolies by treating indigenous seed varieties not as commodities, but as sacred genealogical ancestors.',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'sp-6',
    name: 'Prof. Julian Thorne',
    role: 'Human-Centered AI Pioneer & Cognitive Ethicist',
    category: 'science',
    talkTitle: 'Can Machines Possess Meraki? The Boundary of Authentic Passion',
    abstract:
      'Investigating whether generative models can ever replicate the sacrifice and emotional devotion that human creators infuse into their masterpieces.',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80',
  },
];

export const Speakers: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredSpeakers = activeCategory === 'all'
    ? SPEAKERS_DATA
    : SPEAKERS_DATA.filter((s) => s.category === activeCategory);

  useEffect(() => {
    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll('.speaker-card');
      if (cards.length > 0) {
        animate(cards, {
          opacity: [0, 1],
          translateY: [24, 0],
          delay: stagger(60),
          duration: 600,
          ease: 'out(3)',
        });
      }
    }
  }, [activeCategory]);

  return (
    <section id="speakers" className="section-padding" style={{ position: 'relative' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '740px', margin: '0 auto 48px' }}>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 50px)', fontFamily: 'var(--font-classical)', marginBottom: '16px', letterSpacing: '0.04em' }}>
            Masters of <span className="text-gradient-meraki">Meraki</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '18px', fontFamily: 'var(--font-editorial)', fontStyle: 'italic' }}>
            Individuals who have poured their soul, creativity, and unconditional love into transformative pursuits.
          </p>
        </div>

        {/* Filter Pills */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '10px',
            marginBottom: '48px',
          }}
        >
          {[
            { id: 'all', label: 'All Orators' },
            { id: 'soul', label: 'Soul & Craft (Ψυχή)' },
            { id: 'science', label: 'Science & Cosmos' },
            { id: 'mythos', label: 'Mythos & Humanity' },
            { id: 'design', label: 'Design & Harmonics' },
          ].map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  padding: '9px 22px',
                  borderRadius: '9999px',
                  border: isActive ? '1px solid var(--greek-gold)' : '1px solid rgba(255, 255, 255, 0.1)',
                  background: isActive ? 'rgba(226, 193, 124, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                  color: isActive ? 'var(--greek-gold)' : '#94a3b8',
                  fontSize: '13px',
                  fontWeight: 600,
                  fontFamily: 'var(--font-mono)',
                  cursor: 'pointer',
                  transition: 'all 0.25s',
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Speaker Grid */}
        <div
          ref={gridRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '28px',
          }}
        >
          {filteredSpeakers.map((speaker) => (
            <div
              key={speaker.id}
              className="speaker-card glass-panel cursor-target"
              style={{
                borderRadius: '20px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                border: '1px solid rgba(226, 193, 124, 0.2)',
              }}
              onClick={() => setSelectedSpeaker(speaker)}
            >
              {/* Speaker Avatar */}
              <div style={{ position: 'relative', height: '280px', overflow: 'hidden' }}>
                <img
                  src={speaker.avatarUrl}
                  alt={speaker.name}
                  loading="lazy"
                  decoding="async"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(6, 6, 8, 0.96) 0%, transparent 60%)',
                  }}
                />
                <span
                  style={{
                    position: 'absolute',
                    top: '16px',
                    left: '16px',
                    padding: '4px 12px',
                    borderRadius: '9999px',
                    background: 'rgba(0, 0, 0, 0.8)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(226, 193, 124, 0.35)',
                    fontSize: '11px',
                    fontFamily: 'var(--font-classical)',
                    color: 'var(--greek-gold)',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    fontWeight: 700,
                  }}
                >
                  {speaker.category}
                </span>
              </div>

              {/* Speaker Info */}
              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <h3 style={{ fontSize: '22px', fontFamily: 'var(--font-classical)', color: '#fff', marginBottom: '4px' }}>
                  {speaker.name}
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--greek-gold)', marginBottom: '16px' }}>
                  {speaker.role}
                </p>

                <div
                  style={{
                    padding: '12px 14px',
                    borderRadius: '10px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderLeft: '3px solid var(--ted-red)',
                    marginBottom: '18px',
                    flexGrow: 1,
                  }}
                >
                  <p style={{ fontSize: '14px', fontWeight: 600, color: '#f1f5f9', fontStyle: 'italic', fontFamily: 'var(--font-editorial)' }}>
                    "{speaker.talkTitle}"
                  </p>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '13px',
                    color: 'var(--greek-gold)',
                    fontWeight: 600,
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Sparkles size={14} /> Unveil Talk Abstract
                  </span>
                  <ArrowRight size={15} />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Abstract Modal Popout */}
      {selectedSpeaker && (
        <div className="modal-overlay" onClick={() => setSelectedSpeaker(null)}>
          <div
            className="glass-panel"
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '580px',
              width: '100%',
              padding: '36px',
              borderRadius: '24px',
              position: 'relative',
              background: '#0a0a0e',
              border: '1px solid rgba(226, 193, 124, 0.4)',
              boxShadow: '0 25px 70px rgba(0, 0, 0, 0.95)',
            }}
          >
            <button
              onClick={() => setSelectedSpeaker(null)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'rgba(255, 255, 255, 0.08)',
                border: 'none',
                color: '#fff',
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <X size={18} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <img
                src={selectedSpeaker.avatarUrl}
                alt={selectedSpeaker.name}
                style={{ width: '70px', height: '70px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--greek-gold)' }}
              />
              <div>
                <h3 style={{ fontSize: '22px', fontFamily: 'var(--font-classical)', color: '#fff' }}>{selectedSpeaker.name}</h3>
                <p style={{ fontSize: '13px', color: 'var(--greek-gold)' }}>{selectedSpeaker.role}</p>
              </div>
            </div>

            <div style={{ marginBottom: '18px' }}>
              <span style={{ fontSize: '11px', color: 'var(--ted-red-light)', fontFamily: 'var(--font-mono)', fontWeight: 700, letterSpacing: '0.1em' }}>
                9TH OCTOBER TALK
              </span>
              <h4 style={{ fontSize: '18px', color: '#f8fafc', marginTop: '4px', fontFamily: 'var(--font-editorial)', fontStyle: 'italic' }}>
                "{selectedSpeaker.talkTitle}"
              </h4>
            </div>

            <div style={{ marginBottom: '28px' }}>
              <span style={{ fontSize: '11px', color: '#64748b', fontFamily: 'var(--font-mono)', fontWeight: 700, letterSpacing: '0.1em' }}>
                MERAKI ESSENCE & ABSTRACT
              </span>
              <p style={{ fontSize: '15px', color: '#cbd5e1', lineHeight: 1.7, marginTop: '8px' }}>
                {selectedSpeaker.abstract}
              </p>
            </div>

            <button
              onClick={() => setSelectedSpeaker(null)}
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              Close Details
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
