import React, { useEffect, useState } from 'react'
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
  const [selectedDay, setSelectedDay] = useState(data?.daily?.[0] || null)

  useEffect(() => {
    if (!data?.daily?.length) {
      setSelectedDay(null)
      return
    }

    setSelectedDay((current) => {
      if (!current || !data.daily.some((item) => item.day === current.day)) {
        return data.daily[0]
      }

      return current
    })
  }, [data?.daily])

  const selectedItem = data?.daily?.find((item) => item.day === selectedDay?.day) || data?.daily?.[0] || null

  return (
    <div className={`overflow-hidden rounded-[28px] border p-3 shadow-[0_16px_48px_rgba(0,0,0,0.24)] backdrop-blur-xl sm:p-5 ${isDark ? 'border-white/10 bg-slate-950/60' : 'border-slate-200/80 bg-white/85 shadow-[0_16px_48px_rgba(15,23,42,0.12)]'}`}>
      <div className="mb-3 flex flex-col gap-1 sm:mb-4 sm:flex-row sm:items-center sm:justify-between">
        <h3 className={`text-base font-semibold sm:text-lg ${isDark ? 'text-white' : 'text-slate-800'}`}>7-day forecast</h3>
        <p className={`text-xs sm:text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Extended outlook</p>
      </div>

      {selectedItem && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-3 rounded-[20px] border p-3 ${isDark ? 'border-orange-400/20 bg-orange-500/10' : 'border-orange-200 bg-orange-50'}`}
        >
          <p className={`text-[11px] uppercase tracking-[0.2em] sm:text-xs ${isDark ? 'text-orange-300' : 'text-orange-600'}`}>Selected day</p>
          <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-slate-800'}`}>{selectedItem.day}</p>
              <p className={`text-xs ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{selectedItem.condition}</p>
            </div>
            <div className={`text-sm ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
              <p>{selectedItem.high}° / {selectedItem.low}°</p>
              <p className="text-xs">Rain chance {selectedItem.rain}%</p>
            </div>
          </div>
        </motion.div>
      )}

      <div className="space-y-2 sm:space-y-3">
        {data?.daily?.map((item, index) => (
          <motion.button
            type="button"
            key={`${item.day}-${index}`}
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.04 }}
            onClick={() => setSelectedDay(item)}
            className={`flex w-full items-center justify-between gap-3 rounded-[20px] border px-3 py-2.5 text-left transition sm:px-4 sm:py-3 ${isDark ? 'border-white/10 bg-white/10 hover:bg-white/20' : 'border-slate-300/60 bg-white/80 hover:bg-slate-50'} ${selectedItem?.day === item.day ? (isDark ? 'ring-1 ring-orange-400/50' : 'ring-1 ring-orange-300') : ''}`}
          >
            <div className="flex min-w-0 items-center gap-2 sm:gap-3">
              <div className="text-lg sm:text-2xl">{getWeatherIcon(item.icon)}</div>
              <div className="min-w-0">
                <p className={`text-sm font-medium sm:text-base ${isDark ? 'text-white' : 'text-slate-800'}`}>{item.day}</p>
                <p className={`truncate text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{item.condition}</p>
              </div>
            </div>
            <div className={`flex shrink-0 flex-col items-end text-right text-[11px] leading-tight sm:text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              <span>{item.rain}%</span>
              <span className={`mt-0.5 font-semibold ${isDark ? 'text-white' : 'text-slate-800'}`}>{item.high}° / {item.low}°</span>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  )
}

export default Forecast
