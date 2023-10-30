<?php
include 'db_connection.php';

class User
{
    public $id;
    public $username;
}

$conn = OpenConn();

$username = $_POST['username'];
$password = $_POST['password'];

// Prepare a select statement
$sql = "SELECT userID, username, password FROM users WHERE username = ?";

if ($stmt = $conn->prepare($sql)) {
    // Bind variables to the prepared statement as parameters
    $stmt->bind_param("s", $param_username);

    // Set parameters
    $param_username = $username;

    // Attempt to execute the prepared statement
    if ($stmt->execute()) {
        // Store result
        $stmt->store_result();

        // Check if username exists, if yes then verify password
        if ($stmt->num_rows == 1) {
            // Bind result variables
            $stmt->bind_result($id, $username, $hashed_password);
            if ($stmt->fetch()) {
                if (password_verify($password, $hashed_password)) {
                    // Password is correct, so start a new session
                    http_response_code(200);
                    $data = new User();

                    $data->id = $id;
                    $data->username = $username;

                    echo json_encode($data);

                } else {
                    http_response_code(401);
                    // Password is not valid, display a generic error message
                    echo "Invalid username or password.";
                }
            }
        } else {
            http_response_code(401);
            // Username doesn't exist, display a generic error message
            echo "Invalid username or password.";
        }
    } else {
        echo "Oops! Something went wrong. Please try again later.";
    }
}


CloseCon($conn);


?>