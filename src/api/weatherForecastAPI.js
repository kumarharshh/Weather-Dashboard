export default async function fetchWeatherForecast(city) {
    const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;        
    }
    catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}