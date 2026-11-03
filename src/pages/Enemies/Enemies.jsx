import { Link } from 'react-router-dom'
import { useState, useMemo } from 'react'
import { CharacterCard } from '../../components/CharacterCard/CharacterCard'
import { characters, getCharactersByRole } from '../../data/characters'
import styles from './Enemies.module.css'

const enemyCharacters = getCharactersByRole('enemies')

const categories = [
  { id: 'all', label: 'All Enemies', count: enemyCharacters.length },
  { id: 'dark-lord', label: 'Dark Lords', count: enemyCharacters.filter(c => c.role.includes('Dark Wizard')).length },
  { id: 'death-eaters', label: 'Death Eaters', count: enemyCharacters.filter(c => c.role.includes('Death Eater')).length },
  { id: 'ministry', label: 'Ministry Antagonists', count: enemyCharacters.filter(c => c.role.includes('Ministry')).length },
  { id: 'creatures', label: 'Dark Creatures', count: enemyCharacters.filter(c => c.role.includes('Snatcher') || c.bloodStatus === 'Werewolf').length }
]

export const Enemies = () => {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState('grid')

  const filteredEnemies = useMemo(() => {
    let result = enemyCharacters

    if (activeCategory !== 'all') {
      switch (activeCategory) {
        case 'dark-lord':
          result = result.filter(c => c.role.includes('Dark Wizard'))
          break
        case 'death-eaters':
          result = result.filter(c => c.role.includes('Death Eater'))
          break
        case 'ministry':
          result = result.filter(c => c.role.includes('Ministry'))
          break
        case 'creatures':
          result = result.filter(c => c.role.includes('Snatcher') || c.bloodStatus === 'Werewolf')
          break
      }
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(c =>
        c.name.toLowerCase().includes(query) ||
        c.role.toLowerCase().includes(query) ||
        c.house.toLowerCase().includes(query)
      )
    }

    return result
  }, [activeCategory, searchQuery])

  const voldemort = enemyCharacters.find(c => c.id === 'lord-voldemort')
  const innerCircle = enemyCharacters.filter(c =>
    ['bellatrix-lestrange', 'lucius-malfoy', 'peter-pettigrew', 'fenrir-greyback', 'dolores-umbridge'].includes(c.id)
  )
  const otherEnemies = enemyCharacters.filter(c =>
    !['lord-voldemort', 'bellatrix-lestrange', 'lucius-malfoy', 'peter-pettigrew', 'fenrir-greyback', 'dolores-umbridge'].includes(c.id)
  )

  return (
    <div className={styles.page}>
      {/* Hero */}
      <header className={styles.hero}>
        <div className={styles.heroBackground} aria-hidden="true"></div>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Enemies & <span className={styles.highlight}>Dark Forces</span></h1>
          <p className={styles.heroSubtitle}>
            The Dark Lords, Death Eaters, and dark creatures who opposed Harry Potter.
            From He-Who-Must-Not-Be-Named to his most loyal followers.
          </p>
          <div className={styles.heroStats}>
            <Stat stat={enemyCharacters.filter(c => c.role.includes('Dark Wizard')).length} label="Dark Lords" icon="☠️" />
            <Stat stat={enemyCharacters.filter(c => c.role.includes('Death Eater')).length} label="Death Eaters" icon="🐍" />
            <Stat stat={enemyCharacters.filter(c => c.role.includes('Ministry')).length} label="Ministry Villains" icon="🏛️" />
            <Stat stat={enemyCharacters.length} label="Total Enemies" icon="⚔️" />
          </div>
        </div>
      </header>

      {/* Voldemort Featured */}
      {voldemort && (
        <section className={styles.featured} aria-labelledby="voldemort-heading">
          <div className={styles.container}>
            <header className={styles.sectionHeader}>
              <h2 id="voldemort-heading" className={styles.sectionTitle}>The Dark Lord</h2>
              <p className={styles.sectionDescription}>The most dangerous dark wizard of all time</p>
            </header>

            <div className={styles.voldemortCard}>
              <CharacterCard character={voldemort} variant="featured" />
            </div>
          </div>
        </section>
      )}

      {/* Inner Circle */}
      <section className={styles.innerCircle} aria-labelledby="circle-heading">
        <div className={styles.container}>
          <header className={styles.sectionHeader}>
            <h2 id="circle-heading" className={styles.sectionTitle}>Inner Circle</h2>
            <p className={styles.sectionDescription}>Voldemort's most loyal and dangerous followers</p>
          </header>

          <div className={styles.circleGrid} role="list">
            {innerCircle.map((character, index) => (
              <div key={character.id} className={styles.circleCard} style={{ animationDelay: `${index * 100}ms` }} role="listitem">
                <CharacterCard character={character} variant="default" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filters & Search */}
      <section className={styles.filtersSection} aria-labelledby="filters-heading">
        <div className={styles.container}>
          <div className={styles.filters}>
            <div className={styles.searchWrapper}>
              <label htmlFor="enemy-search" className={styles.srOnly}>Search enemies</label>
              <input
                id="enemy-search"
                type="search"
                className={styles.searchInput}
                placeholder="Search enemies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search enemies"
              />
            </div>

            <div className={styles.categoryTabs} role="tablist" aria-label="Filter by category">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  role="tab"
                  aria-selected={activeCategory === cat.id}
                  aria-controls={`panel-${cat.id}`}
                  className={`${styles.tab} ${activeCategory === cat.id ? styles.active : ''}`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  {cat.label}
                  <span className={styles.tabCount}>{cat.count}</span>
                </button>
              ))}
            </div>

            <div className={styles.viewToggle} role="group" aria-label="View mode">
              <button
                className={`${styles.viewBtn} ${viewMode === 'grid' ? styles.active : ''}`}
                onClick={() => setViewMode('grid')}
                aria-pressed={viewMode === 'grid'}
                title="Grid view"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <rect x="3" y="3" width="7" height="7" rx="1" />
                  <rect x="14" y="3" width="7" height="7" rx="1" />
                  <rect x="3" y="14" width="7" height="7" rx="1" />
                  <rect x="14" y="14" width="7" height="7" rx="1" />
                </svg>
              </button>
              <button
                className={`${styles.viewBtn} ${viewMode === 'list' ? styles.active : ''}`}
                onClick={() => setViewMode('list')}
                aria-pressed={viewMode === 'list'}
                title="List view"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* All Enemies Grid */}
      <section className={styles.gridSection} aria-labelledby="grid-heading">
        <div className={styles.container}>
          <div className={styles.resultsBar} aria-live="polite">
            <span>{filteredEnemies.length} enemy{filteredEnemies.length !== 1 ? 's' : ''} found</span>
          </div>

          <div className={`${styles.enemyGrid} ${viewMode === 'list' ? styles.listView : ''}`} role="list">
            {filteredEnemies.length === 0 ? (
              <div className={styles.emptyState}>
                <p>No enemies match your criteria.</p>
                <button onClick={() => { setActiveCategory('all'); setSearchQuery('') }} className={styles.resetBtn}>
                  Clear filters
                </button>
              </div>
            ) : (
              filteredEnemies.map((character, index) => (
                <div key={character.id} className={styles.gridItem} style={{ animationDelay: `${index * 30}ms` }} role="listitem">
                  <CharacterCard
                    character={character}
                    variant={viewMode === 'list' ? 'compact' : 'default'}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Dark Arts Info */}
      <section className={styles.darkArtsSection} aria-labelledby="dark-arts-heading">
        <div className={styles.container}>
          <header className={styles.sectionHeader}>
            <h2 id="dark-arts-heading" className={styles.sectionTitle}>The Dark Arts</h2>
            <p className={styles.sectionDescription}>Forbidden magic that corrupts the soul</p>
          </header>

          <div className={styles.darkArtsGrid}>
            <article className={styles.darkArtCard}>
              <div className={styles.darkArtIcon} aria-hidden="true">☠️</div>
              <h3 className={styles.darkArtTitle}>Unforgivable Curses</h3>
              <ul className={styles.darkArtList}>
                <li><strong>Avada Kedavra</strong> — Killing Curse (green light)</li>
                <li><strong>Crucio</strong> — Cruciatus Curse (torture)</li>
                <li><strong>Imperio</strong> — Imperius Curse (mind control)</li>
              </ul>
              <p className={styles.darkArtNote}>Use on humans carries life sentence in Azkaban</p>
            </article>

            <article className={styles.darkArtCard}>
              <div className={styles.darkArtIcon} aria-hidden="true">🧪</div>
              <h3 className={styles.darkArtTitle}>Horcruxes</h3>
              <ul className={styles.darkArtList}>
                <li>Tom Riddle's Diary (destroyed by Harry)</li>
                <li>Marvolo Gaunt's Ring (destroyed by Dumbledore)</li>
                <li>Salazar Slytherin's Locket (destroyed by Ron)</li>
                <li>Helga Hufflepuff's Cup (destroyed by Hermione)</li>
                <li>Rowena Ravenclaw's Diadem (destroyed by Fiendfyre)</li>
                <li>Nagini the Snake (killed by Neville)</li>
                <li>Harry Potter (accidental, survived)</li>
              </ul>
              <p className={styles.darkArtNote}>Seven pieces of soul — the ultimate dark magic</p>
            </article>

            <article className={styles.darkArtCard}>
              <div className={styles.darkArtIcon} aria-hidden="true">🏰</div>
              <h3 className={styles.darkArtTitle}>Azkaban</h3>
              <ul className={styles.darkArtList}>
                <li>Wizard prison guarded by Dementors</li>
                <li>Located in North Sea, unplottable</li>
                <li>Mass breakouts in 1993 & 1996</li>
                <li>Dementors left to join Voldemort</li>
              </ul>
              <p className={styles.darkArtNote}>Where the worst dark wizards are imprisoned</p>
            </article>

            <article className={styles.darkArtCard}>
              <div className={styles.darkArtIcon} aria-hidden="true">💀</div>
              <h3 className={styles.darkArtTitle}>Death Eaters</h3>
              <ul className={styles.darkArtList}>
                <li>Voldemort's elite followers</li>
                <li>Marked with Dark Mark on left forearm</li>
                <li>Summoned by touching the Mark</li>
                <li>Ideology: Pure-blood supremacy</li>
              </ul>
              <p className={styles.darkArtNote}>Inner circle vs. outer circle followers</p>
            </article>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <nav className={styles.pageNav} aria-label="Page navigation">
        <Link to="/friends" className={styles.navLink}>
          <span aria-hidden="true">←</span> Friends & Allies
        </Link>
        <Link to="/magic" className={styles.navLink} style={{ textAlign: 'right' }}>
          Magic & Spells <span aria-hidden="true">→</span>
        </Link>
      </nav>
    </div>
  )
}

const Stat = ({ stat, label, icon }) => (
  <div className={styles.stat}>
    <span className={styles.statIcon} aria-hidden="true">{icon}</span>
    <div className={styles.statValue}>{stat}</div>
    <div className={styles.statLabel}>{label}</div>
  </div>
)

export default Enemies