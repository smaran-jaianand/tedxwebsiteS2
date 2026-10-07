import React from 'react';
import { ArrowLeft, Asterisk, CircleDot, Sparkles } from 'lucide-react';
import { sitePath } from '../sitePath';

const teamCircles = [
  { id: 'core', code: '01', title: 'Core Team', accent: 'Leadership & Vision' },
  { id: 'production', code: '02', title: 'Production', accent: 'Stage & Execution' },
  { id: 'logistics', code: '03', title: 'Logistics', accent: 'Operations & Planning' },
  { id: 'communication', code: '04', title: 'Communication', accent: 'Outreach & Messaging' },
  { id: 'sponsorship', code: '05', title: 'Sponsorships', accent: 'Partnerships & Finance' },
  { id: 'hospitality', code: '06', title: 'Hospitality', accent: 'Guest Experience' },
  { id: 'photography', code: '07', title: 'Photography', accent: 'Visual Documentation' },
  { id: 'tech', code: '08', title: 'Tech', accent: 'Digital Infrastructure' },
];

const teamMembers = [
  // Core Team
  { circleId: 'core', name: 'Dr. Rajanikanth Aluvalu', role: 'Director', image: '/teams/Prof-Rajanikanth-Aluvalu.webp' },
  { circleId: 'core', name: 'Dr. Rakesh', role: 'Faculty Mentor', image: 'teams/Rakesh.JPG', align: '50% 50%' },
  { circleId: 'core', name: 'Sujay', role: 'Organizer', image: 'teams/Sujay.JPG' },
  { circleId: 'core', name: 'Saanvi', role: 'Co-Organizer', image: '/teams/Saanvi.JPG', align: '50% 80%' },
  { circleId: 'core', name: 'Akash Mallareddy', role: 'Curator', image: 'teams/akashsir.png', align: '50% 80%' },
  { circleId: 'core', name: 'Ravi', role: 'Executive Producer', image: 'teams/ravi-sit.jpg', align: '50% 60%' },

  // Production
  { circleId: 'production', name: 'Md Zakiur Rahman', role: 'Lead', image: 'teams/Zakiur.JPG', align: '50% 60%' },
  { circleId: 'production', name: 'Riya Shastri', role: 'Co-Lead', image: 'teams/riya-sit.jpg', align: '50% 50%' },
  { circleId: 'production', name: 'Anvi Trivedi', role: 'Member', image: 'teams/anvi-sit.jpg', align: '50% 75%' },
  { circleId: 'production', name: 'Pramit', role: 'Member', image: 'teams/Pramit.JPG', align: '50% 50%' },
  { circleId: 'production', name: 'Saanvi Chaturvedi', role: 'Member', image: 'teams/sanvychaturvedi.jpeg', align: '50% 40%' },
  { circleId: 'production', name: 'Aamina Azeem Baig', role: 'Member', image: 'teams/Aamina.JPG', align: '50% 37%' },

  // Logistics
  { circleId: 'logistics', name: 'Smaran Jaianand', role: 'Lead', image: 'teams/smaran.jpg.jpeg', align: '50% 50%' },
  { circleId: 'logistics', name: 'Meenakshi Vedala', role: 'Co-Lead', image: 'teams/meenakshi.jpg', align: '50% 75%' },
  { circleId: 'logistics', name: 'Sneha Gandhi', role: 'Member', image: 'teams/Sneha.JPG', align: '50% 53%' },
  { circleId: 'logistics', name: 'Aaraadhya Hruthi', role: 'Member', image: 'teams/aaradhya.JPG', align: '50% 30%' },
  { circleId: 'logistics', name: 'Aparna Velpuri', role: 'Member', image: 'teams/Aparna.JPG', align: '50% 25%' },
  { circleId: 'logistics', name: 'Madhav Singh', role: 'Member', image: 'teams/madhav.JPG', align: '50% 35%' },
  { circleId: 'logistics', name: 'Adwita Pravish', role: 'Member', image: 'teams/adwita.jpg', align: '50% 100%' },
  { circleId: 'logistics', name: 'Aditya Sampara', role: 'Member', image: 'teams/Aditya.JPG', align: '50% 40%' },

  // Communication
  { circleId: 'communication', name: 'Sandhya H.S', role: 'Lead', image: 'teams/sandhya.jpeg', align: '50% 95%' },
  { circleId: 'communication', name: 'Mytreyi Eranki', role: 'Co-Lead', image: 'teams/mytreyi.jpeg', align: '50% 100%' },
  { circleId: 'communication', name: 'Lakshmi Srujana', role: 'Member', image: 'teams/Srujana.JPG', align: '50% 45%' },
  { circleId: 'communication', name: 'Anwita Rudravaram', role: 'Member', image: 'teams/Anwita.JPG', align: '50% 43%' },
  { circleId: 'communication', name: 'Annanya Mishra', role: 'Member', image: 'teams/Annanya.JPG' },
  { circleId: 'communication', name: 'Mannan', role: 'Member', image: 'teams/mannan.jpg', align: '50% 38%' },
  { circleId: 'communication', name: 'Sanvi Jhaveri', role: 'Member', image: 'teams/sanvijhaveri.JPG', align: '50% 30%' },
  { circleId: 'communication', name: 'Diva Maheshwari', role: 'Member', image: '/teams/divamaheshwari.JPG', align: '50% 47%' },

  // Sponsorships
  { circleId: 'sponsorship', name: 'Advika A', role: 'Lead', image: 'teams/advika.JPG', align: '50% 43%' },
  { circleId: 'sponsorship', name: 'Divya Patel', role: 'Co-Lead', image: 'teams/divya.jpeg', align: '50% 40%' },
  { circleId: 'sponsorship', name: 'Anushka Aswal', role: 'Member', image: 'teams/anushkaaswal.jpeg', align: '50% 25%' },
    { circleId: 'sponsorship', name: 'Akshat Jain', role: 'Member', image: 'teams/IMG_7491.JPG', align: '50% 35%' },
  { circleId: 'sponsorship', name: 'Nikhila Kolla', role: 'Member', image: 'teams/Nikhila.JPG', align: '50% 45%' },
  { circleId: 'sponsorship', name: 'Deepika Mishra', role: 'Member', image: 'teams/Deepika.JPG', align: '50% 40%' },

  // Hospitality
  { circleId: 'hospitality', name: 'Anuja Choudhury', role: 'Lead', image: 'teams/anuja.jpg', align: '50% 42%' },
  { circleId: 'hospitality', name: 'Aditi Bhalsing', role: 'Co-Lead', image: 'teams/aditi.jpg', align: '50% 18%' },
  { circleId: 'hospitality', name: 'Sri Snigdha', role: 'Member', image: 'teams/IMG_7408.JPG', align: '50% 56%' },
  { circleId: 'hospitality', name: 'Hasini Kurikala', role: 'Member', image: 'teams/hasini-sit.jpg', align: '50% 80%' },
  { circleId: 'hospitality', name: 'BNV Manasvini Chinta', role: 'Member', image: 'teams/Manasvini.JPG', align: '50% 40%' },
  { circleId: 'hospitality', name: 'Sri Kruthi Nimmagadda', role: 'Member', image: 'teams/IMG_7466.JPG', align: '50% 10 %' },
  { circleId: 'hospitality', name: 'Kolavennu Shreya Vaishnavi', role: 'Member', image: 'teams/shreya.jpeg', align: '50% 0.5%' },
  { circleId: 'hospitality', name: 'Adyasha Mohapatra', role: 'Member', image: 'teams/IMG_7468.JPG', align: '50% 55%' },
  { circleId: 'hospitality', name: 'Sanvy Pandey', role: 'Member', image: 'teams/IMG_7476.JPG', align: '50% 27%' },

  // Photography
  { circleId: 'photography', name: 'Subhanan Chatterjee', role: 'Lead', image: 'teams/Subhanan.JPG', align: '50% 85%' },

  // Tech
  { circleId: 'tech', name: 'Divyansh M', role: 'Lead', image: 'teams/Divyansh.JPG', align: '50% 45%' },
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
      {teamCircles.map((circle, circleIndex) => {
        const circleMembers = teamMembers.filter(member => member.circleId === circle.id);

        return (
          <section className="team-circle" id={`team-${circle.id}`} key={circle.id}>
            <header
              className="team-circle__header"
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%'
              }}
            >
              <span style={{ position: 'absolute', left: 0 }}>
                {circle.code} / 08
              </span>
              <div style={{ textAlign: 'center' }}>
                <p className="team-circle__accent">{circle.accent}</p>
                <h2 className="editorial-heading">{circle.title}</h2>
              </div>
            </header>

            <div
              className="team-circle__grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '24px'
              }}
            >
              {circleMembers.map((member, slotIndex) => {
                const number = teamMembers.findIndex(m => m === member) + 1;

                return (
                  <article
                    className="team-member-card"
                    key={`${circle.id}-${slotIndex}`}
                    style={{
                      '--team-slot': slotIndex,
                      '--team-angle': `${(slotIndex * 37 + circleIndex * 19) % 100}%`,
                    } as React.CSSProperties}
                  >
                    <div
                      className="team-member-card__visual"
                      aria-hidden="true"
                      style={{
                        position: 'relative', // Traps the absolute image inside this box
                        overflow: 'hidden'    // Cuts off any extra image that tries to bleed out
                      }}
                    >
                      <span className="team-member-card__halo" />

                      {member.image ? (
                        <img
                          src={sitePath(member.image)}
                          alt={member.name}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            objectPosition: member.align || '50% 20%',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            zIndex: 0, // Lowered to 0 so the index number and scanlines float ON TOP of the photo
                            borderRadius: 'inherit'
                          }}
                        />
                      ) : (
                        <span className="team-member-card__silhouette" />
                      )}

                      <span className="team-member-card__scan" />
                      <span className="team-member-card__index">{String(number).padStart(2, '0')}</span>
                    </div>

                    {/* Restored text block that was deleted */}
                    <div className="team-member-card__copy">
                      <span>{circle.accent}</span>
                      <h3>{member.name}</h3>
                      <p>{member.role}</p>
                    </div>

                  </article>
                );
              })}
            </div>
          </section>
        );
      })}

      <aside className="team-page__closing">
        <span>15 signals · one frequency</span>
        <h2 className="editorial-heading">Different disciplines.<br /><em>One shared obsession.</em></h2>
        <p>The official Season 2 team identities and portraits will land here next.</p>
      </aside>
    </div>
  </section>
);

export default Team;
