import React, { useState } from 'react';
import { ArrowLeft, BookOpen, RotateCcw } from 'lucide-react';
import { sitePath } from '../sitePath';

interface Speaker {
  name: string;
  designation: string;
  bio?: string;
  image?: string;
  position?: string;
}

const speakers: Speaker[] = [
  {
    name: 'Abhigna Yanaganti',
    designation: 'Artist',
    image: 'speakers/abhigna-yanaganti-optimized.jpg',
    position: '50% 25%',
    bio: 'Abhigna Yanaganti is a versatile artist and accomplished singer, with a passion for music, performance, and the arts. Accepted into the prestigious Berklee College of Music, she gained wider recognition through her appearance on Telugu Indian Idol and went on to win Zee Sa Re Ga Ma Pa Telugu in 2025. A trained Bharatanatyam dancer, Abhigna brings versatility and strong stage presence to her artistic journey. Alongside her musical pursuits, she aspires to build a career in acting and explore the world of cinema and storytelling. With her diverse artistic training and ambition, she represents a promising new voice in Indian entertainment.',
  },
  {
    name: 'Anusha Varri',
    designation: 'International Master of Ceremonies',
    image: 'speakers/anusha.jpg',
    position: '50% 24%',
    bio: 'Anusha Varri is an International Master of Ceremonies, Moderator, Actor, Singer and Podcast Host. After 12.5 years in banking, she made an unexpected transition into the world of live experiences, without initially knowing the depth or responsibility of the emcee profession. What began with a microphone evolved into a career across corporate, government, protocol, sports and entertainment platforms. She has hosted prestigious events featuring leading policymakers, business leaders and celebrities, including the Vice President of India, the ICC Women’s Cricket World Cup and A.R. Rahman’s concert. A trained classical dancer and multilingual performer, Anusha continues to explore the many possibilities that can emerge when we step beyond the life we thought was already complete.',
  },
  {
    name: 'Trishla Poogalia',
    designation: 'YouTuber & Grade 11 Student, DPS Hyderabad',
    image: 'speakers/trishla-poogalia-optimized.jpg',
    position: '50% 25%',
    bio: 'At 15, Trishla is a young creative voice shaped by curiosity, expression, and the courage to explore. A Grade 11 student at DPS Hyderabad and a merit student with 95% in her Class 10 Boards, she finds herself equally drawn to Economics, public speaking and arts. Her journey with creativity began at the age of five, when she started teaching arts and crafts on camera through her YouTube channel, Arts From Heart, which has since grown to 35,000+ subscribers. Along the way, she has explored creativity through Kathak, debating, anchoring, and badminton, embracing every platform that allows her to create, perform, and communicate.',
  },
  {
    name: 'Teja Addepalli',
    designation: 'Co-Founder and CRO, LawVyn.AI',
    image: 'speakers/tej-optimized.jpg',
    position: '50% 24%',
    bio: 'Tej Addepalli began his career at Google in 2013. Fourteen months later, he left, knowing he wanted to build something of his own—and that he wasn’t ready yet. He spent the next year leading operations and technology for a healthcare manufacturer, gaining the kind of practical experience that engineering alone doesn’t teach. He went on to co-found Katalyst Technologies, later Applied Synergy, and successfully exited in 2022. Along the way, he built an analytics platform that is now deployed across multiple semiconductor manufacturing fabs. Today, Tej is the Co-Founder and Chief Revenue Officer at LawVyn.AI. He is still learning how to turn something that works into something that lasts.',
  },
  {
    name: 'Baranidharan R',
    designation: 'Director – Presales, Innovation and Transformation, Dexian India',
    image: 'speakers/baranidharan-r-optimized.jpg',
    position: '50% 24%',
    bio: 'Baranidharan R is a technology leader and AI builder who turns bold ideas into real-world solutions. With over a decade of experience across business and government, he designs intelligent systems that amplify human potential rather than replace it. A 40 Under 40 honoree and national media voice on AI, he is passionate about making innovation accessible to everyone.',
  },
  {
    name: 'Saravanan Subramaniam',
    designation: 'Director, Heartyculture Natural Products LLP',
    image: 'speakers/saravanan-subramaniam-optimized.jpg',
    position: '50% 24%',
    bio: 'Saravanan Subramaniam is a horticulture and landscape leader with more than three decades of hands-on experience in gardening, nursery enterprise, landscape design, tree care and ecological implementation. Beginning his journey as a gardener in 1996, he has grown into a Master Gardener, entrepreneur and sustainability practitioner who combines field experience with large-scale programme leadership. He played a key role in greening Kanha Shantivanam, the 1,400-acre global headquarters of Heartfulness. Today, he serves as State Implementation Lead for the Net Zero Healthy Campus programme in Andhra Pradesh, supporting the transformation of 1,047 institutions across 28 districts. His message is simple: Nature is not a project; it is our home.',
  },
  {
    name: 'Lokesh Amaravathi',
    designation: 'Co-Founder & CEO, MAT 360',
    image: 'speakers/lokesh-optimized.jpg',
    position: '50% 28%',
    bio: 'Lokesh Amaravathi is the Co-founder & CEO of MAT 360, bringing a unique perspective shaped by his journey from HR leadership to entrepreneurship. His experience spans people, operations, business growth, and financial strategy, enabling him to build organizations with a strong foundation of trust and execution. Today, he works at the intersection of healthcare, cash-flow management, and sustainable growth. A Toastmasters speaker and guest lecturer at ICFAI and ISB, Lokesh actively shares insights on leadership, entrepreneurship, and professional development. He is also an alumnus of executive programs at ISB and Wharton. He believes meaningful networks, built with purpose, compound into lasting opportunities.',
  },
  {
    name: 'Manpreet Nishter',
    designation: 'Founder, MSN Studio',
    image: 'speakers/MSN.jpeg',
    position: '50% 24%',
    bio: 'Manpreeth Singh Nishter has leveraged his 33 years of animal and environmental activism to design a vegan, zero waste, sustainable studio; which also eventually became the USP of his studio. He has used industrial waste to build a beautiful serene workspace and managed to achieve water efficiency in parallel. He has been giving talks on sustainable ceramics in India and abroad.',
  },
  {
    name: 'Chamala Kiran Kumar Reddy',
    designation: 'Member of Parliament, Bhongir',
    image: 'speakers/chamala-kiran-kumar-reddy.png',
    position: '50% 18%',
    bio: 'Chamala Kiran Kumar Reddy (born 24 October 1974) is an Indian politician, currently a Member of Parliament in the Lok Sabha from Bhongir, Telangana. He was born in Shaligouraram Mandal, Thungathurthy Assembly constituency. Chamala Kiran Kumar Reddy topped with 100% attendance as Lok Sabha member from Telangana in participating in debates during the Parliament sessions between 24 June 2024 to 4 April 2025.',
  },
  {
    name: 'Sanjana Reddy',
    designation: 'Founder, Westbrook International School',
    image: 'speakers/sanjana-reddy-optimized.jpg',
    position: '50% 24%',
    bio: 'Sanjana Reddy is an entrepreneur, educationist and leader whose professional journey spans infrastructure, marketing and education. She is a Partner and Marketing Head at Sri Sreenivasa Infra, Hyderabad, and the Founder, President and Correspondent of Westbrook International School, Hyderabad. Her journey in education is driven by a strong belief that every child deserves access to quality education and the opportunity to dream big, irrespective of their family’s financial background. Through Westbrook International School, Sanjana Reddy is working towards making an international curriculum accessible at an affordable price point, with the belief that no child should be left behind simply because their parents cannot afford a premium education.',
  },
  {
    name: 'Vivek Dubey',
    designation: 'Founder, Curvet AI',
    image: 'speakers/Vivek Dubey.png',
    position: '50% 24%',
    bio: 'Vivek Dubey is a second-time founder and technologist who has previously worked at Google, Microsoft, and Infosys. His journey across global technology companies and entrepreneurship has given him a unique perspective on how ideas turn into products, businesses, and real-world impact. Today, as the founder of Curvet, he is working to reduce the gap between intent and execution by making artificial intelligence more accessible and useful. Having experienced both the structure of large organisations and the uncertainty of building from scratch, Vivek brings a builder’s perspective on AI, entrepreneurship, resilience, and what it takes to create in a rapidly changing world.',
  },
];

const initialsFor = (name: string) =>
  name
    .split(/\s+/)
    .slice(0, 2)
    .map(part => part[0])
    .join('');

export const Speakers: React.FC = () => {
  const [flippedCards, setFlippedCards] = useState<Set<string>>(() => new Set());

  const toggleCard = (name: string) => {
    setFlippedCards(current => {
      const next = new Set(current);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  return (
    <section className="speakers-page" aria-labelledby="speakers-heading">
      <header className="speakers-page__hero">
        <div className="container speakers-page__hero-inner">
          <a className="speakers-page__back" href={sitePath()}>
            <ArrowLeft size={16} aria-hidden="true" />
            Back to Meraki
          </a>
          <p className="speakers-page__kicker">TEDxSIU Hyderabad · Season 2</p>
          <h1 id="speakers-heading" className="editorial-heading">Voices of<br /><span className="meraki-wordmark meraki-wordmark--red">Meraki.</span></h1>
          <p className="speakers-page__lede">
            Eleven lived perspectives. One red circle shaped by purpose, craft,
            and the courage to share an idea.
          </p>
        </div>
      </header>

      <div className="container speakers-page__roster">
        <div className="speakers-page__roster-heading">
          <span>01 — 11</span>
          <h2 className="editorial-heading">Meet the speakers</h2>
          <p>9 October 2026 · SIU Hyderabad Auditorium</p>
        </div>

        <div className="speaker-grid">
          {speakers.map((speaker, index) => {
            const isFlipped = flippedCards.has(speaker.name);
            return (
              <article
                className={`speaker-card${isFlipped ? ' is-flipped' : ''}`}
                key={speaker.name}
                style={{ '--speaker-index': index } as React.CSSProperties}
                aria-label={speaker.name}
              >
                <div className="speaker-card__inner">
                  <div className="speaker-card__face speaker-card__front" aria-hidden={isFlipped}>
                    <div className="speaker-card__portrait">
                      {speaker.image ? (
                        <img
                          src={sitePath(speaker.image)}
                          alt={`Portrait of ${speaker.name}`}
                          loading={index < 3 ? 'eager' : 'lazy'}
                          decoding="async"
                          fetchPriority={index === 0 ? 'high' : 'auto'}
                          style={{ objectPosition: speaker.position }}
                        />
                      ) : (
                        <div className="speaker-card__placeholder" aria-label={`Portrait coming soon for ${speaker.name}`}>
                          <span>{initialsFor(speaker.name)}</span>
                        </div>
                      )}
                      <span className="speaker-card__number" aria-hidden="true">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>

                    <div className="speaker-card__copy">
                      <h3>{speaker.name}</h3>
                      <p className="speaker-card__designation">{speaker.designation}</p>
                    </div>

                    <button
                      type="button"
                      className="speaker-card__flip"
                      onClick={() => toggleCard(speaker.name)}
                      aria-label={`Read ${speaker.name}'s biography`}
                      aria-pressed={isFlipped}
                      tabIndex={isFlipped ? -1 : 0}
                    >
                      <BookOpen size={15} aria-hidden="true" />
                      Read bio
                    </button>
                  </div>

                  <div className="speaker-card__face speaker-card__back" aria-hidden={!isFlipped}>
                    <span className="speaker-card__back-number" aria-hidden="true">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <p className="speaker-card__back-kicker">Speaker biography</p>
                    <h3>About {speaker.name}</h3>
                    <div className="speaker-card__bio">
                      <p>{speaker.bio ?? 'Biography to be announced.'}</p>
                    </div>
                    <button
                      type="button"
                      className="speaker-card__flip speaker-card__flip--back"
                      onClick={() => toggleCard(speaker.name)}
                      aria-label={`Return to ${speaker.name}'s portrait`}
                      aria-pressed={isFlipped}
                      tabIndex={isFlipped ? 0 : -1}
                    >
                      <RotateCcw size={15} aria-hidden="true" />
                      Return
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Speakers;
