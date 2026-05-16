import { renderingWeather } from "./weatherData.js";
export function getCurrentLocation(results) {
  results.innerHTML = "<h2>loading...</h2>";

  navigator.geolocation.getCurrentPosition((position) => {
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
        const icon = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
        data.name = cityName;
        renderingWeather(data, iconUrl, results);
      })
      .catch((error) => {
        console.log(error);
        results.innerHTML = "<h2>failed to load location</h2>";
      });

    console.log(lat);
    console.log(lon);
  });
}
