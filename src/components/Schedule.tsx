import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Asterisk, BookOpen, CalendarDays, CircleDot, Flame, Heart, History, Mic2, Sparkles } from 'lucide-react';

type ScheduleEntry = {
  time: string;
  act: string;
  title: string;
  detail: string;
  icon: React.ElementType;
  highlighted?: boolean;
};

const schedule: ScheduleEntry[] = [
  { time: '9:30 AM – 10:00 AM', act: 'Opening ceremony', title: 'A beginning in many voices', detail: 'Symbiosis movie, lamp lighting and a classical dance performance, followed by addresses from Mr. Sujay I, organiser, and Ms. Saanvi Dande, co-organiser.', icon: Flame, highlighted: true },
  { time: '10:00 AM – 10:20 AM', act: 'Talk 01', title: 'Mr. Baranidharan R', detail: 'Director — Presales, Innovation and Transformation, Dexian India.', icon: Mic2 },
  { time: '10:20 AM – 10:40 AM', act: 'Talk 02', title: 'Mr. Saravanan Subramaniam', detail: 'Director, Heartyculture Natural Products LLP.', icon: Mic2 },
  { time: '10:40 AM – 11:00 AM', act: 'Talk 03', title: 'Anusha Varri', detail: 'International Master of Ceremonies.', icon: Mic2 },
  { time: '11:00 AM – 11:20 AM', act: 'Talk 04', title: 'Teja Addepalli', detail: 'Co-Founder and CRO, LawVyn.AI.', icon: Mic2 },
  { time: '11:20 AM – 11:40 AM', act: 'Talk 05', title: 'Sanjana Reddy', detail: 'Founder, Westbrook International School.', icon: Mic2 },
  { time: '11:40 AM – 12:00 PM', act: 'Talk 06', title: 'Lokesh Amaravathi', detail: 'Co-founder & CEO, MAT 360.', icon: Mic2 },
  { time: '12:00 PM – 12:20 PM', act: 'Talk 07', title: 'Chamala Kiran Kumar Reddy', detail: 'Member of Parliament (MP), Bhongir.', icon: Mic2 },
  { time: '12:20 PM – 1:20 PM', act: 'Intermission', title: 'Lunch break', detail: 'A moment to pause, connect and return refreshed for the afternoon acts.', icon: Heart, highlighted: true },
  { time: '1:20 PM – 1:30 PM', act: 'Performance', title: 'Music performance', detail: 'A live musical interlude to open the second act of the day.', icon: Sparkles, highlighted: true },
  { time: '1:30 PM – 1:40 PM', act: 'Performance', title: 'Dance performance', detail: 'A movement-led moment on the TEDxSIU Hyderabad stage.', icon: Asterisk, highlighted: true },
  { time: '1:40 PM – 2:00 PM', act: 'Talk 08', title: 'Abhigna Yanaganti', detail: 'Artist.', icon: Mic2 },
  { time: '2:00 PM – 2:20 PM', act: 'Talk 09', title: 'Manpreet Nishter', detail: 'Founder, MSN Studio.', icon: Mic2 },
  { time: '2:20 PM – 2:40 PM', act: 'Talk 10', title: 'Trishla Poogalia', detail: 'YouTuber & Grade 11 Student, DPS Hyderabad.', icon: Mic2 },
  { time: '2:40 PM – 3:00 PM', act: 'Talk 11', title: 'Vivek Dubey', detail: 'Founder, Curvet AI.', icon: Mic2 },
  { time: '3:00 PM – 3:05 PM', act: 'Address', title: 'Dr. K. P. Venugopala Rao', detail: 'Director, SIBM Hyderabad.', icon: BookOpen },
  { time: '3:05 PM – 3:10 PM', act: 'Address', title: 'Dr. Sunil George', detail: 'Director, SLS Hyderabad.', icon: BookOpen },
  { time: '3:10 PM – 3:15 PM', act: 'Address', title: 'Dr. Rajanikanth Aluvalu', detail: 'Director, SIT Hyderabad.', icon: BookOpen },
  { time: '3:15 PM – 3:25 PM', act: 'Closing ceremony', title: 'Valedictory', detail: 'The Season 2 programme reaches its ceremonial close.', icon: CircleDot, highlighted: true },
  { time: '3:25 PM – 3:30 PM', act: 'Final word', title: 'Vote of thanks', detail: 'By Mr. Akash Mallareddy, Curator, TEDxSIU Hyderabad.', icon: History, highlighted: true },
];

export const Schedule: React.FC = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section id="schedule" className="schedule-section schedule-section--program section-padding">
      <div className="schedule-section__shade" aria-hidden="true" />

      <div className="container schedule-section__inner">
        <motion.header
          className="schedule-section__header"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          <span className="schedule-section__meta"><CalendarDays size={14} strokeWidth={1.7} /> 9 October 2026 · 9:30 AM – 3:30 PM</span>
          <h2 className="editorial-heading">The itinerary of <em>acts</em></h2>
          <p>One day, eleven ideas, and a stage shared with music, movement and the people shaping what comes next.</p>
        </motion.header>

        <div className="schedule-timeline" aria-label="TEDxSIU Hyderabad Season 2 event schedule">
          <div className="schedule-timeline__line" aria-hidden="true">
            <motion.span
              className="schedule-timeline__line-fill"
              initial={reduceMotion ? false : { scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, amount: 0.08 }}
              transition={{ duration: 1.35, ease: 'easeOut' }}
            />
          </div>

          {schedule.map((item, index) => {
            const Icon = item.icon;
            const className = [
              'schedule-timeline__item',
              index % 2 === 1 ? 'is-reversed' : '',
              item.highlighted ? 'is-highlighted' : '',
            ].filter(Boolean).join(' ');

            return (
              <motion.article
                key={`${item.time}-${item.title}`}
                className={className}
                initial={reduceMotion ? false : { opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.18 }}
                transition={{ duration: 0.46, delay: reduceMotion ? 0 : (index % 3) * 0.05, ease: 'easeOut' }}
              >
                <time className="schedule-timeline__time">{item.time}</time>
                <span className="schedule-timeline__marker" aria-hidden="true"><Icon size={20} strokeWidth={1.65} /></span>
                <div className="schedule-timeline__content">
                  <span className="schedule-timeline__act">{item.act}</span>
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Schedule;
