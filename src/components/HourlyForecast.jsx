import { motion } from 'framer-motion'

const getWeatherIcon = (icon) => {
  if (icon?.includes('01')) return '☀️'
  if (icon?.includes('02')) return '🌤️'
  if (icon?.includes('03') || icon?.includes('04')) return '☁️'
  if (icon?.includes('09') || icon?.includes('10')) return '🌧️'
  if (icon?.includes('13')) return '❄️'
  return '🌫️'
}

const HourlyForecast = ({ data, theme }) => {
  const isDark = theme === 'dark'

  return (
    <div className={`rounded-[28px] border p-5 shadow-[0_16px_48px_rgba(0,0,0,0.24)] backdrop-blur-xl ${isDark ? 'border-white/10 bg-slate-950/60' : 'border-slate-200/80 bg-white/85 shadow-[0_16px_48px_rgba(15,23,42,0.12)]'}`}>
      <div className="mb-4 flex items-center justify-between">
        <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-slate-800'}`}>24-hour outlook</h3>
        <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Hourly rhythm</p>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {data?.hourly?.map((item, index) => (
          <motion.div
            key={`${item.time}-${index}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.04 }}
            className={`min-w-27.5 rounded-[22px] border p-3 text-center ${isDark ? 'border-white/10 bg-white/10' : 'border-slate-300/60 bg-white/80'}`}
          >
            <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{item.time}</p>
            <div className="my-2 text-2xl">{getWeatherIcon(item.icon)}</div>
            <p className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-slate-800'}`}>{item.temp}°</p>
            <p className={`mt-2 text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{item.rain}% rain</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default HourlyForecast
