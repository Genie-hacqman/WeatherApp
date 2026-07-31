import { motion } from 'framer-motion'
import { Droplets, Wind, Gauge, Sunrise, Sunset } from 'lucide-react'
import { formatCityTime, formatTemp } from '../utils/formatters'

const getWeatherIcon = (icon) => {
  if (icon?.includes('01')) return '☀️'
  if (icon?.includes('02')) return '🌤️'
  if (icon?.includes('03') || icon?.includes('04')) return '☁️'
  if (icon?.includes('09') || icon?.includes('10')) return '🌧️'
  if (icon?.includes('13')) return '❄️'
  if (icon?.includes('11')) return '⛈️'
  return '🌫️'
}

const WeatherCard = ({ data, units, onToggleFavorite, isFavorite, theme }) => {
  const isDark = theme === 'dark'

  if (!data?.current) {
    return null
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      className={`overflow-hidden rounded-[30px] border p-6 shadow-[0_20px_70px_rgba(0,0,0,0.3)] backdrop-blur-xl ${isDark ? 'border-white/10 bg-linear-to-br from-orange-500/30 via-slate-900/90 to-slate-950/90' : 'border-slate-200/80 bg-linear-to-br from-amber-100/90 via-white/95 to-sky-100/90 shadow-[0_24px_80px_rgba(15,23,42,0.14)]'}`}
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-4">
          <div className={`flex items-center gap-3 text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            <span className={`rounded-full border px-3 py-1 ${isDark ? 'border-white/10 bg-white/10' : 'border-slate-300/60 bg-white/70'}`}>{data.city}, {data.country}</span>
            <button type="button" onClick={() => onToggleFavorite(data.city)} className={`rounded-full p-2 transition ${isDark ? 'bg-white/10 hover:bg-white/20' : 'bg-slate-100/80 hover:bg-slate-200/90'}`}>
              {isFavorite ? '★' : '☆'}
            </button>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-6xl sm:text-7xl">{getWeatherIcon(data.current.icon)}</div>
            <div>
              <p className={`text-5xl font-semibold sm:text-6xl ${isDark ? 'text-white' : 'text-slate-800'}`}>{formatTemp(data.current.temperature, units)}</p>
              <p className={`mt-2 text-lg capitalize ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{data.current.description}</p>
            </div>
          </div>
          <div className={`flex flex-wrap gap-3 text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            <span className={`rounded-full px-3 py-1 ${isDark ? 'bg-white/10' : 'bg-white/70'}`}>High {formatTemp(data.current.high, units)}</span>
            <span className={`rounded-full px-3 py-1 ${isDark ? 'bg-white/10' : 'bg-white/70'}`}>Low {formatTemp(data.current.low, units)}</span>
            <span className={`rounded-full px-3 py-1 ${isDark ? 'bg-white/10' : 'bg-white/70'}`}>Feels like {formatTemp(data.current.feelsLike, units)}</span>
          </div>
        </div>
        <div className={`grid gap-3 rounded-3xl border p-4 text-sm sm:grid-cols-2 lg:min-w-70 ${isDark ? 'border-white/10 bg-slate-950/40 text-slate-300' : 'border-slate-300/60 bg-white/70 text-slate-700'}`}>
          <div className="flex items-center gap-2"><Droplets size={16} className="text-orange-300" /> {data.current.humidity}% humidity</div>
          <div className="flex items-center gap-2"><Wind size={16} className="text-orange-300" /> {data.current.windSpeed} {data.speedUnit}</div>
          <div className="flex items-center gap-2"><Gauge size={16} className="text-orange-300" /> {data.current.pressure} hPa</div>
          <div className="flex items-center gap-2"><Sunrise size={16} className="text-orange-300" /> {data.sunInfo?.sunrise}</div>
          <div className="flex items-center gap-2"><Sunset size={16} className="text-orange-300" /> {data.sunInfo?.sunset}</div>
          <div className={isDark ? 'text-slate-400' : 'text-slate-500'}>Updated {formatCityTime(new Date(data.current.timestamp), data.timezoneOffset)}</div>
        </div>
      </div>
    </motion.div>
  )
}

export default WeatherCard
