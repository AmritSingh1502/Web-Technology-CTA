<?php

include 'db_connection.php';

$conn = OpenConn();

$username = trim($_POST["username"]);
$password = trim($_POST["password"]);


$sql = "SELECT userID FROM users WHERE username = ?";

if ($stmt = $conn->prepare($sql)) {

    $stmt->bind_param("s", $param_username);

    $param_username = trim($_POST["username"]);

    if ($stmt->execute()) {
        $stmt->store_result();

        if ($stmt->num_rows == 1) {
            http_response_code(409);
            echo "This username is already taken";
            $stmt->close();
            exit;
        } else {
            $username = trim($_POST["username"]);
        }

    } else {
        echo "Oops! Something went wrong. Please try again later.";
    }
    $stmt->close();
}

$sql = "INSERT INTO users (username, password) VALUES (?, ?)";

if ($stmt = $conn->prepare($sql)) {
    $stmt->bind_param("ss", $param_username, $param_password);

    $param_username = $username;
    $param_password = password_hash($password, PASSWORD_DEFAULT);

    if ($stmt->execute()) {
        http_response_code(200);
        echo json_encode($username = $param_username);
    } else {
        echo "Oops! Something went wrong. Please try again later.";
    }
    $stmt->close();
}



?>