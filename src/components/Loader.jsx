const Loader = ({ theme }) => {
  const isDark = theme === 'dark'

  return (
    <div className={`space-y-3 rounded-3xl border p-4 shadow-[0_20px_70px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:space-y-4 sm:rounded-[28px] sm:p-6 ${isDark ? 'border-white/10 bg-white/10' : 'border-slate-200/80 bg-white/85 shadow-[0_20px_70px_rgba(15,23,42,0.12)]'}`}>
      <div className={`h-4 w-32 animate-pulse rounded-full sm:h-5 sm:w-40 ${isDark ? 'bg-white/20' : 'bg-slate-200/80'}`} />
      <div className={`h-16 w-3/4 animate-pulse rounded-2xl sm:h-20 sm:rounded-3xl ${isDark ? 'bg-white/15' : 'bg-slate-200/70'}`} />
      <div className="grid gap-2 sm:gap-3 md:grid-cols-3">
        {[0, 1, 2].map((item) => (
          <div key={item} className={`h-20 animate-pulse rounded-xl sm:h-24 sm:rounded-2xl ${isDark ? 'bg-white/10' : 'bg-slate-200/70'}`} />
        ))}
      </div>
    </div>
  )
}

export default Loader
