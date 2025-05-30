import styles from './WeatherInfo.module.css';
import { useTempUnit } from "../../lib/hooks/useTempUnit";

export default function WeatherInfo({ weatherData }) {
  const { tempUnit } = useTempUnit();

  if (!weatherData) return null;

  const temperature = weatherData.main.temp;
  const humidity = weatherData.main.humidity;
  const windSpeed = weatherData.wind.speed;
  const condition = weatherData.weather[0].description;
  const iconCode = weatherData.weather[0].icon;
  const date = new Date(weatherData.dt * 1000).toLocaleDateString("en-US", {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const iconUrl = `${import.meta.env.VITE_WEATHER_ICON_BASE_URL}${iconCode}@2x.png`;

  const displayTemp = tempUnit === "Fahrenheit"
    ? `${((temperature * 9 / 5) + 32).toFixed(2)}°F`
    : `${temperature}°C`;

  return (
    <div className={styles.weatherInfo}>
      <p className={styles.date}>{date}</p>
      <img className={styles.icon} src={iconUrl} alt={condition} />
      <p className={styles.condition}>{condition}</p>
      <div className={styles.details}>
        <p>Temperature: {displayTemp}</p>
        <p>Humidity: {humidity}%</p>
        <p>Wind Speed: {windSpeed} m/s</p>
      </div>
    </div>
  );
}
