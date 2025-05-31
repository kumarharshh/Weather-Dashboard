import { useState } from 'react';
import { WeatherContext } from './WeatherContext';

export const WeatherProvider = ({ children }) => {
  const [city, setCityState] = useState(() => localStorage.getItem('loggedOutCity') || '');
  const [tempUnit, setTempUnit] = useState("Celsius");

  const setCity = (newCity) => {
    setCityState(newCity);
    localStorage.setItem('loggedOutCity', newCity); // persist only for logged-out users
  };

  return (
    <WeatherContext.Provider value={{ city, setCity, tempUnit, setTempUnit }}>
      {children}
    </WeatherContext.Provider>
  );
};
