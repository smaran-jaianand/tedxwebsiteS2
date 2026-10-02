import React from 'react';
import DriftWall, { type DriftWallItem } from './DriftWall';
import { sitePath } from '../sitePath';

const PLACEHOLDER_IMAGES = [
  sitePath('placeholders/meraki-01.svg'),
  sitePath('placeholders/meraki-02.svg'),
  sitePath('placeholders/meraki-03.svg'),
  sitePath('placeholders/meraki-04.svg'),
  sitePath('placeholders/meraki-05.svg'),
];

const GALLERY_ITEMS: DriftWallItem[] = Array.from({ length: 15 }, (_, index) => ({
  image: PLACEHOLDER_IMAGES[index % PLACEHOLDER_IMAGES.length],
  title: 'Season 2 visual placeholder',
}));

export const MerakiGallery: React.FC = () => {
  return (
    <section id="gallery" style={{ padding: '80px 0 100px', position: 'relative', overflow: 'hidden' }}>
      <div className="container" style={{ marginBottom: '40px', textAlign: 'center' }}>
        <h2 className="editorial-heading" style={{ fontSize: 'clamp(30px, 4.5vw, 46px)', fontFamily: 'var(--font-classical)', color: 'var(--text-main)', marginBottom: '12px' }}>
          Visual Echoes of <span className="text-gradient-meraki meraki-wordmark">Meraki</span>
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '16px', fontFamily: 'var(--font-editorial)', fontStyle: 'italic', maxWidth: '640px', margin: '0 auto' }}>
          Season 2 photographs and visual stories will appear here as they are released.
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
