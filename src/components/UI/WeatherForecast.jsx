import styles from './WeatherForecast.module.css';
import { useCity } from "../../lib/hooks/useCity";
import fetchWeatherForecast from "../../api/weatherForecastAPI";
import WeatherInfo from "./WeatherInfo";
import { useQuery } from '@tanstack/react-query';

export default function WeatherForecast() {
    const { city } = useCity();

    const { data, isLoading } = useQuery({
        queryKey: ['forecast', city],
        queryFn: () => fetchWeatherForecast(city),
        refetchInterval: 30000, 
        staleTime: 1800000, 
        enabled: !!city,
    });

    const dailyForecasts = data?.list.filter(item =>
        item.dt_txt.includes("12:00:00")
    );

    return (
        <>
            {isLoading && (
                <div className={styles.loading}>Loading forecast...</div>
            )}
            {data && (
                <div className={styles.weatherForecast}>
                    <div className={styles.forecastHeading}>
                        Weather Forecast for {city}
                    </div>
                    <div className={styles.forecastGrid}>
                        {dailyForecasts?.map((item, index) => (
                            <WeatherInfo
                                key={index}
                                weatherData={{
                                    dt: item.dt,
                                    main: item.main,
                                    weather: item.weather,
                                    wind: item.wind,
                                    clouds: item.clouds,
                                }}
                            />
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}
