import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { sitePath } from '../sitePath';

interface Speaker {
  name: string;
  role?: string;
  image: string;
  position?: string;
}

const speakers: Speaker[] = [
  {
    name: 'Kotilingeshwar Rao Vudhari',
    role: 'COO, Cloud4C',
    image: 'speakers/koti-optimized.jpg',
    position: '50% 30%',
  },
  {
    name: 'Anusha Varri',
    role: 'Master of Ceremonies · Singer · Performer',
    image: 'speakers/anusha.jpg',
    position: '50% 24%',
  },
  {
    name: 'Lokesh Arukala',
    role: 'Founder, Grox Digital · Creator Mentor',
    image: 'speakers/lokesh-optimized.jpg',
    position: '50% 28%',
  },
  {
    name: 'Abhigna Yanaganti',
    role: 'Singer & Performer',
    image: 'speakers/abhigna-yanaganti-optimized.jpg',
    position: '50% 25%',
  },
  {
    name: 'Baranidharan R',
    role: 'AI & Technology Leader · Dexian India',
    image: 'speakers/baranidharan-r-optimized.jpg',
    position: '50% 24%',
  },
  {
    name: 'Trishla Poogalia',
    image: 'speakers/trishla-poogalia-optimized.jpg',
    position: '50% 25%',
  },
  {
    name: 'Tej',
    image: 'speakers/tej-optimized.jpg',
    position: '50% 24%',
  },
];

export const Speakers: React.FC = () => (
  <section className="speakers-page" aria-labelledby="speakers-heading">
    <header className="speakers-page__hero">
      <div className="container speakers-page__hero-inner">
        <a className="speakers-page__back" href={sitePath()}>
          <ArrowLeft size={16} aria-hidden="true" />
          Back to Meraki
        </a>
        <p className="speakers-page__kicker">TEDxSIU Hyderabad · Season 2</p>
        <h1 id="speakers-heading">Voices of<br /><em>Meraki.</em></h1>
        <p className="speakers-page__lede">
          Seven people. Seven lived perspectives. One red circle shaped by
          purpose, craft, and the courage to share an idea.
        </p>
      </div>
    </header>

    <div className="container speakers-page__roster">
      <div className="speakers-page__roster-heading">
        <span>01 — 07</span>
        <h2>Meet the speakers</h2>
        <p>9 October 2026 · SIU Hyderabad Auditorium</p>
      </div>

      <div className="speaker-grid">
        {speakers.map((speaker, index) => (
          <article
            className="speaker-card"
            key={speaker.name}
            style={{ '--speaker-index': index } as React.CSSProperties}
          >
            <div className="speaker-card__portrait">
              <img
                src={sitePath(speaker.image)}
                alt={`Portrait of ${speaker.name}`}
                loading={index < 3 ? 'eager' : 'lazy'}
                decoding="async"
                fetchPriority={index === 0 ? 'high' : 'auto'}
                style={{ objectPosition: speaker.position }}
              />
              <span className="speaker-card__number" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>
            <div className="speaker-card__copy">
              <h3>{speaker.name}</h3>
              {speaker.role && <p>{speaker.role}</p>}
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default Speakers;
