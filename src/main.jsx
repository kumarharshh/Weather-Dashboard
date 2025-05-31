import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { WeatherProvider } from './lib/context/WeatherProvider.jsx'
import { AuthProvider } from './lib/context/AuthProvider.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <WeatherProvider>
          <App />
        </WeatherProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)
