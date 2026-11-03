import { Link } from 'react-router-dom'
import { YearAccordion } from '../../components/YearAccordion/YearAccordion'
import { timelineEvents } from '../../data/timeline'
import { spells } from '../../data/spells'
import { characters } from '../../data/characters'
import styles from './HogwartsYears.module.css'

const yearSummaries = [
  { year: 1, book: "Philosopher's Stone", focus: "Discovery & Friendship", color: "#ae0001" },
  { year: 2, book: "Chamber of Secrets", focus: "Mystery & Bravery", color: "#1a7a2a" },
  { year: 3, book: "Prisoner of Azkaban", focus: "Truth & Time", color: "#222f5b" },
  { year: 4, book: "Goblet of Fire", focus: "Tournament & Return", color: "#9b59b6" },
  { year: 5, book: "Order of the Phoenix", focus: "Resistance & Loss", color: "#e74c3c" },
  { year: 6, book: "Half-Blood Prince", focus: "Secrets & Sacrifice", color: "#34495e" },
  { year: 7, book: "Deathly Hallows", focus: "Hunt & Victory", color: "#f39c12" }
]

export const HogwartsYears = () => {
  return (
    <div className={styles.page}>
      {/* Hero */}
      <header className={styles.hero}>
        <div className={styles.heroBackground} aria-hidden="true"></div>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Seven Years at <span className={styles.highlight}>Hogwarts</span></h1>
          <p className={styles.heroSubtitle}>
            From a wide-eyed first year to the Battle of Hogwarts — follow Harry's complete journey
            through the halls of the greatest wizarding school.
          </p>
          <div className={styles.heroStats}>
            {yearSummaries.map((y, i) => (
              <div key={y.year} className={styles.stat} style={{ '--year-color': y.color, animationDelay: `${i * 80}ms` }}>
                <span className={styles.statNumber}>{y.year}</span>
                <span className={styles.statLabel}>Year {y.year}</span>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Year Cards Overview */}
      <section className={styles.overview} aria-labelledby="overview-heading">
        <div className={styles.container}>
          <header className={styles.sectionHeader}>
            <h2 id="overview-heading" className={styles.sectionTitle}>Year by Year</h2>
            <p className={styles.sectionDescription}>Click any year to expand and explore the details</p>
          </header>

          <div className={styles.yearCards} role="list">
            {yearSummaries.map((year, index) => (
              <article
                key={year.year}
                className={styles.yearCard}
                style={{ '--year-color': year.color, animationDelay: `${index * 100}ms` }}
                role="listitem"
              >
                <div className={styles.yearCardHeader}>
                  <span className={styles.yearNumber}>Year {year.year}</span>
                  <span className={styles.yearFocus}>{year.focus}</span>
                </div>
                <h3 className={styles.yearBook}>{year.book}</h3>
                <p className={styles.yearTeaser}>
                  {getYearTeaser(year.year)}
                </p>
                <span className={styles.expandHint}>Click to expand →</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Accordion */}
      <section className={styles.detailSection} aria-labelledby="detail-heading">
        <div className={styles.container}>
          <header className={styles.sectionHeader}>
            <h2 id="detail-heading" className={styles.sectionTitle}>Detailed Breakdown</h2>
            <p className={styles.sectionDescription}>Complete timeline of events, characters, and spells for each year</p>
          </header>

          <YearAccordion />
        </div>
      </section>

      {/* Key Statistics */}
      <section className={styles.statsSection} aria-labelledby="stats-heading">
        <div className={styles.container}>
          <header className={styles.sectionHeader}>
            <h2 id="stats-heading" className={styles.sectionTitle}>By the Numbers</h2>
          </header>

          <div className={styles.statsGrid}>
            <StatCard
              value={timelineEvents.filter(e => e.category === 'hogwarts').length}
              label="Hogwarts Events"
              icon="🏰"
              color="#ae0001"
            />
            <StatCard
              value={spells.filter(s => s.firstUsed.includes('Philosopher') || s.firstUsed.includes('Chamber') || s.firstUsed.includes('Azkaban') || s.firstUsed.includes('Goblet') || s.firstUsed.includes('Order') || s.firstUsed.includes('Prince') || s.firstUsed.includes('Hallows')).length}
              label="Spells Learned"
              icon="⚡"
              color="#9b59b6"
            />
            <StatCard
              value={characters.filter(c => c.house === 'Gryffindor' && c.role.includes('Student')).length + 4}
              label="Close Friends Made"
              icon="🤝"
              color="#2ecc71"
            />
            <StatCard
              value={7}
              label="Horcruxes Destroyed"
              icon="🔮"
              color="#e74c3c"
            />
            <StatCard
              value={150}
              label="House Points (Year 1)"
              icon="🏆"
              color="#f39c12"
            />
            <StatCard
              value={3}
              label="Unforgivable Curses Survived"
              icon="☠️"
              color="#34495e"
            />
          </div>
        </div>
      </section>

      {/* Navigation */}
      <nav className={styles.pageNav} aria-label="Page navigation">
        <Link to="/biography" className={styles.navLink}>
          <span aria-hidden="true">←</span> Biography
        </Link>
        <Link to="/friends" className={styles.navLink} style={{ textAlign: 'right' }}>
          Friends & Allies <span aria-hidden="true">→</span>
        </Link>
      </nav>
    </div>
  )
}

const getYearTeaser = (year) => {
  const teasers = {
    1: 'Discovers magic, makes lifelong friends, becomes youngest Seeker in a century, and protects the Philosopher\'s Stone.',
    2: 'Chamber of Secrets opened, Parseltongue revealed, Basilisk slain, first Horcrux destroyed, Dobby freed.',
    3: 'Sirius Black escapes Azkaban, learns Patronus Charm, Time-Turner saves Buckbeak and Sirius, Lupin resigns.',
    4: 'Triwizard Tournament, Hungarian Horntail, Yule Ball, graveyard duel, Voldemort returns, Cedric dies.',
    5: 'Umbridge takes over, Dumbledore\'s Army formed, Department of Mysteries battle, Sirius falls, prophecy revealed.',
    6: 'Half-Blood Prince\'s book, Horcrux memories, cave mission, Astronomy Tower battle, Dumbledore falls.',
    7: 'Horcrux hunt, Ministry infiltration, Gringotts dragon, Battle of Hogwarts, final duel, Voldemort defeated.'
  }
  return teasers[year] || ''
}

const StatCard = ({ value, label, icon, color }) => (
  <div className={styles.statCard} style={{ '--stat-color': color }}>
    <span className={styles.statIcon} aria-hidden="true">{icon}</span>
    <div className={styles.statValue}>{value}</div>
    <div className={styles.statLabel}>{label}</div>
  </div>
)

export default HogwartsYears