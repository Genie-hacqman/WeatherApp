import { motion } from 'framer-motion'
import { getAqiLabel } from '../utils/formatters'

const AirQuality = ({ data, theme }) => {
  const isDark = theme === 'dark'
  const metrics = [
    { label: 'AQI', value: data?.airQuality?.aqi, color: 'text-orange-300' },
    { label: 'PM2.5', value: `${data?.airQuality?.pm2_5} μg/m³`, color: 'text-sky-300' },
    { label: 'PM10', value: `${data?.airQuality?.pm10} μg/m³`, color: 'text-emerald-300' },
    { label: 'CO', value: `${data?.airQuality?.co} ppb`, color: 'text-violet-300' },
    { label: 'NO₂', value: `${data?.airQuality?.no2} ppb`, color: 'text-amber-300' },
    { label: 'SO₂', value: `${data?.airQuality?.so2} ppb`, color: 'text-cyan-300' },
    { label: 'O₃', value: `${data?.airQuality?.o3} ppb`, color: 'text-lime-300' },
  ]

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className={`rounded-[28px] border p-5 shadow-[0_16px_48px_rgba(0,0,0,0.24)] backdrop-blur-xl ${isDark ? 'border-white/10 bg-slate-950/60' : 'border-slate-200/80 bg-white/85 shadow-[0_16px_48px_rgba(15,23,42,0.12)]'}`}>
      <div className="mb-4 flex items-center justify-between">
        <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-slate-800'}`}>Air quality</h3>
        <span className={`rounded-full px-3 py-1 text-sm ${isDark ? 'bg-orange-500/20 text-orange-200' : 'bg-orange-100 text-orange-700'}`}>{getAqiLabel(data?.airQuality?.aqi || 1)}</span>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {metrics.map((metric) => (
          <div key={metric.label} className={`rounded-[20px] border p-3 ${isDark ? 'border-white/10 bg-white/10' : 'border-slate-300/60 bg-white/80'}`}>
            <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{metric.label}</p>
            <p className={`mt-2 text-lg font-semibold ${metric.color}`}>{metric.value}</p>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default AirQuality
