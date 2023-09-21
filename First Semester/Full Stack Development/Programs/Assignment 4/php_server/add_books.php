<?php
include("connect_db.php");
include("headers.php");

print_r($_REQUEST);


// Get the book data from the post request
$title = $_REQUEST["title"];
$author = $_REQUEST["author"];
$genre = $_REQUEST["genre"];
$price = $_REQUEST["price"];

$endpoint = "https://api.unsplash.com/photos/random";
$headers = array(
    "Authorization: Client-ID UBAXKPq5WgOxU9z7XjLZrt8B0hayG2dv8gh_vyGQg-0"
);

// Make a GET request to the Unsplash API
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $endpoint);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
curl_close($ch);

// Parse the JSON response and get the image URL
$data = json_decode($response, true);
$image_url = $data["urls"]["regular"];


// Insert the book into the database
$sql = "INSERT INTO books (`title`, `author`, `genre`, `price`, `image`) VALUES (
    '$title', '$author', '$genre', $price, '$image_url')";

if ($conn->query($sql) === TRUE) {
    // Return a success message
    $response = array("message" => "Book added successfully");
    header('Content-Type: application/json');
    echo json_encode($response);
} else {
    // Return an error message
    $response = array("message" => "Error adding book: " . $conn->error);
    header('Content-Type: application/json');
    echo json_encode($response);
}

$conn->close();
