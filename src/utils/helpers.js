/**
 * Utility Functions for Harry Potter Website
 */

// Debounce function for performance
export const debounce = (func, wait) => {
  let timeout
  return (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(this, args), wait)
  }
}

// Throttle function
export const throttle = (func, limit) => {
  let inThrottle
  return (...args) => {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Format date for display
export const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  try {
    return new Date(dateString).toLocaleDateString('en-US', options)
  } catch {
    return dateString
  }
}

// Format year for timeline
export const formatYear = (year) => {
  if (!year) return ''
  return year.toString()
}

// Truncate text with ellipsis
export const truncate = (text, length = 150) => {
  if (!text || text.length <= length) return text
  return text.slice(0, length).trim() + '...'
}

// Capitalize first letter
export const capitalize = (str) => {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}

// Capitalize each word
export const capitalizeWords = (str) => {
  if (!str) return ''
  return str.replace(/\b\w/g, c => c.toUpperCase())
}

// Slugify string for URLs
export const slugify = (str) => {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// Generate random ID
export const generateId = (prefix = 'id') => {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

// Deep clone object
export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj))
}

// Check if element is in viewport
export const isInViewport = (element, offset = 0) => {
  if (!element) return false
  const rect = element.getBoundingClientRect()
  return (
    rect.top >= -offset &&
    rect.left >= -offset &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + offset &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth) + offset
  )
}

// Smooth scroll to element
export const scrollToElement = (elementId, offset = 80) => {
  const element = document.getElementById(elementId)
  if (element) {
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - offset
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }
}

// Get house color from house name
export const getHouseColor = (house) => {
  const colors = {
    gryffindor: '#740001',
    slytherin: '#0d6217',
    ravenclaw: '#0e1a40',
    hufflepuff: '#ecb939'
  }
  return colors[house.toLowerCase()] || 'var(--color-gold-primary)'
}

// Get house light color
export const getHouseLightColor = (house) => {
  const colors = {
    gryffindor: '#ae0001',
    slytherin: '#1a7a2a',
    ravenclaw: '#222f5b',
    hufflepuff: '#f0c75e'
  }
  return colors[house.toLowerCase()] || 'var(--color-gold-secondary)'
}

// Format blood status for display
export const formatBloodStatus = (status) => {
  const formats = {
    'pure-blood': 'Pure-blood',
    'half-blood': 'Half-blood',
    'muggle-born': 'Muggle-born',
    'muggle': 'Muggle',
    'squib': 'Squib',
    'werewolf': 'Werewolf',
    'house-elf': 'House-elf',
    'half-giant': 'Half-giant'
  }
  return formats[status.toLowerCase()] || capitalizeWords(status)
}

// Get status badge class
export const getStatusClass = (status) => {
  const classes = {
    alive: 'status-alive',
    deceased: 'status-deceased',
    unknown: 'status-unknown'
  }
  return classes[status.toLowerCase()] || 'status-unknown'
}

// Format spell category for display
export const formatSpellCategory = (category) => {
  return category
    .split(' ')
    .map(capitalize)
    .join(' ')
}

// Get difficulty color
export const getDifficultyColor = (difficulty) => {
  const colors = {
    beginner: 'var(--color-success)',
    moderate: 'var(--color-warning)',
    advanced: 'var(--color-danger)',
    'very advanced': 'var(--color-danger)'
  }
  return colors[difficulty.toLowerCase()] || 'var(--color-text-muted)'
}

// Parse timeline date for sorting
export const parseTimelineDate = (event) => {
  return new Date(event.year, (event.month || 1) - 1, event.day || 1)
}

// Sort timeline events chronologically
export const sortTimelineEvents = (events) => {
  return [...events].sort((a, b) => parseTimelineDate(a) - parseTimelineDate(b))
}

// Filter array by search query
export const filterByQuery = (array, query, fields) => {
  if (!query) return array
  const q = query.toLowerCase()
  return array.filter(item =>
    fields.some(field => {
      const value = item[field]
      if (Array.isArray(value)) {
        return value.some(v => v.toLowerCase().includes(q))
      }
      return value && value.toLowerCase().includes(q)
    })
  )
}

// Group array by key
export const groupBy = (array, key) => {
  return array.reduce((groups, item) => {
    const value = item[key]
    if (!groups[value]) {
      groups[value] = []
    }
    groups[value].push(item)
    return groups
  }, {})
}

// Get unique values from array of objects
export const getUniqueValues = (array, key) => {
  return [...new Set(array.map(item => item[key]).filter(Boolean))].sort()
}

// Intersection Observer helper for scroll animations
export const createScrollObserver = (callback, options = {}) => {
  const defaultOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  }
  const observer = new IntersectionObserver(callback, { ...defaultOptions, ...options })
  return observer
}

// Animate element on scroll
export const animateOnScroll = (element, animationClass = 'animate-reveal-up') => {
  const observer = createScrollObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add(animationClass)
        observer.unobserve(entry.target)
      }
    })
  })
  observer.observe(element)
  return observer
}

// LocalStorage helpers
export const storage = {
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch {
      return defaultValue
    }
  },
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
      return true
    } catch {
      return false
    }
  },
  remove: (key) => {
    try {
      localStorage.removeItem(key)
      return true
    } catch {
      return false
    }
  }
}

// Copy to clipboard
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}

// Check if user prefers reduced motion
export const prefersReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Check if user prefers dark mode
export const prefersDarkMode = () => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

// Generate gradient text style
export const gradientText = (colors = ['var(--color-gold-primary)', 'var(--color-gold-dark)']) => {
  return {
    background: `linear-gradient(135deg, ${colors.join(', ')})`,
    '-webkit-background-clip': 'text',
    '-webkit-text-fill-color': 'transparent',
    'background-clip': 'text'
  }
}

// Classnames utility (simple version)
export const cn = (...classes) => {
  return classes
    .flat()
    .filter(Boolean)
    .join(' ')
}

// Format number with commas
export const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

// Calculate reading time
export const calculateReadingTime = (text, wordsPerMinute = 200) => {
  const words = text.trim().split(/\s+/).length
  const minutes = Math.ceil(words / wordsPerMinute)
  return `${minutes} min read`
}

// Get initials from name
export const getInitials = (name) => {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}