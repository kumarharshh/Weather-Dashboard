import {useState } from 'react';
import { WeatherContext } from './WeatherContext';

export const WeatherProvider = ({ children }) => {
  const [city, setCity] = useState(() => localStorage.getItem('city') || '');
  const [tempUnit, setTempUnit] = useState("Celsius");

  return (
    <WeatherContext.Provider value={{ city, setCity, tempUnit, setTempUnit }}>
      {children}
    </WeatherContext.Provider>
  );
};