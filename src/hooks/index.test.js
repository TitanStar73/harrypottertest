import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import {
  useDebounce,
  useLocalStorage,
  useToggle,
  useActiveTab,
  useMediaQuery,
  useClickOutside,
} from '../hooks'

describe('Custom Hooks', () => {
  describe('useDebounce', () => {
    beforeEach(() => {
      vi.useFakeTimers()
    })

    it('should return initial value immediately', () => {
      const { result } = renderHook(() => useDebounce('initial', 300))
      expect(result.current).toBe('initial')
    })

    it('should debounce value changes', () => {
      const { result, rerender } = renderHook(
        ({ value }) => useDebounce(value, 300),
        { initialProps: { value: 'initial' } }
      )

      rerender({ value: 'updated' })
      expect(result.current).toBe('initial')

      act(() => {
        vi.advanceTimersByTime(300)
      })
      expect(result.current).toBe('updated')
    })
  })

  describe('useLocalStorage', () => {
    beforeEach(() => {
      localStorage.clear()
      vi.resetAllMocks()
    })

    it('should return initial value when localStorage is empty', () => {
      const { result } = renderHook(() => useLocalStorage('test-key', 'default'))
      expect(result.current[0]).toBe('default')
    })

    it('should update value with setValue', () => {
      const { result } = renderHook(() => useLocalStorage('test-key', 'default'))
      act(() => {
        result.current[1]('updated')
      })
      expect(result.current[0]).toBe('updated')
    })

    it('should handle function updater', () => {
      const { result } = renderHook(() => useLocalStorage('test-key', 0))
      act(() => {
        result.current[1](prev => prev + 1)
      })
      expect(result.current[0]).toBe(1)
    })
  })

  describe('useToggle', () => {
    it('should return initial value and toggle function', () => {
      const { result } = renderHook(() => useToggle(false))
      expect(result.current[0]).toBe(false)
      expect(typeof result.current[1]).toBe('function')
    })

    it('should toggle value', () => {
      const { result } = renderHook(() => useToggle(false))
      act(() => {
        result.current[1]()
      })
      expect(result.current[0]).toBe(true)
      act(() => {
        result.current[1]()
      })
      expect(result.current[0]).toBe(false)
    })

    it('should allow direct value setting', () => {
      const { result } = renderHook(() => useToggle(false))
      act(() => {
        result.current[2](true)
      })
      expect(result.current[0]).toBe(true)
    })
  })

  describe('useActiveTab', () => {
    it('should return initial tab and setter', () => {
      const { result } = renderHook(() => useActiveTab('tab1'))
      expect(result.current[0]).toBe('tab1')
      expect(typeof result.current[1]).toBe('function')
    })

    it('should update tab', () => {
      const { result } = renderHook(() => useActiveTab('tab1'))
      act(() => {
        result.current[1]('tab2')
      })
      expect(result.current[0]).toBe('tab2')
    })
  })

  describe('useMediaQuery', () => {
    it('should return false initially', () => {
      const mockMatchMedia = vi.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }))
      vi.stubGlobal('matchMedia', mockMatchMedia)
      
      const { result } = renderHook(() => useMediaQuery('(min-width: 1000px)'))
      expect(result.current).toBe(false)
    })

    it('should update on media query change', () => {
      const mockMatchMedia = vi.fn().mockImplementation(query => ({
        matches: true,
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }))
      vi.stubGlobal('matchMedia', mockMatchMedia)
      
      const { result } = renderHook(() => useMediaQuery('(min-width: 1000px)'))
      expect(result.current).toBe(true)
    })
  })

  describe('useClickOutside', () => {
    it('should return ref', () => {
      const { result } = renderHook(() => useClickOutside(vi.fn()))
      expect(result.current).toHaveProperty('current')
    })
  })
})