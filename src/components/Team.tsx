import React from 'react';
import { ArrowLeft, Asterisk, CircleDot, Sparkles } from 'lucide-react';
import { sitePath } from '../sitePath';

const teamCircles = [
  {
    id: 'direction',
    code: '01',
    title: 'Direction',
    accent: 'Vision & Stewardship',
    description: 'The hands protecting the intent, pace and character of the experience.',
    slots: 3,
  },
  {
    id: 'curation',
    code: '02',
    title: 'Ideas & Curation',
    accent: 'Research & Speaker Craft',
    description: 'The minds shaping raw ideas into talks worthy of the red circle.',
    slots: 4,
  },
  {
    id: 'experience',
    code: '03',
    title: 'Experience',
    accent: 'Production & Hospitality',
    description: 'The people choreographing every detail before, during and beyond the stage.',
    slots: 4,
  },
  {
    id: 'story',
    code: '04',
    title: 'Story & Visuals',
    accent: 'Design, Film & Communications',
    description: 'The collective translating Meraki into images, motion, sound and memory.',
    slots: 4,
  },
];

export const Team: React.FC = () => (
  <section className="team-page">
    <header className="team-page__hero">
      <div className="container team-page__hero-grid">
        <div className="team-page__hero-copy">
          <a className="team-page__back" href={sitePath()}>
            <ArrowLeft size={16} aria-hidden="true" />
            Back to Meraki
          </a>
          <p className="team-page__kicker">TEDxSIU Hyderabad · The Collective</p>
          <h1 className="editorial-heading">
            The people<br />behind the <em>red circle.</em>
          </h1>
          <p>
            Ideas take the stage for eighteen minutes. Building the space for
            them takes months of obsession, craft and beautifully coordinated chaos.
          </p>
          <div className="team-page__signal" aria-label="Season 2 team roster is being prepared">
            <span aria-hidden="true" />
            Season 2 roster in production
          </div>
        </div>

        <div className="team-orbit" aria-hidden="true">
          <span className="team-orbit__ring team-orbit__ring--outer" />
          <span className="team-orbit__ring team-orbit__ring--middle" />
          <span className="team-orbit__ring team-orbit__ring--inner" />
          <span className="team-orbit__cross team-orbit__cross--x" />
          <span className="team-orbit__cross team-orbit__cross--y" />
          <span className="team-orbit__satellite team-orbit__satellite--one"><Asterisk size={18} /></span>
          <span className="team-orbit__satellite team-orbit__satellite--two"><CircleDot size={16} /></span>
          <span className="team-orbit__satellite team-orbit__satellite--three"><Sparkles size={16} /></span>
          <div className="team-orbit__core">
            <small>THE</small>
            <strong>X</strong>
            <small>COLLECTIVE</small>
          </div>
          <span className="team-orbit__label team-orbit__label--top">IDEAS</span>
          <span className="team-orbit__label team-orbit__label--right">EXPERIENCE</span>
          <span className="team-orbit__label team-orbit__label--bottom">STORY</span>
          <span className="team-orbit__label team-orbit__label--left">CRAFT</span>
        </div>
      </div>
      <span className="team-page__watermark" aria-hidden="true">COLLECTIVE</span>
    </header>

    <nav className="team-page__nav" aria-label="Team disciplines">
      <div className="container">
        <span>EXPLORE THE CIRCLES</span>
        {teamCircles.map(circle => (
          <a key={circle.id} href={`#team-${circle.id}`}>
            <b>{circle.code}</b> {circle.title}
          </a>
        ))}
      </div>
    </nav>

    <div className="container team-page__groups">
      {teamCircles.map((circle, circleIndex) => (
        <section className="team-circle" id={`team-${circle.id}`} key={circle.id}>
          <header className="team-circle__header">
            <span>{circle.code} / 04</span>
            <div>
              <p className="team-circle__accent">{circle.accent}</p>
              <h2 className="editorial-heading">{circle.title}</h2>
              <p>{circle.description}</p>
            </div>
          </header>

          <div className="team-circle__grid">
            {Array.from({ length: circle.slots }, (_, slotIndex) => {
              const number = teamCircles
                .slice(0, circleIndex)
                .reduce((total, item) => total + item.slots, 0) + slotIndex + 1;

              return (
                <article
                  className="team-member-card team-member-card--placeholder"
                  key={`${circle.id}-${slotIndex}`}
                  style={{
                    '--team-slot': slotIndex,
                    '--team-angle': `${(slotIndex * 37 + circleIndex * 19) % 100}%`,
                  } as React.CSSProperties}
                >
                  <div className="team-member-card__visual" aria-hidden="true">
                    <span className="team-member-card__halo" />
                    <span className="team-member-card__silhouette" />
                    <span className="team-member-card__scan" />
                    <span className="team-member-card__index">{String(number).padStart(2, '0')}</span>
                  </div>
                  <div className="team-member-card__copy">
                    <span>{circle.accent}</span>
                    <h3>Profile incoming</h3>
                    <p>Name and portrait will be revealed with the official roster.</p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      ))}

      <aside className="team-page__closing">
        <span>15 signals · one frequency</span>
        <h2 className="editorial-heading">Different disciplines.<br /><em>One shared obsession.</em></h2>
        <p>The official Season 2 team identities and portraits will land here next.</p>
      </aside>
    </div>
  </section>
);

export default Team;
