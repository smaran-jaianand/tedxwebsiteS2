import React, { useEffect, useState } from 'react';
import { CalendarDays, Clock3, MapPin, Mic2, UsersRound } from 'lucide-react';

const EVENT_TIME = new Date('2026-10-09T09:00:00+05:30').getTime();

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const getTimeLeft = (): TimeLeft => {
  const difference = Math.max(0, EVENT_TIME - Date.now());

  return {
    days: Math.floor(difference / 86_400_000),
    hours: Math.floor((difference / 3_600_000) % 24),
    minutes: Math.floor((difference / 60_000) % 60),
    seconds: Math.floor((difference / 1_000) % 60),
  };
};

const ringData = [
  { key: 'days', radius: 176, max: 30, className: 'is-red' },
  { key: 'hours', radius: 149, max: 24, className: 'is-gold' },
  { key: 'minutes', radius: 122, max: 60, className: 'is-white' },
  { key: 'seconds', radius: 95, max: 60, className: 'is-red-soft' },
] as const;

export const CountdownSection: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft);

  useEffect(() => {
    const update = () => setTimeLeft(getTimeLeft());
    update();
    const timer = window.setInterval(update, 1_000);
    return () => window.clearInterval(timer);
  }, []);

  const accessibleTime = `${timeLeft.days} days, ${timeLeft.hours} hours, ${timeLeft.minutes} minutes and ${timeLeft.seconds} seconds until the event`;

  return (
    <section id="countdown" className="countdown-section" aria-labelledby="countdown-heading">
      <span className="countdown-section__date-mark" aria-hidden="true">09·10·26</span>

      <div className="container countdown-section__inner">
        <header className="countdown-header">
          <div className="countdown-header__index" aria-hidden="true">
            <span>02</span>
            <i />
            <span>THE FINAL APPROACH</span>
          </div>
          <div className="countdown-header__copy">
            <h2 id="countdown-heading" className="editorial-heading">
              Until the <em>red circle</em><br />goes live.
            </h2>
            <p>
              Four measures of time. One moment worth arriving for at
              Symbiosis International University Hyderabad.
            </p>
          </div>
        </header>

        <div className="countdown-engine">
          <div className="countdown-orbit" aria-hidden="true">
            <span className="countdown-orbit__ticks" />
            <span className="countdown-orbit__axis countdown-orbit__axis--x" />
            <span className="countdown-orbit__axis countdown-orbit__axis--y" />
            <span className="countdown-orbit__sweep" />

            <svg viewBox="0 0 400 400" role="presentation">
              {ringData.map(ring => {
                const value = timeLeft[ring.key];
                const progress = Math.min(value / ring.max, 1) * 100;

                return (
                  <React.Fragment key={ring.key}>
                    <circle className="countdown-orbit__track" cx="200" cy="200" r={ring.radius} />
                    <circle
                      className={`countdown-orbit__progress ${ring.className}`}
                      cx="200"
                      cy="200"
                      r={ring.radius}
                      pathLength="100"
                      style={{ strokeDashoffset: 100 - progress }}
                    />
                  </React.Fragment>
                );
              })}
            </svg>

            <div className="countdown-orbit__core">
              <span>FRIDAY</span>
              <strong>09</strong>
              <span>OCT / 2026</span>
              <small>09:00 IST</small>
            </div>
          </div>

          <div className="countdown-readout" role="timer" aria-label={accessibleTime}>
            <div className="countdown-readout__status">
              <span className="countdown-readout__pulse" aria-hidden="true" />
              Countdown signal active
              <span>IST · HYDERABAD</span>
            </div>

            <div className="countdown-readout__units" aria-hidden="true">
              <TimeUnit value={timeLeft.days} label="Days" progress={Math.min(timeLeft.days / 30, 1)} />
              <TimeUnit value={timeLeft.hours} label="Hours" progress={timeLeft.hours / 24} />
              <TimeUnit value={timeLeft.minutes} label="Minutes" progress={timeLeft.minutes / 60} />
              <TimeUnit value={timeLeft.seconds} label="Seconds" progress={timeLeft.seconds / 60} accent />
            </div>

            <div className="countdown-readout__baseline" aria-hidden="true">
              <span>T–</span>
              <div><i /></div>
              <span>CURTAINS</span>
            </div>
          </div>
        </div>

        <footer className="countdown-footer">
          <EventFact icon={<CalendarDays size={17} />} label="Event date" value="09 October 2026" />
          <EventFact icon={<Clock3 size={17} />} label="Curtains rise" value="09:00 IST" />
          <EventFact icon={<UsersRound size={17} />} label="Seated delegates" value="300" />
          <EventFact icon={<Mic2 size={17} />} label="Maximum talk" value="18 minutes" />
          <EventFact icon={<MapPin size={17} />} label="Venue" value="SIU Hyderabad" />
        </footer>
      </div>
    </section>
  );
};

const TimeUnit = ({
  value,
  label,
  progress,
  accent = false,
}: {
  value: number;
  label: string;
  progress: number;
  accent?: boolean;
}) => (
  <div className={`countdown-unit${accent ? ' is-accent' : ''}`}>
    <div className="countdown-unit__topline">
      <span>{label}</span>
      <span>{String(Math.round(progress * 100)).padStart(2, '0')}</span>
    </div>
    <div className="countdown-unit__value">
      <span key={value}>{String(value).padStart(2, '0')}</span>
    </div>
    <div className="countdown-unit__meter">
      <i style={{ transform: `scaleX(${progress})` }} />
    </div>
  </div>
);

const EventFact = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="countdown-fact">
    <span className="countdown-fact__icon" aria-hidden="true">{icon}</span>
    <span>
      <small>{label}</small>
      <strong>{value}</strong>
    </span>
  </div>
);
