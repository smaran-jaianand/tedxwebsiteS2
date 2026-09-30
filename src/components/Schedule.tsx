import React from 'react';

export const Schedule: React.FC = () => (
  <section id="schedule" className="schedule-section schedule-section--holding section-padding">
    <div className="schedule-section__shade" aria-hidden="true" />

    <div className="container schedule-section__inner">
      <header className="schedule-section__header">
        <h2>Event <span className="text-gradient-meraki">Schedule</span></h2>
        <p>
          The Season 2 programme is currently being curated. Session timings and details will be announced soon.
        </p>
      </header>
    </div>
  </section>
);

export default Schedule;
