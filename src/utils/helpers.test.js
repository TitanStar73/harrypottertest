import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  debounce,
  throttle,
  truncate,
  capitalize,
  capitalizeWords,
  slugify,
  generateId,
  deepClone,
  formatDate,
  formatNumber,
  getInitials,
  cn,
  filterByQuery,
  groupBy,
  getUniqueValues,
  calculateReadingTime,
} from '../utils/helpers'

describe('Utility Functions', () => {
  describe('debounce', () => {
    beforeEach(() => {
      vi.useFakeTimers()
    })

    it('should delay function execution', () => {
      const fn = vi.fn()
      const debounced = debounce(fn, 100)

      debounced('arg1')
      expect(fn).not.toHaveBeenCalled()

      vi.advanceTimersByTime(100)
      expect(fn).toHaveBeenCalledWith('arg1')
    })

    it('should only call once for multiple rapid calls', () => {
      const fn = vi.fn()
      const debounced = debounce(fn, 100)

      debounced('arg1')
      debounced('arg2')
      debounced('arg3')

      vi.advanceTimersByTime(100)
      expect(fn).toHaveBeenCalledTimes(1)
      expect(fn).toHaveBeenCalledWith('arg3')
    })
  })

  describe('throttle', () => {
    beforeEach(() => {
      vi.useFakeTimers()
    })

    it('should limit function calls', () => {
      const fn = vi.fn()
      const throttled = throttle(fn, 100)

      throttled()
      throttled()
      throttled()

      expect(fn).toHaveBeenCalledTimes(1)

      vi.advanceTimersByTime(100)
      throttled()
      expect(fn).toHaveBeenCalledTimes(2)
    })
  })

  describe('truncate', () => {
    it('should truncate long text', () => {
      expect(truncate('Hello world', 8)).toBe('Hello wo...')
    })

    it('should not truncate short text', () => {
      expect(truncate('Hi', 10)).toBe('Hi')
    })

    it('should handle empty string', () => {
      expect(truncate('', 10)).toBe('')
    })
  })

  describe('capitalize', () => {
    it('should capitalize first letter', () => {
      expect(capitalize('hello')).toBe('Hello')
    })

    it('should handle empty string', () => {
      expect(capitalize('')).toBe('')
    })
  })

  describe('capitalizeWords', () => {
    it('should capitalize each word', () => {
      expect(capitalizeWords('hello world')).toBe('Hello World')
    })

    it('should handle single word', () => {
      expect(capitalizeWords('hello')).toBe('Hello')
    })
  })

  describe('slugify', () => {
    it('should create URL-friendly slug', () => {
      expect(slugify('Hello World!')).toBe('hello-world')
    })

    it('should handle special characters', () => {
      expect(slugify('Harry Potter & The Chamber of Secrets')).toBe('harry-potter-the-chamber-of-secrets')
    })

    it('should trim hyphens', () => {
      expect(slugify('  hello  ')).toBe('hello')
    })
  })

  describe('generateId', () => {
    it('should generate unique IDs', () => {
      const id1 = generateId('test')
      const id2 = generateId('test')
      expect(id1).not.toBe(id2)
      expect(id1).toMatch(/^test-\d+-[a-z0-9]+$/)
    })
  })

  describe('deepClone', () => {
    it('should create deep copy of object', () => {
      const original = { a: 1, b: { c: 2 } }
      const cloned = deepClone(original)
      expect(cloned).toEqual(original)
      expect(cloned).not.toBe(original)
      expect(cloned.b).not.toBe(original.b)
    })
  })

  describe('formatDate', () => {
    it('should format date string', () => {
      const result = formatDate('1980-07-31')
      expect(result).toContain('July')
      expect(result).toContain('31')
      expect(result).toContain('1980')
    })
  })

  describe('formatNumber', () => {
    it('should add commas', () => {
      expect(formatNumber(1000)).toBe('1,000')
      expect(formatNumber(1000000)).toBe('1,000,000')
    })
  })

  describe('getInitials', () => {
    it('should get initials from name', () => {
      expect(getInitials('Harry Potter')).toBe('HP')
      expect(getInitials('Albus Dumbledore')).toBe('AD')
    })

    it('should handle single name', () => {
      expect(getInitials('Harry')).toBe('H')
    })
  })

  describe('cn (classnames)', () => {
    it('should join class names', () => {
      expect(cn('a', 'b', 'c')).toBe('a b c')
    })

    it('should filter falsy values', () => {
      expect(cn('a', false && 'b', 'c')).toBe('a c')
    })

    it('should handle arrays', () => {
      expect(cn(['a', 'b'], 'c')).toBe('a b c')
    })
  })

  describe('filterByQuery', () => {
    const items = [
      { name: 'Harry Potter', house: 'Gryffindor' },
      { name: 'Ron Weasley', house: 'Gryffindor' },
      { name: 'Hermione Granger', house: 'Gryffindor' },
      { name: 'Draco Malfoy', house: 'Slytherin' },
    ]

    it('should filter by name', () => {
      const result = filterByQuery(items, 'harry', ['name'])
      expect(result).toHaveLength(1)
      expect(result[0].name).toBe('Harry Potter')
    })

    it('should filter by house', () => {
      const result = filterByQuery(items, 'slytherin', ['house'])
      expect(result).toHaveLength(1)
      expect(result[0].name).toBe('Draco Malfoy')
    })

    it('should return all for empty query', () => {
      const result = filterByQuery(items, '', ['name'])
      expect(result).toHaveLength(4)
    })
  })

  describe('groupBy', () => {
    it('should group items by key', () => {
      const items = [
        { name: 'Harry', house: 'Gryffindor' },
        { name: 'Ron', house: 'Gryffindor' },
        { name: 'Draco', house: 'Slytherin' },
      ]
      const grouped = groupBy(items, 'house')
      expect(grouped.Gryffindor).toHaveLength(2)
      expect(grouped.Slytherin).toHaveLength(1)
    })
  })

  describe('getUniqueValues', () => {
    it('should get unique values', () => {
      const items = [
        { house: 'Gryffindor' },
        { house: 'Slytherin' },
        { house: 'Gryffindor' },
        { house: 'Ravenclaw' },
      ]
      const unique = getUniqueValues(items, 'house')
      expect(unique).toEqual(['Gryffindor', 'Ravenclaw', 'Slytherin'])
    })
  })

  describe('calculateReadingTime', () => {
    it('should calculate reading time', () => {
      const text = 'word '.repeat(200)
      expect(calculateReadingTime(text)).toBe('1 min read')
    })

    it('should handle short text', () => {
      expect(calculateReadingTime('Hello world')).toBe('1 min read')
    })
  })
})