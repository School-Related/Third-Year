<?php
$servername = "localhost";
$username = "krishnaraj";
$password = "mariamaria";
$dbname = "books";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
