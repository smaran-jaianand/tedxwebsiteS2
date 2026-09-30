import React from 'react';
import { ArrowUpRight, Heart, Globe, Mail, Feather } from 'lucide-react';
import { currentRoute, sitePath } from '../sitePath';

export const Footer: React.FC = () => {
  const isHome = currentRoute() === '/';
  const homeHref = (anchor: string) => (isHome ? anchor : sitePath(anchor));

  return (
    <footer
      style={{
        background: '#040406',
        borderTop: '1px solid rgba(226, 193, 124, 0.15)',
        paddingTop: '80px',
        paddingBottom: '40px',
        position: 'relative',
        zIndex: 10,
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '48px',
            marginBottom: '64px',
          }}
        >
          {/* Brand Col */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <img
                src={sitePath('theme/tedx_siuh_logo.png')}
                alt="TEDx SIU Hyderabad"
                style={{ height: '34px', width: 'auto', objectFit: 'contain' }}
              />
              <span className="meraki-title" style={{ fontSize: '14px', color: 'var(--greek-gold)' }}>
                meraki
              </span>
            </div>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)', fontFamily: 'var(--font-editorial)', fontStyle: 'italic', lineHeight: 1.7, marginBottom: '20px' }}>
              "To do something with soul, creativity, or love; to put something of yourself into your work."
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <SocialIcon href="https://instagram.com" label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </SocialIcon>
              <SocialIcon href="https://youtube.com" label="YouTube">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><polygon points="10 15 15 12 10 9 10 15"/></svg>
              </SocialIcon>
              <SocialIcon href="https://linkedin.com" label="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </SocialIcon>
              <SocialIcon href="https://x.com" label="X">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"/><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/></svg>
              </SocialIcon>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: '14px', color: 'var(--greek-gold)', marginBottom: '20px', fontFamily: 'var(--font-classical)', letterSpacing: '0.08em' }}>
              SEASON 2: MERAKI
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li><a href={homeHref('#hero')} style={footerLinkStyle}>Prologue (9th Oct)</a></li>
              <li><a href={homeHref('#theme')} style={footerLinkStyle}>The Meraki Creed</a></li>
              <li><a href={sitePath('?page=speakers')} style={footerLinkStyle}>Season 2 Speakers</a></li>
              <li><span aria-disabled="true" style={disabledFooterLinkStyle}>Team — coming soon</span></li>
              <li><a href={homeHref('#schedule')} style={footerLinkStyle}>The Itinerary of Acts</a></li>
              <li><a href={homeHref('#venue')} style={footerLinkStyle}>SIU Hyderabad Campus</a></li>
            </ul>
          </div>

          {/* Legacy Archives */}
          <div>
            <h4 style={{ fontSize: '14px', color: 'var(--ted-red-light)', marginBottom: '20px', fontFamily: 'var(--font-classical)', letterSpacing: '0.08em' }}>
              SEASON 1 LEGACY
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li>
                <a href={sitePath('season1/index.html')} target="_blank" rel="noopener noreferrer" style={{ ...footerLinkStyle, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  Season 1 Homepage <ArrowUpRight size={14} />
                </a>
              </li>
              <li>
                <a href={sitePath('season1/speakers.html')} target="_blank" rel="noopener noreferrer" style={{ ...footerLinkStyle, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  Inaugural Speakers <ArrowUpRight size={14} />
                </a>
              </li>
              <li>
                <a href={sitePath('season1/team.html')} target="_blank" rel="noopener noreferrer" style={{ ...footerLinkStyle, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  Founding Team <ArrowUpRight size={14} />
                </a>
              </li>
            </ul>
          </div>

          {/* Organization Info */}
          <div>
            <h4 style={{ fontSize: '14px', color: '#fff', marginBottom: '20px', fontFamily: 'var(--font-classical)', letterSpacing: '0.08em' }}>
              HOST INSTITUTION
            </h4>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '14px' }}>
              Symbiosis International (Deemed University), Hyderabad Campus.
            </p>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.6, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Mail size={14} color="var(--greek-gold)" /> Inquiries: <span style={{ color: '#fff' }}>tedx@siuh.edu.in</span>
            </p>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.6, display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px' }}>
              <Globe size={14} color="var(--greek-gold)" /> Official: <span style={{ color: '#fff' }}>siuh.edu.in</span>
            </p>
          </div>
        </div>

        {/* License & Copyright */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            paddingTop: '28px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            fontSize: '12px',
            color: '#64748b',
          }}
        >
          <p>
            This independent TEDx event is operated under license from TED.
          </p>
          <p style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--greek-gold)' }}>
            <Feather size={14} /> Conceived with <Heart size={13} color="var(--ted-red)" fill="var(--ted-red)" /> by TEDxSIU Hyderabad Community
          </p>
        </div>

      </div>
    </footer>
  );
};

const SocialIcon = ({ href, label, children }: { href: string; label: string; children: React.ReactNode }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    style={{
      width: '38px',
      height: '38px',
      borderRadius: '50%',
      background: 'rgba(255, 255, 255, 0.04)',
      border: '1px solid rgba(226, 193, 124, 0.2)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#cbd5e1',
      transition: 'all 0.2s ease',
      textDecoration: 'none',
    }}
  >
    {children}
  </a>
);

const footerLinkStyle: React.CSSProperties = {
  color: '#94a3b8',
  textDecoration: 'none',
  fontSize: '14px',
  transition: 'color 0.2s ease',
};

const disabledFooterLinkStyle: React.CSSProperties = {
  ...footerLinkStyle,
  color: '#4b5563',
  cursor: 'not-allowed',
  opacity: 0.68,
};
