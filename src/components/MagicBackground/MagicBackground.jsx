import { useEffect, useRef, useState } from 'react'
import styles from './MagicBackground.module.css'

const PARTICLE_COUNT = 50
const SPARKLE_COUNT = 30

export const MagicBackground = ({ 
  intensity = 'medium', 
  color = 'gold',
  className = '',
  children 
}) => {
  const [particles, setParticles] = useState([])
  const [sparkles, setSparkles] = useState([])
  const containerRef = useRef(null)
  const animationRef = useRef(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    // Generate initial particles
    const newParticles = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
      id: `particle-${i}`,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.5 + 0.1,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: -(Math.random() * 0.5 + 0.2),
      delay: Math.random() * 5,
      hue: color === 'gold' ? 45 + Math.random() * 20 : 200 + Math.random() * 40
    }))

    const newSparkles = Array.from({ length: SPARKLE_COUNT }, (_, i) => ({
      id: `sparkle-${i}`,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      opacity: 0,
      phase: Math.random() * Math.PI * 2,
      duration: 2 + Math.random() * 3,
      delay: Math.random() * 4
    }))

    setParticles(newParticles)
    setSparkles(newSparkles)

    // Animation loop
    let lastTime = 0
    const animate = (currentTime) => {
      const deltaTime = (currentTime - lastTime) / 1000
      lastTime = currentTime

      setParticles(prev => prev.map(p => {
        let newY = p.y + p.speedY * deltaTime * 60
        let newX = p.x + p.speedX * deltaTime * 60
        
        if (newY < -5) {
          newY = 105
          newX = Math.random() * 100
        }
        if (newX < -5) newX = 105
        if (newX > 105) newX = -5
        
        return { ...p, x: newX, y: newY }
      }))

      setSparkles(prev => prev.map(s => {
        const elapsed = (currentTime / 1000 - s.delay) % s.duration
        const progress = elapsed / s.duration
        const newOpacity = progress < 0.1 ? progress * 10 : 
                          progress > 0.9 ? (1 - progress) * 10 : 1
        
        return { 
          ...s, 
          opacity: Math.max(0, Math.min(1, newOpacity)),
          phase: s.phase + deltaTime * 2
        }
      }))

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [color, intensity])

  const intensityClass = {
    low: styles.low,
    medium: styles.medium,
    high: styles.high
  }[intensity] || styles.medium

  return (
    <div 
      ref={containerRef}
      className={`${styles.container} ${intensityClass} ${className}`}
      aria-hidden="true"
    >
      {/* Magical glow orbs */}
      <div className={styles.glowOrbs}>
        <div className={`${styles.glowOrb} ${styles.orb1}`}></div>
        <div className={`${styles.glowOrb} ${styles.orb2}`}></div>
        <div className={`${styles.glowOrb} ${styles.orb3}`}></div>
      </div>

      {/* Floating particles */}
      <div className={styles.particlesLayer}>
        {particles.map(particle => (
          <div
            key={particle.id}
            className={styles.particle}
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              animationDelay: `${particle.delay}s`,
              '--particle-hue': particle.hue
            }}
          />
        ))}
      </div>

      {/* Sparkles */}
      <div className={styles.sparklesLayer}>
        {sparkles.map(sparkle => (
          <div
            key={sparkle.id}
            className={styles.sparkle}
            style={{
              left: `${sparkle.x}%`,
              top: `${sparkle.y}%`,
              width: `${sparkle.size}px`,
              height: `${sparkle.size}px`,
              opacity: sparkle.opacity,
              animationDelay: `${sparkle.delay}s`,
              '--sparkle-duration': `${sparkle.duration}s`
            }}
          />
        ))}
      </div>

      {/* Wand trail effect on mouse move */}
      <div className={styles.wandTrailLayer}>
        <div className={styles.wandTrail}></div>
      </div>

      {children && (
        <div className={styles.content} style={{ position: 'relative', zIndex: 1 }}>
          {children}
        </div>
      )}
    </div>
  )
}

export default MagicBackground