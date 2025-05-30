import { useEffect, useState } from "react";
import { useCity } from "../../lib/hooks/useCity";
import fetchWeatherData from "../../api/weatherAPI";
import WeatherInfo from "./WeatherInfo";
import ErrorMessage from "./ErrorMessage";
import WeatherForecast from "./WeatherForecast";
import styles from './WeatherDetails.module.css';

export default function WeatherDetails() {
  const { city } = useCity();
  const [weatherData, setWeatherData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    let intervalId;
    const getWeatherData = async () => {
      try {
        setErrorMessage(null); 
        setWeatherData(null);
        const data = await fetchWeatherData(city);
        setWeatherData(data);
      } catch (error) {
        if (error.message === "Network response was not ok") {
          setErrorMessage("City not found. Please check the name.");
        } else {
          setErrorMessage("Something went wrong. Please try again.");
        }
        setWeatherData(null);
        return; 
      }
    };
    getWeatherData();

    intervalId = setInterval(() => {
      getWeatherData(); 
    }, 30000);

    return () => {
      clearInterval(intervalId);
    };
  }, [city]);

  return (
    <div className={styles.weatherDetails}>
      {weatherData && 
        <div>
          <h2 className={styles.heading}>Weather Details for {city}</h2>
          <WeatherInfo weatherData={weatherData} />
          <WeatherForecast />
        </div>
      }
      {errorMessage &&
        <ErrorMessage message={errorMessage} />
      }
    </div>
  );
}