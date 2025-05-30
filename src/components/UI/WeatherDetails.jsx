import { useQuery } from '@tanstack/react-query';
import { useCity } from "../../lib/hooks/useCity";
import fetchWeatherData from "../../api/weatherAPI";
import WeatherInfo from "./WeatherInfo";
import ErrorMessage from "./ErrorMessage";
import WeatherForecast from "./WeatherForecast";
import styles from './WeatherDetails.module.css';

export default function WeatherDetails() {
  const { city } = useCity();
  
  const { data, error, isLoading } = useQuery({
    queryKey: ['weather', city],
    queryFn: () => fetchWeatherData(city),
    refetchInterval: 30000, 
    staleTime: 30000, 
    enabled: !!city, 
  });

  return (
    <div className={styles.weatherDetails}>
      {isLoading &&
        <div className={styles.loading}>Loading...</div>
      }
      {data && 
        <div>
          <h2 className={styles.heading}>Weather Details for {city}</h2>
          <WeatherInfo weatherData={data} />
          <WeatherForecast />
        </div>
      }
      {error &&
        <ErrorMessage message={error.message} />
      }
    </div>
  );
}