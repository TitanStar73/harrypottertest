import { useEffect, useRef, useState } from 'react'
import { useWandCursor, useReducedMotion } from '../../hooks'
import styles from './WandCursor.module.css'

export const WandCursor = () => {
  const reducedMotion = useReducedMotion()
  const { mousePosition, isMoving, trail } = useWandCursor(!reducedMotion)
  const [showCursor, setShowCursor] = useState(true)
  const cursorRef = useRef(null)
  const trailContainerRef = useRef(null)

  useEffect(() => {
    if (reducedMotion) return

    const handleMouseEnter = () => setShowCursor(true)
    const handleMouseLeave = () => setShowCursor(false)

    window.addEventListener('mouseenter', handleMouseEnter)
    window.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mouseenter', handleMouseEnter)
      window.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [reducedMotion])

  if (reducedMotion || !showCursor) return null

  return (
    <>
      {/* Main cursor */}
      <div
        ref={cursorRef}
        className={styles.cursor}
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          opacity: isMoving ? 1 : 0.5
        }}
        aria-hidden="true"
      >
        <div className={styles.cursorCore}></div>
        <div className={styles.cursorGlow}></div>
        <div className={styles.cursorSparkle}></div>
      </div>

      {/* Trail particles */}
      <div ref={trailContainerRef} className={styles.trailContainer} aria-hidden="true">
        {trail.map((point, index) => (
          <div
            key={index}
            className={styles.trailParticle}
            style={{
              left: `${point.x}px`,
              top: `${point.y}px`,
              width: `${point.size}px`,
              height: `${point.size}px`,
              opacity: Math.max(0, 1 - (Date.now() - point.time) / 500),
              animationDelay: `${index * 10}ms`
            }}
          />
        ))}
      </div>

      {/* Click burst effect */}
      <ClickBurst />
    </>
  )
}

/* Click burst component */
const ClickBurst = () => {
  const [bursts, setBursts] = useState([])
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion) return

    const handleClick = (e) => {
      const burstId = Date.now()
      const particleCount = 12
      const newBurst = {
        id: burstId,
        x: e.clientX,
        y: e.clientY,
        particles: Array.from({ length: particleCount }, (_, i) => ({
          id: i,
          angle: (i / particleCount) * Math.PI * 2,
          distance: 0,
          maxDistance: 30 + Math.random() * 50,
          size: 4 + Math.random() * 6,
          color: `hsl(${45 + Math.random() * 30}, 100%, 60%)`,
          delay: Math.random() * 100
        }))
      }

      setBursts(prev => [...prev, newBurst])

      // Remove burst after animation
      setTimeout(() => {
        setBursts(prev => prev.filter(b => b.id !== burstId))
      }, 1000)
    }

    window.addEventListener('click', handleClick)
    return () => window.removeEventListener('click', handleClick)
  }, [reducedMotion])

  return (
    <div className={styles.burstContainer} aria-hidden="true">
      {bursts.map(burst => (
        <div key={burst.id} className={styles.burst} style={{ left: `${burst.x}px`, top: `${burst.y}px` }}>
          {burst.particles.map(p => (
            <div
              key={p.id}
              className={styles.burstParticle}
              style={{
                '--angle': `${p.angle}rad`,
                '--distance': `${p.maxDistance}px`,
                '--size': `${p.size}px`,
                '--color': p.color,
                '--delay': `${p.delay}ms`
              }}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export default WandCursor