import { Link } from 'react-router-dom'
import { Quote } from '../../components/Quote/Quote'
import { timelineEvents } from '../../data/timeline'
import { characters } from '../../data/characters'
import { spells } from '../../data/spells'
import { quotes } from '../../data/quotes'
import { MagicBackground } from '../../components/MagicBackground/MagicBackground'
import { useTypewriter, useScrollReveal } from '../../hooks'
import styles from './Home.module.css'

const featuredQuote = quotes.find(q => q.id === 'quote-14') || quotes[0]

const quickStats = [
  { value: '7', label: 'Books', icon: '📚' },
  { value: '8', label: 'Movies', icon: '🎬' },
  { value: '1991–1998', label: 'Hogwarts Years', icon: '🏰' },
  { value: '3', label: 'Unforgivable Curses', icon: '☠️' },
  { value: '7', label: 'Horcruxes', icon: '🔮' },
  { value: '1', label: 'Boy Who Lived', icon: '⚡' }
]

const navigationCards = [
  {
    title: 'Biography',
    description: 'From the cupboard under the stairs to the defeat of the Dark Lord — follow Harry\'s complete life story.',
    path: '/biography',
    icon: '📖',
    color: 'var(--color-gold-primary)'
  },
  {
    title: 'Hogwarts Years',
    description: 'Year-by-year breakdown of Harry\'s seven years at Hogwarts School of Witchcraft and Wizardry.',
    path: '/hogwarts-years',
    icon: '🏰',
    color: '#ae0001'
  },
  {
    title: 'Friends & Allies',
    description: 'Meet the brave witches and wizards who stood beside Harry — the Golden Trio, Order members, and D.A.',
    path: '/friends',
    icon: '🤝',
    color: '#2ecc71'
  },
  {
    title: 'Enemies',
    description: 'From Death Eaters to Dark Lords — the villains who opposed Harry at every turn.',
    path: '/enemies',
    icon: '🐍',
    color: '#e74c3c'
  },
  {
    title: 'Magic & Spells',
    description: 'Explore Harry\'s spellbook — from Expelliarmus to Expecto Patronum and the Unforgivable Curses.',
    path: '/magic',
    icon: '⚡',
    color: '#9b59b6'
  },
  {
    title: 'Timeline',
    description: 'Interactive chronological timeline of every major event in Harry\'s life.',
    path: '/timeline',
    icon: '📜',
    color: '#3498db'
  },
  {
    title: 'Gallery',
    description: 'Visual journey through Harry\'s world — characters, locations, and magical moments.',
    path: '/gallery',
    icon: '🖼️',
    color: '#f39c12'
  }
]

export const Home = () => {
  const majorEvents = timelineEvents.filter(e => e.importance === 'major').slice(0, 5)
  const mainCharacters = characters.filter(c => ['Best Friend', 'Wife', 'Headmaster', 'Godfather'].some(r => c.role.includes(r))).slice(0, 6)
  const signatureSpells = spells.filter(s => ['Expelliarmus', 'Expecto Patronum', 'Stupefy', 'Protego'].includes(s.name)).slice(0, 4)

  // Magical typewriter effect for subtitle
  const { displayText: typedSubtitle, isComplete: subtitleComplete } = useTypewriter(
    'The wizard who survived the Killing Curse, defeated the Dark Lord, and changed the wizarding world forever.',
    30,
    1000
  )

  // Scroll reveal for sections
  const [navRef, navVisible] = useScrollReveal(0.1, '0px 0px -100px 0px')
  const [highlightsRef, highlightsVisible] = useScrollReveal(0.1, '0px 0px -100px 0px')
  const [ctaRef, ctaVisible] = useScrollReveal(0.1, '0px 0px -100px 0px')

  return (
    <div className={styles.page}>
      {/* Magical Background */}
      <MagicBackground intensity="high" color="gold" />

      {/* Hero Section */}
      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={styles.heroBackground} aria-hidden="true">
          <div className={styles.heroGlow}></div>
          <div className={styles.heroParticles}></div>
          {/* Floating magical symbols */}
          <div className={styles.floatingSymbols} aria-hidden="true">
            <span className={styles.floatSymbol} style={{ top: '15%', left: '10%', animationDelay: '0s' }}>✨</span>
            <span className={styles.floatSymbol} style={{ top: '25%', right: '15%', animationDelay: '2s' }}>⚡</span>
            <span className={styles.floatSymbol} style={{ top: '60%', left: '5%', animationDelay: '4s' }}>🔮</span>
            <span className={styles.floatSymbol} style={{ top: '70%', right: '10%', animationDelay: '1s' }}>✨</span>
            <span className={styles.floatSymbol} style={{ top: '40%', left: '50%', animationDelay: '3s' }}>⚡</span>
            <span className={styles.floatSymbol} style={{ top: '80%', left: '30%', animationDelay: '5s' }}>🔮</span>
          </div>
        </div>

        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>The Boy Who Lived</div>
          <h1 id="hero-title" className={styles.heroTitle}>
            Harry <span className={styles.heroTitleHighlight}>Potter</span>
          </h1>
          <p className={styles.heroSubtitle}>
            {typedSubtitle}<span className={styles.cursor} aria-hidden="true">{subtitleComplete ? '' : '|'}</span>
          </p>

          <div className={styles.heroActions}>
            <Link to="/biography" className={styles.ctaPrimary}>
              Begin the Journey
              <span aria-hidden="true">→</span>
            </Link>
            <Link to="/timeline" className={styles.ctaSecondary}>
              View Timeline
            </Link>
          </div>

          <div className={styles.heroStats}>
            {quickStats.map((stat, index) => (
              <div key={stat.label} className={styles.stat} style={{ animationDelay: `${index * 100}ms` }}>
                <span className={styles.statIcon} aria-hidden="true">{stat.icon}</span>
                <div className={styles.statValue}>{stat.value}</div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.scrollIndicator} aria-hidden="true">
          <span>Scroll to explore</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* Featured Quote */}
      <section className={styles.featuredQuote} aria-labelledby="quote-heading">
        <div className={styles.sectionContainer}>
          <Quote quote={featuredQuote} variant="hero" />
        </div>
      </section>

      {/* Quick Navigation */}
      <section 
        ref={navRef}
        className={`${styles.navigation} ${navVisible ? styles.visible : ''}`}
        aria-labelledby="nav-heading"
      >
        <div className={styles.sectionContainer}>
          <header className={styles.sectionHeader}>
            <h2 id="nav-heading" className={styles.sectionTitle}>Explore Harry's World</h2>
            <p className={styles.sectionDescription}>
              Dive deep into every aspect of the Boy Who Lived's extraordinary life
            </p>
          </header>

          <div className={styles.cardGrid} role="list">
            {navigationCards.map((card, index) => (
              <article 
                key={card.path} 
                className={`${styles.navCard} ${navVisible ? styles.cardVisible : ''}`}
                style={{ '--card-color': card.color, animationDelay: `${index * 100}ms` }}
                role="listitem"
              >
                <Link to={card.path} className={styles.navCardLink}>
                  <div className={styles.navCardIcon} aria-hidden="true">{card.icon}</div>
                  <h3 className={styles.navCardTitle}>{card.title}</h3>
                  <p className={styles.navCardDescription}>{card.description}</p>
                  <span className={styles.navCardArrow} aria-hidden="true">→</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section 
        ref={highlightsRef}
        className={`${styles.highlights} ${highlightsVisible ? styles.visible : ''}`}
        aria-labelledby="highlights-heading"
      >
        <div className={styles.sectionContainer}>
          <header className={styles.sectionHeader}>
            <h2 id="highlights-heading" className={styles.sectionTitle}>Key Highlights</h2>
          </header>

          <div className={styles.highlightsGrid}>
            {/* Signature Spells */}
            <div className={styles.highlightCard}>
              <div className={styles.highlightHeader}>
                <span className={styles.highlightIcon} aria-hidden="true">⚡</span>
                <h3 className={styles.highlightTitle}>Signature Spells</h3>
              </div>
              <div className={styles.spellList}>
                {signatureSpells.map(spell => (
                  <div key={spell.id} className={styles.spellItem}>
                    <span className={styles.spellName}>{spell.name}</span>
                    <span className={styles.spellIncantation}>{spell.incantation}</span>
                  </div>
                ))}
              </div>
              <Link to="/magic" className={styles.highlightLink}>View all spells →</Link>
            </div>

            {/* Key Characters */}
            <div className={styles.highlightCard}>
              <div className={styles.highlightHeader}>
                <span className={styles.highlightIcon} aria-hidden="true">👥</span>
                <h3 className={styles.highlightTitle}>Key Characters</h3>
              </div>
              <div className={styles.characterList}>
                {mainCharacters.map(char => (
                  <Link key={char.id} to={`/characters/${char.id}`} className={styles.characterItem}>
                    <span className={styles.characterName}>{char.name}</span>
                    <span className={styles.characterRole}>{char.role.split('/')[0]}</span>
                  </Link>
                ))}
              </div>
              <Link to="/friends" className={styles.highlightLink}>View all characters →</Link>
            </div>

            {/* Major Events */}
            <div className={styles.highlightCard}>
              <div className={styles.highlightHeader}>
                <span className={styles.highlightIcon} aria-hidden="true">⚔️</span>
                <h3 className={styles.highlightTitle}>Major Events</h3>
              </div>
              <div className={styles.eventList}>
                {majorEvents.map(event => (
                  <div key={event.id} className={styles.eventItem}>
                    <time className={styles.eventDate}>{event.year}</time>
                    <span className={styles.eventTitle}>{event.title}</span>
                  </div>
                ))}
              </div>
              <Link to="/timeline" className={styles.highlightLink}>View full timeline →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        ref={ctaRef}
        className={`${styles.ctaSection} ${ctaVisible ? styles.visible : ''}`}
        aria-labelledby="cta-heading"
      >
        <div className={styles.ctaContent}>
          <h2 id="cta-heading" className={styles.ctaTitle}>The Story Continues...</h2>
          <p className={styles.ctaText}>
            Nineteen years later, the scar had not pained Harry. All was well.
            But the legacy lives on — explore every detail of the magic that shaped a generation.
          </p>
          <Link to="/biography" className={styles.ctaButton}>
            Start from the Beginning
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home