import React from 'react';
import DriftWall, { type DriftWallItem } from './DriftWall';
import { sitePath } from '../sitePath';

const GALLERY_ITEMS: DriftWallItem[] = [
  { image: sitePath('theme/poster_meraki.png'), title: 'Persephone & Hades Mythos' },
  { image: sitePath('theme/renaissance_creation.jpg'), title: 'Soul. Creativity. Love.' },
  { image: sitePath('theme/halo_renaissance.png'), title: 'Devotion to Craft' },
  { image: sitePath('brand/sliderimgs/audi.jpeg'), title: 'SIUH Main Auditorium' },
  { image: sitePath('brand/sliderimgs/insideaudi.jpeg'), title: 'The Red Circle Stage' },
  { image: sitePath('brand/sliderimgs/maingate.jpeg'), title: 'SIUH Grand Campus' },
  { image: sitePath('brand/sliderimgs/allhostels.jpeg'), title: 'Campus Sanctuary' },
  { image: sitePath('brand/sliderimgs/hostel.jpeg'), title: 'Academic Life' },
  { image: sitePath('brand/tedxsiuhyd.jpg'), title: 'TEDxSIU Hyderabad' },
  { image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80', title: 'Dr. Helene Vassos' },
  { image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80', title: 'Arjun Somayaji' },
  { image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80', title: 'Dr. Thalia Sterling' },
  { image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80', title: 'Lysander Croft' },
  { image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80', title: 'Meera Nambiar' },
  { image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=600&q=80', title: 'Ideas Worth Spreading' },
];

export const MerakiGallery: React.FC = () => {
  return (
    <section id="gallery" style={{ padding: '80px 0 100px', position: 'relative', overflow: 'hidden' }}>
      <div className="container" style={{ marginBottom: '40px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(30px, 4.5vw, 46px)', fontFamily: 'var(--font-classical)', color: 'var(--text-main)', marginBottom: '12px' }}>
          Visual Echoes of <span className="text-gradient-meraki">Meraki</span>
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '16px', fontFamily: 'var(--font-editorial)', fontStyle: 'italic', maxWidth: '640px', margin: '0 auto' }}>
          An endless 3D drifting tapestry of campus heritage, Hellenic mythos, and orators converging on 9th October.
        </p>
      </div>

      <div style={{ height: 600, position: 'relative', overflow: 'hidden' }}>
        <DriftWall
          items={GALLERY_ITEMS}
          columns={5}
          tileWidth={200}
          tileHeight={132}
          gap={18}
          tilt={16}
          turn={-14}
          perspective={1200}
          depth={120}
          speed={42}
          direction="up"
          variance={0.45}
          parallax={0.6}
          lift={64}
          fade={0.6}
          dim={0.55}
          overlayColor="#060010"
          radius={14}
          roll={0}
          pauseOnHover={false}
          grayscale={false}
        />
      </div>
    </section>
  );
};

export default MerakiGallery;
