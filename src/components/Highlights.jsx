import { motion } from 'framer-motion'
import { Droplets, Wind, Eye, Gauge, SunMedium, ThermometerSnowflake, Cloudy, Umbrella } from 'lucide-react'

const cards = [
  { key: 'humidity', label: 'Humidity', value: (data) => `${data.current.humidity}%`, icon: Droplets },
  { key: 'wind', label: 'Wind Speed', value: (data) => `${data.current.windSpeed} ${data.speedUnit}`, icon: Wind },
  { key: 'visibility', label: 'Visibility', value: (data) => `${data.current.visibility} ${data.distanceUnit}`, icon: Eye },
  { key: 'pressure', label: 'Pressure', value: (data) => `${data.current.pressure} hPa`, icon: Gauge },
  { key: 'uv', label: 'UV Index', value: (data) => `${data.current.uvIndex}`, icon: SunMedium },
  { key: 'dew', label: 'Dew Point', value: (data) => `${data.current.dewPoint}°`, icon: ThermometerSnowflake },
  { key: 'cloud', label: 'Cloud Cover', value: (data) => `${data.current.cloudCover}%`, icon: Cloudy },
  { key: 'precip', label: 'Precipitation', value: (data) => `${data.current.precipitation}%`, icon: Umbrella },
]

const Highlights = ({ data, units, theme }) => {
  const isDark = theme === 'dark'

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((item, index) => {
        const Icon = item.icon
        return (
          <motion.div
            key={item.key}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`rounded-3xl border p-4 shadow-[0_16px_48px_rgba(0,0,0,0.24)] backdrop-blur-xl ${isDark ? 'border-white/10 bg-slate-950/60' : 'border-slate-200/80 bg-white/85 shadow-[0_16px_48px_rgba(15,23,42,0.12)]'}`}
          >
            <div className="mb-5 flex items-center justify-between">
              <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{item.label}</p>
              <Icon size={18} className="text-orange-300" />
            </div>
            <p className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-slate-800'}`}>{item.value(data, units)}</p>
          </motion.div>
        )
      })}
    </div>
  )
}

export default Highlights
