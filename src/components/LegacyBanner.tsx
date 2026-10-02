import { ArrowUpRight, Film, History } from 'lucide-react';
import { sitePath } from '../sitePath';

const ARCHIVE_IMAGES = [
  { src: sitePath('placeholders/meraki-01.svg'), alt: 'Archive image placeholder' },
  { src: sitePath('placeholders/meraki-02.svg'), alt: 'Archive image placeholder' },
  { src: sitePath('placeholders/meraki-03.svg'), alt: 'Archive image placeholder' },
  { src: sitePath('placeholders/meraki-04.svg'), alt: 'Archive image placeholder' },
  { src: sitePath('placeholders/meraki-05.svg'), alt: 'Archive image placeholder' },
  { src: sitePath('placeholders/meraki-02.svg'), alt: 'Archive image placeholder' },
  { src: sitePath('placeholders/meraki-04.svg'), alt: 'Archive image placeholder' },
  { src: sitePath('placeholders/meraki-01.svg'), alt: 'Archive image placeholder' },
];

export const LegacyBanner = () => {
  return (
    <section id="season1" className="season-one-archive">
      <div className="season-one-gallery-wrap">
        <div className="season-one-gallery__heading" aria-hidden="true">
          <span>THE ARCHIVE</span>
          <h2 className="editorial-heading">Season <em>01</em></h2>
        </div>

        <div className="season-one-gallery" aria-label="Season 1 archive highlights">
          {ARCHIVE_IMAGES.map((image, index) => (
            <div className="season-one-gallery__item" key={`${image.src}-${index}`}>
              <img src={image.src} alt={image.alt} loading="lazy" decoding="async" />
            </div>
          ))}
        </div>
      </div>

      <div className="container season-one-archive__summary">
        <div>
          <div className="season-one-archive__eyebrow"><History size={14} /> HONORING THE GENESIS</div>
          <h2 className="editorial-heading">Before <span className="meraki-wordmark">Meraki</span>: <em>Season 1</em></h2>
          <p>
            The inaugural TEDxSIU Hyderabad gathering established the red circle that Season 2 now carries forward.
          </p>
        </div>
        <a href={sitePath('season1/index.html')} target="_blank" rel="noopener noreferrer" className="btn-primary cursor-target">
          <Film size={16} />
          Launch Season 1 Archive
          <ArrowUpRight size={16} />
        </a>
      </div>
    </section>
  );
};

export default LegacyBanner;
