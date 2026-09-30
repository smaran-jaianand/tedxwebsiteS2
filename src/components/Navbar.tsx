import React, { useState, useEffect, useRef } from 'react';
import { Ticket, History, ArrowUpRight, Sparkles } from 'lucide-react';
import { sitePath } from '../sitePath';

interface NavbarProps {
  activePage: 'home' | 'speakers' | 'team';
}

export const Navbar: React.FC<NavbarProps> = ({ activePage }) => {
  const [scrolled, setScrolled] = useState(false);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (frameRef.current !== null) return;
      frameRef.current = requestAnimationFrame(() => {
        const nextScrolled = window.scrollY > 30;
        setScrolled(current => (current === nextScrolled ? current : nextScrolled));
        frameRef.current = null;
      });
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const isHome = activePage === 'home';
  const disabledNavLinkStyle: React.CSSProperties = {
    color: '#525866',
    fontFamily: 'var(--font-mono)',
    fontSize: '11px',
    fontWeight: 700,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    cursor: 'not-allowed',
    opacity: 0.62,
    userSelect: 'none',
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: 'all 0.4s ease',
        background: scrolled ? 'var(--nav-bg)' : 'transparent',
        backdropFilter: scrolled ? 'blur(6px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border-subtle)' : '1px solid transparent',
        boxShadow: scrolled ? '0 4px 20px rgba(0, 0, 0, 0.4)' : 'none',
        padding: scrolled ? '12px 0' : '20px 0',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        
        {/* TEDx Logo + Meraki pill */}
        <a
          href={isHome ? '#hero' : sitePath()}
          className="cursor-target"
          style={{ display: 'flex', alignItems: 'center', gap: '14px', textDecoration: 'none' }}
        >
          <img
            src={sitePath('theme/tedx_siuh_logo.png')}
            alt="TEDx SIU Hyderabad"
            style={{
              height: '34px',
              width: 'auto',
              objectFit: 'contain',
              filter: 'none',
            }}
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="meraki-title" style={{ fontSize: '15px', color: 'var(--text-main)', letterSpacing: '0.22em' }}>
              meraki
            </span>
            <span
              style={{
                fontSize: '10px',
                padding: '2px 8px',
                borderRadius: '9999px',
                background: 'rgba(235, 0, 40, 0.15)',
                border: '1px solid rgba(235, 0, 40, 0.4)',
                color: 'var(--ted-red-light)',
                fontFamily: 'var(--font-mono)',
                fontWeight: 700,
                letterSpacing: '0.08em',
              }}
            >
              9TH OCT
            </span>
          </div>
        </a>

        {/* Page links, season switcher & claim pass */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>

          <nav className="navbar-page-links" aria-label="Season 2 pages">
            <span aria-disabled="true" title="Speakers coming soon" style={disabledNavLinkStyle}>Speakers</span>
            <span aria-disabled="true" title="Team page coming soon" style={disabledNavLinkStyle}>Team</span>
          </nav>
          
          {/* Season Switcher Pill */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              background: 'var(--bg-surface)',
              padding: '3px',
              borderRadius: '9999px',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <a
              href={sitePath('season1/index.html')}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-target"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '6px 14px',
                fontSize: '12px',
                color: 'var(--text-muted)',
                textDecoration: 'none',
                borderRadius: '9999px',
                transition: 'all 0.2s',
                fontWeight: 500,
              }}
              title="Visit Season 1 Archive"
            >
              <History size={12} />
              <span className="season-txt">Season 1</span> <ArrowUpRight size={11} />
            </a>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '6px 14px',
                fontSize: '12px',
                color: '#ffffff',
                background: 'var(--ted-red)',
                borderRadius: '9999px',
                fontWeight: 700,
              }}
            >
              <Sparkles size={11} />
              Season 2
            </span>
          </div>

          {/* Claim Pass Button */}
          <button
            type="button"
            disabled
            aria-disabled="true"
            title="Claim Pass coming soon"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 22px',
              borderRadius: '9999px',
              border: '1px solid #4b5563',
              background: 'rgba(71, 85, 105, 0.12)',
              color: '#6b7280',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'not-allowed',
              opacity: 0.68,
            }}
          >
            <Ticket size={15} />
            <span>Claim Pass · Soon</span>
          </button>

        </div>

      </div>

      <style>{`
        @media (max-width: 600px) {
          .season-txt { display: none; }
        }
        .navbar-page-links {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        @media (max-width: 900px) {
          .navbar-page-links { display: none; }
        }
      `}</style>
    </header>
  );
};

export default Navbar;
