import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [weatherForecast, setWeatherForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const api = "382d8184cac6f79ecde3889189553025";

  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDarkMode);
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const getWeatherData = useCallback(async () => {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${api}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${api}&units=metric`;

    if (!location) return;

    setLoading(true);
    setError(null);

    try {
      const [currentWeatherResponse, forecastResponse] = await Promise.all([
        axios.get(weatherUrl),
        axios.get(forecastUrl),
      ]);

      setWeatherForecast(forecastResponse.data);
      setWeatherData(currentWeatherResponse.data);
      setLocation("");
    } catch (error) {
      setError("Failed to fetch weather data. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [location, api]);

  const handleButtonClick = () => {
    if (location) {
      getWeatherData();
    }
  };

  const getIconUrl = (iconCode) =>
    `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

  const filterForecast = (list) => {
    const dailyForecast = [];
    const seenDates = new Set();

    for (let item of list) {
      const date = new Date(item.dt_txt).toLocaleDateString();
      if (!seenDates.has(date) && new Date(item.dt_txt).getHours() === 12) {
        dailyForecast.push(item);
        seenDates.add(date);
      }
    }

    return dailyForecast;
  };

  return (
    <div className={`min-h-screen  p-4 sm:p-6 md:p-8 transition-colors duration-300`}>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className={`text-3xl sm:text-4xl md:text-5xl font-bold ${darkMode ? 'text-white' : 'text-white'} text-center`}>
            Weather App
          </h1>
          <button
            onClick={toggleDarkMode}
            className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-yellow-400 text-gray-900' : 'bg-gray-800 text-white'} font-semibold transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white`}
          >
            {darkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>

        <h2 className={`text-xl sm:text-2xl ${darkMode ? 'text-gray-300' : 'text-white'} text-center mb-8`}>
          Get weather information for your desired location!
        </h2>

        <div className="flex flex-col sm:flex-row justify-center items-center mb-8">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className={`w-full sm:w-2/3 px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700 text-white placeholder-gray-400' : 'bg-white bg-opacity-20 text-white placeholder-white'} focus:outline-none focus:ring-2 focus:ring-white mb-4 sm:mb-0 sm:mr-4`}
            placeholder="Enter location"
          />
          <button
            className={`w-full sm:w-auto px-6 py-2 ${darkMode ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-white text-blue-500 hover:bg-blue-100'} rounded-lg font-semibold transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-white`}
            onClick={handleButtonClick}
            disabled={loading}
          >
            {loading ? "Searching..." : "Search 🔎"}
          </button>
        </div>

        {error && (
          <p className="text-red-200 text-center mb-4">{error}</p>
        )}

        {weatherData && (
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white bg-opacity-20'} rounded-lg p-6 mb-8 transform hover:scale-105 transition duration-300 ease-in-out`}>
            <h2 className={`text-2xl sm:text-3xl font-semibold ${darkMode ? 'text-white' : 'text-white'} mb-4`}>
              Current Weather in {weatherData.name}
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-between">
              <div>
                <p className={`text-4xl sm:text-5xl font-bold ${darkMode ? 'text-white' : 'text-white'} mb-2`}>
                  {weatherData.main.temp.toFixed(1)}°C
                </p>
                <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-white'}`}>
                  Feels like: {weatherData.main.feels_like.toFixed(1)}°C
                </p>
              </div>
              {weatherData.weather[0] && (
                <div className="flex flex-col items-center mt-4 sm:mt-0">
                  <img
                    src={getIconUrl(weatherData.weather[0].icon)}
                    alt={weatherData.weather[0].description}
                    className="w-20 h-20"
                  />
                  <p className={`${darkMode ? 'text-gray-300' : 'text-white'} capitalize`}>
                    {weatherData.weather[0].description}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {weatherForecast && (
          <div>
            <h2 className={`text-2xl sm:text-3xl font-semibold ${darkMode ? 'text-white' : 'text-white'} text-center mb-6`}>
              5-Day Weather Forecast
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {filterForecast(weatherForecast.list).map((forecast, index) => (
                <div
                  key={index}
                  className={`${darkMode ? 'bg-gray-800' : 'bg-white bg-opacity-20'} rounded-lg p-4 ${darkMode ? 'text-white' : 'text-white'} text-center transform hover:scale-105 transition duration-300 ease-in-out`}
                >
                  <h3 className="font-semibold mb-2">
                    {new Date(forecast.dt_txt).toLocaleDateString()}
                  </h3>
                  <img
                    src={getIconUrl(forecast.weather[0].icon)}
                    alt={forecast.weather[0].description}
                    className="w-16 h-16 mx-auto mb-2"
                  />
                  <p className="text-2xl font-bold mb-1">
                    {forecast.main.temp.toFixed(1)}°C
                  </p>
                  <p className="text-sm">
                    Feels like: {forecast.main.feels_like.toFixed(1)}°C
                  </p>
                  <p className="text-sm capitalize">
                    {forecast.weather[0].description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;