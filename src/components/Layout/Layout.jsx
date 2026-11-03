import { Outlet, useLocation } from 'react-router-dom'
import { Header } from '../Header/Header'
import { Footer } from '../Footer/Footer'
import { useEffect } from 'react'
import styles from './Layout.module.css'

export const Layout = () => {
  const location = useLocation()

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
  }, [location.pathname])

  return (
    <div className={styles.layout}>
      <Header />
      <main
        id="main-content"
        className={styles.main}
        role="main"
        tabIndex={-1}
      >
        <Outlet />
      </main>
      <Footer />
      <a
        href="#main-content"
        className={styles.skipLink}
      >
        Skip to main content
      </a>
    </div>
  )
}

export default Layout