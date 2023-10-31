<?php

include 'db_connection.php';


$conn = OpenConn();

$userID = $_POST["userID"];
$title = $_POST["title"];
$description = $_POST['description'];

$sql = "INSERT INTO questions (userID, title, description) VALUES (?, ?, ?)";

if ($stmt = $conn->prepare($sql)) {
    $stmt->bind_param('iss', $param_userID, $param_title, $param_description);

    $param_userID = $userID;
    $param_title = $title;
    $param_description = $description;

    if ($stmt->execute()) {
        http_response_code(200);
        echo "Question Posted";
    } else {
        http_response_code(400);
    }

    $stmt->close();
    exit;
}

?>