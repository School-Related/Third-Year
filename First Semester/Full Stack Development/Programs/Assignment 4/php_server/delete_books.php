<?php
include("connect_db.php");
include("headers.php");


if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: DELETE");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    http_response_code(204); 
    exit;
}


// Get the book ID from the request parameters
$id = $_REQUEST["id"];


// Delete the book from the database
$sql = "DELETE FROM books WHERE id = $id";

if ($conn->query($sql) === TRUE) {
    // Return a success message
    $response = array("message" => "Book deleted successfully");
    header('Content-Type: application/json');
    echo json_encode($response);
} else {
    // Return an error message
    $response = array("message" => "Error deleting book: " . $conn->error);
    header('Content-Type: application/json');
    echo json_encode($response);
}

$conn->close();
