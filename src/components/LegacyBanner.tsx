import { useRef } from 'react';
import { ArrowUpRight, Film, History } from 'lucide-react';
import { sitePath } from '../sitePath';

const ARCHIVE_IMAGES = [
  { src: sitePath('season1/img/sliderimgs/maingate.jpeg'), alt: 'Entrance to the SIU Hyderabad campus' },
  { src: sitePath('season1/img/simgs/raman.JPG'), alt: 'Season 1 speaker on the TEDxSIU Hyderabad stage' },
  { src: sitePath('season1/img/sliderimgs/audi.jpeg'), alt: 'SIU Hyderabad auditorium' },
  { src: sitePath('season1/img/simgs/harsha-d.jpg'), alt: 'Season 1 sculptor Harsha Durugadda' },
  { src: sitePath('season1/img/sliderimgs/insideaudi.jpeg'), alt: 'Inside the Season 1 auditorium' },
  { src: sitePath('season1/img/simgs/Madhavi.jpg'), alt: 'Season 1 speaker Galla Madhavi' },
  { src: sitePath('season1/img/sliderimgs/allhostels.jpeg'), alt: 'SIU Hyderabad campus buildings' },
  { src: sitePath('season1/img/simgs/anjan.jpg'), alt: 'Season 1 speaker Anjaneyulu Pillalamarri' },
];

export const LegacyBanner = () => {
  const cursorHintRef = useRef<HTMLSpanElement>(null);

  const moveHint = (event: React.PointerEvent<HTMLAnchorElement>) => {
    const hint = cursorHintRef.current;
    if (!hint) return;
    const rect = event.currentTarget.getBoundingClientRect();
    hint.style.transform = `translate3d(${event.clientX - rect.left + 18}px, ${event.clientY - rect.top + 18}px, 0) scale(1)`;
  };

  return (
    <section id="season1" className="season-one-archive">
      <a
        href={sitePath('?page=archive')}
        className="season-one-gallery-link cursor-target"
        onPointerMove={moveHint}
        aria-label="Visit the Season 1 Glimpse"
      >
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
          <span ref={cursorHintRef} className="season-one-gallery__cursor-hint" aria-hidden="true">
            Visit Season 1 <ArrowUpRight size={14} />
          </span>
        </div>
      </a>

      <div className="container season-one-archive__summary">
        <div>
          <div className="season-one-archive__eyebrow"><History size={14} /> HONORING THE GENESIS</div>
          <h2 className="editorial-heading">Before <span className="meraki-wordmark">Meraki</span>: <em>Season 1</em></h2>
          <p>
            The inaugural TEDxSIU Hyderabad gathering established the red circle that Season 2 now carries forward.
          </p>
        </div>
        <a href={sitePath('?page=archive')} className="btn-primary cursor-target">
          <Film size={16} />
          Launch Season 1 Glimpse
          <ArrowUpRight size={16} />
        </a>
      </div>
    </section >
  );
};

export default LegacyBanner;
