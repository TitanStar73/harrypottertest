import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { CharacterCard } from '../../components/CharacterCard/CharacterCard'
import { characters, houses, getCharactersByRole } from '../../data/characters'
import styles from './Friends.module.css'

const friendCharacters = getCharactersByRole('friends').concat(
  characters.filter(c => c.house === 'Gryffindor' && !getCharactersByRole('friends').includes(c))
)

const uniqueFriends = [...new Map(friendCharacters.map(c => [c.id, c])).values()]

const categories = [
  { id: 'all', label: 'All', count: uniqueFriends.length },
  { id: 'gryffindor', label: 'Gryffindor', count: uniqueFriends.filter(c => c.house === 'Gryffindor').length },
  { id: 'hufflepuff', label: 'Hufflepuff', count: uniqueFriends.filter(c => c.house === 'Hufflepuff').length },
  { id: 'ravenclaw', label: 'Ravenclaw', count: uniqueFriends.filter(c => c.house === 'Ravenclaw').length },
  { id: 'slytherin', label: 'Slytherin', count: uniqueFriends.filter(c => c.house === 'Slytherin').length },
  { id: 'order', label: 'Order of the Phoenix', count: uniqueFriends.filter(c => c.role.includes('Order')).length },
  { id: 'da', label: "Dumbledore's Army", count: uniqueFriends.filter(c => c.role.includes('D.A.') || c.role.includes('D.A. Leader')).length },
  { id: 'staff', label: 'Hogwarts Staff', count: uniqueFriends.filter(c => c.role.includes('Professor') || c.role.includes('Headmaster') || c.role.includes('Keeper')).length }
]

export const Friends = () => {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState('grid')

  const filteredCharacters = useMemo(() => {
    let result = uniqueFriends

    if (activeCategory !== 'all') {
      const cat = categories.find(c => c.id === activeCategory)
      if (cat) {
        switch (activeCategory) {
          case 'order':
            result = result.filter(c => c.role.includes('Order'))
            break
          case 'da':
            result = result.filter(c => c.role.includes('D.A.'))
            break
          case 'staff':
            result = result.filter(c => c.role.includes('Professor') || c.role.includes('Headmaster') || c.role.includes('Keeper'))
            break
          default:
            result = result.filter(c => c.house.toLowerCase() === activeCategory)
        }
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

  const goldenTrio = uniqueFriends.filter(c => ['harry-potter', 'ron-weasley', 'hermione-granger'].includes(c.id))
  const otherFriends = uniqueFriends.filter(c => !['harry-potter', 'ron-weasley', 'hermione-granger'].includes(c.id))

  return (
    <div className={styles.page}>
      {/* Hero */}
      <header className={styles.hero}>
        <div className={styles.heroBackground} aria-hidden="true"></div>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Friends & <span className={styles.highlight}>Allies</span></h1>
          <p className={styles.heroSubtitle}>
            The witches and wizards who stood beside Harry — from the Golden Trio to the Order of the Phoenix
            and Dumbledore's Army. Loyalty, courage, and friendship that defeated darkness.
          </p>
          <div className={styles.heroStats}>
            <Stat stat={goldenTrio.length} label="Golden Trio" icon="⚡" />
            <Stat stat={uniqueFriends.filter(c => c.role.includes('Order')).length} label="Order Members" icon="🧙" />
            <Stat stat={uniqueFriends.filter(c => c.role.includes('D.A.')).length} label="D.A. Members" icon="🛡️" />
            <Stat stat={uniqueFriends.length} label="Total Allies" icon="🤝" />
          </div>
        </div>
      </header>

      {/* Golden Trio Featured */}
      <section className={styles.featured} aria-labelledby="trio-heading">
        <div className={styles.container}>
          <header className={styles.sectionHeader}>
            <h2 id="trio-heading" className={styles.sectionTitle}>The Golden Trio</h2>
            <p className={styles.sectionDescription}>The friendship that changed the wizarding world</p>
          </header>

          <div className={styles.featuredGrid} role="list">
            {goldenTrio.map((character, index) => (
              <div key={character.id} className={styles.featuredCard} style={{ animationDelay: `${index * 150}ms` }} role="listitem">
                <CharacterCard character={character} variant="featured" />
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
              <label htmlFor="character-search" className={styles.srOnly}>Search characters</label>
              <input
                id="character-search"
                type="search"
                className={styles.searchInput}
                placeholder="Search friends & allies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search characters"
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

      {/* Character Grid */}
      <section className={styles.gridSection} aria-labelledby="grid-heading">
        <div className={styles.container}>
          <div className={styles.resultsBar} aria-live="polite">
            <span>{filteredCharacters.length} character{filteredCharacters.length !== 1 ? 's' : ''} found</span>
          </div>

          <div className={`${styles.characterGrid} ${viewMode === 'list' ? styles.listView : ''}`} role="list">
            {filteredCharacters.length === 0 ? (
              <div className={styles.emptyState}>
                <p>No characters match your criteria.</p>
                <button onClick={() => { setActiveCategory('all'); setSearchQuery('') }} className={styles.resetBtn}>
                  Clear filters
                </button>
              </div>
            ) : (
              filteredCharacters.map((character, index) => (
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

      {/* Houses Info */}
      <section className={styles.housesSection} aria-labelledby="houses-heading">
        <div className={styles.container}>
          <header className={styles.sectionHeader}>
            <h2 id="houses-heading" className={styles.sectionTitle}>Hogwarts Houses</h2>
            <p className={styles.sectionDescription}>The four houses that shaped generations of witches and wizards</p>
          </header>

          <div className={styles.housesGrid}>
            {houses.map(house => (
              <article key={house.id} className={styles.houseCard} style={{ '--house-color': house.color, '--house-light': house.lightColor }}>
                <div className={styles.houseHeader}>
                  <h3 className={styles.houseName}>{house.name}</h3>
                  <span className={styles.houseElement}>{house.element}</span>
                </div>
                <p className={styles.houseFounder}>Founder: {house.founder}</p>
                <p className={styles.houseGhost}>Ghost: {house.ghost}</p>
                <ul className={styles.houseTraits}>
                  {house.traits.map((trait, index) => (
                    <li key={index}><span className={styles.traitBullet} aria-hidden="true">•</span> {trait}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Navigation */}
      <nav className={styles.pageNav} aria-label="Page navigation">
        <Link to="/hogwarts-years" className={styles.navLink}>
          <span aria-hidden="true">←</span> Hogwarts Years
        </Link>
        <Link to="/enemies" className={styles.navLink} style={{ textAlign: 'right' }}>
          Enemies <span aria-hidden="true">→</span>
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

export default Friends