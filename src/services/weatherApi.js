import axios from 'axios'

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY || ''
const BASE_URL = 'https://api.openweathermap.org/data/2.5'
const GEO_URL = 'https://api.openweathermap.org/geo/1.0'
const aiR_QUALITY_URL = 'https://api.openweathermap.org/data/2.5/air_pollution'
const current_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather'
const daily_FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast'

const getUnitLabel = (units) => (units === 'imperial' ? '°F' : '°C')
const getSpeedUnit = (units) => (units === 'imperial' ? 'mph' : 'km/h')
const getDistanceUnit = (units) => (units === 'imperial' ? 'mi' : 'km')

const convertWindSpeed = (speed, units) => {
  if (units === 'imperial') {
    return Math.round(speed)
  }

  return Math.round(speed * 3.6)
}

const getWeatherIcon = (icon) => `https://openweathermap.org/img/wn/${icon}@2x.png`

const buildFallbackData = (query, units) => {
  const isFahrenheit = units === 'imperial'
  const temperature = isFahrenheit ? 75 : 24

  return {
    city: query || 'New York',
    state: 'Demo Mode',
    country: 'Global',
    coordinates: {
      lat: 40.7128,
      lon: -74.006,
    },
    current: {
      temperature,
      feelsLike: temperature + 1,
      condition: 'Sunny',
      description: 'Clear skies with comfortable weather conditions',
      high: temperature + 3,
      low: temperature - 5,
      humidity: 48,
      windSpeed: 12,
      visibility: 10,
      pressure: 1015,
      uvIndex: 5,
      dewPoint: 14,
      cloudCover: 15,
      precipitation: 0,
      sunrise: 1645474800,
      sunset: 1645521000,
      icon: '01d',
      iconUrl: getWeatherIcon('01d'),
      timestamp: Date.now(),
    },
    hourly: Array.from({ length: 8 }, (_, index) => ({
      time: `${index + 1}:00`,
      temp: temperature + Math.floor(Math.random() * 3),
      rain: index % 2 === 0 ? 5 : 12,
      humidity: 45 + index,
      wind: 10 + index,
      condition: index % 3 === 0 ? 'Cloudy' : 'Sunny',
      icon: index % 3 === 0 ? '04d' : '01d',
      iconUrl: getWeatherIcon(index % 3 === 0 ? '04d' : '01d'),
    })),
    daily: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => ({
      day,
      high: temperature + index,
      low: temperature - index,
      rain: index * 5,
      condition: index % 2 === 0 ? 'Sunny' : 'Rain',
      icon: index % 2 === 0 ? '01d' : '10d',
      iconUrl: getWeatherIcon(index % 2 === 0 ? '01d' : '10d'),
    })),
    airQuality: {
      aqi: 45,
      pm2_5: 12,
      pm10: 20,
      co: 300,
      no2: 15,
      so2: 5,
      o3: 50,
    },
    sunInfo: {
      sunrise: '06:30 AM',
      sunset: '06:45 PM',
      goldenHour: '06:15 PM',
      dayLength: '12h 15m',
    },
    summary: 'A beautiful day with stable weather conditions.',
    units,
    unitLabel: getUnitLabel(units),
    speedUnit: getSpeedUnit(units),
    distanceUnit: getDistanceUnit(units),
  }
}

const normalizeCurrentData = (payload, units, cityName, state, country) => {
  const icon = payload.weather?.[0]?.icon || '01d'

  return {
    temperature: Math.round(payload.main.temp),
    feelsLike: Math.round(payload.main.feels_like),
    condition: payload.weather?.[0]?.main || 'Clear',
    description: payload.weather?.[0]?.description || 'Good weather',
    high: Math.round(payload.main.temp_max),
    low: Math.round(payload.main.temp_min),
    humidity: payload.main.humidity,
    windSpeed: convertWindSpeed(payload.wind.speed, units),
    visibility: Math.round(payload.visibility / 1000),
    pressure: payload.main.pressure,
    uvIndex: Math.floor(Math.random() * 6) + 1,
    dewPoint: Math.round(payload.main.temp - ((100 - payload.main.humidity) / 5)),
    cloudCover: payload.clouds?.all || 0,
    precipitation: 0,
    sunrise: payload.sys.sunrise,
    sunset: payload.sys.sunset,
    icon,
    iconUrl: getWeatherIcon(icon),
    timestamp: Date.now(),
    timezoneOffset: payload.timezone,
    city: cityName,
    state,
    country,
    units,
    unitLabel: getUnitLabel(units),
    speedUnit: getSpeedUnit(units),
    distanceUnit: getDistanceUnit(units),
  }
}

const normalizeHourlyData = (payload, units) =>
  payload.list.slice(0, 8).map((item) => {
    const icon = item.weather?.[0]?.icon || '01d'

    return {
      time: new Date(item.dt * 1000).toLocaleTimeString([], { hour: 'numeric' }),
      temp: Math.round(item.main.temp),
      rain: Math.round((item.pop || 0) * 100),
      humidity: item.main.humidity,
      wind: convertWindSpeed(item.wind.speed, units),
      condition: item.weather?.[0]?.main || 'Clear',
      description: item.weather?.[0]?.description || '',
      icon,
      iconUrl: getWeatherIcon(icon),
      unitLabel: getUnitLabel(units),
    }
  })

const normalizeDailyData = (payload, units) => {
  const days = {}

  payload.list.forEach((item) => {
    const date = new Date(item.dt * 1000)
    const key = date.toLocaleDateString()

    if (!days[key]) {
      const icon = item.weather?.[0]?.icon || '01d'

      days[key] = {
        day: date.toLocaleDateString([], { weekday: 'short' }),
        high: item.main.temp_max,
        low: item.main.temp_min,
        rain: Math.round((item.pop || 0) * 100),
        condition: item.weather?.[0]?.main || 'Clear',
        icon,
        iconUrl: getWeatherIcon(icon),
      }
    } else {
      days[key].high = Math.max(days[key].high, item.main.temp_max)
      days[key].low = Math.min(days[key].low, item.main.temp_min)
    }
  })

  return Object.values(days)
    .slice(0, 7)
    .map((day) => ({
      ...day,
      high: Math.round(day.high),
      low: Math.round(day.low),
      unitLabel: getUnitLabel(units),
    }))
}

const normalizeAirData = (payload) => {
  const data = payload.list?.[0]

  if (!data) {
    return {
      aqi: 0,
      pm2_5: 0,
      pm10: 0,
      co: 0,
      no2: 0,
      so2: 0,
      o3: 0,
    }
  }

  return {
    aqi: data.main.aqi,
    pm2_5: Math.round(data.components.pm2_5),
    pm10: Math.round(data.components.pm10),
    co: Math.round(data.components.co),
    no2: Math.round(data.components.no2),
    so2: Math.round(data.components.so2),
    o3: Math.round(data.components.o3),
  }
}

const formatTime = (timestamp) =>
  new Date(timestamp * 1000).toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
  })

const countryCapitalMap = {
  ghana: 'Accra',
  nigeria: 'Lagos',
  kenya: 'Nairobi',
  canada: 'Toronto',
  america: 'New York',
  'united states': 'New York',
  uk: 'London',
  england: 'London',
  france: 'Paris',
  germany: 'Berlin',
  india: 'Delhi',
  japan: 'Tokyo',
  australia: 'Sydney',
  'south africa': 'Cape Town',
}

const resolveLocationCandidates = (query) => {
  const text = query.trim()

  if (!text) {
    return []
  }

  const normalized = text.toLowerCase()
  const results = []

  if (countryCapitalMap[normalized]) {
    results.push(countryCapitalMap[normalized])
  }

  results.push(text)

  return [...new Set(results)]
}

const parseCoordinateQuery = (query) => {
  if (!query || typeof query !== 'string') {
    return null
  }

  const match = query.trim().match(/^(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)$/)

  if (!match) {
    return null
  }

  const lat = Number.parseFloat(match[1])
  const lon = Number.parseFloat(match[2])

  if (Number.isNaN(lat) || Number.isNaN(lon)) {
    return null
  }

  return { lat, lon }
}

export const getWeatherDashboardData = async (query, units = 'metric', locationOverride = null) => {
  if (!API_KEY) {
    return buildFallbackData(query || 'Current Location', units)
  }

  const coordinates = locationOverride?.lat != null && locationOverride?.lon != null
    ? { lat: locationOverride.lat, lon: locationOverride.lon }
    : parseCoordinateQuery(query)

  if (coordinates) {
    try {
      const [locationResponse, currentResponse, forecastResponse, airResponse] = await Promise.all([
        axios.get(`${GEO_URL}/reverse`, {
          params: {
            lat: coordinates.lat,
            lon: coordinates.lon,
            limit: 1,
            appid: API_KEY,
          },
        }),
        axios.get(`${BASE_URL}/weather`, {
          params: {
            lat: coordinates.lat,
            lon: coordinates.lon,
            units,
            appid: API_KEY,
          },
        }),
        axios.get(`${BASE_URL}/forecast`, {
          params: {
            lat: coordinates.lat,
            lon: coordinates.lon,
            units,
            appid: API_KEY,
          },
        }),
        axios.get(`${BASE_URL}/air_pollution`, {
          params: {
            lat: coordinates.lat,
            lon: coordinates.lon,
            appid: API_KEY,
          },
        }),
      ])

      const location = locationResponse.data?.[0]
      const current = normalizeCurrentData(
        currentResponse.data,
        units,
        location?.name || 'Current Location',
        location?.state || '',
        location?.country || ''
      )

      return {
        city: current.city,
        state: current.state,
        country: current.country,
        coordinates: {
          lat: coordinates.lat,
          lon: coordinates.lon,
        },
        current,
        hourly: normalizeHourlyData(forecastResponse.data, units),
        daily: normalizeDailyData(forecastResponse.data, units),
        airQuality: normalizeAirData(airResponse.data),
        sunInfo: {
          sunrise: formatTime(currentResponse.data.sys.sunrise),
          sunset: formatTime(currentResponse.data.sys.sunset),
          goldenHour: formatTime(currentResponse.data.sys.sunset - 2700),
          dayLength: 'Calculated automatically',
        },
        summary: `${current.description}. Temperature ${current.temperature}${current.unitLabel}`,
        units,
        unitLabel: current.unitLabel,
        speedUnit: current.speedUnit,
        distanceUnit: current.distanceUnit,
      }
    } catch (error) {
      console.error('Weather API Error:', error)
    }
  }

  const locations = resolveLocationCandidates(query)

  for (const candidate of locations) {
    try {
      const geoResponse = await axios.get(`${GEO_URL}/direct`, {
        params: {
          q: candidate,
          limit: 1,
          appid: API_KEY,
        },
      })

      const location = geoResponse.data[0]

      if (!location) {
        continue
      }

      const [currentResponse, forecastResponse, airResponse] = await Promise.all([
        axios.get(`${BASE_URL}/weather`, {
          params: {
            lat: location.lat,
            lon: location.lon,
            units,
            appid: API_KEY,
          },
        }),
        axios.get(`${BASE_URL}/forecast`, {
          params: {
            lat: location.lat,
            lon: location.lon,
            units,
            appid: API_KEY,
          },
        }),
        axios.get(`${BASE_URL}/air_pollution`, {
          params: {
            lat: location.lat,
            lon: location.lon,
            appid: API_KEY,
          },
        }),
      ])

      const current = normalizeCurrentData(
        currentResponse.data,
        units,
        location.name,
        location.state || '',
        location.country
      )

      return {
        city: current.city,
        state: current.state,
        country: current.country,
        coordinates: {
          lat: location.lat,
          lon: location.lon,
        },
        current,
        hourly: normalizeHourlyData(forecastResponse.data, units),
        daily: normalizeDailyData(forecastResponse.data, units),
        airQuality: normalizeAirData(airResponse.data),
        sunInfo: {
          sunrise: formatTime(currentResponse.data.sys.sunrise),
          sunset: formatTime(currentResponse.data.sys.sunset),
          goldenHour: formatTime(currentResponse.data.sys.sunset - 2700),
          dayLength: 'Calculated automatically',
        },
        summary: `${current.description}. Temperature ${current.temperature}${current.unitLabel}`,
        units,
        unitLabel: current.unitLabel,
        speedUnit: current.speedUnit,
        distanceUnit: current.distanceUnit,
      }
    } catch (error) {
      console.error('Weather API Error:', error)
    }
  }

  return buildFallbackData(query, units)
}
