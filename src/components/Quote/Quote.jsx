import styles from './Quote.module.css'

export const Quote = ({ quote, variant = 'default', onClick }) => {
  const handleKeyDown = (e) => {
    if (onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault()
      onClick()
    }
  }

  const baseClasses = `${styles.quote} ${styles[variant]} ${onClick ? styles.clickable : ''}`

  return (
    <blockquote
      className={baseClasses}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role={onClick ? 'button' : 'blockquote'}
      tabIndex={onClick ? 0 : -1}
      aria-label={onClick ? `Quote by ${quote.character}` : undefined}
    >
      <div className={styles.quoteContent}>
        <span className={styles.quoteMark} aria-hidden="true">"</span>
        <p className={styles.quoteText}>{quote.quote}</p>
        <span className={styles.quoteMark} aria-hidden="true">"</span>
      </div>

      <footer className={styles.quoteFooter}>
        <cite className={styles.quoteCharacter}>{quote.character}</cite>
        <div className={styles.quoteMeta}>
          {quote.book && <span className={styles.quoteBook}>{quote.book}</span>}
          {quote.chapter && <span className={styles.quoteChapter}>{quote.chapter}</span>}
        </div>
        {quote.theme && (
          <span
            className={styles.quoteTheme}
            style={{ background: 'var(--color-gold-gradient)', color: 'var(--color-text-inverse)' }}
          >
            {quote.theme}
          </span>
        )}
      </footer>

      {onClick && (
        <span className={styles.clickHint} aria-hidden="true">
          Click for more
        </span>
      )}
    </blockquote>
  )
}

export const QuoteCarousel = ({ quotes, autoPlay = false, interval = 5000 }) => {
  // Implementation for carousel if needed
  return (
    <div className={styles.carousel} role="region" aria-label="Quote carousel">
      {quotes.map((quote, index) => (
        <Quote key={quote.id} quote={quote} variant="featured" />
      ))}
    </div>
  )
}

export default Quote