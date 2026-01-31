<?php
session_start();
require "config.php";

$email = $_POST['email'];
$pass  = $_POST['password'];

$stmt = $conn->prepare("SELECT id, password FROM users WHERE email=?");
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->bind_result($id, $hash);
$stmt->fetch();

if ($id && password_verify($pass, $hash)) {
  $_SESSION['user_id'] = $id;
  $_SESSION['email'] = $email;
  header("Location: index.php");
} else {
  echo "Invalid login details";
}

$stmt->close();
$conn->close();
