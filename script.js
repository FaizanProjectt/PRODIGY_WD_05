const apiKey = "7c12542e98b1466bbe6161206240610";
const weatherDisplay = document.getElementById("weatherDisplay");
const getWeatherBtn = document.getElementById("getWeatherBtn");
const locationInput = document.getElementById("locationInput");

async function getWeather(location) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`
    );
    if (!response.ok) throw new Error("Location not found");
    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    weatherDisplay.innerHTML = `<p>${error.message}</p>`;
  }
}

function displayWeather(data) {
  const { name, region, country } = data.location;
  const { temp_c, humidity, condition } = data.current;

  weatherDisplay.innerHTML = `
        <h2>Weather in ${name}, ${region}, ${country}</h2>
        <p>Temperature: ${temp_c} °C</p>
        <p>Humidity: ${humidity}%</p>
        <p>Condition: ${condition.text}</p>
    `;
}

getWeatherBtn.addEventListener("click", () => {
  const location = locationInput.value;
  if (location) {
    getWeather(location);
  }
});
