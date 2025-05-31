import { useQuery } from '@tanstack/react-query';
import { useCity } from "../../lib/hooks/useCity";
import fetchWeatherData from "../../api/weatherAPI";
import WeatherInfo from "./WeatherInfo";
import ErrorMessage from "./ErrorMessage";
import WeatherForecast from "./WeatherForecast";
import IdleState from './IdleState';
import styles from './WeatherDetails.module.css';


export default function WeatherDetails() {
  const { city } = useCity();
  
  const { data, error, isLoading, isFetching, isFetched } = useQuery({
    queryKey: ['weather', city],
    queryFn: () => fetchWeatherData(city),
    refetchInterval: 30000, 
    retry: (failureCount, error) => {
      if (error.status === 404) return false;
      return failureCount < 2; 
    },
    staleTime: 30000, 
    enabled: !!city, 
  });

  if(error) {
    return (
      <div className={styles.error}>
        {error.status === 404 &&
         <ErrorMessage message={`${city} is not a valid City name. Please try another city.`} />
        }
      </div>
    );
  }

  if (!isFetching && !isLoading && !isFetched) {
    return (
      <div>
        <IdleState />
      </div>
    );
  }

  return (
    <div className={styles.weatherDetails}>
      {!city && <div>refetching the last city data</div>}
      {isLoading &&
        <div className={styles.loading}>Loading...</div>
      }
      {data && 
        <div>
          <h2 className={styles.heading}>Weather Details for {city}</h2>
          <WeatherInfo weatherData={data} isForecast={false} />
          <WeatherForecast />
        </div>
      }
    </div>
  );
}