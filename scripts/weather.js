import {
  getWeather,
  forecastData,
  weatherInfo
} from "./data/weatherData.js";
import { getCurrentLocation } from "./data/location.js";

const input = document.querySelector(".js-inputCountry");
const button = document.querySelector(".js-button");
const results = document.querySelector(".js-results");
const locationButton = document.querySelector(".js-locationButton");



const data = forecastData;
if (data && data.weather && data.weather[0]) {
 weatherInfo(data, results);
}

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    getWeather(results, input);
  }
});

button.addEventListener("click", () => {
   getWeather(results, input);
});

locationButton.addEventListener("click", () => {
  getCurrentLocation(results);
});
