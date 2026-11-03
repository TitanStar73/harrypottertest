import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

const footerLinks = {
  explore: [
    { label: 'Biography', to: '/biography' },
    { label: 'Hogwarts Years', to: '/hogwarts-years' },
    { label: 'Friends & Allies', to: '/friends' },
    { label: 'Enemies', to: '/enemies' },
    { label: 'Magic & Spells', to: '/magic' },
    { label: 'Timeline', to: '/timeline' },
    { label: 'Gallery', to: '/gallery' }
  ],
  resources: [
    { label: 'Spells Database', to: '/magic#spells' },
    { label: 'Character Profiles', to: '/friends' },
    { label: 'Interactive Timeline', to: '/timeline' },
    { label: 'Famous Quotes', to: '/biography#quotes' }
  ],
  connect: [
    { label: 'Privacy Policy', to: '/privacy' },
    { label: 'Terms of Use', to: '/terms' },
    { label: 'Accessibility', to: '/accessibility' },
    { label: 'Contact', to: '/contact' }
  ]
}

const socialLinks = [
  { label: 'Twitter', href: 'https://twitter.com/harrypotter', icon: '𝕏' },
  { label: 'Instagram', href: 'https://instagram.com/harrypotter', icon: '📷' },
  { label: 'YouTube', href: 'https://youtube.com/harrypotter', icon: '▶️' },
  { label: 'Facebook', href: 'https://facebook.com/harrypotter', icon: '📘' }
]

export const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Brand Section */}
          <div className={styles.brandSection}>
            <Link to="/" className={styles.logo} aria-label="Harry Potter - Home">
              <span className={styles.logoIcon} aria-hidden="true">⚡</span>
              <span className={styles.logoText}>
                <span className={styles.logoFirst}>Harry</span>
                <span className={styles.logoLast}>Potter</span>
              </span>
            </Link>
            <p className={styles.tagline}>The Boy Who Lived</p>
            <p className={styles.description}>
              Explore the life, magic, and legacy of the most famous wizard of modern times.
              From the cupboard under the stairs to the defeat of the Dark Lord.
            </p>
            <div className={styles.social} role="list" aria-label="Social media links">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className={styles.socialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                >
                  <span aria-hidden="true">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Explore Section */}
          <nav className={styles.linkSection} aria-label="Explore">
            <h3 className={styles.sectionTitle}>Explore</h3>
            <ul className={styles.linkList}>
              {footerLinks.explore.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className={styles.link}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Resources Section */}
          <nav className={styles.linkSection} aria-label="Resources">
            <h3 className={styles.sectionTitle}>Resources</h3>
            <ul className={styles.linkList}>
              {footerLinks.resources.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className={styles.link}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Connect Section */}
          <nav className={styles.linkSection} aria-label="Connect">
            <h3 className={styles.sectionTitle}>Connect</h3>
            <ul className={styles.linkList}>
              {footerLinks.connect.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className={styles.link}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <div className={styles.copyright}>
            <p>
              &copy; {currentYear} Harry Potter Website. All rights reserved.
            </p>
            <p className={styles.disclaimer}>
              This is a fan website. Harry Potter characters, names, and all related
              indicia are trademarks of &copy; Warner Bros. & J.K. Rowling.
            </p>
          </div>

          <div className={styles.credits}>
            <p>Built with React + Vite • Styled with CSS Modules</p>
            <p>Data sourced from the Harry Potter books by J.K. Rowling</p>
          </div>
        </div>

        {/* Decorative divider */}
        <div className={styles.divider} aria-hidden="true">
          <span className={styles.dividerIcon}>⚡</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer