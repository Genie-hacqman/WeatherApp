import { useEffect, useRef, useMemo } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Fix default icon
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

const customIcon = L.divIcon({
  className: 'custom-weather-marker',
  html: `<div style="width: 18px; height: 18px; border-radius: 9999px; background: linear-gradient(135deg, #fb923c, #f59e0b); border: 3px solid rgba(255,255,255,0.9); box-shadow: 0 0 0 8px rgba(251,146,60,0.2);"></div>`,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
})

const getZoomForLocation = (lat, lon) => {
  const isCloseToEquator = Math.abs(lat) < 20
  const isVeryLargeCity = [40.7128, -74.006].some((value, index) => Math.abs([lat, lon][index] - value) < 5)
  return isCloseToEquator || isVeryLargeCity ? 10 : 11
}

const WeatherMap = ({ data, theme }) => {
  const isDark = theme === 'dark'
  const mapRef = useRef(null)

  const position = useMemo(
    () => [data?.coordinates?.lat ?? 40.7128, data?.coordinates?.lon ?? -74.006],
    [data?.coordinates?.lat, data?.coordinates?.lon]
  )

  const zoom = useMemo(() => getZoomForLocation(position[0], position[1]), [position])

  useEffect(() => {
    if (mapRef.current && position[0] && position[1]) {
      mapRef.current.setView(position, zoom, { animate: true })
    }
  }, [position, zoom])

  if (!data || !data.coordinates) {
    return (
      <div className={`rounded-2xl border p-2 shadow-[0_16px_48px_rgba(0,0,0,0.24)] backdrop-blur-xl sm:rounded-[28px] sm:p-3 ${isDark ? 'border-white/10 bg-slate-950/60' : 'border-slate-200/80 bg-white/85 shadow-[0_16px_48px_rgba(15,23,42,0.12)]'}`}>
        <div className="mb-2 flex flex-col items-start justify-between gap-1 px-1 sm:mb-3 sm:flex-row sm:items-center sm:px-2">
          <h3 className={`text-base font-semibold sm:text-lg ${isDark ? 'text-white' : 'text-slate-800'}`}>Live conditions map</h3>
        </div>
        <div style={{ height: '224px', backgroundColor: isDark ? '#1e293b' : '#e2e8f0' }} className="w-full sm:h-80 flex items-center justify-center rounded-xl sm:rounded-2xl">
          <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>Loading map...</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`rounded-2xl border p-2 shadow-[0_16px_48px_rgba(0,0,0,0.24)] backdrop-blur-xl sm:rounded-[28px] sm:p-3 ${isDark ? 'border-white/10 bg-slate-950/60' : 'border-slate-200/80 bg-white/85 shadow-[0_16px_48px_rgba(15,23,42,0.12)]'}`}>
      <div className="mb-2 flex flex-col items-start justify-between gap-1 px-1 sm:mb-3 sm:flex-row sm:items-center sm:px-2">
        <h3 className={`text-base font-semibold sm:text-lg ${isDark ? 'text-white' : 'text-slate-800'}`}>Live conditions map</h3>
        <p className={`text-xs sm:text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{data?.city}</p>
      </div>
      <div className="map-wrapper rounded-xl sm:rounded-2xl overflow-hidden" style={{ height: '224px', width: '100%' }} data-testid="map-container">
        <MapContainer 
          ref={mapRef}
          center={position} 
          zoom={zoom}
          style={{ height: '100%', width: '100%', display: 'block' }}
          zoomControl={true}
          scrollWheelZoom={true}
          dragging={true}
          touchZoom={true}
          doubleClickZoom={true}
        >
          <TileLayer 
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
            attribution="&copy; OpenStreetMap contributors"
          />
          <Marker position={position} icon={customIcon}>
            <Popup>{data?.current?.description || 'Location'}</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  )
}

export default WeatherMap
