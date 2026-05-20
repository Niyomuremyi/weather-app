import { weatherInfo, saveToStorage } from "./weatherData.js";

export function getCurrentLocation(results) {
  results.innerHTML = "<h2>loading...</h2>";

  if (!navigator.geolocation) {
    results.innerHTML = "<h2>Geolocation is not supported by your browser</h2>";
    return;
  }

  const geoOptions = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0,
  };

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      let cityName;

      fetch(
        `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=fe5086a16398a9de934cb2af53c3d416`,
      )
        .then((res) => {
          return res.json();
        })
        .then((locationData) => {
          cityName = locationData[0]?.name || "unknown location";

          return fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=fe5086a16398a9de934cb2af53c3d416&units=metric`,
          );
        })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          data.name = cityName;
          saveToStorage(data);
          weatherInfo(data, results);
        })
        .catch((error) => {
          console.log(error);
          results.innerHTML = "<h2>failed to load location</h2>";
        });

      console.log(lat);
      console.log(lon);
    },
    (error) => {
      const messages = {
        1: "Location access denied. Please allow location permission in your browser.",
        2: "Location unavailable. Try searching by city name instead.",
        3: "Location request time out. Please try again.",
      };

      results.innerHTML = `<h2>${
        messages[error.code] || "unable to get location"
      }</h2>`;

      console.error("Geolocation error:", error);
    },
    geoOptions,
  );
}
