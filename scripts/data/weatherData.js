export const forecastData =
  JSON.parse(localStorage.getItem("weather-data")) || null;

export function renderingWeather(weatherData, iconUrldata, resultsInfo) {
  const results = resultsInfo;
  const data = weatherData;
  const iconUrl = iconUrldata;
  const condition = data.weather[0].main;

   if (condition === "Clear") {
    document.body.style.background =
      "linear-gradient(to bottom, #4facfe, #ffffff)";
  } else if (condition === "Clouds") {
    document.body.style.background = "linear-gradient(to bottom, gray, white)";
  } else if (condition === "Rain") {
    document.body.style.background =
      "linear-gradient(to bottom, #4b6cb7, #182848)";
  }

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

function weatherInfo(data, results) {
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
