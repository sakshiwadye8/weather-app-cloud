<?php
require "config.php";

if (isset($_POST['city'])) {
  $city = $_POST['city'];

  $stmt = $conn->prepare("INSERT INTO weather_search (city) VALUES (?)");
  $stmt->bind_param("s", $city);
  $stmt->execute();
  $stmt->close();
}

$conn->close();
