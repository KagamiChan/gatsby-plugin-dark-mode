import { useCallback, useEffect, useState } from 'react'

declare global {
  interface Window {
    __theme: string
    __onThemeChange: () => void
    __setPreferredTheme: (theme: string) => void
  }
}

export const useTheme = () => {
  const [currentTheme, setCurrentTheme] = useState<string | null>(
    typeof window === 'undefined' ? null : window.__theme,
  )

  useEffect(() => {
    window.__onThemeChange = () => {
      setCurrentTheme(window.__theme)
    }
  }, [])

  const toggleTheme = useCallback(
    (theme: string | ((prevTheme: string | null) => string)) => {
      if (typeof theme === 'string') {
        window.__setPreferredTheme(theme);
      } else if (typeof theme === 'function') {
        setCurrentTheme((prevTheme) => {
          const newTheme = theme(prevTheme);
          window.__setPreferredTheme(newTheme);
          return newTheme;
        });
      }
    },
    []
  );

  return [currentTheme, toggleTheme] as [
    typeof currentTheme,
    typeof toggleTheme,
  ]
}
