<?php
include('connect_db.php');
include('headers.php');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: PUT");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    http_response_code(204);
    exit;
}

// Get the book data from the put request params
print_r($_REQUEST);
print_r($_POST);
$data = array(
    "id" => $_REQUEST["id"],
    "title" => $_REQUEST["title"],
    "author" => $_REQUEST["author"],
    "genre" => $_REQUEST["genre"],
    "price" => $_REQUEST["price"],
);

// Update the book in the database
$sql = "UPDATE books SET
  title = '{$data['title']}',
  author = '{$data['author']}',
  genre = '{$data['genre']}',
  price = {$data['price']}
  WHERE id = {$data['id']}";

if ($conn->query($sql) === TRUE) {
    // Return a success message
    $response = array("message" => "Book updated successfully");
    header('Content-Type: application/json');
    echo json_encode($response);
} else {
    // Return an error message
    $response = array("message" => "Error updating book: " . $conn->error);
    header('Content-Type: application/json');
    echo json_encode($response);
}

$conn->close();
