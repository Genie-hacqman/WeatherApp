import { useCallback, useEffect, useMemo, useState } from 'react'
import { getWeatherDashboardData } from '../services/weatherApi'
import { formatCityDate, formatCityTime } from '../utils/formatters'

const RECENT_KEY = 'weather-recent-searches'
const FAVORITES_KEY = 'weather-favorites'
const THEME_KEY = 'weather-theme'

const readStorage = (key, fallback) => {
  if (typeof window === 'undefined') {
    return fallback
  }

  const storedValue = window.localStorage.getItem(key)
  if (!storedValue) {
    return fallback
  }

  try {
    return JSON.parse(storedValue)
  } catch {
    return fallback
  }
}

export const useWeatherData = () => {
  const [query, setQuery] = useState('New York')
  const [units, setUnits] = useState('metric')
  const [theme, setTheme] = useState(() => readStorage(THEME_KEY, 'dark'))
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [recentSearches, setRecentSearches] = useState(() => readStorage(RECENT_KEY, []))
  const [favorites, setFavorites] = useState(() => readStorage(FAVORITES_KEY, ['Tokyo', 'Reykjavik']))
  const [currentDate, setCurrentDate] = useState(new Date())

  const refreshWeather = useCallback(async (nextQuery = query, locationOverride = null) => {
    setLoading(true)
    setError('')

    try {
      const result = await getWeatherDashboardData(nextQuery, units, locationOverride)

      if (!result?.current || !result?.coordinates) {
        throw new Error('No weather data available for the requested location.')
      }

      setData(result)
      setError('')
      setQuery(nextQuery)

      if (nextQuery && typeof nextQuery === 'string') {
        setRecentSearches((prev) => {
          const next = [nextQuery, ...prev.filter((item) => item !== nextQuery)].slice(0, 6)
          window.localStorage.setItem(RECENT_KEY, JSON.stringify(next))
          return next
        })
      }
    } catch (err) {
      console.error(err)
      setError('The location could not be resolved. Please try another city or country name.')
      setData(null)
    } finally {
      setLoading(false)
    }
  }, [query, units])

  useEffect(() => {
    refreshWeather(query)
  }, [query, units, refreshWeather])

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrentDate(new Date())
      refreshWeather(query)
    }, 600000)

    return () => window.clearInterval(interval)
  }, [query, refreshWeather])

  useEffect(() => {
    const timer = window.setInterval(() => setCurrentDate(new Date()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    window.localStorage.setItem(THEME_KEY, theme)
  }, [theme])

  const searchCity = useCallback((nextQuery) => {
    const normalized = nextQuery.trim()
    if (!normalized) {
      return
    }
    setQuery(normalized)
  }, [])

  const toggleFavorite = useCallback((cityName) => {
    setFavorites((prev) => {
      const next = prev.includes(cityName)
        ? prev.filter((item) => item !== cityName)
        : [...prev, cityName]
      window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(next))
      return next
    })
  }, [])

  const useCurrentLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported in this browser.')
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude

        await refreshWeather('Current Location', { lat: latitude, lon: longitude })
      },
      () => setError('Location access was denied. Please search for a city manually.'),
    )
  }, [refreshWeather])

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }, [])

  const formattedDate = useMemo(() => {
    const timezoneOffset = data?.timezoneOffset
    return formatCityDate(currentDate, timezoneOffset)
  }, [currentDate, data?.timezoneOffset])

  const formattedTime = useMemo(() => {
    const timezoneOffset = data?.timezoneOffset
    return formatCityTime(currentDate, timezoneOffset)
  }, [currentDate, data?.timezoneOffset])

  return {
    query,
    data,
    loading,
    error,
    setQuery,
    searchCity,
    refreshWeather,
    units,
    setUnits,
    theme,
    toggleTheme,
    favorites,
    recentSearches,
    toggleFavorite,
    useCurrentLocation,
    currentDate: formattedDate,
    currentTime: formattedTime,
  }
}
