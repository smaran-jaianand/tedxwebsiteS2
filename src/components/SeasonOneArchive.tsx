import { ArrowDown, ArrowUpRight, Play, Sparkles } from 'lucide-react';
import { sitePath } from '../sitePath';

const SEASON_FILM = 'https://youtu.be/cyWL7FdgzK4?si=BgvS-h4XrWbjT660';

const GALLERY = [
  { src: 'season1/img/sliderimgs/maingate.jpeg', label: 'The threshold', size: 'wide' },
  { src: 'season1/img/sliderimgs/audi.jpeg', label: 'The red circle', size: 'tall' },
  { src: 'season1/img/sliderimgs/insideaudi.jpeg', label: 'Before the first word', size: 'standard' },
  { src: 'season1/img/sliderimgs/allhostels.jpeg', label: 'A campus gathering', size: 'wide' },
  { src: 'season1/img/sliderimgs/hostel.jpeg', label: 'Beyond the horizon', size: 'standard' },
];

const SPEAKERS = [
  {
    name: 'Dr. Vidya Yeravdekar',
    role: 'Pro Chancellor · Symbiosis International (Deemed University)',
    image: 'season1/img/simgs/vidya.png',
    note: 'An education leader whose work has helped grow Symbiosis into a globally connected academic community.',
  },
  {
    name: 'Dr. Ramakrishnan Raman',
    role: 'Vice Chancellor · Symbiosis International (Deemed University)',
    image: 'season1/img/simgs/raman.JPG',
    note: 'An academic leader exploring how technology, research and interdisciplinary learning can reshape higher education.',
    talk: 'Reimagining Indian Universities in the Age of AI',
    video: 'https://www.youtube.com/watch?v=4K_enn6yjbU',
  },
  {
    name: 'Sandeep Chatterjee',
    role: 'Supply Chain & Sustainability · IBM Consulting',
    image: 'season1/img/simgs/sandeep.jpg',
    note: 'A supply-chain and sustainability practitioner working where responsible systems meet business transformation.',
  },
  {
    name: 'Harsha Durugadda',
    role: 'Sculptor',
    image: 'season1/img/simgs/harsha-d.jpg',
    note: 'An award-winning sculptor whose practice moves between material, public space and the way we experience art.',
  },
  {
    name: 'Saurabh Sharma',
    role: 'Managing Director · JSSB Legal',
    image: 'season1/img/simgs/saurabh.jpeg',
    note: 'An advocate and legal leader bringing two decades of experience to conversations about law, enterprise and society.',
  },
  {
    name: 'Emmanuel Gosula',
    role: 'Senior Manager, People Partner · EPAM Systems',
    image: 'season1/img/simgs/emmanual.jpeg',
    note: 'A people leader focused on culture, talent and the human systems that make ambitious organisations work.',
  },
  {
    name: 'Kumar Rajagopalan',
    role: 'Vice President & Country Head · Dexian India',
    image: 'season1/img/simgs/kumar.jpg',
    note: 'A technology leader connecting India’s intellectual inheritance with the rise of modern innovation hubs.',
    talk: 'From Ancient Wisdom to India’s Innovation Hubs',
    video: 'https://www.youtube.com/watch?v=exhFeQg0sro',
  },
  {
    name: 'Anjaneyulu Pillalamarri',
    role: 'Co-founder & CEO · Giosun Healthcare',
    image: 'season1/img/simgs/anjan.jpg',
    note: 'An entrepreneur who carried decades of pharmaceutical experience into a purpose-led approach to holistic healthcare.',
    talk: 'From Pharma to Purpose',
    video: 'https://www.youtube.com/watch?v=k7eJC-qlE-A',
  },
  {
    name: 'Galla Madhavi',
    role: 'Director · Vikaas Hospitals',
    image: 'season1/img/simgs/Madhavi.jpg',
    note: 'A healthcare leader whose story places optimism, community and service at the centre of meaningful progress.',
    talk: "Positive Mindset in Today’s Society",
    video: 'https://www.youtube.com/watch?v=kFRpbk3KFqQ',
  },
  {
    name: 'Dr. Sudeendra Koushik',
    role: 'Chief Innovator & Founder · Innovation by Design',
    image: 'season1/img/simgs/SK.jpeg',
    note: 'An inventor and innovation strategist examining what remains uniquely human as AI changes the creative process.',
    talk: 'Art of Innovation in the Era of AI',
    video: 'https://www.youtube.com/watch?v=pKjjlKcWfHY',
  },
  {
    name: 'Ansuman Pattanayak',
    role: 'Founder & CEO · QED Classes',
    image: 'season1/img/simgs/ansuman.jpg',
    note: 'An educator and mentor known for making demanding ideas approachable, memorable and alive for learners.',
  },
];

export const SeasonOneArchive = () => (
  <div className="s1-archive-page">
    <section className="s1-archive-hero" id="archive-top">
      <video
        className="s1-archive-hero__film"
        src={sitePath('season1/img/horizon.mp4')}
        poster={sitePath('season1/img/sliderimgs/audi.jpeg')}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />
      <div className="s1-archive-hero__wash" />
      <div className="s1-archive-hero__grain" />

      <div className="s1-archive-hero__meta" aria-label="Season 1 event details">
        <span>TEDxSIU HYDERABAD</span>
        <span>04 · 09 · 2025</span>
        <span>BEYOND HORIZON</span>
      </div>

      <div className="s1-archive-hero__copy">
        <p className="s1-archive-kicker"><Sparkles size={14} /> The story before Meraki</p>
        <h1 className="editorial-heading">
          The first<br />
          <em>red circle.</em>
        </h1>
        <p className="s1-archive-hero__lede">
          One stage. Eleven voices. The day TEDxSIU Hyderabad stepped beyond the horizon.
        </p>
        <div className="s1-archive-hero__actions">
          <a className="s1-archive-link s1-archive-link--red cursor-target" href="#archive-gallery">
            Enter the archive <ArrowDown size={17} />
          </a>
          <a className="s1-archive-link cursor-target" href={SEASON_FILM} target="_blank" rel="noopener noreferrer">
            <Play size={16} fill="currentColor" /> Watch the season film
          </a>
        </div>
      </div>

      <div className="s1-archive-hero__index" aria-hidden="true">
        <span>SEASON</span><strong>01</strong>
      </div>
    </section>

    <section className="s1-archive-intro" aria-labelledby="s1-intro-title">
      <div className="s1-archive-intro__stamp"><span>THE</span><strong>ORIGIN</strong><span>ARCHIVE</span></div>
      <div className="s1-archive-intro__copy">
        <p className="s1-archive-overline">A GLIMPSE OF SEASON ONE · HYDERABAD</p>
        <h2 id="s1-intro-title" className="editorial-heading">Before we asked what comes next, <em>we looked beyond.</em></h2>
      </div>
      <p className="s1-archive-intro__body">
        Beyond Horizon brought leaders, artists, educators and builders into the same room. This is not the old website—it is the living record of where the TEDxSIU Hyderabad story began.
      </p>
    </section>

    <section className="s1-archive-gallery" id="archive-gallery" aria-labelledby="archive-gallery-title">
      <header className="s1-archive-section-head">
        <div><span>01 / 03</span><p>Visual record</p></div>
        <h2 id="archive-gallery-title" className="editorial-heading">Fragments from <em>the first day.</em></h2>
      </header>
      <div className="s1-archive-mosaic">
        {GALLERY.map((item, index) => (
          <figure className={`s1-archive-mosaic__item s1-archive-mosaic__item--${item.size}`} key={item.src}>
            <img src={sitePath(item.src)} alt={item.label} loading={index > 1 ? 'lazy' : 'eager'} decoding="async" />
            <figcaption><span>0{index + 1}</span>{item.label}</figcaption>
          </figure>
        ))}
      </div>
      <div className="s1-archive-ticker" aria-hidden="true">
        <div>BEYOND HORIZON <i>✦</i> ELEVEN VOICES <i>✦</i> ONE RED CIRCLE <i>✦</i> 04.09.2025 <i>✦</i> BEYOND HORIZON <i>✦</i> ELEVEN VOICES <i>✦</i></div>
      </div>
    </section>

    <section className="s1-archive-voices" id="archive-voices" aria-labelledby="archive-voices-title">
      <header className="s1-archive-section-head s1-archive-section-head--voices">
        <div><span>02 / 03</span><p>The inaugural voices</p></div>
        <h2 id="archive-voices-title" className="editorial-heading">Ideas that crossed <em>the horizon.</em></h2>
      </header>

      <div className="s1-archive-speakers">
        {SPEAKERS.map((speaker, index) => (
          <article className="s1-speaker" key={speaker.name}>
            <div className="s1-speaker__portrait">
              <img src={sitePath(speaker.image)} alt={speaker.name} loading="lazy" decoding="async" />
              <span className="s1-speaker__number">{String(index + 1).padStart(2, '0')}</span>
              {speaker.video && <span className="s1-speaker__available">Talk online</span>}
            </div>
            <div className="s1-speaker__body">
              <p className="s1-speaker__role">{speaker.role}</p>
              <h3>{speaker.name}</h3>
              {speaker.talk && <p className="s1-speaker__talk">“{speaker.talk}”</p>}
              <p className="s1-speaker__note">{speaker.note}</p>
              <a
                className="s1-speaker__watch cursor-target"
                href={speaker.video || SEASON_FILM}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${speaker.video ? 'Watch talk by' : 'Watch the Season 1 film featuring'} ${speaker.name}`}
              >
                <Play size={14} fill="currentColor" />
                {speaker.video ? 'Watch the talk' : 'Watch the season film'}
                <ArrowUpRight size={15} />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>

    <section className="s1-archive-epilogue" aria-labelledby="archive-epilogue-title">
      <div className="s1-archive-epilogue__number" aria-hidden="true">01→02</div>
      <p>03 / 03 · THE STORY CONTINUES</p>
      <h2 id="archive-epilogue-title" className="editorial-heading">The horizon was only <em>the beginning.</em></h2>
      <a className="s1-archive-link s1-archive-link--red cursor-target" href={sitePath()}>
        Return to Season 2 <ArrowUpRight size={17} />
      </a>
    </section>
  </div>
);

export default SeasonOneArchive;
