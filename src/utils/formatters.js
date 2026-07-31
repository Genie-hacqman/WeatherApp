export const formatTemp = (value, units = 'metric') => {
  const unitLabel = units === 'imperial' ? '°F' : '°C'
  return `${Math.round(value)}${unitLabel}`
}

export const getAqiLabel = (aqi) => {
  if (aqi <= 50) return 'Good'
  if (aqi <= 100) return 'Moderate'
  if (aqi <= 150) return 'Unhealthy for sensitive groups'
  if (aqi <= 200) return 'Unhealthy'
  return 'Very unhealthy'
}

const getTimeZoneName = (timezoneOffset) => {
  if (typeof timezoneOffset !== 'number' || Number.isNaN(timezoneOffset)) {
    return undefined
  }

  const sign = timezoneOffset >= 0 ? '-' : '+'
  const absoluteOffset = Math.abs(timezoneOffset)
  const hours = Math.floor(absoluteOffset / 3600)
  const minutes = Math.floor((absoluteOffset % 3600) / 60)
  const minuteSuffix = minutes ? `:${String(minutes).padStart(2, '0')}` : ''

  return `Etc/GMT${sign}${hours}${minuteSuffix}`
}


export const formatCityDate = (timestamp, timezoneOffset) => {
  const timeZone = getTimeZoneName(timezoneOffset)
  return new Intl.DateTimeFormat([], {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    timeZone,
  }).format(timestamp)
}

export const formatCityTime = (timestamp, timezoneOffset) => {
  const timeZone = getTimeZoneName(timezoneOffset)
  return new Intl.DateTimeFormat([], {
    hour: 'numeric',
    minute: '2-digit',
    timeZone,
  }).format(timestamp)
}

export const getConditionTone = (condition) => {
  const normalized = condition?.toLowerCase() || ''

  if (normalized.includes('rain')) return 'from-cyan-500/20 via-slate-900 to-indigo-950'
  if (normalized.includes('snow')) return 'from-sky-200/20 via-slate-800 to-slate-950'
  if (normalized.includes('thunder')) return 'from-violet-500/20 via-slate-900 to-slate-950'
  if (normalized.includes('cloud')) return 'from-slate-500/20 via-slate-900 to-slate-950'
  if (normalized.includes('fog')) return 'from-stone-400/20 via-slate-900 to-slate-950'
  if (normalized.includes('night')) return 'from-indigo-700/30 via-slate-950 to-slate-950'
  return 'from-orange-500/20 via-slate-900 to-slate-950'
}
