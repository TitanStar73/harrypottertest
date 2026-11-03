import { describe, it, expect } from 'vitest'
import { characters, houses, getCharactersByRole, getCharactersByHouse, getCharacterById, searchCharacters } from '../data/characters'

describe('Characters Data', () => {
  describe('characters array', () => {
    it('should have characters', () => {
      expect(characters.length).toBeGreaterThan(0)
    })

    it('each character should have required properties', () => {
      characters.forEach(char => {
        expect(char).toHaveProperty('id')
        expect(char).toHaveProperty('name')
        expect(char).toHaveProperty('alias')
        expect(char).toHaveProperty('house')
        expect(char).toHaveProperty('bloodStatus')
        expect(char).toHaveProperty('role')
        expect(char).toHaveProperty('birthdate')
        expect(char).toHaveProperty('wand')
        expect(char).toHaveProperty('patronus')
        expect(char).toHaveProperty('boggart')
        expect(char).toHaveProperty('firstAppearance')
        expect(char).toHaveProperty('status')
        expect(char).toHaveProperty('description')
        expect(char).toHaveProperty('traits')
        expect(char).toHaveProperty('relationships')
      })
    })

    it('should have unique IDs', () => {
      const ids = characters.map(c => c.id)
      const uniqueIds = new Set(ids)
      expect(uniqueIds.size).toBe(ids.length)
    })
  })

  describe('houses', () => {
    it('should have four houses', () => {
      expect(houses.length).toBe(4)
    })

    it('each house should have required properties', () => {
      houses.forEach(house => {
        expect(house).toHaveProperty('id')
        expect(house).toHaveProperty('name')
        expect(house).toHaveProperty('color')
        expect(house).toHaveProperty('lightColor')
        expect(house).toHaveProperty('traits')
        expect(house).toHaveProperty('founder')
        expect(house).toHaveProperty('ghost')
        expect(house).toHaveProperty('element')
      })
    })

    it('should have correct house names', () => {
      const names = houses.map(h => h.name).sort()
      expect(names).toEqual(['Gryffindor', 'Hufflepuff', 'Ravenclaw', 'Slytherin'])
    })
  })

  describe('getCharactersByRole', () => {
    it('should return friends for friends role', () => {
      const friends = getCharactersByRole('friends')
      expect(friends.length).toBeGreaterThan(0)
      // Check that all returned characters have a role matching the friends criteria
      friends.forEach(char => {
        const firstRole = char.role.split(' / ')[0]
        const isFriend = ['Best Friend', 'Wife', 'D.A. Leader', 'Magizoologist', 'The Chosen One', 'Auror', 'Head of Auror Office'].includes(firstRole)
        const isDA = char.role.includes('D.A.')
        expect(isFriend || isDA).toBe(true)
      })
    })

    it('should return enemies for enemies role', () => {
      const enemies = getCharactersByRole('enemies')
      expect(enemies.length).toBeGreaterThan(0)
      enemies.forEach(char => {
        expect(char.role).toMatch(/Dark Wizard|Death Eater|Snatcher|Ministry Official/)
      })
    })
  })

  describe('getCharactersByHouse', () => {
    it('should return all characters for "all"', () => {
      const all = getCharactersByHouse('all')
      expect(all).toHaveLength(characters.length)
    })

    it('should filter by house', () => {
      const gryffindors = getCharactersByHouse('Gryffindor')
      expect(gryffindors.length).toBeGreaterThan(0)
      gryffindors.forEach(char => {
        expect(char.house).toBe('Gryffindor')
      })
    })

    it('should return empty array for unknown house', () => {
      const result = getCharactersByHouse('unknown')
      expect(result).toHaveLength(0)
    })
  })

  describe('getCharacterById', () => {
    it('should return character by ID', () => {
      const char = getCharacterById('harry-potter')
      expect(char).toBeDefined()
      expect(char?.name).toBe('Harry James Potter')
    })

    it('should return undefined for unknown ID', () => {
      const char = getCharacterById('unknown')
      expect(char).toBeUndefined()
    })
  })

  describe('searchCharacters', () => {
    it('should search by name', () => {
      const results = searchCharacters('harry')
      expect(results.length).toBeGreaterThan(0)
      expect(results[0].name.toLowerCase()).toContain('harry')
    })

    it('should search by alias', () => {
      const results = searchCharacters('padfoot')
      expect(results.length).toBeGreaterThan(0)
      expect(results[0].alias.toLowerCase()).toContain('padfoot')
    })

    it('should search by house', () => {
      const results = searchCharacters('gryffindor')
      expect(results.length).toBeGreaterThan(0)
      results.forEach(r => expect(r.house.toLowerCase()).toContain('gryffindor'))
    })

    it('should search by role', () => {
      const results = searchCharacters('auror')
      expect(results.length).toBeGreaterThan(0)
    })

    it('should return all for empty query', () => {
      const results = searchCharacters('')
      expect(results).toHaveLength(characters.length)
    })

    it('should be case insensitive', () => {
      const results1 = searchCharacters('HARRY')
      const results2 = searchCharacters('harry')
      expect(results1).toEqual(results2)
    })
  })
})