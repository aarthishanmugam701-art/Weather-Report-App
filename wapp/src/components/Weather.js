import React, { useState } from "react";
import axios from "axios";
import "./Weather.css"; // ✅ inga dhaan CSS connect panniruken

function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const API_KEY = "99f7e0f4d8d60097131a3ac3537b01f8";

  const getWeather = async () => {
    if (!city) {
      setError("Please enter a city");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(res.data);
      setError("");
    } catch (err) {
      setError("City not found");
      setWeather(null);
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <h1>Weather Report 🌤️</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <button onClick={getWeather}>Track Weather</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-card">
          <h2>{weather.name}</h2>
          <p>🌡 Temp: {weather.main.temp} °C</p>
          <p>☁️ Weather: {weather.weather[0].main}</p>
          <p>💧 Humidity: {weather.main.humidity}%</p>
          <p>🌬 Wind: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

export default Weather;