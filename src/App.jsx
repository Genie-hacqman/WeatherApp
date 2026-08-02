import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { AlertCircle, LoaderCircle } from 'lucide-react'
import Navbar from './components/Navbar'
import SearchBar from './components/SearchBar'
import WeatherCard from './components/WeatherCard'
import Highlights from './components/Highlights'
import HourlyForecast from './components/HourlyForecast'
import Forecast from './components/Forecast'
import Charts from './components/Charts'
import AirQuality from './components/AirQuality'
import WeatherMap from './components/WeatherMap'
import Loader from './components/Loader'
import Footer from './components/Footer'
import { useWeatherData } from './hooks/useWeatherData'
import { getConditionTone } from './utils/formatters'

function App() {
  const {
    query,
    data,
    loading,
    locating,
    error,
    setQuery,
    searchCity,
    units,
    setUnits,
    theme,
    toggleTheme,
    favorites,
    recentSearches,
    toggleFavorite,
    useCurrentLocation,
    currentDate,
    currentTime,
  } = useWeatherData()

  const backgroundClass = useMemo(() => getConditionTone(data?.current?.condition || 'Clear'), [data?.current?.condition])
  const isDark = theme === 'dark'

  return (
    <div className={`min-h-screen w-full overflow-x-hidden bg-linear-to-br ${isDark ? backgroundClass : 'from-amber-100 via-sky-100 to-indigo-100'} px-3 py-3 ${isDark ? 'text-slate-100' : 'text-slate-800'} transition-colors duration-500 sm:px-4 md:px-6 lg:px-8`}>
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 sm:gap-4">
        <Navbar currentDate={currentDate} currentTime={currentTime} theme={theme} onToggleTheme={toggleTheme} />
        <SearchBar
          query={query}
          onQueryChange={setQuery}
          onSearch={searchCity}
          favorites={favorites}
          recentSearches={recentSearches}
          onFavorite={toggleFavorite}
          onCurrentLocation={useCurrentLocation}
          loading={loading}
          locating={locating}
          theme={theme}
        />

        {error && (
          <div className={`flex items-center gap-2 rounded-[22px] border px-4 py-3 text-sm ${isDark ? 'border-orange-400/30 bg-orange-500/10 text-orange-100' : 'border-orange-300/60 bg-orange-50 text-orange-700'}`}>
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        {loading ? (
          <Loader theme={theme} />
        ) : data ? (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-3 sm:space-y-4">
            <div className="grid gap-3 sm:gap-4 lg:grid-cols-[1.5fr_0.8fr]">
              <WeatherCard data={data} units={units} onToggleFavorite={toggleFavorite} isFavorite={favorites.includes(data.city)} theme={theme} />
              <div className="flex flex-col gap-3 sm:gap-4">
                <div className={`rounded-3xl border p-3 shadow-[0_16px_48px_rgba(0,0,0,0.24)] backdrop-blur-xl sm:rounded-[28px] sm:p-5 ${isDark ? 'border-white/10 bg-slate-950/60' : 'border-slate-300/60 bg-white/70 text-slate-800'}`}>
                  <div className="mb-3 flex flex-col items-start justify-between gap-2 sm:mb-4 sm:flex-row sm:items-center">
                    <h3 className={`text-base font-semibold sm:text-lg ${isDark ? 'text-white' : 'text-slate-800'}`}>Units</h3>
                    <div className="flex gap-1.5 sm:gap-2">
                      <button type="button" onClick={() => setUnits('metric')} className={`rounded-full px-2.5 py-1 text-xs sm:px-3 sm:py-1.5 sm:text-sm ${units === 'metric' ? 'bg-orange-500 text-white' : isDark ? 'bg-white/10 text-slate-300' : 'bg-slate-100 text-slate-700'}`}>
                        °C
                      </button>
                      <button type="button" onClick={() => setUnits('imperial')} className={`rounded-full px-2.5 py-1 text-xs sm:px-3 sm:py-1.5 sm:text-sm ${units === 'imperial' ? 'bg-orange-500 text-white' : isDark ? 'bg-white/10 text-slate-300' : 'bg-slate-100 text-slate-700'}`}>
                        °F
                      </button>
                    </div>
                  </div>
                  <p className={`text-xs sm:text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{data.summary}</p>
                </div>
                <AirQuality data={data} theme={theme} />
              </div>
            </div>

            <Highlights data={data} units={units} theme={theme} />
            <div className="grid gap-3 sm:gap-4 lg:grid-cols-[1.1fr_0.9fr]">
              <HourlyForecast data={data} theme={theme} />
              <Forecast data={data} theme={theme} />
            </div>
            <Charts data={data} theme={theme} />
            <WeatherMap data={data} theme={theme} />
            <Footer theme={theme} />
          </motion.div>
        ) : (
          <div className={`rounded-3xl border p-4 text-center sm:rounded-[28px] sm:p-8 ${isDark ? 'border-white/10 bg-slate-950/60 text-slate-300' : 'border-slate-300/60 bg-white/70 text-slate-700'}`}>
            <LoaderCircle className="mx-auto mb-2 sm:mb-3" size={32} />
            <p className={`text-base font-semibold sm:text-lg ${isDark ? 'text-white' : 'text-slate-800'}`}>No weather data available yet</p>
            <p className={`mt-1 text-xs sm:mt-2 sm:text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Try searching for a specific city or country name such as London or Ghana.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
