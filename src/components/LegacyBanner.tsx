import { ArrowUpRight, Film, History } from 'lucide-react';

const ARCHIVE_IMAGES = [
  { src: '/season1/img/simgs/anjan.jpg', alt: 'Season 1 TEDxSIU speaker' },
  { src: '/season1/img/sliderimgs/insideaudi.jpeg', alt: 'Season 1 auditorium' },
  { src: '/season1/img/profileimgs/adwita.jpg', alt: 'Season 1 organising team member' },
  { src: '/season1/img/simgs/emmanual.jpeg', alt: 'Season 1 TEDxSIU speaker' },
  { src: '/season1/img/sliderimgs/maingate.jpeg', alt: 'Symbiosis campus entrance' },
  { src: '/season1/img/simgs/sandeep.jpg', alt: 'Season 1 TEDxSIU speaker' },
  { src: '/season1/img/profileimgs/riya-sit.jpg', alt: 'Season 1 organising team member' },
  { src: '/season1/img/simgs/harsha-d.jpg', alt: 'Season 1 TEDxSIU speaker' },
];

export const LegacyBanner = () => {
  return (
    <section id="season1" className="season-one-archive">
      <div className="season-one-gallery-wrap">
        <div className="season-one-gallery__heading" aria-hidden="true">
          <span>THE ARCHIVE</span>
          <h2>Season <em>01</em></h2>
        </div>

        <div className="season-one-gallery" aria-label="Season 1 archive highlights">
          {ARCHIVE_IMAGES.map(image => (
            <div className="season-one-gallery__item" key={image.src}>
              <img src={image.src} alt={image.alt} loading="lazy" decoding="async" />
            </div>
          ))}
        </div>
      </div>

      <div className="container season-one-archive__summary">
        <div>
          <div className="season-one-archive__eyebrow"><History size={14} /> HONORING THE GENESIS</div>
          <h2>Before Meraki: <span className="text-ted-red">Season 1</span></h2>
          <p>
            The inaugural TEDxSIU Hyderabad gathering established the red circle that Season 2 now carries forward.
          </p>
        </div>
        <a href="/season1/index.html" target="_blank" rel="noopener noreferrer" className="btn-primary cursor-target">
          <Film size={16} />
          Launch Season 1 Archive
          <ArrowUpRight size={16} />
        </a>
      </div>
    </section>
  );
};

export default LegacyBanner;
