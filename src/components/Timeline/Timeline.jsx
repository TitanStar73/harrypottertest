import { useState, useMemo, useEffect } from 'react'
import { getUniqueValues } from '../../utils/helpers'
import styles from './Timeline.module.css'

const categoryIcons = {
  personal: '👤',
  hogwarts: '🏰',
  quidditch: '🧹',
  magic: '⚡',
  adventure: '🗝️',
  major: '⚔️',
  tournament: '🏆',
  career: '💼'
}

const categoryColors = {
  personal: 'var(--color-gold-primary)',
  hogwarts: '#ae0001',
  quidditch: '#f0c75e',
  magic: '#222f5b',
  adventure: '#1a7a2a',
  major: '#e74c3c',
  tournament: '#9b59b6',
  career: '#3498db'
}

export const Timeline = ({ events: initialEvents, defaultFilter = 'all' }) => {
  const [filter, setFilter] = useState(defaultFilter)
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedEvent, setExpandedEvent] = useState(null)
  const [viewMode, setViewMode] = useState('vertical')

  const categories = useMemo(() => getUniqueValues(initialEvents, 'category'), [initialEvents])
  const years = useMemo(() => getUniqueValues(initialEvents, 'year').sort((a, b) => a - b), [initialEvents])

  const filteredEvents = useMemo(() => {
    let events = initialEvents

    if (filter !== 'all') {
      events = events.filter(e => e.category === filter)
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      events = events.filter(e =>
        e.title.toLowerCase().includes(query) ||
        e.description.toLowerCase().includes(query) ||
        e.location.toLowerCase().includes(query) ||
        e.book.toLowerCase().includes(query)
      )
    }

    return events.sort((a, b) => {
      const dateA = new Date(a.year, (a.month || 1) - 1, a.day || 1)
      const dateB = new Date(b.year, (b.month || 1) - 1, b.day || 1)
      return dateA - dateB
    })
  }, [initialEvents, filter, searchQuery])

  const groupedByYear = useMemo(() => {
    return filteredEvents.reduce((groups, event) => {
      const year = event.year
      if (!groups[year]) groups[year] = []
      groups[year].push(event)
      return groups
    }, {})
  }, [filteredEvents])

  const handleKeyDown = (e, eventId) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setExpandedEvent(expandedEvent === eventId ? null : eventId)
    }
  }

  return (
    <div className={styles.timeline}>
      {/* Controls */}
      <div className={styles.controls}>
        <div className={styles.searchWrapper}>
          <label htmlFor="timeline-search" className={styles.srOnly}>Search timeline</label>
          <input
            id="timeline-search"
            type="search"
            className={styles.searchInput}
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search timeline events"
          />
        </div>

        <div className={styles.filterGroup}>
          <label htmlFor="timeline-filter" className={styles.srOnly}>Filter by category</label>
          <select
            id="timeline-filter"
            className={styles.filterSelect}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            aria-label="Filter timeline by category"
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
            ))}
          </select>
        </div>

        <div className={styles.viewToggle} role="group" aria-label="View mode">
          <button
            className={`${styles.viewBtn} ${viewMode === 'vertical' ? styles.active : ''}`}
            onClick={() => setViewMode('vertical')}
            aria-pressed={viewMode === 'vertical'}
            title="Vertical view"
          >
            <span aria-hidden="true">📋</span>
          </button>
          <button
            className={`${styles.viewBtn} ${viewMode === 'horizontal' ? styles.active : ''}`}
            onClick={() => setViewMode('horizontal')}
            aria-pressed={viewMode === 'horizontal'}
            title="Horizontal view"
          >
            <span aria-hidden="true">⏳</span>
          </button>
        </div>
      </div>

      {/* Results Count */}
      <div className={styles.resultsCount} aria-live="polite">
        {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''} found
      </div>

      {/* Timeline Content */}
      <div className={`${styles.content} ${styles[viewMode]}`} role="list" aria-label="Timeline events">
        {viewMode === 'vertical' ? (
          <VerticalTimeline
            groupedEvents={groupedByYear}
            expandedEvent={expandedEvent}
            onToggle={setExpandedEvent}
            onKeyDown={handleKeyDown}
          />
        ) : (
          <HorizontalTimeline
            events={filteredEvents}
            years={years}
          />
        )}
      </div>

      {filteredEvents.length === 0 && (
        <div className={styles.emptyState}>
          <p>No events match your criteria.</p>
          <button onClick={() => { setFilter('all'); setSearchQuery('') }} className={styles.resetBtn}>
            Clear filters
          </button>
        </div>
      )}
    </div>
  )
}

const VerticalTimeline = ({ groupedEvents, expandedEvent, onToggle, onKeyDown }) => {
  const years = Object.keys(groupedEvents).sort((a, b) => b - a)

  return (
    <div className={styles.verticalTimeline} role="list">
      {years.map(year => (
        <section key={year} className={styles.yearSection} aria-labelledby={`year-${year}`}>
          <h3 id={`year-${year}`} className={styles.yearHeader}>
            <span className={styles.yearLabel}>{year}</span>
            <span className={styles.yearEventCount}>{groupedEvents[year].length} event{groupedEvents[year].length !== 1 ? 's' : ''}</span>
          </h3>
          <div className={styles.yearEvents} role="list">
            {groupedEvents[year].map((event, index) => (
              <TimelineEvent
                key={event.id}
                event={event}
                index={index}
                isExpanded={expandedEvent === event.id}
                onToggle={onToggle}
                onKeyDown={onKeyDown}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

const TimelineEvent = ({ event, index, isExpanded, onToggle, onKeyDown }) => {
  const categoryColor = categoryColors[event.category] || 'var(--color-gold-primary)'
  const icon = categoryIcons[event.category] || '📌'
  const isMajor = event.importance === 'major'

  const handleClick = () => onToggle(isExpanded ? null : event.id)
  const handleKeyDownWrapper = (e) => onKeyDown(e, event.id)

  return (
    <article
      className={`${styles.event} ${isMajor ? styles.major : ''} ${isExpanded ? styles.expanded : ''}`}
      role="listitem"
      style={{ '--event-color': categoryColor }}
    >
      <div className={styles.eventMarker} aria-hidden="true">
        <span className={styles.markerDot}></span>
        <span className={styles.markerIcon}>{icon}</span>
      </div>

      <div className={styles.eventContent}>
        <header className={styles.eventHeader}>
          <div className={styles.eventDate}>
            <time dateTime={`${event.year}-${String(event.month || 1).padStart(2, '0')}-${String(event.day || 1).padStart(2, '0')}`}>
              {event.month && event.day ? `${event.day} ${new Date(event.year, event.month - 1).toLocaleString('default', { month: 'short' })}` : event.month ? new Date(event.year, event.month - 1).toLocaleString('default', { month: 'long' }) : event.year} {event.year}
            </time>
          </div>
          <span
            className={styles.eventCategory}
            style={{ background: `${categoryColor}20`, color: categoryColor, borderColor: `${categoryColor}40` }}
          >
            {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
          </span>
        </header>

        <h4 className={styles.eventTitle}>{event.title}</h4>

        <p className={styles.eventDescription}>{truncate(event.description, isExpanded ? null : 200)}</p>

        {!isExpanded && event.description.length > 200 && (
          <button
            className={styles.expandBtn}
            onClick={handleClick}
            onKeyDown={handleKeyDownWrapper}
            aria-expanded={isExpanded}
            aria-controls={`event-details-${event.id}`}
          >
            Read more
          </button>
        )}

        {isExpanded && (
          <div id={`event-details-${event.id}`} className={styles.eventDetails}>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Date:</span>
              <time dateTime={`${event.year}-${String(event.month || 1).padStart(2, '0')}-${String(event.day || 1).padStart(2, '0')}`}>
                {formatFullDate(event)}
              </time>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Location:</span>
              <span className={styles.detailValue}>{event.location}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Book:</span>
              <span className={styles.detailValue}>{event.book}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Full Description:</span>
              <p className={styles.fullDescription}>{event.description}</p>
            </div>
            <button
              className={styles.collapseBtn}
              onClick={handleClick}
              onKeyDown={handleKeyDownWrapper}
              aria-expanded={isExpanded}
            >
              Show less
            </button>
          </div>
        )}
      </div>

      <div className={styles.eventConnector} aria-hidden="true"></div>
    </article>
  )
}

const HorizontalTimeline = ({ events, years }) => {
  return (
    <div className={styles.horizontalTimeline} role="list">
      <div className={styles.horizontalTrack} role="list">
        {years.map(year => {
          const yearEvents = events.filter(e => e.year === year)
          return (
            <div key={year} className={styles.horizontalYear} role="listitem">
              <div className={styles.horizontalYearLabel}>{year}</div>
              <div className={styles.horizontalEvents}>
                {yearEvents.map(event => (
                  <HorizontalEvent key={event.id} event={event} />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const HorizontalEvent = ({ event }) => {
  const categoryColor = categoryColors[event.category] || 'var(--color-gold-primary)'
  const icon = categoryIcons[event.category] || '📌'
  const isMajor = event.importance === 'major'

  return (
    <article
      className={`${styles.horizontalEvent} ${isMajor ? styles.major : ''}`}
      role="listitem"
      style={{ '--event-color': categoryColor }}
      title={event.title}
    >
      <span className={styles.horizontalEventIcon} aria-hidden="true">{icon}</span>
      <span className={styles.horizontalEventTitle}>{event.title}</span>
      <time className={styles.horizontalEventDate}>
        {event.month && event.day ? `${event.day} ${new Date(event.year, event.month - 1).toLocaleString('default', { month: 'short' })}` : event.year}
      </time>
    </article>
  )
}

const truncate = (text, length) => {
  if (!length || text.length <= length) return text
  return text.slice(0, length).trim() + '...'
}

const formatFullDate = (event) => {
  if (event.day && event.month) {
    return `${event.day} ${new Date(event.year, event.month - 1).toLocaleString('default', { month: 'long' })} ${event.year}`
  }
  if (event.month) {
    return `${new Date(event.year, event.month - 1).toLocaleString('default', { month: 'long' })} ${event.year}`
  }
  return event.year.toString()
}

export default Timeline