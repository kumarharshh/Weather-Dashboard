export default async function fetchWeatherData(city) {
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      const error = new Error('Network response was not ok');
      error.status = response.status;
      throw error;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}