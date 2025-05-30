import styles from './WeatherForecast.module.css';
import { useEffect, useState } from "react";
import { useCity } from "../../lib/hooks/useCity";
import fetchWeatherForecast from "../../api/weatherForecastAPI";
import WeatherInfo from "./WeatherInfo";

export default function WeatherForecast() {
    const { city } = useCity();
    const [forecastData, setForecastData] = useState(null);

    useEffect(() => {
        let intervalId;
        const getForecastData = async () => {
            try {
                setForecastData(null);
                const data = await fetchWeatherForecast(city);
                setForecastData(data);
            } catch {
                setForecastData(null);
                return; 
            }
        };
        getForecastData();

        intervalId = setInterval(getForecastData, 180000); // 3 minutes
        return () => clearInterval(intervalId);
    }, [city]);

    const dailyForecasts = forecastData?.list.filter(item =>
        item.dt_txt.includes("12:00:00")
    );

    return (
        <>
            {forecastData && (
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
