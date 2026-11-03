import { Link } from 'react-router-dom'
import { Timeline } from '../../components/Timeline/Timeline'
import { timelineEvents, timelineCategories } from '../../data/timeline'
import styles from './Timeline.module.css'

export const TimelinePage = () => {
  return (
    <div className={styles.page}>
      {/* Hero */}
      <header className={styles.hero}>
        <div className={styles.heroBackground} aria-hidden="true"></div>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Interactive <span className={styles.highlight}>Timeline</span></h1>
          <p className={styles.heroSubtitle}>
            Every major event in Harry Potter's life — from birth to the epilogue.
            Filter, search, and explore chronologically or by category.
          </p>
          <div className={styles.heroStats}>
            <Stat stat={timelineEvents.length} label="Total Events" icon="📜" />
            <Stat stat={timelineCategories.length - 1} label="Categories" icon="🏷️" />
            <Stat stat={timelineEvents.filter(e => e.importance === 'major').length} label="Major Events" icon="⚔️" color="#e74c3c" />
            <Stat stat={1998 - 1980 + 1} label="Years Covered" icon="📅" color="#3498db" />
          </div>
        </div>
      </header>

      {/* Timeline Component */}
      <section className={styles.timelineSection} aria-labelledby="timeline-heading">
        <div className={styles.container}>
          <header className={styles.sectionHeader}>
            <h2 id="timeline-heading" className={styles.sectionTitle}>Harry's Life Timeline</h2>
            <p className={styles.sectionDescription}>
              1980–2017: The complete chronological journey of the Boy Who Lived
            </p>
          </header>

          <Timeline events={timelineEvents} defaultFilter="all" />
        </div>
      </section>

      {/* Key Periods */}
      <section className={styles.periodsSection} aria-labelledby="periods-heading">
        <div className={styles.container}>
          <header className={styles.sectionHeader}>
            <h2 id="periods-heading" className={styles.sectionTitle}>Key Periods</h2>
            <p className={styles.sectionDescription}>Jump to a specific era in Harry's life</p>
          </header>

          <div className={styles.periodsGrid}>
            {[
              { label: 'Pre-Hogwarts', years: '1980–1991', events: 3, color: '#f39c12', icon: '🏠' },
              { label: 'Hogwarts Years', years: '1991–1998', events: 34, color: '#ae0001', icon: '🏰' },
              { label: 'Horcrux Hunt', years: '1997–1998', events: 8, color: '#e74c3c', icon: '🔮' },
              { label: 'Post-War', years: '1998–2017', events: 3, color: '#2ecc71', icon: '☮️' }
            ].map((period, index) => (
              <article key={period.label} className={styles.periodCard} style={{ '--period-color': period.color, animationDelay: `${index * 100}ms` }}>
                <span className={styles.periodIcon} aria-hidden="true">{period.icon}</span>
                <h3 className={styles.periodLabel}>{period.label}</h3>
                <span className={styles.periodYears}>{period.years}</span>
                <span className={styles.periodEvents}>{period.events} events</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Books Overview */}
      <section className={styles.booksSection} aria-labelledby="books-heading">
        <div className={styles.container}>
          <header className={styles.sectionHeader}>
            <h2 id="books-heading" className={styles.sectionTitle}>By Book</h2>
            <p className={styles.sectionDescription}>Events organized by the seven novels</p>
          </header>

          <div className={styles.booksGrid}>
            {[
              { book: "Philosopher's Stone", year: '1991–1992', events: 7, color: '#ae0001' },
              { book: "Chamber of Secrets", year: '1992–1993', events: 7, color: '#1a7a2a' },
              { book: "Prisoner of Azkaban", year: '1993–1994', events: 6, color: '#222f5b' },
              { book: "Goblet of Fire", year: '1994–1995', events: 6, color: '#9b59b6' },
              { book: "Order of the Phoenix", year: '1995–1996', events: 6, color: '#e74c3c' },
              { book: "Half-Blood Prince", year: '1996–1997', events: 3, color: '#34495e' },
              { book: "Deathly Hallows", year: '1997–1998', events: 13, color: '#f39c12' }
            ].map((book, index) => (
              <article key={book.book} className={styles.bookCard} style={{ '--book-color': book.color, animationDelay: `${index * 80}ms` }}>
                <h3 className={styles.bookTitle}>{book.book}</h3>
                <span className={styles.bookYear}>{book.year}</span>
                <span className={styles.bookEvents}>{book.events} key events</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Navigation */}
      <nav className={styles.pageNav} aria-label="Page navigation">
        <Link to="/magic" className={styles.navLink}>
          <span aria-hidden="true">←</span> Magic & Spells
        </Link>
        <Link to="/gallery" className={styles.navLink} style={{ textAlign: 'right' }}>
          Gallery <span aria-hidden="true">→</span>
        </Link>
      </nav>
    </div>
  )
}

const Stat = ({ stat, label, icon, color = 'var(--color-gold-primary)' }) => (
  <div className={styles.stat} style={{ '--stat-color': color }}>
    <span className={styles.statIcon} aria-hidden="true">{icon}</span>
    <div className={styles.statValue} style={{ color }}>{stat}</div>
    <div className={styles.statLabel}>{label}</div>
  </div>
)

export default TimelinePage