import { useState } from 'react'
import styles from './YearAccordion.module.css'

const yearData = [
  {
    year: 1,
    title: 'First Year (1991-1992)',
    book: 'Philosopher\'s Stone',
    summary: 'Harry discovers he\'s a wizard, attends Hogwarts, makes lifelong friends Ron and Hermione, becomes youngest Seeker in a century, and confronts Voldemort over the Philosopher\'s Stone.',
    keyEvents: [
      'Receives Hogwarts letter on 11th birthday',
      'Sorted into Gryffindor',
      'Makes friends with Ron Weasley and Hermione Granger',
      'Becomes Gryffindor Seeker',
      'Discovers Mirror of Erised',
      'Defeats Professor Quirrell/Voldemort protecting the Stone',
      'Wins House Cup for Gryffindor'
    ],
    characters: ['Ron Weasley', 'Hermione Granger', 'Albus Dumbledore', 'Rubeus Hagrid', 'Draco Malfoy', 'Professor Quirrell'],
    spells: ['Wingardium Leviosa', 'Alohomora', 'Petrificus Totalus', 'Lumos'],
    outcome: 'Voldemort\'s first defeat thwarted; Harry finds true home at Hogwarts'
  },
  {
    year: 2,
    title: 'Second Year (1992-1993)',
    book: 'Chamber of Secrets',
    summary: 'The Chamber of Secrets is opened, petrifying students. Harry discovers he\'s a Parselmouth, finds Tom Riddle\'s diary, and kills the Basilisk with the Sword of Gryffindor.',
    keyEvents: [
      'Dobby warns Harry not to return to Hogwarts',
      'Flies Ford Anglia to school with Ron',
      'Chamber of Secrets opened - Mrs. Norris petrified',
      'Discovers he can speak Parseltongue',
      'Finds Tom Riddle\'s diary',
      'Hermione petrified; Harry and Ron enter Chamber',
      'Kills Basilisk with Sword of Gryffindor',
      'Destroys diary with Basilisk fang (first Horcrux destroyed)',
      'Frees Dobby'
    ],
    characters: ['Ron Weasley', 'Hermione Granger', 'Ginny Weasley', 'Tom Riddle', 'Dobby', 'Gilderoy Lockhart'],
    spells: ['Expelliarmus', 'Riddikulus', 'Diffindo', 'Fawkes\' tears (healing)'],
    outcome: 'Ginny saved; Lucius Malfoy loses diary; Dobby freed'
  },
  {
    year: 3,
    title: 'Third Year (1993-1994)',
    book: 'Prisoner of Azkaban',
    summary: 'Sirius Black escapes Azkaban. Harry learns the truth about his parents\' betrayal, meets his godfather, and uses a Time-Turner to save Sirius and Buckbeak.',
    keyEvents: [
      'Dementors search Hogwarts Express',
      'Learns Patronus Charm from Lupin',
      'Marauder\'s Map from Fred & George',
      'Sirius Black revealed as godfather (innocent)',
      'Peter Pettigrew (Scabbers) exposed as traitor',
      'Time-Turner saves Buckbeak and Sirius',
      'Produces corporeal stag Patronus'
    ],
    characters: ['Remus Lupin', 'Sirius Black', 'Peter Pettigrew', 'Rubeus Hagrid', 'Buckbeak'],
    spells: ['Expecto Patronum', 'Riddikulus', 'Lumos Maxima', 'Petrificus Totalus'],
    outcome: 'Sirius escapes on Buckbeak; Pettigrew escapes; Lupin resigns'
  },
  {
    year: 4,
    title: 'Fourth Year (1994-1995)',
    book: 'Goblet of Fire',
    summary: 'Harry is mysteriously entered in the Triwizard Tournament. He faces dragons, merpeople, and a maze, culminating in Voldemort\'s return in a graveyard duel.',
    keyEvents: [
      'Quidditch World Cup - Dark Mark appears',
      'Selected as fourth Triwizard Champion',
      'First Task: Hungarian Horntail (summons Firebolt)',
      'Yule Ball with Parvati Patil',
      'Second Task: Black Lake (uses Gillyweed)',
      'Third Task: Maze - Portkey to graveyard',
      'Cedric Diggory killed by Wormtail',
      'Voldemort reborn using Harry\'s blood',
      'Priori Incantatem - escapes with parents\' help'
    ],
    characters: ['Cedric Diggory', 'Viktor Krum', 'Fleur Delacour', 'Barty Crouch Jr.', 'Lord Voldemort', 'Wormtail'],
    spells: ['Accio', 'Expecto Patronum', 'Reducto', 'Stupefy', 'Protego', 'Point Me'],
    outcome: 'Voldemort returns; Ministry denies it; Dumbledore reforms Order of the Phoenix'
  },
  {
    year: 5,
    title: 'Fifth Year (1995-1996)',
    book: 'Order of the Phoenix',
    summary: 'Ministry denies Voldemort\'s return. Umbridge takes over Hogwarts. Harry forms Dumbledore\'s Army. Battle at Department of Mysteries; Sirius dies.',
    keyEvents: [
      'Dementor attack in Little Whinging; hearing at Ministry',
      'Umbridge becomes DADA professor / High Inquisitor',
      'Forms Dumbledore\'s Army in Room of Requirement',
      'Occlumency lessons with Snape',
      'Vision of Arthur Weasley attacked',
      'D.A. betrayed; Dumbledore escapes',
      'Battle of the Department of Mysteries',
      'Sirius falls through the Veil',
      'Prophecy revealed: "Neither can live while the other survives"'
    ],
    characters: ['Dolores Umbridge', 'Luna Lovegood', 'Neville Longbottom', 'Ginny Weasley', 'Bellatrix Lestrange', 'Sirius Black'],
    spells: ['Expecto Patronum', 'Protego', 'Stupefy', 'Reducto', 'Levicorpus', 'Muffliato'],
    outcome: 'Sirius dead; Ministry acknowledges Voldemort; Harry understands prophecy'
  },
  {
    year: 6,
    title: 'Sixth Year (1996-1997)',
    book: 'Half-Blood Prince',
    summary: 'Harry learns about Horcruxes from Dumbledore. Discovers Snape\'s Half-Blood Prince book. Dumbledore killed by Snape on Astronomy Tower.',
    keyEvents: [
      'Slughorn returns; Harry gets Felix Felicis',
      'Half-Blood Prince\'s potions book',
      'Learns about Horcruxes from Dumbledore',
      'Draco\'s mission; Vanishing Cabinet',
      'Katie Bell cursed; Ron poisoned',
      'Cave mission - Dumbledore drinks potion',
      'Battle of the Astronomy Tower',
      'Snape kills Dumbledore (on Dumbledore\'s orders)',
      'Harry vows to hunt Horcruxes'
    ],
    characters: ['Horace Slughorn', 'Draco Malfoy', 'Severus Snape', 'Albus Dumbledore', 'Fenrir Greyback'],
    spells: ['Sectumsempra', 'Levicorpus', 'Liberacorpus', 'Episkey', 'Aguamenti', 'Felix Felicis'],
    outcome: 'Dumbledore dead; Hogwarts under threat; Harry, Ron, Hermione leave school'
  },
  {
    year: 7,
    title: 'Seventh Year / Horcrux Hunt (1997-1998)',
    book: 'Deathly Hallows',
    summary: 'Harry, Ron, and Hermione hunt Horcruxes. Final Battle of Hogwarts. Harry sacrifices himself, returns, and defeats Voldemort once and for all.',
    keyEvents: [
      'Wedding at Burrow; Ministry falls',
      'Infiltrate Ministry - steal locket from Umbridge',
      'Ron leaves; Godric\'s Hollow; wand broken',
      'Ron returns; destroys locket with Sword',
      'Lovegood house - Tale of Three Brothers',
      'Captured at Malfoy Manor; Dobby dies saving them',
      'Gringotts break-in - steal Hufflepuff Cup on dragon',
      'Return to Hogwarts; Ravenclaw Diadem destroyed',
      'Snape\'s memories - Harry is a Horcrux',
      'Walks to forest; "dies"; returns',
      'Final duel - Voldemort killed by own curse',
      'Harry repairs wand; returns Elder Wand'
    ],
    characters: ['Ron Weasley', 'Hermione Granger', 'Neville Longbottom', 'Ginny Weasley', 'Lord Voldemort', 'Severus Snape', 'Dobby'],
    spells: ['Expelliarmus', 'Expecto Patronum', 'Protego', 'Stupefy', 'Reducto', 'Confringo', 'Apparition'],
    outcome: 'Voldemort defeated; Harry becomes Master of Death; Peace restored'
  }
]

export const YearAccordion = ({ selectedYear, onSelectYear }) => {
  const [expandedYear, setExpandedYear] = useState(selectedYear || 1)

  const handleToggle = (year) => {
    setExpandedYear(expandedYear === year ? null : year)
    onSelectYear?.(year)
  }

  return (
    <div className={styles.accordion} role="region" aria-label="Hogwarts years">
      {yearData.map((year) => (
        <YearPanel
          key={year.year}
          year={year}
          isExpanded={expandedYear === year.year}
          onToggle={handleToggle}
        />
      ))}
    </div>
  )
}

const YearPanel = ({ year, isExpanded, onToggle }) => {
  return (
    <article className={`${styles.panel} ${isExpanded ? styles.expanded : ''}`}>
      <button
        className={styles.header}
        onClick={() => onToggle(year.year)}
        aria-expanded={isExpanded}
        aria-controls={`year-${year.year}-content`}
      >
        <div className={styles.yearNumber}>
          <span>Year</span>
          <span className={styles.number}>{year.year}</span>
        </div>
        <div className={styles.yearInfo}>
          <h3 className={styles.yearTitle}>{year.title}</h3>
          <span className={styles.yearBook}>{year.book}</span>
        </div>
        <span className={`${styles.chevron} ${isExpanded ? styles.chevronOpen : ''}`} aria-hidden="true">
          ▼
        </span>
      </button>

      <div
        id={`year-${year.year}-content`}
        className={styles.content}
        role="region"
        aria-labelledby={`year-${year.year}-title`}
        hidden={!isExpanded}
      >
        <div className={styles.contentInner}>
          <div className={styles.summary}>
            <p>{year.summary}</p>
          </div>

          <div className={styles.grid}>
            <section className={styles.section}>
              <h4 className={styles.sectionTitle}>Key Events</h4>
              <ul className={styles.eventList}>
                {year.keyEvents.map((event, index) => (
                  <li key={index} className={styles.eventItem}>
                    <span className={styles.eventBullet} aria-hidden="true">•</span>
                    {event}
                  </li>
                ))}
              </ul>
            </section>

            <section className={styles.section}>
              <h4 className={styles.sectionTitle}>Key Characters</h4>
              <div className={styles.tagList}>
                {year.characters.map((char, index) => (
                  <span key={index} className={styles.tag}>{char}</span>
                ))}
              </div>
            </section>

            <section className={styles.section}>
              <h4 className={styles.sectionTitle}>Spells Learned/Used</h4>
              <div className={styles.tagList}>
                {year.spells.map((spell, index) => (
                  <span key={index} className={`${styles.tag} ${styles.spellTag}`}>{spell}</span>
                ))}
              </div>
            </section>

            <section className={`${styles.section} ${styles.outcomeSection}`}>
              <h4 className={styles.sectionTitle}>Outcome</h4>
              <p className={styles.outcomeText}>{year.outcome}</p>
            </section>
          </div>
        </div>
      </div>
    </article>
  )
}

export default YearAccordion