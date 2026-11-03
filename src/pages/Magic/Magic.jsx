import { Link } from 'react-router-dom'
import { useState, useMemo } from 'react'
import { SpellCard } from '../../components/SpellCard/SpellCard'
import { spells, spellCategories, getSpellsByCategory, searchSpells } from '../../data/spells'
import { characters } from '../../data/characters'
import styles from './Magic.module.css'

export const Magic = () => {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState('grid')

  const filteredSpells = useMemo(() => {
    let result = getSpellsByCategory(activeCategory)

    if (searchQuery) {
      result = searchSpells(searchQuery)
      if (activeCategory !== 'all') {
        result = result.filter(s => getSpellsByCategory(activeCategory).includes(s))
      }
    }

    return result
  }, [activeCategory, searchQuery])

  const signatureSpells = spells.filter(s =>
    ['Expelliarmus', 'Expecto Patronum', 'Stupefy', 'Protego', 'Expelliarmus'].includes(s.name)
  )

  const unforgivable = spells.filter(s => s.category.includes('Unforgivable'))

  return (
    <div className={styles.page}>
      {/* Hero */}
      <header className={styles.hero}>
        <div className={styles.heroBackground} aria-hidden="true"></div>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Magic & <span className={styles.highlight}>Spells</span></h1>
          <p className={styles.heroSubtitle}>
            Harry's spellbook — from the Disarming Charm that became his signature to the Patronus
            that saved hundreds. Every incantation, effect, and story behind the magic.
          </p>
          <div className={styles.heroStats}>
            <Stat stat={spells.length} label="Known Spells" icon="⚡" />
            <Stat stat={spellCategories.length - 1} label="Categories" icon="📚" />
            <Stat stat={unforgivable.length} label="Unforgivable" icon="☠️" color="#e74c3c" />
            <Stat stat={signatureSpells.length} label="Signature" icon="✨" color="#9b59b6" />
          </div>
        </div>
      </header>

      {/* Featured Spells */}
      <section className={styles.featured} aria-labelledby="featured-heading">
        <div className={styles.container}>
          <header className={styles.sectionHeader}>
            <h2 id="featured-heading" className={styles.sectionTitle}>Harry's Signature Spells</h2>
            <p className={styles.sectionDescription}>The spells that defined the Boy Who Lived</p>
          </header>

          <div className={styles.featuredGrid} role="list">
            {signatureSpells.map((spell, index) => (
              <div key={spell.id} className={styles.featuredCard} style={{ animationDelay: `${index * 100}ms` }} role="listitem">
                <SpellCard spell={spell} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Unforgivable Curses */}
      <section className={styles.unforgivable} aria-labelledby="unforgivable-heading">
        <div className={styles.container}>
          <header className={styles.sectionHeader}>
            <h2 id="unforgivable-heading" className={styles.sectionTitle}>The Unforgivable Curses</h2>
            <p className={styles.sectionDescription}>The three curses classified as unforgivable by the Ministry of Magic</p>
          </header>

          <div className={styles.unforgivableGrid} role="list">
            {unforgivable.map((spell, index) => (
              <article key={spell.id} className={styles.unforgivableCard} style={{ animationDelay: `${index * 150}ms` }} role="listitem">
                <div className={styles.unforgivableIcon} aria-hidden="true">☠️</div>
                <h3 className={styles.unforgivableName}>{spell.name}</h3>
                <span className={styles.unforgivableIncantation}>{spell.incantation}</span>
                <p className={styles.unforgivableEffect}>{spell.effect}</p>
                <div className={styles.unforgivableMeta}>
                  <span className={styles.unforgivableLight}>Light: {spell.light}</span>
                  <span className={styles.unforgivableNote}>⚠ Life sentence in Azkaban</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Filters & Search */}
      <section className={styles.filtersSection} aria-labelledby="filters-heading">
        <div className={styles.container}>
          <div className={styles.filters}>
            <div className={styles.searchWrapper}>
              <label htmlFor="spell-search" className={styles.srOnly}>Search spells</label>
              <input
                id="spell-search"
                type="search"
                className={styles.searchInput}
                placeholder="Search spells..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search spells"
              />
            </div>

            <div className={styles.categoryTabs} role="tablist" aria-label="Filter by category">
              {spellCategories.map(cat => (
                <button
                  key={cat.id}
                  role="tab"
                  aria-selected={activeCategory === cat.id}
                  aria-controls={`panel-${cat.id}`}
                  className={`${styles.tab} ${activeCategory === cat.id ? styles.active : ''}`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  {cat.name}
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

      {/* All Spells Grid */}
      <section className={styles.gridSection} aria-labelledby="grid-heading">
        <div className={styles.container}>
          <div className={styles.resultsBar} aria-live="polite">
            <span>{filteredSpells.length} spell{filteredSpells.length !== 1 ? 's' : ''} found</span>
          </div>

          <div className={`${styles.spellGrid} ${viewMode === 'list' ? styles.listView : ''}`} role="list">
            {filteredSpells.length === 0 ? (
              <div className={styles.emptyState}>
                <p>No spells match your criteria.</p>
                <button onClick={() => { setActiveCategory('all'); setSearchQuery('') }} className={styles.resetBtn}>
                  Clear filters
                </button>
              </div>
            ) : (
              filteredSpells.map((spell, index) => (
                <div key={spell.id} className={styles.gridItem} style={{ animationDelay: `${index * 20}ms` }} role="listitem">
                  <SpellCard
                    spell={spell}
                    variant={viewMode === 'list' ? 'compact' : 'default'}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Wand & Patronus Info */}
      <section className={styles.infoSection} aria-labelledby="info-heading">
        <div className={styles.container}>
          <header className={styles.sectionHeader}>
            <h2 id="info-heading" className={styles.sectionTitle}>Harry's Magical Tools</h2>
            <p className={styles.sectionDescription}>The instruments that channeled his power</p>
          </header>

          <div className={styles.infoGrid}>
            <article className={styles.infoCard}>
              <div className={styles.infoIcon} aria-hidden="true">🪄</div>
              <h3 className={styles.infoTitle}>The Wand</h3>
              <ul className={styles.infoList}>
                <li><strong>Wood:</strong> Holly</li>
                <li><strong>Core:</strong> Phoenix feather (Fawkes)</li>
                <li><strong>Length:</strong> 11 inches</li>
                <li><strong>Flexibility:</strong> Nice and supple</li>
                <li><strong>Maker:</strong> Garrick Ollivander</li>
                <li><strong>Brother Wand:</strong> Voldemort's yew wand (same phoenix)</li>
              </ul>
              <p className={styles.infoNote}>
                Holly is protective; phoenix feather is the rarest core.
                The twin cores caused Priori Incantatem in the graveyard.
              </p>
            </article>

            <article className={styles.infoCard}>
              <div className={styles.infoIcon} aria-hidden="true">🦌</div>
              <h3 className={styles.infoTitle}>The Patronus</h3>
              <ul className={styles.infoList}>
                <li><strong>Form:</strong> Stag</li>
                <li><strong>Incantation:</strong> Expecto Patronum</li>
                <li><strong>Memory:</strong> First learning he was a wizard / parents</li>
                <li><strong>Teacher:</strong> Remus Lupin (age 13)</li>
                <li><strong>Significance:</strong> Same as James Potter's Animagus</li>
                <li><strong>Strength:</strong> Corporeal at 13; drove 100+ Dementors</li>
              </ul>
              <p className={styles.infoNote}>
                One of the youngest wizards to produce a corporeal Patronus.
                The stag represents his father's protection.
              </p>
            </article>

            <article className={styles.infoCard}>
              <div className={styles.infoIcon} aria-hidden="true">🗣️</div>
              <h3 className={styles.infoTitle}>Parseltongue</h3>
              <ul className={styles.infoList}>
                <li><strong>Ability:</strong> Speak to snakes</li>
                <li><strong>Source:</strong> Voldemort's soul fragment (Horcrux)</li>
                <li><strong>Lost:</strong> After Horcrux destroyed in Deathly Hallows</li>
                <li><strong>Key Uses:</strong> Chamber of Secrets, Duelling Club, snake at zoo</li>
                <li><strong>Hereditary:</strong> Usually inherited (Salazar Slytherin's line)</li>
              </ul>
              <p className={styles.infoNote}>
                Rare ability often associated with Dark wizards.
                Harry lost it when the Horcrux inside him was destroyed.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <nav className={styles.pageNav} aria-label="Page navigation">
        <Link to="/enemies" className={styles.navLink}>
          <span aria-hidden="true">←</span> Enemies
        </Link>
        <Link to="/timeline" className={styles.navLink} style={{ textAlign: 'right' }}>
          Timeline <span aria-hidden="true">→</span>
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

export default Magic