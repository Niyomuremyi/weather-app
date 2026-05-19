import {
  getWeather,
  forecastData,
  renderingWeather,
  weatherInfo
} from "./data/weatherData.js";
import { getCurrentLocation } from "./data/location.js";

const input = document.querySelector(".js-inputCountry");
const button = document.querySelector(".js-button");
const results = document.querySelector(".js-results");
const locationButton = document.querySelector(".js-locationButton");

const data = forecastData;
if (data && data.weather && data.weather[0]) {
  const icon = data.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
 weatherInfo(data, results);
}

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    getWeather(results, input);
  }
});

button.addEventListener("click", () => {
  const weatherData = getWeather(results, input);
});

locationButton.addEventListener("click", () => {
  getCurrentLocation(results);
});
