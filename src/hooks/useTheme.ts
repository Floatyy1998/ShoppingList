import { useEffect } from 'react'
import { useStore } from '../store/useStore'

export const useTheme = () => {
  const { themeMode } = useStore()

  useEffect(() => {
    const root = window.document.documentElement

    const applyTheme = (isDark: boolean) => {
      // Use requestAnimationFrame for immediate visual update
      requestAnimationFrame(() => {
        if (isDark) {
          root.classList.add('dark')
        } else {
          root.classList.remove('dark')
        }
        // Update status bar color to match app background
        const meta = document.querySelector('meta[name="theme-color"]')
        if (meta) {
          meta.setAttribute('content', isDark ? '#0f172a' : '#f9fafb')
        }
      })
    }

    if (themeMode === 'auto') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      applyTheme(mediaQuery.matches)

      const listener = (e: MediaQueryListEvent) => applyTheme(e.matches)
      mediaQuery.addEventListener('change', listener)
      return () => mediaQuery.removeEventListener('change', listener)
    } else {
      applyTheme(themeMode === 'dark')
    }
  }, [themeMode])
}

// Apply theme immediately on load (before React hydration)
if (typeof window !== 'undefined') {
  const root = window.document.documentElement
  const savedTheme = localStorage.getItem('app-storage')

  if (savedTheme) {
    try {
      const parsed = JSON.parse(savedTheme)
      const themeMode = parsed.state?.themeMode

      const meta = document.querySelector('meta[name="theme-color"]')
      if (themeMode === 'dark') {
        root.classList.add('dark')
        if (meta) meta.setAttribute('content', '#0f172a')
      } else if (themeMode === 'light') {
        root.classList.remove('dark')
        if (meta) meta.setAttribute('content', '#f9fafb')
      } else if (themeMode === 'auto') {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        const isDark = mediaQuery.matches
        if (isDark) {
          root.classList.add('dark')
        }
        if (meta) meta.setAttribute('content', isDark ? '#0f172a' : '#f9fafb')
      }
    } catch (e) {
      // Ignore parse errors
    }
  }
}
