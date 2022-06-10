import React from "react";
import "./App.css";
import { useState } from "react";

function App() {
  const apiKey = "b43ed88f87ec4c01a52180535221006";

  const [weatherData, setWeatherData] = useState([{}]);
  const [city, setCity] = useState("");

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
    }
  };

  return (
    <div className="App">
      <h1>Search a Location</h1>
      <input
        type="text"
        placeholder="Enter City"
        onChange={(e) => setCity(e.target.value)}
        value={city}
        onKeyPress={getWeather}
      ></input>

      {typeof weatherData.location === "undefined" ? (
        <div>
          <p>Enter a Location!</p>
        </div>
      ) : (
        <div>
          <h1>{weatherData.location.name}</h1>
          <h4>{weatherData.location.country}</h4>
          <h4>{weatherData.current.temp_f}°F</h4>
        </div>
      )}
    </div>
  );
}

export default App;
