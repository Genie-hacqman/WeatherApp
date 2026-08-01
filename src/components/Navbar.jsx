import { MoonStar, SunMedium, Bell, UserCircle2 } from 'lucide-react'

const Navbar = ({ currentDate, currentTime, theme, onToggleTheme }) => {
  const isDark = theme === 'dark'

  return (
    <header className={`flex flex-col gap-2 rounded-3xl border p-3 shadow-[0_20px_70px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:gap-4 sm:rounded-[28px] sm:p-4 md:flex-row md:items-center md:justify-between ${isDark ? 'border-white/10 bg-slate-950/50' : 'border-slate-200/80 bg-white/85 shadow-[0_20px_70px_rgba(15,23,42,0.12)]'}`}>
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-linear-to-br from-orange-400 to-amber-300 text-sm font-semibold text-slate-950 sm:h-11 sm:w-11 sm:text-lg">W</div>
        <div>
          <p className={`text-base font-semibold sm:text-lg ${isDark ? 'text-white' : 'text-slate-800'}`}>WeatherOS</p>
          <p className={`text-xs sm:text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Premium climate intelligence</p>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        <div className={`rounded-full border px-2 py-1 text-xs sm:px-3 sm:py-2 sm:text-sm ${isDark ? 'border-white/10 bg-white/10 text-slate-300' : 'border-slate-300/60 bg-slate-100/80 text-slate-700'}`}>
          {currentDate} • {currentTime}
        </div>
        <button type="button" onClick={onToggleTheme} className={`rounded-full border p-1.5 transition sm:p-2.5 ${isDark ? 'border-white/10 bg-white/10 text-slate-200 hover:bg-white/20' : 'border-slate-300/60 bg-slate-100/80 text-slate-700 hover:bg-slate-200/90'}`}>
          {theme === 'dark' ? <SunMedium size={14} className="sm:size-4" /> : <MoonStar size={14} className="sm:size-4" />}
        </button>
        <button type="button" className={`rounded-full border p-1.5 transition sm:p-2.5 ${isDark ? 'border-white/10 bg-white/10 text-slate-200 hover:bg-white/20' : 'border-slate-300/60 bg-slate-100/80 text-slate-700 hover:bg-slate-200/90'}`}>
          <Bell size={14} className="sm:size-4" />
        </button>
        <div className={`hidden items-center gap-2 rounded-full border px-2 py-1 text-xs sm:flex sm:px-3 sm:py-2 sm:text-sm ${isDark ? 'border-white/10 bg-white/10 text-slate-200' : 'border-slate-300/60 bg-slate-100/80 text-slate-700'}`}>
          <UserCircle2 size={16} className="sm:size-4.5" />
          Gene Hacqman
        </div>
      </div>
    </header>
  )
}

export default Navbar
