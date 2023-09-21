<?php

include("connect_db.php");
include("headers.php");


$sql = "SELECT * FROM books";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // create an array to hold the books
    $books = array();

    // loop through each row and add the book to the array
    while ($row = $result->fetch_assoc()) {
        $book = array(
            "_id"  => $row["id"],
            "title" => $row["title"],
            "author" => $row["author"],
            "genre" => $row["genre"],
            "price" => $row["price"],
            "image" => $row["image"]
        );
        array_push($books, $book);
    }

    // encode the array as a JSON object and return it
    header('Content-Type: application/json');
    echo json_encode($books);
} else {
    echo "[]";
}
