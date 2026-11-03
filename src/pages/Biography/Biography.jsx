import { Link } from 'react-router-dom'
import { Quote } from '../../components/Quote/Quote'
import { YearAccordion } from '../../components/YearAccordion/YearAccordion'
import { characters } from '../../data/characters'
import { spells } from '../../data/spells'
import { quotes } from '../../data/quotes'
import styles from './Biography.module.css'

const harry = characters.find(c => c.id === 'harry-potter') || characters[0]
const biographyQuotes = quotes.filter(q => q.character === 'Harry Potter' || q.character === 'Albus Dumbledore').slice(0, 3)

export const Biography = () => {
  return (
    <div className={styles.page}>
      {/* Hero Header */}
      <header className={styles.hero}>
        <div className={styles.heroBackground} aria-hidden="true"></div>
        <div className={styles.heroContent}>
          <div className={styles.profile}>
            <div className={styles.avatar} aria-hidden="true">
              <span className={styles.avatarInitials}>HP</span>
            </div>
            <div className={styles.profileInfo}>
              <h1 className={styles.name}>Harry James Potter</h1>
              <p className={styles.title}>The Boy Who Lived · Chosen One · Master of Death</p>
              <div className={styles.badges}>
                <span className={`${styles.badge} ${styles.house}`}>Gryffindor</span>
                <span className={`${styles.badge} ${styles.blood}`}>Half-blood</span>
                <span className={`${styles.badge} ${styles.wand}`}>11" Holly, Phoenix Feather</span>
                <span className={`${styles.badge} ${styles.patronus}`}>Stag Patronus</span>
              </div>
            </div>
          </div>

          <div className={styles.quickFacts}>
            <QuickFact label="Born" value="31 July 1980" icon="🎂" />
            <QuickFact label="Parents" value="James & Lily Potter" icon="👨‍👩‍👦" />
            <QuickFact label="Godfather" value="Sirius Black" icon="🌟" />
            <QuickFact label="Spouse" value="Ginevra Weasley" icon="💍" />
            <QuickFact label="Children" value="James, Albus, Lily" icon="👨‍👩‍👧‍👦" />
            <QuickFact label="Career" value="Auror, Head of Auror Office" icon="🏛️" />
          </div>
        </div>
      </header>

      {/* Early Life */}
      <section className={styles.section} aria-labelledby="early-life">
        <div className={styles.container}>
          <header className={styles.sectionHeader}>
            <h2 id="early-life" className={styles.sectionTitle}>Early Life</h2>
            <p className={styles.sectionDescription}>The cupboard under the stairs and the letter that changed everything</p>
          </header>

          <div className={styles.contentGrid}>
            <div className={styles.textContent}>
              <h3 className={styles.subTitle}>The Boy in the Cupboard</h3>
              <p>
                Harry James Potter was born on 31 July 1980 to James and Lily Potter in Godric's Hollow.
                On Halloween 1981, when Harry was just fifteen months old, Lord Voldemort murdered his parents
                and attempted to kill Harry. Lily's sacrificial love created an ancient protective magic that
                caused Voldemort's Killing Curse to rebound, destroying his body and leaving Harry with only
                a lightning-bolt scar on his forehead.
              </p>
              <p>
                Orphaned and famous in the wizarding world, Harry was placed with his only remaining relatives,
                the Dursleys, at 4 Privet Drive, Little Whinging. For ten years, he lived in the cupboard under
                the stairs, unaware of his heritage, enduring neglect and believing he was ordinary.
              </p>

              <h3 className={styles.subTitle}>The Letter from Hogwarts</h3>
              <p>
                On his eleventh birthday, Rubeus Hagrid arrived to deliver Harry's Hogwarts acceptance letter
                — and the truth. "You're a wizard, Harry." With those words, Harry's life changed forever.
                He entered a world of magic, discovered his fame, and found his true home at Hogwarts School
                of Witchcraft and Wizardry.
              </p>
            </div>

            <aside className={styles.sidebar}>
              <div className={styles.sidebarCard}>
                <h4>Key Facts</h4>
                <ul className={styles.factList}>
                  <li><strong>Full Name:</strong> Harry James Potter</li>
                  <li><strong>Born:</strong> 31 July 1980</li>
                  <li><strong>Blood Status:</strong> Half-blood</li>
                  <li><strong>House:</strong> Gryffindor</li>
                  <li><strong>Wand:</strong> 11" Holly, Phoenix feather</li>
                  <li><strong>Patronus:</strong> Stag</li>
                  <li><strong>Boggart:</strong> Dementor</li>
                  <li><strong>Special Abilities:</strong> Parseltongue, Seeker</li>
                </ul>
              </div>

              <div className={styles.sidebarCard}>
                <h4>Titles & Honors</h4>
                <ul className={styles.factList}>
                  <li>The Boy Who Lived</li>
                  <li>The Chosen One</li>
                  <li>Triwizard Champion (1994)</li>
                  <li>Founder of Dumbledore's Army</li>
                  <li>Master of Death</li>
                  <li>Order of Merlin, First Class</li>
                  <li>Head of Auror Office (2007)</li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Hogwarts Years Overview */}
      <section className={styles.section} aria-labelledby="hogwarts-years">
        <div className={styles.container}>
          <header className={styles.sectionHeader}>
            <h2 id="hogwarts-years" className={styles.sectionTitle}>The Seven Years at Hogwarts</h2>
            <p className={styles.sectionDescription}>Each year brought new challenges, friendships, and steps toward his destiny</p>
          </header>

          <YearAccordion />
        </div>
      </section>

      {/* Post-War Life */}
      <section className={styles.section} aria-labelledby="post-war">
        <div className={styles.container}>
          <header className={styles.sectionHeader}>
            <h2 id="post-war" className={styles.sectionTitle}>Life After the War</h2>
            <p className={styles.sectionDescription}>Building a future from the ashes of the past</p>
          </header>

          <div className={styles.contentGrid}>
            <div className={styles.textContent}>
              <h3 className={styles.subTitle}>Auror and Reformer</h3>
              <p>
                After the Battle of Hogwarts, Harry joined the Auror Department under Minister Kingsley Shacklebolt.
                Alongside Ron Weasley, he revolutionized the department, rooting out corruption and Dark wizard
                sympathizers. By 2007, at just 27, Harry became the youngest Head of the Auror Office in history.
              </p>

              <h3 className={styles.subTitle}>Family and Legacy</h3>
              <p>
                Harry married Ginny Weasley, and they had three children: James Sirius (named for his father
                and godfather), Albus Severus (named for Dumbledore and Snape — "the bravest men I knew"),
                and Lily Luna (named for his mother and friend Luna Lovegood).
              </p>
              <p>
                In 2017, nineteen years after the battle, Harry saw his youngest son Albus off at Platform 9¾.
                His scar had not pained him in nineteen years. All was well.
              </p>
            </div>

            <aside className={styles.sidebar}>
              <div className={`${styles.sidebarCard} ${styles.featured}`}>
                <Quote quote={quotes.find(q => q.id === 'quote-51')} variant="featured" />
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Quotes Section */}
      <section className={`${styles.section} ${styles.quotesSection}`} aria-labelledby="quotes">
        <div className={styles.container}>
          <header className={styles.sectionHeader}>
            <h2 id="quotes" className={styles.sectionTitle}>Memorable Words</h2>
            <p className={styles.sectionDescription}>Wisdom, courage, and love — the words that defined a hero</p>
          </header>

          <div className={styles.quotesGrid}>
            {biographyQuotes.map((quote, index) => (
              <Quote key={quote.id} quote={quote} variant="default" />
            ))}
          </div>

          <div className={styles.viewAll}>
            <Link to="/quotes" className={styles.viewAllLink}>View all quotes →</Link>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <nav className={styles.pageNav} aria-label="Page navigation">
        <Link to="/hogwarts-years" className={styles.navLink}>
          <span aria-hidden="true">←</span> Hogwarts Years
        </Link>
        <Link to="/friends" className={styles.navLink} style={{ textAlign: 'right' }}>
          Friends & Allies <span aria-hidden="true">→</span>
        </Link>
      </nav>
    </div>
  )
}

const QuickFact = ({ label, value, icon }) => (
  <div className={styles.quickFact}>
    <span className={styles.quickFactIcon} aria-hidden="true">{icon}</span>
    <div className={styles.quickFactContent}>
      <span className={styles.quickFactLabel}>{label}</span>
      <span className={styles.quickFactValue}>{value}</span>
    </div>
  </div>
)

export default Biography