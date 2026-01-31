const apiKey = "4ec1b92f491bd8c00d83d39e06e9776a";

// Fetch weather and update UI
async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const resultDiv = document.getElementById("weatherResult");

  if (!city) {
    resultDiv.innerHTML = "<p>⚠️ Please enter a city name.</p>";
    return;
  }

  // Save city in DB via PHP
  await fetch("save_city.php", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: "city=" + encodeURIComponent(city)
  });

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) throw new Error("City not found");

    const data = await response.json();

    resultDiv.innerHTML = `
      <h2><i class="fas fa-map-marker-alt"></i> ${data.name}, ${data.sys.country}</h2>
      <p><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" alt="weather icon"></p>
      <p><strong>${data.main.temp} °C</strong> | ${data.weather[0].description}</p>
      <p>💨 Wind: ${data.wind.speed} m/s</p>
      <p>🌡 Feels Like: ${data.main.feels_like} °C</p>
      <p>💧 Humidity: ${data.main.humidity}%</p>
    `;

    setBackground(data.weather[0].main, data.weather[0].description);

    // Update last searches
    updateHistory();

  } catch (error) {
    resultDiv.innerHTML = `<p>❌ ${error.message}</p>`;
  }
}

// Dynamic background
function setBackground(main, description) {
  let bg = "images/default.png";

  switch (main) {
    case "Clear": bg = "images/sunny.png"; break;
    case "Clouds":
      if (description.toLowerCase().includes("few")) bg = "images/partly-cloudy.jpg";
      else bg = "images/cloudy.png";
      break;
    case "Rain":
    case "Drizzle": bg = "images/rainy.png"; break;
    case "Snow": bg = "images/snowy.png"; break;
    case "Thunderstorm": bg = "images/storm.png"; break;
    case "Mist":
    case "Fog":
    case "Haze": bg = "images/fog.png"; break;
  }

  document.body.style.backgroundImage = `url('${bg}')`;
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundPosition = "center";
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.transition = "background-image 0.5s ease-in-out";
}

// Fetch last searches from PHP
function updateHistory() {
  fetch("history.php")
    .then(response => response.json())
    .then(data => {
      const historyList = document.getElementById("historyList");
      historyList.innerHTML = "";

      data.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.city} (${new Date(item.searched_at).toLocaleString()})`;
        historyList.appendChild(li);
      });
    })
    .catch(error => console.error("Error fetching history:", error));
}

// Load history on page load
window.onload = updateHistory;
// Set a default background on page load
document.addEventListener("DOMContentLoaded", () => {
    document.body.style.backgroundImage = "url('images/default.png')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";
});
