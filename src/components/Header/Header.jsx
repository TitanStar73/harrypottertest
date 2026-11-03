import { useState, useEffect } from 'react'
import { Link, useLocation, NavLink } from 'react-router-dom'
import { useMobileMenu, useScroll } from '../../hooks'
import { MagicBackground } from '../MagicBackground/MagicBackground'
import styles from './Header.module.css'

const navigation = [
  { path: '/', label: 'Home', icon: '🏠' },
  { path: '/biography', label: 'Biography', icon: '📖' },
  { path: '/hogwarts-years', label: 'Hogwarts Years', icon: '🏰' },
  { path: '/friends', label: 'Friends & Allies', icon: '🤝' },
  { path: '/enemies', label: 'Enemies', icon: '🐍' },
  { path: '/magic', label: 'Magic & Spells', icon: '⚡' },
  { path: '/timeline', label: 'Timeline', icon: '📜' },
  { path: '/gallery', label: 'Gallery', icon: '🖼️' }
]

export const Header = () => {
  const { scrollY } = useScroll()
  const { isOpen, open, close, toggle } = useMobileMenu()
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    setScrolled(scrollY > 50)
    close()
  }, [scrollY, close])

  useEffect(() => {
    close()
  }, [location.pathname, close])

  return (
    <header
      className={`${styles.header} ${scrolled ? styles.scrolled : ''} ${isOpen ? styles.menuOpen : ''}`}
      role="banner"
    >
      {/* Magical Background */}
      <MagicBackground intensity="low" color="gold" aria-hidden="true" />
      
      <div className={styles.container}>
        {/* Logo / Brand */}
        <Link to="/" className={styles.logo} aria-label="Harry Potter - Home">
          <span className={styles.logoIcon} aria-hidden="true">⚡</span>
          <span className={styles.logoText}>
            <span className={styles.logoFirst}>Harry</span>
            <span className={styles.logoLast}>Potter</span>
          </span>
          <span className={styles.logoSubtitle}>The Boy Who Lived</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className={styles.nav} role="navigation" aria-label="Main navigation">
          <ul className={styles.navList}>
            {navigation.map((item) => (
              <li key={item.path} className={styles.navItem}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `${styles.navLink} ${isActive ? styles.active : ''}`}
                  aria-current={location.pathname === item.path ? 'page' : undefined}
                >
                  <span className={styles.navIcon} aria-hidden="true">{item.icon}</span>
                  <span className={styles.navLabel}>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className={styles.mobileToggle}
          onClick={toggle}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          <span className={`${styles.hamburger} ${isOpen ? styles.hamburgerOpen : ''}`} aria-hidden="true">
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
          </span>
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        id="mobile-menu"
        className={styles.mobileMenu}
        role="navigation"
        aria-label="Mobile navigation"
        hidden={!isOpen}
      >
        <nav className={styles.mobileNav}>
          <ul className={styles.mobileNavList}>
            {navigation.map((item) => (
              <li key={item.path} className={styles.mobileNavItem}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `${styles.mobileNavLink} ${isActive ? styles.active : ''}`}
                  onClick={close}
                  aria-current={location.pathname === item.path ? 'page' : undefined}
                >
                  <span className={styles.mobileNavIcon} aria-hidden="true">{item.icon}</span>
                  <span className={styles.mobileNavLabel}>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Background decorative element */}
      <div className={styles.backgroundGlow} aria-hidden="true"></div>
    </header>
  )
}

export default Header