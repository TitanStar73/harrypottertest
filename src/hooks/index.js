/**
 * Custom React Hooks for Harry Potter Website
 */

import { useState, useEffect, useCallback, useRef } from 'react'

/**
 * Hook for detecting scroll position and direction
 */
export const useScroll = () => {
  const [scrollY, setScrollY] = useState(0)
  const [scrollDirection, setScrollDirection] = useState('up')
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrollDirection(currentScrollY > lastScrollY.current ? 'down' : 'up')
      setScrollY(currentScrollY)
      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return { scrollY, scrollDirection }
}

/**
 * Hook for scroll spy - highlights active section in navigation
 */
export const useScrollSpy = (sectionIds, options = {}) => {
  const [activeSection, setActiveSection] = useState(null)
  const observerRef = useRef(null)

  const { offset = 100, rootMargin = '-20% 0px -60% 0px' } = options

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin, threshold: 0 }
    )

    observerRef.current = observer
    sectionIds.forEach(id => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => {
      observer.disconnect()
    }
  }, [sectionIds, rootMargin])

  return activeSection
}

/**
 * Hook for managing mobile menu state
 */
export const useMobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false)

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])
  const toggle = useCallback(() => setIsOpen(prev => !prev), [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return { isOpen, open, close, toggle }
}

/**
 * Hook for keyboard navigation
 */
export const useKeyboardNavigation = (onEscape, onEnter, onArrowKeys) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'Escape':
          onEscape?.()
          break
        case 'Enter':
        case ' ':
          onEnter?.()
          break
        case 'ArrowLeft':
        case 'ArrowRight':
        case 'ArrowUp':
        case 'ArrowDown':
          onArrowKeys?.(e.key)
          break
        default:
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onEscape, onEnter, onArrowKeys])
}

/**
 * Hook for managing focus trap in modals
 */
export const useFocusTrap = (isActive) => {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!isActive || !containerRef.current) return

    const container = containerRef.current
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )

    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    const handleTab = (e) => {
      if (e.key !== 'Tab') return

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault()
          lastElement.focus()
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault()
          firstElement.focus()
        }
      }
    }

    container.addEventListener('keydown', handleTab)
    firstElement?.focus()

    return () => {
      container.removeEventListener('keydown', handleTab)
    }
  }, [isActive])

  return containerRef
}

/**
 * Hook for debounced values
 */
export const useDebounce = (value, delay = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}

/**
 * Hook for localStorage persistence
 */
export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  })

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error('Error saving to localStorage:', error)
    }
  }

  return [storedValue, setValue]
}

/**
 * Hook for media queries
 */
export const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    if (media.matches !== matches) {
      setMatches(media.matches)
    }

    const listener = () => setMatches(media.matches)
    media.addEventListener('change', listener)
    return () => media.removeEventListener('change', listener)
  }, [matches, query])

  return matches
}

/**
 * Hook for detecting reduced motion preference
 */
export const useReducedMotion = () => {
  return useMediaQuery('(prefers-reduced-motion: reduce)')
}

/**
 * Hook for detecting dark mode preference
 */
export const useDarkMode = () => {
  return useMediaQuery('(prefers-color-scheme: dark)')
}

/**
 * Hook for managing active tab/section
 */
export const useActiveTab = (initialTab = null) => {
  const [activeTab, setActiveTab] = useState(initialTab)
  return [activeTab, setActiveTab]
}

/**
 * Hook for toggling boolean state
 */
export const useToggle = (initialValue = false) => {
  const [value, setValue] = useState(initialValue)
  const toggle = useCallback(() => setValue(v => !v), [])
  return [value, toggle, setValue]
}

/**
 * Hook for managing form state
 */
export const useForm = (initialValues = {}) => {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setValues(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleBlur = (e) => {
    const { name } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))
  }

  const setFieldError = (name, error) => {
    setErrors(prev => ({ ...prev, [name]: error }))
  }

  const validate = (validationRules) => {
    const newErrors = {}
    Object.keys(validationRules).forEach(field => {
      const rule = validationRules[field]
      const value = values[field]
      if (rule.required && !value) {
        newErrors[field] = rule.message || `${field} is required`
      } else if (rule.pattern && !rule.pattern.test(value)) {
        newErrors[field] = rule.message || `${field} is invalid`
      } else if (rule.custom && !rule.custom(value)) {
        newErrors[field] = rule.message || `${field} is invalid`
      }
    })
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const reset = () => {
    setValues(initialValues)
    setErrors({})
    setTouched({})
  }

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    setFieldError,
    validate,
    reset,
    setValues
  }
}

/**
 * Hook for intersection observer (lazy loading, animations)
 */
export const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const elementRef = useRef(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      options
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [options])

  return [elementRef, isIntersecting]
}

/**
 * Hook for window size
 */
export const useWindowSize = () => {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  })

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return size
}

/**
 * Hook for click outside detection
 */
export const useClickOutside = (callback) => {
  const ref = useRef(null)

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        callback()
      }
    }

    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [callback])

  return ref
}

/**
 * Hook for managing async state
 */
export const useAsync = (asyncFunction, dependencies = []) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true

    const execute = async () => {
      setLoading(true)
      setError(null)
      try {
        const result = await asyncFunction()
        if (mounted) {
          setData(result)
        }
      } catch (err) {
        if (mounted) {
          setError(err)
        }
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    execute()
    return () => { mounted = false }
  }, dependencies)

  return { data, loading, error }
}

/**
 * Hook for copying to clipboard
 */
export const useClipboard = () => {
  const [copied, setCopied] = useState(false)

  const copy = useCallback(async (text) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      return true
    } catch {
      setCopied(false)
      return false
    }
  }, [])

  return { copy, copied }
}

/**
 * Hook for magical wand cursor effect
 */
export const useWandCursor = (enabled = true) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMoving, setIsMoving] = useState(false)
  const trailRef = useRef([])
  const animationRef = useRef(null)
  const lastMoveTime = useRef(0)

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const handleMouseMove = (e) => {
      const now = Date.now()
      setMousePosition({ x: e.clientX, y: e.clientY })
      setIsMoving(true)
      lastMoveTime.current = now

      // Add trail point
      trailRef.current.push({
        x: e.clientX,
        y: e.clientY,
        time: now,
        size: Math.random() * 8 + 4
      })

      // Keep only recent trail points (last 500ms)
      trailRef.current = trailRef.current.filter(p => now - p.time < 500)
    }

    const handleMouseLeave = () => {
      setIsMoving(false)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mouseleave', handleMouseLeave)

    // Animation loop for trail fade
    const animate = () => {
      const now = Date.now()
      if (now - lastMoveTime.current > 100) {
        setIsMoving(false)
      }
      animationRef.current = requestAnimationFrame(animate)
    }
    animationRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [enabled])

  return { mousePosition, isMoving, trail: trailRef.current }
}

/**
 * Hook for scroll-triggered magical reveal animations
 */
export const useScrollReveal = (threshold = 0.1, rootMargin = '0px') => {
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(element)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [threshold, rootMargin])

  return [elementRef, isVisible]
}

/**
 * Hook for magical text typing effect
 */
export const useTypewriter = (text, speed = 50, delay = 0) => {
  const [displayText, setDisplayText] = useState('')
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (!text) return

    let currentIndex = 0
    let timeoutId

    const type = () => {
      if (currentIndex <= text.length) {
        setDisplayText(text.slice(0, currentIndex))
        currentIndex++
        timeoutId = setTimeout(type, speed)
      } else {
        setIsComplete(true)
      }
    }

    const startDelay = setTimeout(type, delay)

    return () => {
      clearTimeout(timeoutId)
      clearTimeout(startDelay)
    }
  }, [text, speed, delay])

  return { displayText, isComplete }
}