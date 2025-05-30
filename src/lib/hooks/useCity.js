import { useContext } from 'react';
import { WeatherContext } from '../context/WeatherContext';

export const useCity = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error('useCity must be used within a WeatherProvider');
  }
  return context;
};