import React, { useState, useEffect } from 'react';
import { Ticket } from 'lucide-react';

interface CountdownSectionProps {
  onOpenRegister: () => void;
}

export const CountdownSection: React.FC<CountdownSectionProps> = ({ onOpenRegister }) => {
  // Official Event Date: 9th October 2026
  const targetDate = new Date('2026-10-09T09:00:00+05:30').getTime();
  const [timeLeft, setTimeLeft] = useState({ days: 16, hours: 22, minutes: 30, seconds: 15 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <section id="countdown" style={{ padding: '80px 0 100px', position: 'relative' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 40px' }}>
            <h2
              style={{
                fontSize: 'clamp(28px, 4.5vw, 44px)',
                fontFamily: 'var(--font-classical)',
                marginBottom: '12px',
                color: 'var(--text-main)',
                letterSpacing: '0.04em',
              }}
            >
              Counting Down to <span className="text-ted-red">9th October</span>
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '16px', fontFamily: 'var(--font-editorial)', fontStyle: 'italic' }}>
              When curtains rise on the red circle at Symbiosis International University Hyderabad.
            </p>
          </div>

          {/* Large Countdown Units */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
              gap: '16px',
              maxWidth: '720px',
              margin: '0 auto 48px',
            }}
          >
            <CountdownBox value={timeLeft.days} label="DAYS" />
            <CountdownBox value={timeLeft.hours} label="HOURS" />
            <CountdownBox value={timeLeft.minutes} label="MINUTES" />
            <CountdownBox value={timeLeft.seconds} label="SECONDS" isRed />
          </div>

          {/* Milestone Stats Bar & CTA */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '24px',
              borderTop: '1px solid var(--border-subtle)',
              paddingTop: '32px',
              maxWidth: '1120px',
              margin: '0 auto',
            }}
          >
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px' }}>
              <div>
                <div style={{ fontSize: '24px', fontWeight: 800, fontFamily: 'var(--font-classical)', color: 'var(--text-main)' }}>
                  12+
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Curated Orators</div>
              </div>
              <div>
                <div style={{ fontSize: '24px', fontWeight: 800, fontFamily: 'var(--font-classical)', color: 'var(--greek-gold)' }}>
                  850
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Seated Delegates</div>
              </div>
              <div>
                <div style={{ fontSize: '24px', fontWeight: 800, fontFamily: 'var(--font-classical)', color: 'var(--ted-red)' }}>
                  18 MIN
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Catalytic Talks</div>
              </div>
            </div>

            <button onClick={onOpenRegister} className="btn-primary cursor-target" style={{ padding: '12px 28px' }}>
              <Ticket size={16} />
              Reserve Your Seat Ahead of Curtains
            </button>
          </div>
      </div>
    </section>
  );
};

const CountdownBox = ({ value, label, isRed = false }: { value: number; label: string; isRed?: boolean }) => (
  <div
    style={{
      padding: '24px 16px',
      borderRadius: '16px',
      background: 'var(--bg-dark)',
      border: '1px solid var(--border-subtle)',
      textAlign: 'center',
      boxShadow: 'var(--card-shadow)',
    }}
  >
    <div
      style={{
        fontSize: 'clamp(38px, 6vw, 56px)',
        fontWeight: 900,
        fontFamily: 'var(--font-mono)',
        color: isRed ? 'var(--ted-red)' : 'var(--text-main)',
        lineHeight: 1,
        marginBottom: '8px',
      }}
    >
      {String(value).padStart(2, '0')}
    </div>
    <div
      style={{
        fontSize: '11px',
        color: 'var(--text-faint)',
        fontWeight: 700,
        letterSpacing: '0.12em',
        fontFamily: 'var(--font-mono)',
      }}
    >
      {label}
    </div>
  </div>
);
