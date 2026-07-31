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
    <div className={`flex flex-col gap-3 rounded-3xl border p-3 shadow-[0_20px_70px_rgba(0,0,0,0.25)] backdrop-blur-xl md:flex-row md:items-center md:justify-between ${isDark ? 'border-white/10 bg-slate-950/50' : 'border-slate-200/80 bg-white/85 shadow-[0_20px_70px_rgba(15,23,42,0.12)]'}`}>
      <div className={`flex flex-1 items-center gap-3 rounded-[18px] border px-4 py-3 ${isDark ? 'border-white/10 bg-white/10' : 'border-slate-200/80 bg-slate-50/90'}`}>
        <Search size={18} className={isDark ? 'text-orange-300' : 'text-orange-500'} />
        <input
          value={localQuery}
          onChange={(event) => setLocalQuery(event.target.value)}
          onKeyDown={(event) => event.key === 'Enter' && handleSearch()}
          placeholder="Search cities"
          className={`w-full bg-transparent text-sm outline-none ${isDark ? 'text-slate-100 placeholder:text-slate-400' : 'text-slate-800 placeholder:text-slate-500'}`}
        />
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={onCurrentLocation}
          className={`rounded-full border p-2 transition ${isDark ? 'border-white/10 bg-white/10 text-slate-200 hover:bg-white/20' : 'border-slate-300/60 bg-slate-100/80 text-slate-700 hover:bg-slate-200/90'}`}
          aria-label="Use current location"
        >
          <MapPin size={16} />
        </button>
        <button
          type="button"
          onClick={handleSearch}
          className="rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-400"
          disabled={loading}
        >
          {loading ? 'Loading…' : 'Search'}
        </button>
      </div>
      <div className={`flex flex-wrap gap-2 text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
        {favorites.slice(0, 3).map((city) => (
          <button
            key={city}
            type="button"
            onClick={() => {
              setLocalQuery(city)
              onQueryChange(city)
              onSearch(city)
            }}
            className={`flex items-center gap-1 rounded-full border px-3 py-1.5 transition ${isDark ? 'border-white/10 bg-white/10 hover:bg-white/20' : 'border-slate-300/60 bg-slate-100/80 hover:bg-slate-200/90'}`}
          >
            <Star size={13} className={isDark ? 'text-orange-300' : 'text-orange-500'} />
            {city}
          </button>
        ))}
      </div>
      <div className={`flex flex-wrap gap-2 text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
        {recentSearches.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => {
              setLocalQuery(item)
              onQueryChange(item)
              onSearch(item)
            }}
            className={`rounded-full px-2.5 py-1 transition ${isDark ? 'bg-slate-900/70 hover:text-slate-100' : 'bg-slate-100/80 hover:text-slate-800'}`}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  )
}

export default SearchBar
