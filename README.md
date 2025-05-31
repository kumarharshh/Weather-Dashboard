# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
# 🌤️ Weather App

A modern weather dashboard built using **React**, **React Query**, and **Supabase** that allows users to search for cities and view current weather conditions and forecasts. It supports login-based personalization and maintains a seamless experience between logged-in and logged-out sessions.

---

## 🔧 Tech Stack

- **React + Vite**
- **React Query** – for data fetching and caching
- **Supabase** – for authentication and storing user preferences
- **OpenWeatherMap API** – for current weather and forecast data
- **CSS Modules** – for component-scoped styles

---

## 🚀 Features

- 🔍 City-based weather search with real-time data
- 📦 Caching and background refresh with React Query
- 🧠 Stores last searched city (differentiates between logged-in/logged-out)
- 📈 5-day weather forecast
- 🔐 Authentication with Supabase
- 💾 Persistent state with localStorage and Supabase profiles

---

## 🛠️ Setup Instructions (Local Development)

1. Clone the repository
2. git clone https://github.com/your-username/weather-app.git
3. cd weather-app
4. npm i
5. Set up environment variables
6. Create a .env file in the root of your project with the following keys:
VITE_OPENWEATHER_API_KEY=
VITE_OPENWEATHER_API_URL=https://api.openweathermap.org/data/2.5/weather
VITE_OPENWEATHER_FORECAST_API_URL=https://api.openweathermap.org/data/2.5/forecast
VITE_WEATHER_ICON_BASE_URL=https://openweathermap.org/img/wn/
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
7. NOTE: Replace the values of the API keys and URLs with your own credentials.
8. Run the App Locally
9. npm run dev
