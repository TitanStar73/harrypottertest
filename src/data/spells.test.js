import { describe, it, expect } from 'vitest'
import { spells, spellCategories, getSpellsByCategory, getSpellById, searchSpells } from '../data/spells'

describe('Spells Data', () => {
  describe('spells array', () => {
    it('should have spells', () => {
      expect(spells.length).toBeGreaterThan(0)
    })

    it('each spell should have required properties', () => {
      spells.forEach(spell => {
        expect(spell).toHaveProperty('id')
        expect(spell).toHaveProperty('name')
        expect(spell).toHaveProperty('incantation')
        expect(spell).toHaveProperty('category')
        expect(spell).toHaveProperty('type')
        expect(spell).toHaveProperty('effect')
        expect(spell).toHaveProperty('light')
        expect(spell).toHaveProperty('difficulty')
        expect(spell).toHaveProperty('firstUsed')
        expect(spell).toHaveProperty('notableUse')
        expect(spell).toHaveProperty('description')
      })
    })

    it('should have unique IDs', () => {
      const ids = spells.map(s => s.id)
      const uniqueIds = new Set(ids)
      expect(uniqueIds.size).toBe(ids.length)
    })
  })

  describe('spellCategories', () => {
    it('should have categories', () => {
      expect(spellCategories.length).toBeGreaterThan(0)
    })

    it('each category should have id, name, and count', () => {
      spellCategories.forEach(cat => {
        expect(cat).toHaveProperty('id')
        expect(cat).toHaveProperty('name')
        expect(cat).toHaveProperty('count')
        expect(typeof cat.count).toBe('number')
      })
    })

    it('all category counts should sum to total spells', () => {
      const totalCount = spellCategories.find(c => c.id === 'all')?.count || 0
      expect(totalCount).toBe(spells.length)
    })
  })

  describe('getSpellsByCategory', () => {
    it('should return all spells for "all" category', () => {
      const result = getSpellsByCategory('all')
      expect(result).toHaveLength(spells.length)
    })

    it('should return empty array for unknown category', () => {
      const result = getSpellsByCategory('unknown')
      expect(result).toHaveLength(0)
    })

    it('should filter by charms', () => {
      const result = getSpellsByCategory('charms')
      expect(result.length).toBeGreaterThan(0)
      result.forEach(spell => {
        expect(spell.category.toLowerCase()).toContain('charms')
      })
    })

    it('should filter by defense', () => {
      const result = getSpellsByCategory('defense')
      expect(result.length).toBeGreaterThan(0)
      result.forEach(spell => {
        expect(spell.category.toLowerCase()).toContain('defense')
      })
    })

    it('should filter by unforgivable', () => {
      const result = getSpellsByCategory('unforgivable')
      expect(result.length).toBe(3)
      result.forEach(spell => {
        expect(spell.category.toLowerCase()).toContain('unforgivable')
      })
    })
  })

  describe('getSpellById', () => {
    it('should return spell by ID', () => {
      const spell = getSpellById('expelliarmus')
      expect(spell).toBeDefined()
      expect(spell?.name).toBe('Expelliarmus')
    })

    it('should return undefined for unknown ID', () => {
      const spell = getSpellById('unknown')
      expect(spell).toBeUndefined()
    })
  })

  describe('searchSpells', () => {
    it('should search by name', () => {
      const results = searchSpells('expelliarmus')
      expect(results.length).toBeGreaterThan(0)
      expect(results[0].name.toLowerCase()).toContain('expelliarmus')
    })

    it('should search by incantation', () => {
      const results = searchSpells('pa-tro')
      expect(results.length).toBeGreaterThan(0)
      expect(results[0].incantation.toLowerCase()).toContain('pa-tro')
    })

    it('should search by effect', () => {
      const results = searchSpells('disarm')
      expect(results.length).toBeGreaterThan(0)
    })

    it('should return all for empty query', () => {
      const results = searchSpells('')
      expect(results).toHaveLength(spells.length)
    })

    it('should be case insensitive', () => {
      const results1 = searchSpells('EXPELLIARMUS')
      const results2 = searchSpells('expelliarmus')
      expect(results1).toEqual(results2)
    })
  })
})