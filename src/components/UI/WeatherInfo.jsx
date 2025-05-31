import styles from './WeatherInfo.module.css';
import { useTempUnit } from "../../lib/hooks/useTempUnit";

export default function WeatherInfo({ weatherData, isForecast = false }) {
  const { tempUnit } = useTempUnit();

  if (!weatherData) return null;

  const temperature = weatherData.main.temp;
  const condition = weatherData.weather[0].description;
  const iconCode = weatherData.weather[0].icon;
  const cityName = weatherData.name;
  const iconUrl = `${import.meta.env.VITE_WEATHER_ICON_BASE_URL}${iconCode}@2x.png`;

  const dateObj = new Date(weatherData.dt * 1000);
  const day = dateObj.toLocaleDateString("en-US", { weekday: 'long' });
  const date = dateObj.toLocaleDateString("en-US", { month: 'short', day: 'numeric' });

  const displayTemp = tempUnit === "Fahrenheit"
    ? `${Math.round((temperature * 9 / 5) + 32)}°F`
    : `${Math.round(temperature)}°C`;

  const feelsLike = weatherData.main.feels_like;
  const displayFeelsLike = tempUnit === "Fahrenheit"
    ? `${Math.round((feelsLike * 9 / 5) + 32)}°`
    : `${Math.round(feelsLike)}°`;

  if (isForecast) {
    return (
      <div className={styles.forecastCard}>
        <div className={styles.forecastContent}>
          <img className={styles.forecastIcon} src={iconUrl} alt={condition} />
          <div className={styles.forecastTemp}>{displayTemp}</div>
          <div className={styles.forecastDay}>{day}</div>
        </div>
      </div>
    );
  }
  
  const humidity = weatherData.main.humidity;
  const windSpeed = weatherData.wind.speed;
  const windDirection = weatherData.wind.deg;
  const pressure = weatherData.main.pressure;
  const sunrise = new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' });
  const sunset = new Date(weatherData.sys.sunset * 1000).toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' });

  const getWindDirection = (deg) => {
    const directions = ['North', 'North-East', 'East', 'South-East', 'South', 'South-West', 'West', 'North-West'];
    return directions[Math.round(deg / 45) % 8];
  };

  return (
    <div className={styles.weatherContainer}>
      <div className={styles.mainWeatherCard}>
        <div className={styles.locationHeader}>
          <div className={styles.locationInfo}>
            <div className={styles.locationIcon}>📍</div>
            <h1 className={styles.cityName}>{cityName}</h1>
          </div>
          <div className={styles.moreOptions}>⋯</div>
        </div>

        <div className={styles.dateTimeInfo}>
          <div className={styles.dateInfo}>
            <div className={styles.month}>{date}</div>
            <div className={styles.dayName}>{day}</div>
          </div>
        </div>

        <div className={styles.mainWeatherContent}>
          <div className={styles.temperatureSection}>
            <div className={styles.mainTemp}>{Math.round(temperature)}°</div>
            <div className={styles.feelsLike}>Feels like {displayFeelsLike}</div>
            <div className={styles.condition}>{condition}</div>
          </div>

          <div className={styles.weatherIconSection}>
            <img className={styles.mainWeatherIcon} src={iconUrl} alt={condition} />
          </div>

          <div className={styles.sunInfo}>
            <div className={styles.sunItem}>
              <div className={styles.sunIcon}>🌅</div>
              <div className={styles.sunLabel}>sunrise {sunrise}</div>
            </div>
            <div className={styles.sunItem}>
              <div className={styles.sunIcon}>🌇</div>
              <div className={styles.sunLabel}>sunset {sunset}</div>
            </div>
            <div className={styles.sunItem}>
              <div className={styles.sunIcon}>💧</div>
              <div className={styles.sunLabel}>{humidity}%</div>
            </div>
            <div className={styles.sunItem}>
              <div className={styles.sunIcon}>💨</div>
              <div className={styles.sunLabel}>{windSpeed} km/h</div>
            </div>
            <div className={styles.sunItem}>
              <div className={styles.sunIcon}>🧭</div>
              <div className={styles.sunLabel}>{getWindDirection(windDirection)}</div>
            </div>
            <div className={styles.sunItem}>
              <div className={styles.sunIcon}>⬆</div>
              <div className={styles.sunLabel}>{pressure}.0 mb</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}