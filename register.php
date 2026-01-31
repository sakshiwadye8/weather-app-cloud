<?php
require "config.php";

$email = $_POST['email'];
$pass  = password_hash($_POST['password'], PASSWORD_DEFAULT);

$stmt = $conn->prepare("INSERT INTO users (email, password) VALUES (?, ?)");
$stmt->bind_param("ss", $email, $pass);

if ($stmt->execute()) {
  header("Location: login.html");
} else {
  echo "Email already exists";
}

$stmt->close();
$conn->close();
