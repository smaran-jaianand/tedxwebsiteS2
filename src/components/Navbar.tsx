import React, { useState, useEffect, useRef } from 'react';
import { Ticket, History, ArrowUpRight, Sparkles } from 'lucide-react';
import { sitePath } from '../sitePath';

interface NavbarProps {
  activePage: 'home' | 'speakers' | 'team' | 'archive';
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
  const isArchive = activePage === 'archive';

  const navLinkStyle: React.CSSProperties = {
    color: activePage === 'speakers' ? 'var(--text-main)' : 'var(--text-muted)',
    fontFamily: 'var(--font-mono)',
    fontSize: '11px',
    fontWeight: 700,
    letterSpacing: '0.08em',
    textDecoration: 'none',
    textTransform: 'uppercase',
    transition: 'color 0.2s ease',
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
        background: '#000000',
        backdropFilter: 'none',
        borderBottom: '1px solid var(--border-subtle)',
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
            alt="TEDxSIU Hyderabad"
            className="navbar-brand-logo"
            style={{
              height: scrolled ? '72px' : '80px',
              width: 'auto',
              objectFit: 'contain',
              filter: 'none',
              transition: 'height 0.3s ease',
            }}
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <div className="navbar-brand-copy" style={{ display: 'flex', alignItems: 'center' }}>
            <span className="meraki-title" style={{ fontSize: '15px', color: 'var(--text-main)', letterSpacing: '0.22em' }}>
              meraki
            </span>
          </div>
        </a>

        {/* Page links, season switcher & claim pass */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>

          <nav className="navbar-page-links" aria-label="Season 2 pages">
            <a
              href={sitePath('?page=speakers')}
              aria-current={activePage === 'speakers' ? 'page' : undefined}
              style={navLinkStyle}
            >
              Speakers
            </a>
            <a href={sitePath('?page=team')} aria-current={activePage === 'team' ? 'page' : undefined}
              style={{ ...navLinkStyle, color: activePage === 'team' ? 'var(--text-main)' : 'var(--text-muted)' }}>
              Team
            </a>
          </nav>

          {/* Season 1 here opens the in-site Glimpse, not the legacy website. */}
          <div
            className="navbar-season-switcher"
            style={{
              display: 'flex',
              alignItems: 'center',
              background: 'var(--bg-surface)',
              padding: '3px',
              borderRadius: '9999px',
              border: '1px solid var(--border-subtle)',
            }}
          >
            {isArchive ? (
              <a
                href={sitePath()}
                className="cursor-target"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '6px 14px',
                  fontSize: '12px', color: 'var(--text-muted)', textDecoration: 'none',
                  borderRadius: '9999px', fontWeight: 500,
                }}
              >
                <Sparkles size={11} /><span className="season2-txt">Season 2</span>
              </a>
            ) : (
              <span
                aria-current="page"
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
                <span className="season2-txt">Season 2</span>
              </span>
            )}
            {isArchive ? (
              <span
                aria-current="page"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '6px 14px',
                  fontSize: '12px', color: '#fff', background: 'var(--ted-red)',
                  borderRadius: '9999px', fontWeight: 700,
                }}
              >
                <History size={12} /><span className="season-txt">Season 1</span>
              </span>
            ) : (
              <a
                href={sitePath('?page=archive')}
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
                title="Visit the Season 1 Glimpse"
              >
                <History size={12} />
                <span className="season-txt">Season 1</span> <ArrowUpRight size={11} />
              </a>
            )}
          </div>

          {/* Claim Pass Button */}
          <button
            className="navbar-claim-pass"
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
          .navbar-brand-logo { height: 38px !important; }
          .season-txt { display: none; }
          .navbar-brand-copy,
          .navbar-claim-pass { display: none !important; }
          .navbar-season-switcher a,
          .navbar-season-switcher > span { padding: 6px 10px !important; }
          .season2-txt { font-size: 0; }
          .season2-txt::after { content: 'S2'; font-size: 12px; }
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
