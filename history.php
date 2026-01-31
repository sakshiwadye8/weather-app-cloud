<?php
require "config.php";

$sql = "SELECT city, searched_at FROM weather_search ORDER BY searched_at DESC LIMIT 5";
$result = $conn->query($sql);

$history = [];

if ($result && $result->num_rows > 0) {
  while ($row = $result->fetch_assoc()) {
    $history[] = $row;
  }
}

echo json_encode($history);
$conn->close();
