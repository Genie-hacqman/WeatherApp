import { motion } from 'framer-motion'
import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis, YAxis, LineChart, Line } from 'recharts'

const Charts = ({ data, theme }) => {
  const isDark = theme === 'dark'
  const chartData = data?.hourly?.map((item) => ({
    name: item.time,
    temp: item.temp,
    humidity: item.humidity,
    wind: item.wind,
    rain: item.rain,
  })) || []
  const tickColor = isDark ? '#94a3b8' : '#64748b'
  const tooltipStyle = {
    backgroundColor: isDark ? '#020617' : '#ffffff',
    borderColor: isDark ? '#334155' : '#cbd5e1',
    color: isDark ? '#f8fafc' : '#0f172a',
  }

  return (
    <div className="grid gap-4 xl:grid-cols-2">
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className={`rounded-[28px] border p-4 shadow-[0_16px_48px_rgba(0,0,0,0.24)] backdrop-blur-xl ${isDark ? 'border-white/10 bg-slate-950/60' : 'border-slate-200/80 bg-white/85 shadow-[0_16px_48px_rgba(15,23,42,0.12)]'}`}>
        <h3 className={`mb-4 text-lg font-semibold ${isDark ? 'text-white' : 'text-slate-800'}`}>Temperature & humidity</h3>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: tickColor, fontSize: 12 }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fill: tickColor, fontSize: 12 }} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area type="monotone" dataKey="temp" stroke="#fb923c" fill="#fb923c" fillOpacity={0.25} />
              <Area type="monotone" dataKey="humidity" stroke="#38bdf8" fill="#38bdf8" fillOpacity={0.2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className={`rounded-[28px] border p-4 shadow-[0_16px_48px_rgba(0,0,0,0.24)] backdrop-blur-xl ${isDark ? 'border-white/10 bg-slate-950/60' : 'border-slate-200/80 bg-white/85 shadow-[0_16px_48px_rgba(15,23,42,0.12)]'}`}>
        <h3 className={`mb-4 text-lg font-semibold ${isDark ? 'text-white' : 'text-slate-800'}`}>Wind & rain probability</h3>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: tickColor, fontSize: 12 }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fill: tickColor, fontSize: 12 }} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line type="monotone" dataKey="wind" stroke="#f59e0b" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="rain" stroke="#818cf8" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  )
}

export default Charts
