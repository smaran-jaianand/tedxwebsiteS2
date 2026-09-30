import React from 'react';
import { Navigation, Bus, Plane, ShieldCheck } from 'lucide-react';

export const Venue: React.FC = () => {
  return (
    <section id="venue" className="section-padding" style={{ position: 'relative' }}>
      <div className="container">
        
        <div style={{ textAlign: 'center', maxWidth: '740px', margin: '0 auto 54px' }}>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontFamily: 'var(--font-classical)', marginBottom: '16px', letterSpacing: '0.04em' }}>
            Symbiosis International University <span className="text-gradient-meraki">Hyderabad</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '18px', fontFamily: 'var(--font-editorial)', fontStyle: 'italic' }}>
            A serene academic sanctuary on the outskirts of Hyderabad, providing an intimate amphitheater for 9th October.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '32px',
            alignItems: 'center',
          }}
        >
          {/* Venue Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="glass-panel" style={{ padding: '32px', border: '1px solid rgba(226, 193, 124, 0.25)' }}>
              <h3 style={{ fontSize: '22px', fontFamily: 'var(--font-classical)', color: '#fff', marginBottom: '10px' }}>
                Main Campus Auditorium
              </h3>
              <p style={{ fontSize: '14px', color: '#cbd5e1', lineHeight: 1.65, marginBottom: '22px' }}>
                Survey Number 292, Off Bangalore Highway, Modallaguda, Nandigama, Rangareddy Dist, Hyderabad, Telangana 509217.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '14px' }}>
                <div style={{ padding: '14px', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(226, 193, 124, 0.15)' }}>
                  <div style={{ fontSize: '11px', color: 'var(--greek-gold)', fontFamily: 'var(--font-classical)', letterSpacing: '0.06em' }}>CAPACITY</div>
                  <div style={{ fontSize: '18px', fontWeight: 800, color: '#fff', fontFamily: 'var(--font-classical)' }}>850 Delegates</div>
                </div>
                <div style={{ padding: '14px', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(226, 193, 124, 0.15)' }}>
                  <div style={{ fontSize: '11px', color: 'var(--greek-gold)', fontFamily: 'var(--font-classical)', letterSpacing: '0.06em' }}>ACOUSTICS</div>
                  <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--ted-red-light)', fontFamily: 'var(--font-classical)' }}>Spatial Dolby</div>
                </div>
              </div>
            </div>

            {/* Travel Guide */}
            <div className="glass-panel" style={{ padding: '26px', border: '1px solid rgba(226, 193, 124, 0.2)' }}>
              <h4 style={{ fontSize: '16px', fontFamily: 'var(--font-classical)', color: 'var(--greek-gold)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Navigation size={16} color="var(--greek-gold)" /> Journey Logistics
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px', color: '#cbd5e1' }}>
                  <Plane size={18} color="var(--greek-gold)" />
                  <span>35 mins from Rajiv Gandhi International Airport (HYD)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px', color: '#cbd5e1' }}>
                  <Bus size={18} color="var(--greek-gold)" />
                  <span>Exclusive morning transit shuttles from Hyderabad metro hubs</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px', color: '#cbd5e1' }}>
                  <ShieldCheck size={18} color="var(--greek-gold)" />
                  <span>Dedicated parking, credential verification & 24/7 security concierge</span>
                </div>
              </div>
            </div>
          </div>

          {/* Campus Imagery Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
            <div style={{ borderRadius: '18px', overflow: 'hidden', height: '200px', border: '1px solid rgba(226, 193, 124, 0.2)' }}>
              <img
                src="/brand/sliderimgs/audi.jpeg"
                alt="SIUH Auditorium"
                loading="lazy"
                decoding="async"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&w=600&q=80';
                }}
              />
            </div>
            <div style={{ borderRadius: '18px', overflow: 'hidden', height: '200px', border: '1px solid rgba(226, 193, 124, 0.2)' }}>
              <img
                src="/brand/sliderimgs/maingate.jpeg"
                alt="SIUH Main Gate"
                loading="lazy"
                decoding="async"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=600&q=80';
                }}
              />
            </div>
            <div style={{ borderRadius: '18px', overflow: 'hidden', height: '200px', gridColumn: 'span 2', border: '1px solid rgba(226, 193, 124, 0.2)' }}>
              <img
                src="/brand/sliderimgs/allhostels.jpeg"
                alt="SIUH Campus View"
                loading="lazy"
                decoding="async"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80';
                }}
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
