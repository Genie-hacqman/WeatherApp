const Loader = ({ theme }) => {
  const isDark = theme === 'dark'

  return (
    <div className={`space-y-4 rounded-[28px] border p-6 shadow-[0_20px_70px_rgba(0,0,0,0.25)] backdrop-blur-xl ${isDark ? 'border-white/10 bg-white/10' : 'border-slate-200/80 bg-white/85 shadow-[0_20px_70px_rgba(15,23,42,0.12)]'}`}>
      <div className={`h-5 w-40 animate-pulse rounded-full ${isDark ? 'bg-white/20' : 'bg-slate-200/80'}`} />
      <div className={`h-20 w-3/4 animate-pulse rounded-3xl ${isDark ? 'bg-white/15' : 'bg-slate-200/70'}`} />
      <div className="grid gap-3 md:grid-cols-3">
        {[0, 1, 2].map((item) => (
          <div key={item} className={`h-24 animate-pulse rounded-2xl ${isDark ? 'bg-white/10' : 'bg-slate-200/70'}`} />
        ))}
      </div>
    </div>
  )
}

export default Loader
