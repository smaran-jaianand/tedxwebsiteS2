import React from 'react';
import { ArrowLeft, Sparkles, Users } from 'lucide-react';

type TeamMember = {
  name: string;
  image: string;
};

type TeamCircle = {
  id: string;
  title: string;
  description: string;
  members: TeamMember[];
};

// The Season 2 site keeps this roster in one small, editable place. The images
// are existing local archive assets; no Season 1 files are modified.
const TEAM_CIRCLES: TeamCircle[] = [
  {
    id: 'core',
    title: 'Core Team',
    description: 'The people guiding the programme, the experience, and the ideas behind the red circle.',
    members: [
      { name: 'Saanvi', image: '/season1/img/profileimgs/saanvi-sit.jpg' },
      { name: 'Akash Rao', image: '/season1/img/profileimgs/akashsir.png' },
      { name: 'Meenakshi', image: '/season1/img/profileimgs/meenakshi.jpg' },
      { name: 'Ananya', image: '/season1/img/profileimgs/ananya-sit.jpg' },
    ],
  },
  {
    id: 'communications',
    title: 'Communications',
    description: 'Shaping the voice, visual language, and conversations that carry Meraki beyond the stage.',
    members: [
      { name: 'Dharshvaradh', image: '/season1/img/profileimgs/dharsh.jpg' },
      { name: 'KVS Vainavi', image: '/season1/img/profileimgs/vainavi.jpg' },
      { name: 'Aditi Bhalsing', image: '/season1/img/profileimgs/aditi.jpg' },
      { name: 'PVL Srujana', image: '/season1/img/profileimgs/srujana-sit.jpg' },
      { name: 'Vaishnavi Vidyalaya', image: '/season1/img/profileimgs/vaishnavi.jpg' },
    ],
  },
  {
    id: 'production',
    title: 'Production',
    description: 'Turning the room, the lights, and every transition into one intentional live experience.',
    members: [
      { name: 'MD Zakuir Rahman', image: '/season1/img/profileimgs/zak-sit.jpg' },
      { name: 'Riya Shastri', image: '/season1/img/profileimgs/riya-sit.jpg' },
      { name: 'Gunisha Agarwal', image: '/season1/img/profileimgs/gunisha.jpg' },
      { name: 'KU Parthiv', image: '/season1/img/profileimgs/parthiv.jpg' },
      { name: 'Pramit Panigrahi', image: '/season1/img/profileimgs/pramit-sit.jpg' },
      { name: 'Anvi Trivedi', image: '/season1/img/profileimgs/anvi-sit.jpg' },
    ],
  },
  {
    id: 'logistics',
    title: 'Logistics',
    description: 'The quiet precision that gets every person, detail, and idea to the right place at the right time.',
    members: [
      { name: 'Daniel George', image: '/season1/img/profileimgs/daniel.png' },
      { name: 'Smaran Jaianand', image: '/season1/img/profileimgs/smaran.jpg' },
      { name: 'Asmi Agarwal', image: '/season1/img/profileimgs/asmi.jpg' },
      { name: 'Adwita Pravish', image: '/season1/img/profileimgs/adwita.jpg' },
      { name: 'Ananya Sinha', image: '/season1/img/profileimgs/ananya-sinha.jpg' },
      { name: 'Parth S', image: '/season1/img/profileimgs/parth.jpg' },
    ],
  },
  {
    id: 'hospitality',
    title: 'Hospitality',
    description: 'Designing the warmth, welcome, and human moments that make the day feel considered.',
    members: [
      { name: 'Yashodhara', image: '/season1/img/profileimgs/yashodhara.jpg' },
      { name: 'Hasini Kurikala', image: '/season1/img/profileimgs/hasini-sit.jpg' },
      { name: 'Anshu Parchuri', image: '/season1/img/profileimgs/anshu.jpg' },
      { name: 'Anugna', image: '/season1/img/profileimgs/anugna.jpg' },
      { name: 'Anuja Choudary', image: '/season1/img/profileimgs/anuja.jpg' },
      { name: 'Isha', image: '/season1/img/profileimgs/isha.jpg' },
      { name: 'Sushama', image: '/season1/img/profileimgs/sushama.jpg' },
    ],
  },
  {
    id: 'partnerships',
    title: 'Partnerships & Marketing',
    description: 'Building the relationships and momentum that let ambitious ideas reach their audience.',
    members: [
      { name: 'Anirudh Pratap Singh Yadav', image: '/season1/img/profileimgs/anirudh-sit.jpg' },
      { name: 'Sujay Indupuru', image: '/season1/img/profileimgs/sujay.jpg' },
      { name: 'Shreyashka Sengar', image: '/season1/img/profileimgs/shreyashka.jpg' },
    ],
  },
];

export const Team: React.FC = () => {
  const memberCount = TEAM_CIRCLES.reduce((total, circle) => total + circle.members.length, 0);

  return (
    <section className="team-page">
      <div className="container team-page__hero">
        <h1>Meet the <span className="text-gradient-meraki">working team</span></h1>
        <p>
          One shared devotion, many different crafts. This is the collective bringing TEDxSIU Hyderabad Season 2 to life.
        </p>

        <div className="team-page__hero-actions">
          <a href="/" className="btn-outline"><ArrowLeft size={15} /> Back to home</a>
          <span><Users size={16} /> {memberCount} makers across {TEAM_CIRCLES.length} circles</span>
        </div>
      </div>

      <nav className="team-page__nav" aria-label="Team circles">
        <div className="container">
          {TEAM_CIRCLES.map((circle) => <a key={circle.id} href={`#${circle.id}`}>{circle.title}</a>)}
        </div>
      </nav>

      <div className="container team-page__groups">
        {TEAM_CIRCLES.map((circle, index) => (
          <section id={circle.id} className="team-circle" key={circle.id}>
            <header className="team-circle__header">
              <span><Sparkles size={14} /> Circle {String(index + 1).padStart(2, '0')}</span>
              <div>
                <h2>{circle.title}</h2>
                <p>{circle.description}</p>
              </div>
            </header>

            <div className="team-circle__grid">
              {circle.members.map((member) => (
                <article className="team-member-card" key={member.name}>
                  <img src={member.image} alt={member.name} loading="lazy" decoding="async" />
                  <div className="team-member-card__veil" />
                  <div className="team-member-card__copy">
                    <span>{circle.title}</span>
                    <h3>{member.name}</h3>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
};

export default Team;
