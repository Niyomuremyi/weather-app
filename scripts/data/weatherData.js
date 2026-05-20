export const forecastData =
  JSON.parse(localStorage.getItem("weather-data")) || null;

export function renderingWeather(weatherData, iconUrldata, resultsInfo) {
  const results = resultsInfo;
  const data = weatherData;
  const iconUrl = iconUrldata;
  const condition = data.weather[0].main;


  results.innerHTML = `
        <h1>${data.name}</h1>
        <img src="${iconUrl}">
        <h2>${data.main.temp}°C</h2>
        <p>${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
        `;
}

export function saveToStorage(data) {
  localStorage.setItem("weather-data", JSON.stringify(data));
}

export function weatherInfo(data, results) {
  const icon = data.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  const condition = data.weather[0].main;

 const backgrounds = {
    // ☀️ Clear
    Clear:        "linear-gradient(to bottom, #4facfe, #ffffff)",

    // ☁️ Clouds
    Clouds:       "linear-gradient(to bottom, #757F9A, #D7DDE8)",

    // 🌧️ Rain
    Rain:         "linear-gradient(to bottom, #4b6cb7, #182848)",
    Drizzle:      "linear-gradient(to bottom, #89a4c7, #2c3e50)",

    // ⛈️ Thunderstorm
    Thunderstorm: "linear-gradient(to bottom, #232526, #414345)",

    // ❄️ Snow
    Snow:         "linear-gradient(to bottom, #e0eafc, #cfdef3)",

    // 🌫️ Atmosphere conditions
    Mist:         "linear-gradient(to bottom, #bdc3c7, #2c3e50)",
    Smoke:        "linear-gradient(to bottom, #5c5c5c, #2c2c2c)",
    Haze:         "linear-gradient(to bottom, #d3cce3, #e9e4f0)",
    Dust:         "linear-gradient(to bottom, #c2b280, #8B7355)",
    Fog:          "linear-gradient(to bottom, #b0bec5, #546e7a)",
    Sand:         "linear-gradient(to bottom, #f4c56a, #c2874a)",
    Ash:          "linear-gradient(to bottom, #616161, #9e9e9e)",
    Squall:       "linear-gradient(to bottom, #4b79a1, #283e51)",
    Tornado:      "linear-gradient(to bottom, #1a1a2e, #16213e)",
  };

const bg = backgrounds[condition] || "linear-gradient(to bottom, #4facfe, #ffffff)";
  document.body.style.background = bg;

  renderingWeather(data, iconUrl, results);
 
}

export function getWeather(resultsInfo, inputInfo) {
  const results = resultsInfo;
  const input = inputInfo;

  results.innerHTML = `<h2>loading...</h2>`;
  const weatherData = fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=fe5086a16398a9de934cb2af53c3d416&units=metric`,
  )
    .then((response) => {
      return response.json();
    })

    .then((data) => {
      if (data.cod === "404") {
        results.innerHTML = `<h2>city not found</h2>`;
      } else {
        saveToStorage(data);
        weatherInfo(data, results);
      }
    });

  return weatherData;
}
