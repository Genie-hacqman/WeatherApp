import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

const icon = L.divIcon({
  className: 'custom-weather-marker',
  html: `<div style="width: 18px; height: 18px; border-radius: 9999px; background: linear-gradient(135deg, #fb923c, #f59e0b); border: 3px solid rgba(255,255,255,0.9); box-shadow: 0 0 0 8px rgba(251,146,60,0.2);"></div>`,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
})

const MapController = ({ center, zoom }) => {
  const map = useMap()

  useEffect(() => {
    map.flyTo(center, zoom, { duration: 1.2 })
  }, [center, map, zoom])

  return null
}

const getZoomForLocation = (lat, lon) => {
  const isCloseToEquator = Math.abs(lat) < 20
  const isVeryLargeCity = [40.7128, -74.006].some((value, index) => Math.abs([lat, lon][index] - value) < 5)

  if (isCloseToEquator || isVeryLargeCity) {
    return 10
  }

  return 11
}

const WeatherMap = ({ data, theme }) => {
  const isDark = theme === 'dark'
  const position = [data?.coordinates?.lat ?? 40.7128, data?.coordinates?.lon ?? -74.006]
  const zoom = getZoomForLocation(position[0], position[1])

  return (
    <div className={`overflow-hidden rounded-[28px] border p-3 shadow-[0_16px_48px_rgba(0,0,0,0.24)] backdrop-blur-xl ${isDark ? 'border-white/10 bg-slate-950/60' : 'border-slate-200/80 bg-white/85 shadow-[0_16px_48px_rgba(15,23,42,0.12)]'}`}>
      <div className="mb-3 flex items-center justify-between px-2">
        <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-slate-800'}`}>Live conditions map</h3>
        <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{data?.city}</p>
      </div>
      <div className="h-80 w-full overflow-hidden rounded-3xl">
        <MapContainer key={`${position[0]}-${position[1]}`} center={position} zoom={zoom} className="h-full w-full">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />
          <MapController center={position} zoom={zoom} />
          <Marker position={position} icon={icon}>
            <Popup>{data?.current?.description}</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  )
}

export default WeatherMap
