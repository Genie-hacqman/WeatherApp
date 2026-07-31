# WeatherApp

WeatherApp is a clean, responsive weather dashboard built with React and Vite.

It uses OpenWeatherMap to show live weather, forecasts, air quality, and map-based location data. The goal is to make your daily weather check feel polished, intuitive, and easy to use.

## 🌦️ What this app does

- Fetches **live weather data** for cities and coordinates
- Detects your **current location** for instant local weather
- Supports search by **city, country, or coordinates**
- Displays **hourly** and **7-day forecast** information
- Shows **air quality metrics** and pollutant levels
- Renders an **interactive map** with location pinning
- Offers **light and dark themes** with a modern glass-style UI
- Saves **favorites** and **recent searches** locally

## 🚀 Tech stack

- React
- Vite
- Tailwind CSS
- Axios
- Framer Motion
- Recharts
- Leaflet + React-Leaflet
- Lucide icons

## ⚙️ Setup

1. Install dependencies

```bash
cd my-web
npm install
```

2. Create a `.env` file in the `my-web` folder

```env
VITE_OPENWEATHER_API_KEY=your_openweather_api_key
```

3. Start the app

```bash
npm run dev -- --host 0.0.0.0 --port 5173
```

4. Open the app in your browser

```text
http://localhost:5173
```

## 💡 Notes

- `.env` is ignored by Git, so your API key stays private.
- Restart the Vite server after updating `.env` so the key is loaded.
- If the API key is invalid or still activating, the app may fall back to demo content until it connects.

## 📦 Production

Build the app for production:

```bash
npm run build
```

Preview the build locally:

```bash
npm run preview
```

## 🧩 Tips for use

- Search for cities like `London`, `Paris`, or `New York`
- Allow location permission for a faster local result
- Refresh after changing `.env` to ensure the API key is loaded

## ✨ Improvements

This project is a great base for adding:

- weather alerts
- radar or satellite layers
- richer search suggestions
- offline caching

Thanks for using WeatherApp — it’s designed to feel fast, clear, and easy to use.
