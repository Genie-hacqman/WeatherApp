const Footer = ({ theme }) => {
  const isDark = theme === 'dark'

  return (
    <footer className={`rounded-3xl border px-5 py-4 text-sm shadow-[0_16px_48px_rgba(0,0,0,0.24)] backdrop-blur-xl ${isDark ? 'border-white/10 bg-slate-950/50 text-slate-400' : 'border-slate-200/80 bg-white/85 text-slate-600 shadow-[0_16px_48px_rgba(15,23,42,0.12)]'}`}>
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <p>Crafted for a polished, premium weather experience.</p>
        <p>Live data via OpenWeatherMap • Auto-refresh every 10 minutes</p>
      </div>
    </footer>
  )
}

export default Footer
