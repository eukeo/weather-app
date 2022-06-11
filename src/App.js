import React from "react";
import "./App.css";
import { useState } from "react";

function App() {
  const apiKey = "b43ed88f87ec4c01a52180535221006";
  const [weatherData, setWeatherData] = useState([{}]);
  const [city, setCity] = useState("");
  const [futureWeather, setFutureWeather] = useState([{}]);

  const getWeather = (event) => {
    if (event.key == "Enter") {
      fetch(
        `http://api.weatherapi.com/v1/current.json?key=b43ed88f87ec4c01a52180535221006&q=${city}`
      )
        .then((response) => response.json())
        .then((data) => {
          setWeatherData(data);
          setCity("");
        });
      fetch(
        `http://api.weatherapi.com/v1/forecast.json?key=b43ed88f87ec4c01a52180535221006&q=${city}&days=7`
      )
        .then((response) => response.json())
        .then((data) => {
          setFutureWeather(data);
        });
    }
  };

  return (
    <div>
      <div className="App">
        <div id="inner-container">
          {typeof weatherData.location === "undefined" ? (
            <div>
              <h3>Enter a Location!</h3>
            </div>
          ) : (
            <div>
              <h1>{weatherData.current.temp_f}°F</h1>
              <h2>
                {weatherData.location.name}, {weatherData.location.region}
              </h2>
              <h3>{weatherData.location.country}</h3>
              <h5>Condition: {weatherData.current.condition.text}</h5>
              <h5>Wind Speed: {weatherData.current.wind_mph} mph</h5>
              <h5>Humidity: {weatherData.current.humidity}</h5>
            </div>
          )}
          <input
            type="text"
            placeholder="Enter Location"
            onChange={(e) => setCity(e.target.value)}
            value={city}
            onKeyPress={getWeather}
          ></input>
        </div>
      </div>
      <section>
        <h1>7 Day Forecast</h1>
      </section>
    </div>
  );
}

export default App;
