import {
  getWeather,
  forecastData,
  renderingWeather,
} from "./data/weatherData.js";
import { getCurrentLocation } from "./data/location.js";

const input = document.querySelector(".js-inputCountry");
const button = document.querySelector(".js-button");
const results = document.querySelector(".js-results");
const locationButton = document.querySelector(".js-locationButton");

const data = forecastData;
if (data) {
  const icon = data.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  const condition = data.weather[0].main;
  if (condition === "Clear") {
    document.body.style.background =
      "linear-gradient(to bottom, #4facfe, #ffffff)";
    renderingWeather(data, iconUrl, results);
  } else if (condition === "Clouds") {
    document.body.style.background = "linear-gradient(to bottom, gray, white)";
    renderingWeather(data, iconUrl, results);
  } else if (condition === "Rain") {
    document.body.style.background =
      "linear-gradient(to bottom, #4b6cb7, #182848)";
    renderingWeather(data, iconUrl, results);
  }
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
