import { useEffect, useState } from 'react'
import { Search, MapPin, Star } from 'lucide-react'

const SearchBar = ({ query, onQueryChange, onSearch, favorites, recentSearches, onFavorite, onCurrentLocation, loading, theme }) => {
  const [localQuery, setLocalQuery] = useState(query)
  const isDark = theme === 'dark'

  useEffect(() => {
    setLocalQuery(query)
  }, [query])

  const handleSearch = () => {
    const trimmed = localQuery.trim()
    if (!trimmed) {
      return
    }

    onQueryChange(trimmed)
    onSearch(trimmed)
  }

  return (
    <div className={`flex flex-col gap-2 rounded-2xl border p-2 shadow-[0_20px_70px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:gap-3 sm:rounded-3xl sm:p-3 md:flex-row md:items-center md:justify-between ${isDark ? 'border-white/10 bg-slate-950/50' : 'border-slate-200/80 bg-white/85 shadow-[0_20px_70px_rgba(15,23,42,0.12)]'}`}>
      <div className={`flex flex-1 items-center gap-2 rounded-lg border px-2 py-2 sm:gap-3 sm:rounded-[18px] sm:px-4 sm:py-3 ${isDark ? 'border-white/10 bg-white/10' : 'border-slate-200/80 bg-slate-50/90'}`}>
        <Search size={16} className="shrink-0 sm:size-4.5" color={isDark ? '#fb923c' : '#f97316'} />
        <input
          value={localQuery}
          onChange={(event) => setLocalQuery(event.target.value)}
          onKeyDown={(event) => event.key === 'Enter' && handleSearch()}
          placeholder="Search cities"
          className={`w-full bg-transparent text-xs outline-none sm:text-sm ${isDark ? 'text-slate-100 placeholder:text-slate-400' : 'text-slate-800 placeholder:text-slate-500'}`}
        />
      </div>
      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
        <button
          type="button"
          onClick={onCurrentLocation}
          className={`rounded-full border p-1.5 transition sm:p-2 ${isDark ? 'border-white/10 bg-white/10 text-slate-200 hover:bg-white/20' : 'border-slate-300/60 bg-slate-100/80 text-slate-700 hover:bg-slate-200/90'}`}
          aria-label="Use current location"
        >
          <MapPin size={14} className="sm:size-4" />
        </button>
        <button
          type="button"
          onClick={handleSearch}
          className="rounded-full bg-orange-500 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-orange-400 sm:px-4 sm:py-2 sm:text-sm"
          disabled={loading}
        >
          {loading ? 'Loading…' : 'Search'}
        </button>
      </div>
      <div className={`hidden flex-wrap gap-1.5 text-xs sm:flex sm:gap-2 sm:text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
        {favorites.slice(0, 3).map((city) => (
          <button
            key={city}
            type="button"
            onClick={() => {
              setLocalQuery(city)
              onQueryChange(city)
              onSearch(city)
            }}
            className={`flex items-center gap-1 rounded-full border px-2 py-1 transition sm:px-3 sm:py-1.5 ${isDark ? 'border-white/10 bg-white/10 hover:bg-white/20' : 'border-slate-300/60 bg-slate-100/80 hover:bg-slate-200/90'}`}
          >
            <Star size={12} className="sm:size-3.2" color="#fb923c" />
            {city}
          </button>
        ))}
      </div>
      <div className={`hidden flex-wrap gap-1.5 text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'} sm:flex sm:gap-2`}>
        {recentSearches.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => {
              setLocalQuery(item)
              onQueryChange(item)
              onSearch(item)
            }}
            className={`rounded-full px-2 py-1 transition sm:px-2.5 sm:py-1 ${isDark ? 'bg-slate-900/70 hover:text-slate-100' : 'bg-slate-100/80 hover:text-slate-800'}`}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  )
}

export default SearchBar
