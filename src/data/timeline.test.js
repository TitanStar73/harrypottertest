import { describe, it, expect } from 'vitest'
import { timelineEvents, timelineCategories, getEventsByYear, getEventsByCategory, getEventsByBook, getYears, getEventById } from '../data/timeline'

describe('Timeline Data', () => {
  describe('timelineEvents array', () => {
    it('should have events', () => {
      expect(timelineEvents.length).toBeGreaterThan(0)
    })

    it('each event should have required properties', () => {
      timelineEvents.forEach(event => {
        expect(event).toHaveProperty('id')
        expect(event).toHaveProperty('date')
        expect(event).toHaveProperty('year')
        expect(event).toHaveProperty('month')
        expect(event).toHaveProperty('day')
        expect(event).toHaveProperty('title')
        expect(event).toHaveProperty('description')
        expect(event).toHaveProperty('category')
        expect(event).toHaveProperty('importance')
        expect(event).toHaveProperty('book')
        expect(event).toHaveProperty('location')
      })
    })

    it('should have unique IDs', () => {
      const ids = timelineEvents.map(e => e.id)
      const uniqueIds = new Set(ids)
      expect(uniqueIds.size).toBe(ids.length)
    })

    it('should have valid years', () => {
      timelineEvents.forEach(event => {
        expect(event.year).toBeGreaterThanOrEqual(1980)
        expect(event.year).toBeLessThanOrEqual(2017)
      })
    })

    it('should have valid importance values', () => {
      const validImportance = ['major', 'minor']
      timelineEvents.forEach(event => {
        expect(validImportance).toContain(event.importance)
      })
    })
  })

  describe('timelineCategories', () => {
    it('should have categories', () => {
      expect(timelineCategories.length).toBeGreaterThan(0)
    })

    it('each category should have id, name, and color', () => {
      timelineCategories.forEach(cat => {
        expect(cat).toHaveProperty('id')
        expect(cat).toHaveProperty('name')
        expect(cat).toHaveProperty('color')
      })
    })
  })

  describe('getEventsByYear', () => {
    it('should return all events for "all"', () => {
      const all = getEventsByYear('all')
      expect(all).toHaveLength(timelineEvents.length)
    })

    it('should filter by year', () => {
      const year1991 = getEventsByYear(1991)
      expect(year1991.length).toBeGreaterThan(0)
      year1991.forEach(event => {
        expect(event.year).toBe(1991)
      })
    })

    it('should return empty array for unknown year', () => {
      const result = getEventsByYear(2050)
      expect(result).toHaveLength(0)
    })
  })

  describe('getEventsByCategory', () => {
    it('should return all events for "all"', () => {
      const all = getEventsByCategory('all')
      expect(all).toHaveLength(timelineEvents.length)
    })

    it('should filter by category', () => {
      const personal = getEventsByCategory('personal')
      expect(personal.length).toBeGreaterThan(0)
      personal.forEach(event => {
        expect(event.category).toBe('personal')
      })
    })

    it('should return empty array for unknown category', () => {
      const result = getEventsByCategory('unknown')
      expect(result).toHaveLength(0)
    })
  })

  describe('getEventsByBook', () => {
    it('should return all events for "all"', () => {
      const all = getEventsByBook('all')
      expect(all).toHaveLength(timelineEvents.length)
    })

    it('should filter by book', () => {
      const philosopher = getEventsByBook('Philosopher')
      expect(philosopher.length).toBeGreaterThan(0)
      philosopher.forEach(event => {
        expect(event.book).toContain('Philosopher')
      })
    })
  })

  describe('getYears', () => {
    it('should return sorted unique years', () => {
      const years = getYears()
      expect(years.length).toBeGreaterThan(0)
      expect(years[0]).toBe(1980)
      expect(years[years.length - 1]).toBe(2017)
      // Check sorted
      for (let i = 1; i < years.length; i++) {
        expect(years[i]).toBeGreaterThan(years[i - 1])
      }
    })
  })

  describe('getEventById', () => {
    it('should return event by ID', () => {
      const event = getEventById('timeline-1')
      expect(event).toBeDefined()
      expect(event?.title).toBe('Birth of Harry James Potter')
    })

    it('should return undefined for unknown ID', () => {
      const event = getEventById('unknown')
      expect(event).toBeUndefined()
    })
  })
})