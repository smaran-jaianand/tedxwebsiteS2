import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Coffee, Flame, PlayCircle, Sparkles, Users } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface TimelineEntry {
  time: string;
  title: string;
  act: string;
  description: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  highlight?: boolean;
}

const SCHEDULE_ITEMS: TimelineEntry[] = [
  {
    time: '09:00 AM — 10:00 AM',
    title: 'The Sacred Threshold & Pomegranate Welcome',
    act: 'Prelude · Red Carpet',
    description: 'Collect your personalized digital token pass, experience the Persephone & Hades interactive canvas, and taste artisanal welcome refreshments.',
    icon: Users,
  },
  {
    time: '10:00 AM — 12:30 PM',
    title: 'Act I: The Awakening of Psyche (Ψυχή)',
    act: 'Session I · Keynotes',
    description: 'The opening ceremony followed by four talks on the emergence of genuine soul in human and synthetic intelligence, and ancient mythological maps.',
    icon: Flame,
    highlight: true,
  },
  {
    time: '12:30 PM — 01:45 PM',
    title: 'The Agapé Banquet & Ideation Circles',
    act: 'Convergence · Luncheon',
    description: 'An intimate culinary gathering pairing Mediterranean and Hyderabadi craft with breakout discussions alongside the morning speakers.',
    icon: Coffee,
  },
  {
    time: '01:45 PM — 04:00 PM',
    title: 'Act II: The Crucible of Demiurgia (Δημιουργία)',
    act: 'Session II · Craft & Cosmos',
    description: 'Talks exploring the tactile devotion of physical sculptors, deep-space cosmic sensors, and the living heritage of ancient seed varieties.',
    icon: PlayCircle,
    highlight: true,
  },
  {
    time: '04:00 PM — 04:45 PM',
    title: 'The Elysian Interlude: Sonic Harmonics',
    act: 'Creative Synthesis',
    description: 'A live performance fusing classical modal harp, Indian percussion, and spatial acoustic psychoacoustics.',
    icon: Award,
  },
  {
    time: '04:45 PM — 06:30 PM',
    title: 'Act III: The Triumph of Meraki (Μεράκι)',
    act: 'Finale · The Red Circle',
    description: 'Culmination addresses, the collective declaration of purpose, and the official release of the Season 2 Meraki anthology.',
    icon: Sparkles,
    highlight: true,
  },
];

export const Schedule: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const timeline = timelineRef.current;
    if (!section || !timeline) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const context = gsap.context(() => {
      gsap.fromTo(
        '.schedule-timeline__line-fill',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: timeline,
            start: 'top 74%',
            end: 'bottom 66%',
            scrub: 0.55,
          },
        },
      );

      timeline.querySelectorAll<HTMLElement>('.schedule-timeline__item').forEach((item, index) => {
        const direction = index % 2 === 0 ? 54 : -54;
        gsap.fromTo(
          item.querySelector('.schedule-timeline__content'),
          { autoAlpha: 0, x: direction, y: 24 },
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 84%',
              once: true,
            },
          },
        );

        gsap.fromTo(
          item.querySelector('.schedule-timeline__marker'),
          { scale: 0.35, autoAlpha: 0, rotate: -30 },
          {
            scale: 1,
            autoAlpha: 1,
            rotate: 0,
            duration: 0.62,
            ease: 'back.out(1.8)',
            scrollTrigger: {
              trigger: item,
              start: 'top 84%',
              once: true,
            },
          },
        );
      });
    }, sectionRef);

    return () => context.revert();
  }, []);

  return (
    <section id="schedule" ref={sectionRef} className="schedule-section section-padding">
      <div className="schedule-section__shade" aria-hidden="true" />

      <div className="container schedule-section__inner">
        <header className="schedule-section__header">
          <h2>A Day Curated for the <span className="text-gradient-meraki">Soul</span></h2>
          <p>Six orchestrated movements engineered to stir curiosity, challenge assumptions, and awaken deep creative passion.</p>
        </header>

        <div ref={timelineRef} className="schedule-timeline">
          <div className="schedule-timeline__line" aria-hidden="true">
            <span className="schedule-timeline__line-fill" />
          </div>

          {SCHEDULE_ITEMS.map((item, index) => {
            const Icon = item.icon;
            return (
              <article
                className={`schedule-timeline__item${index % 2 === 1 ? ' is-reversed' : ''}${item.highlight ? ' is-highlighted' : ''}`}
                key={item.title}
              >
                <time className="schedule-timeline__time">{item.time}</time>

                <div className="schedule-timeline__marker" aria-hidden="true">
                  <Icon size={20} strokeWidth={1.8} />
                </div>

                <div className="schedule-timeline__content">
                  <span className="schedule-timeline__act">{item.act}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Schedule;
