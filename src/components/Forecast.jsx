import { motion } from 'framer-motion'

const getWeatherIcon = (icon) => {
  if (icon?.includes('01')) return '☀️'
  if (icon?.includes('02')) return '🌤️'
  if (icon?.includes('03') || icon?.includes('04')) return '☁️'
  if (icon?.includes('09') || icon?.includes('10')) return '🌧️'
  if (icon?.includes('13')) return '❄️'
  return '🌫️'
}

const Forecast = ({ data, theme }) => {
  const isDark = theme === 'dark'

  return (
    <div className={`rounded-[28px] border p-5 shadow-[0_16px_48px_rgba(0,0,0,0.24)] backdrop-blur-xl ${isDark ? 'border-white/10 bg-slate-950/60' : 'border-slate-200/80 bg-white/85 shadow-[0_16px_48px_rgba(15,23,42,0.12)]'}`}>
      <div className="mb-4 flex items-center justify-between">
        <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-slate-800'}`}>7-day forecast</h3>
        <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Extended outlook</p>
      </div>
      <div className="space-y-3">
        {data?.daily?.map((item, index) => (
          <motion.div
            key={`${item.day}-${index}`}
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.04 }}
            className={`flex items-center justify-between rounded-[20px] border px-4 py-3 ${isDark ? 'border-white/10 bg-white/10' : 'border-slate-300/60 bg-white/80'}`}
          >
            <div className="flex items-center gap-3">
              <div className="text-2xl">{getWeatherIcon(item.icon)}</div>
              <div>
                <p className={`font-medium ${isDark ? 'text-white' : 'text-slate-800'}`}>{item.day}</p>
                <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{item.condition}</p>
              </div>
            </div>
            <div className={`flex items-center gap-4 text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              <span>{item.rain}%</span>
              <span className={`font-semibold ${isDark ? 'text-white' : 'text-slate-800'}`}>{item.high}° / {item.low}°</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Forecast
