import styles from './SpellCard.module.css'

const categoryColors = {
  'charms': '#9b59b6',
  'defense against the dark arts': '#e74c3c',
  'transfiguration': '#3498db',
  'dark arts': '#8e44ad',
  'healing': '#2ecc71',
  'jinxes': '#f39c12',
  'counter-jinxes': '#1abc9c',
  'unforgivable': '#c0392b'
}

const difficultyColors = {
  'beginner': '#2ecc71',
  'moderate': '#f39c12',
  'advanced': '#e74c3c',
  'very advanced': '#c0392b'
}

const categoryIcons = {
  'charms': '✨',
  'defense against the dark arts': '🛡️',
  'transfiguration': '🔄',
  'dark arts': '💀',
  'healing': '💚',
  'jinxes': '⚡',
  'counter-jinxes': '🔮',
  'unforgivable': '☠️'
}

export const SpellCard = ({ spell, compact = false, variant }) => {
  // Support both `compact` (boolean) and `variant` ('compact' | 'default') props for backward compatibility
  const isCompact = compact === true || variant === 'compact'
  const categoryKey = spell.category.toLowerCase()
  const categoryColor = categoryColors[categoryKey] || 'var(--color-gold-primary)'
  const difficultyColor = difficultyColors[spell.difficulty.toLowerCase()] || 'var(--color-text-muted)'
  const categoryIcon = categoryIcons[categoryKey] || '✨'

  if (isCompact) {
    return (
      <article className={`${styles.card} ${styles.compact} hover-magical`}>
        <div className={styles.compactContent}>
          <h3 className={styles.name}>{spell.name}</h3>
          <span className={styles.incantation}>{spell.incantation}</span>
        </div>
        <div className={styles.compactMeta}>
          <span
            className={styles.categoryBadge}
            style={{ background: `${categoryColor}20`, color: categoryColor, borderColor: `${categoryColor}40` }}
          >
            {categoryIcon} {spell.category}
          </span>
          <span
            className={styles.difficultyBadge}
            style={{ background: `${difficultyColor}20`, color: difficultyColor, borderColor: `${difficultyColor}40` }}
          >
            {spell.difficulty}
          </span>
        </div>
        <div className={styles.magicGlow} style={{ background: `radial-gradient(circle, ${categoryColor}40 0%, transparent 70%)` }} />
      </article>
    )
  }

  return (
    <article className={`${styles.card} hover-magical`}>
      <div className={styles.header}>
        <div className={styles.titleGroup}>
          <div className={styles.nameWrapper}>
            <span className={styles.categoryIcon} aria-hidden="true">{categoryIcon}</span>
            <h3 className={styles.name}>{spell.name}</h3>
          </div>
          <span className={styles.incantation}>{spell.incantation}</span>
        </div>
        <div className={styles.badges}>
          <span
            className={styles.categoryBadge}
            style={{ background: `${categoryColor}20`, color: categoryColor, borderColor: `${categoryColor}40` }}
          >
            {spell.category}
          </span>
          <span
            className={styles.difficultyBadge}
            style={{ background: `${difficultyColor}20`, color: difficultyColor, borderColor: `${difficultyColor}40` }}
          >
            {spell.difficulty}
          </span>
        </div>
      </div>

      <div className={styles.details}>
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>Type:</span>
          <span className={styles.detailValue}>{spell.type}</span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>Effect:</span>
          <span className={styles.detailValue}>{spell.effect}</span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>Light:</span>
          <span className={styles.detailValue}>{spell.light}</span>
        </div>
      </div>

      {spell.notableUse && (
        <div className={styles.notableUse}>
          <span className={styles.notableLabel}>Notable Use:</span>
          <p className={styles.notableText}>{spell.notableUse}</p>
        </div>
      )}

      <div className={styles.footer}>
        <span className={styles.firstUsed}>First seen: {spell.firstUsed}</span>
      </div>

      {/* Magical glow effect on hover */}
      <div className={styles.magicGlow} style={{ background: `radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${categoryColor}30 0%, transparent 70%)` }} />
      
      {/* Sparkle burst on hover */}
      <div className={styles.sparkleBurst} aria-hidden="true">
        <span className={styles.sparkle} style={{ top: '20%', left: '10%' }}>✨</span>
        <span className={styles.sparkle} style={{ top: '10%', right: '15%' }}>⚡</span>
        <span className={styles.sparkle} style={{ bottom: '20%', left: '20%' }}>🔮</span>
        <span className={styles.sparkle} style={{ bottom: '10%', right: '10%' }}>✨</span>
      </div>
    </article>
  )
}

export default SpellCard