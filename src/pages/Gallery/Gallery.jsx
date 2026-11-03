import { Link } from 'react-router-dom'
import { useState } from 'react'
import { characters } from '../../data/characters'
import styles from './Gallery.module.css'

const galleryItems = [
  // Characters
  { id: 'harry', category: 'characters', title: 'Harry Potter', subtitle: 'The Boy Who Lived', icon: '⚡', color: '#ae0001' },
  { id: 'ron', category: 'characters', title: 'Ron Weasley', subtitle: 'Loyal Best Friend', icon: '🏰', color: '#ae0001' },
  { id: 'hermione', category: 'characters', title: 'Hermione Granger', subtitle: 'Brightest Witch', icon: '📚', color: '#ae0001' },
  { id: 'ginny', category: 'characters', title: 'Ginny Weasley', subtitle: 'Fierce Quidditch Star', icon: '🏹', color: '#ae0001' },
  { id: 'neville', category: 'characters', title: 'Neville Longbottom', subtitle: 'Courageous Leader', icon: '🌿', color: '#ae0001' },
  { id: 'luna', category: 'characters', title: 'Luna Lovegood', subtitle: 'Dreamy Ravenclaw', icon: '🦋', color: '#222f5b' },
  { id: 'dumbledore', category: 'characters', title: 'Albus Dumbledore', subtitle: 'Greatest Wizard', icon: '🧙', color: '#f39c12' },
  { id: 'snape', category: 'characters', title: 'Severus Snape', subtitle: 'Half-Blood Prince', icon: '🧪', color: '#34495e' },
  { id: 'voldemort', category: 'characters', title: 'Lord Voldemort', subtitle: 'Dark Lord', icon: '☠️', color: '#e74c3c' },
  { id: 'bellatrix', category: 'characters', title: 'Bellatrix Lestrange', subtitle: 'Most Loyal Death Eater', icon: '🐍', color: '#e74c3c' },
  { id: 'draco', category: 'characters', title: 'Draco Malfoy', subtitle: 'Rival Turned Ally', icon: '🦅', color: '#34495e' },
  { id: 'hagrid', category: 'characters', title: 'Rubeus Hagrid', subtitle: 'Keeper of Keys', icon: '🏔️', color: '#8b6914' },

  // Locations
  { id: 'hogwarts', category: 'locations', title: 'Hogwarts Castle', subtitle: 'School of Witchcraft & Wizardry', icon: '🏰', color: '#ae0001' },
  { id: 'great-hall', category: 'locations', title: 'Great Hall', subtitle: 'Feasts & Sorting Ceremonies', icon: '🍽️', color: '#f39c12' },
  { id: 'gryffindor-common', category: 'locations', title: 'Gryffindor Common Room', subtitle: 'Lion\'s Den', icon: '🦁', color: '#ae0001' },
  { id: 'hagrid-hut', category: 'locations', title: 'Hagrid\'s Hut', subtitle: 'Rock Cakes & Tea', icon: '🏠', color: '#8b6914' },
  { id: 'forbidden-forest', category: 'locations', title: 'Forbidden Forest', subtitle: 'Centaurs, Acromantulas & Unicorns', icon: '🌲', color: '#1a7a2a' },
  { id: 'hogsmeade', category: 'locations', title: 'Hogsmeade Village', subtitle: 'Only All-Wizard Village', icon: '🏘️', color: '#f39c12' },
  { id: 'diagon-alley', category: 'locations', title: 'Diagon Alley', subtitle: 'Shopping for Wizards', icon: '🛍️', color: '#f39c12' },
  { id: 'ministry', category: 'locations', title: 'Ministry of Magic', subtitle: 'Government of Wizarding Britain', icon: '🏛️', color: '#34495e' },
  { id: 'azkaban', category: 'locations', title: 'Azkaban Prison', subtitle: 'Guarded by Dementors', icon: '🏴‍☠️', color: '#34495e' },
  { id: 'grimmauld', category: 'locations', title: '12 Grimmauld Place', subtitle: 'Order Headquarters', icon: '🔒', color: '#34495e' },
  { id: 'shell-cottage', category: 'locations', title: 'Shell Cottage', subtitle: 'Bill & Fleur\'s Home', icon: '🐚', color: '#3498db' },
  { id: 'godrics-hollow', category: 'locations', title: 'Godric\'s Hollow', subtitle: 'Harry\'s Birthplace', icon: '🏡', color: '#ae0001' },

  // Magical Items
  { id: 'wand', category: 'items', title: 'Harry\'s Wand', subtitle: '11" Holly, Phoenix Feather', icon: '🪄', color: '#f39c12' },
  { id: 'elder-wand', category: 'items', title: 'Elder Wand', subtitle: 'Deathstick, Wand of Destiny', icon: '🪄', color: '#9b59b6' },
  { id: 'invisibility-cloak', category: 'items', title: 'Invisibility Cloak', subtitle: 'Deathly Hallow', icon: '🧥', color: '#9b59b6' },
  { id: 'resurrection-stone', category: 'items', title: 'Resurrection Stone', subtitle: 'Deathly Hallow', icon: '💍', color: '#9b59b6' },
  { id: 'marauders-map', category: 'items', title: 'Marauder\'s Map', subtitle: 'Mischief Managed', icon: '🗺️', color: '#f39c12' },
  { id: 'time-turner', category: 'items', title: 'Time-Turner', subtitle: 'Hour-Reversal Charm', icon: '⏳', color: '#9b59b6' },
  { id: 'sword-gryffindor', category: 'items', title: 'Sword of Gryffindor', subtitle: 'Goblin-Made, Basilisk Venom', icon: '⚔️', color: '#ae0001' },
  { id: 'golden-snitch', category: 'items', title: 'Golden Snitch', subtitle: 'I Open at the Close', icon: '🏐', color: '#f39c12' },
  { id: 'firebolt', category: 'items', title: 'Firebolt Broomstick', subtitle: 'World-Class Racing Broom', icon: '🧹', color: '#f39c12' },
  { id: 'pensieve', category: 'items', title: 'Pensieve', subtitle: 'Memory Storage', icon: '🏺', color: '#3498db' },
  { id: 'horcrux-diary', category: 'items', title: 'Tom Riddle\'s Diary', subtitle: 'First Horcrux Destroyed', icon: '📓', color: '#e74c3c' },
  { id: 'horcrux-ring', category: 'items', title: 'Marvolo Gaunt\'s Ring', subtitle: 'Second Horcrux (Resurrection Stone)', icon: '💍', color: '#e74c3c' },

  // Creatures
  { id: 'buckbeak', category: 'creatures', title: 'Buckbeak', subtitle: 'Hippogriff', icon: '🦅', color: '#8b6914' },
  { id: 'fawkes', category: 'creatures', title: 'Fawkes', subtitle: 'Dumbledore\'s Phoenix', icon: '🐦', color: '#f39c12' },
  { id: 'hedwig', category: 'creatures', title: 'Hedwig', subtitle: 'Harry\'s Snowy Owl', icon: '🦉', color: '#ecf0f1' },
  { id: 'dobby', category: 'creatures', title: 'Dobby', subtitle: 'Free House-Elf', icon: '🧦', color: '#ecf0f1' },
  { id: 'nagini', category: 'creatures', title: 'Nagini', subtitle: 'Voldemort\'s Snake / Horcrux', icon: '🐍', color: '#e74c3c' },
  { id: 'aragog', category: 'creatures', title: 'Aragog', subtitle: 'Acromantula Leader', icon: '🕷️', color: '#34495e' },
  { id: 'fluffy', category: 'creatures', title: 'Fluffy', subtitle: 'Three-Headed Dog', icon: '🐕', color: '#8b6914' },
  { id: 'thestrals', category: 'creatures', title: 'Thestrals', subtitle: 'Visible Only to Death Witnesses', icon: '🐎', color: '#34495e' },
  { id: 'centaurs', category: 'creatures', title: 'Centaurs', subtitle: 'Forbidden Forest Inhabitants', icon: '🏹', color: '#1a7a2a' },
  { id: 'dementors', category: 'creatures', title: 'Dementors', subtitle: 'Azkaban Guards', icon: '👻', color: '#34495e' },
  { id: 'basilisk', category: 'creatures', title: 'Basilisk', subtitle: 'King of Serpents', icon: '🐍', color: '#e74c3c' },
  { id: 'norbert', category: 'creatures', title: 'Norbert/Norberta', subtitle: 'Norwegian Ridgeback Dragon', icon: '🐉', color: '#e74c3c' }
]

const categories = [
  { id: 'all', label: 'All', icon: '🖼️' },
  { id: 'characters', label: 'Characters', icon: '👥' },
  { id: 'locations', label: 'Locations', icon: '🏰' },
  { id: 'items', label: 'Magical Items', icon: '✨' },
  { id: 'creatures', label: 'Creatures', icon: '🦄' }
]

export const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedItem, setSelectedItem] = useState(null)
  const [viewMode, setViewMode] = useState('masonry')

  const filteredItems = activeCategory === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory)

  return (
    <div className={styles.page}>
      {/* Hero */}
      <header className={styles.hero}>
        <div className={styles.heroBackground} aria-hidden="true"></div>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Gallery</h1>
          <p className={styles.heroSubtitle}>
            Visual journey through the wizarding world — characters, locations, magical items, and creatures.
            Click any card to view details.
          </p>
        </div>
      </header>

      {/* Category Filters */}
      <section className={styles.filtersSection} aria-labelledby="filters-heading">
        <div className={styles.container}>
          <div className={styles.categoryFilters} role="tablist" aria-label="Filter gallery by category">
            {categories.map(cat => (
              <button
                key={cat.id}
                role="tab"
                aria-selected={activeCategory === cat.id}
                className={`${styles.categoryBtn} ${activeCategory === cat.id ? styles.active : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                <span className={styles.catIcon} aria-hidden="true">{cat.icon}</span>
                <span className={styles.catLabel}>{cat.label}</span>
              </button>
            ))}

            <div className={styles.viewToggle} role="group" aria-label="View mode">
              <button
                className={`${styles.viewBtn} ${viewMode === 'masonry' ? styles.active : ''}`}
                onClick={() => setViewMode('masonry')}
                aria-pressed={viewMode === 'masonry'}
                title="Masonry view"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <rect x="3" y="3" width="7" height="7" rx="1" />
                  <rect x="14" y="3" width="7" height="14" rx="1" />
                  <rect x="3" y="14" width="7" height="14" rx="1" />
                </svg>
              </button>
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
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className={styles.gallerySection} aria-labelledby="gallery-heading">
        <div className={styles.container}>
          <div className={styles.resultsBar} aria-live="polite">
            <span>{filteredItems.length} item{filteredItems.length !== 1 ? 's' : ''}</span>
          </div>

          <div className={`${styles.galleryGrid} ${viewMode === 'masonry' ? styles.masonry : ''}`} role="list">
            {filteredItems.map((item, index) => (
              <article
                key={item.id}
                className={styles.galleryCard}
                style={{ '--item-color': item.color, animationDelay: `${index * 20}ms` }}
                role="listitem"
                onClick={() => setSelectedItem(item)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedItem(item); } }}
                tabIndex={0}
              >
                <div className={styles.cardImage} aria-hidden="true">
                  <span className={styles.cardIcon}>{item.icon}</span>
                  <div className={styles.cardOverlay}>
                    <span className={styles.viewText}>Click to view</span>
                  </div>
                </div>
                <div className={styles.cardContent}>
                  <span className={styles.cardCategory}>{item.category.charAt(0).toUpperCase() + item.category.slice(1)}</span>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p className={styles.cardSubtitle}>{item.subtitle}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedItem && (
        <div className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="modal-title" onClick={() => setSelectedItem(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={() => setSelectedItem(null)} aria-label="Close">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <div className={styles.modalHeader}>
              <span className={styles.modalCategory}>{selectedItem.category.charAt(0).toUpperCase() + selectedItem.category.slice(1)}</span>
              <h2 id="modal-title" className={styles.modalTitle}>{selectedItem.title}</h2>
              <p className={styles.modalSubtitle}>{selectedItem.subtitle}</p>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.modalIcon} aria-hidden="true" style={{ color: selectedItem.color }}>
                <span style={{ fontSize: '4rem' }}>{selectedItem.icon}</span>
              </div>
              <p className={styles.modalDescription}>
                {getDescription(selectedItem)}
              </p>
              <div className={styles.modalMeta}>
                <span className={styles.metaTag}>{selectedItem.category}</span>
                <span className={styles.metaTag} style={{ color: selectedItem.color, borderColor: selectedItem.color }}>
                  {selectedItem.color}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className={styles.pageNav} aria-label="Page navigation">
        <Link to="/timeline" className={styles.navLink}>
          <span aria-hidden="true">←</span> Timeline
        </Link>
      </nav>
    </div>
  )
}

const getDescription = (item) => {
  const descriptions = {
    harry: 'The Boy Who Lived. Survived the Killing Curse as an infant. Defeated Voldemort. Auror and Head of Auror Office.',
    ron: 'Harry\'s loyal best friend. Chess master. Destroyed Slytherin\'s locket. Became Auror, then joined Weasleys\' Wizard Wheezes.',
    hermione: 'Brightest witch of her age. Founded S.P.E.W. Used Time-Turner. Hunted Horcruxes. Became Minister for Magic.',
    ginny: 'Youngest Weasley. Holyhead Harpies Chaser. Led D.A. resistance at Hogwarts. Married Harry, three children.',
    neville: 'Courageous Gryffindor. Killed Nagini (final Horcrux). Led D.A. resistance. Herbology Professor at Hogwarts.',
    luna: 'Eccentric Ravenclaw. Fought at Department of Mysteries & Battle of Hogwarts. Famous magizoologist.',
    dumbledore: 'Greatest wizard of modern times. Defeated Grindelwald. Headmaster of Hogwarts. Founder of Order of the Phoenix.',
    snape: 'Double agent. Loved Lily Evans. Protected Harry. Half-Blood Prince. "The bravest man I ever knew."',
    voldemort: 'Tom Riddle. Most dangerous Dark wizard. Created 7 Horcruxes. Defeated by his own rebounding curse.',
    bellatrix: 'Most loyal Death Eater. Tortured Longbottoms. Killed Sirius, Tonks, Dobby. Killed by Molly Weasley.',
    draco: 'Harry\'s school rival. Death Eater (coerced). Couldn\'t kill Dumbledore. Reformed after war.',
    hagrid: 'Half-giant. Keeper of Keys. Care of Magical Creatures Professor. First to show Harry kindness.',
    hogwarts: 'Millennium-old castle in Scotland. Hidden from Muggles. Moving staircases, secret passages, talking portraits.',
    'great-hall': 'Enchanted ceiling mirrors sky. Four house tables. Staff table. Sorting ceremony. Feasts.',
    'gryffindor-common': 'Behind Fat Lady portrait. Cozy fireplaces. Round towers. Password required.',
    'hagrid-hut': 'Edge of Forbidden Forest. Rock cakes, tea, dangerous creatures. Pink umbrella hides wand.',
    'forbidden-forest': 'Centaurs, unicorns, Acromantulas, Thestrals. Detention with Hagrid. Battle of Hogwarts.',
    hogsmeade: 'Only all-wizard village in Britain. Three Broomsticks, Honeydukes, Zonko\'s. Shrieking Shack.',
    'diagon-alley': 'Hidden London street. Ollivanders, Flourish & Blotts, Gringotts. Entrance via Leaky Cauldron.',
    ministry: 'Underground London. Departments for Magical Law, Creatures, Transport. Courtrooms. Department of Mysteries.',
    azkaban: 'North Sea island fortress. Dementor guards. Unplottable. Mass breakouts 1993 & 1996.',
    grimmauld: 'Ancestral Black home. Hidden by Fidelius Charm. Order HQ. Kreacher the house-elf.',
    'shell-cottage': 'Bill & Fleur\'s seaside home. Dobby buried here. Safehouse during Horcrux hunt.',
    'godrics-hollow': 'Harry\'s birthplace. Potter cottage ruined. War memorial. Bathilda Bagshot\'s house.',
    wand: 'Holly wood, phoenix feather core, 11 inches. Brother to Voldemort\'s wand. Chose Harry at Ollivanders.',
    'elder-wand': 'Most powerful wand. Deathstick. Passed through violence. Harry mastered it, returned to Dumbledore\'s tomb.',
    'invisibility-cloak': 'Deathly Hallow. Perfect invisibility. Passed down from Ignotus Peverell. Harry\'s father\'s.',
    'resurrection-stone': 'Deathly Hallow. Recalls dead (not truly). Set in Gaunt ring. Harry dropped in forest.',
    'marauders-map': 'Created by Moony, Wormtail, Padfoot, Prongs. "I solemnly swear I am up to no good." Shows all at Hogwarts.',
    'time-turner': 'Hour-reversal charm. Hermione used for classes. Harry & Hermione saved Sirius & Buckbeak.',
    'sword-gryffindor': 'Goblin-made silver. Ruby-encrusted. Absorbs what strengthens it (basilisk venom). Appears to true Gryffindors.',
    'golden-snitch': 'Smallest Quidditch ball. 150 points. Flesh memory. Harry caught in mouth first match.',
    firebolt: 'World-class racing broom. 0-150 mph in 10 seconds. Gift from Sirius. Confiscated first year.',
    pensieve: 'Stone basin for memory storage. Dumbledore\'s. Harry viewed Snape\'s memories. Silver light.',
    'horcrux-diary': 'T.M. Riddle\'s 16-year-old self. Possessed Ginny. Opened Chamber. Destroyed by basilisk fang.',
    'horcrux-ring': 'Marvolo Gaunt\'s signet ring. Contained Resurrection Stone. Cursed. Destroyed by Dumbledore.',
    buckbeak: 'Hippogriff. Executed (appealed). Saved by Time-Turner. Fought at Battle of Hogwarts. Renamed Witherwings.',
    fawkes: 'Dumbledore\'s phoenix. Healing tears. Carried warning. Sang at Dumbledore\'s funeral. Left Hogwarts.',
    hedwig: 'Harry\'s snowy owl. 11th birthday gift from Hagrid. Killed in Battle of Seven Potters. Loyal to the end.',
    dobby: 'Malfoy family house-elf. Freed by Harry\'s sock. Worked at Hogwarts. Died saving Harry at Malfoy Manor.',
    nagini: 'Voldemort\'s snake. Final Horcrux. Killed Snape. Beheaded by Neville with Sword of Gryffindor.',
    aragog: 'Acromantula. Hagrid\'s pet. Blind, massive spider. Colony in Forbidden Forest. Died 1997.',
    fluffy: 'Three-headed dog. Guarded Philosopher\'s Stone. Lulled by music. Released into Forbidden Forest.',
    thestrals: 'Winged horses. Visible only to those who\'ve seen death. Pull Hogwarts carriages. Fought at Battle.',
    centaurs: 'Half-human, half-horse. Divination experts. Live in Forbidden Forest. Fought Death Eaters at Battle.',
    dementors: 'Soul-sucking guards of Azkaban. Feed on happiness. Kiss sucks soul. Fled to join Voldemort.',
    basilisk: 'King of Serpents. Kills with direct gaze. Petrification via reflection. Controlled by Heir of Slytherin.',
    norbert: 'Norwegian Ridgeback. Hagrid\'s dragon egg. Sent to Romania (Charlie Weasley). Actually female (Norberta).'
  }
  return descriptions[item.id] || 'A magical element from the wizarding world of Harry Potter.'
}

export default Gallery