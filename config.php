<?php
$conn = new mysqli(
  getenv("DB_HOST") ?: "localhost",
  getenv("DB_USER") ?: "root",
  getenv("DB_PASS") ?: "",
  getenv("DB_NAME") ?: "weather_app"
);

if ($conn->connect_error) {
  die("DB Connection failed");
}
