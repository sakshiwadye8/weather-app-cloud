<?php
session_start();
if (!isset($_SESSION['user_id'])) {
  header("Location: login.html");
  exit();
}
?>


<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Weather App</title>
  <link rel="stylesheet" href="style.css" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
</head>
<body>
  <a href="logout.php" style="color:white; position:absolute; top:15px; right:15px;">Logout</a>

  <div class="container">
    <h1>WEATHER APP</h1>

    <div class="search">
      <input type="text" id="cityInput" placeholder="Enter city name">
      <button onclick="getWeather()"><i class="fas fa-search"></i></button>
    </div>

    <div class="weather-card" id="weatherResult">
      <p>Search a city to see weather 🌦</p>
    </div>

    <div class="history">
      <h3>Last Searches:</h3>
      <ul id="historyList"></ul>
    </div>
  </div>

  <script src="script.js"></script>
</body>
</html>
