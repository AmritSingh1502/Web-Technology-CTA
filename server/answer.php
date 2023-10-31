<?php
include 'db_connection.php';


$conn = OpenConn();

$userID = $_POST["userID"];
$questionID = $_POST["questionID"];
$text = $_POST['text'];

$sql = "INSERT INTO answers (userID, questionID, text) VALUES (?, ?, ?)";

if ($stmt = $conn->prepare($sql)) {
    $stmt->bind_param('iis', $param_userID, $param_questionID, $param_text);

    $param_userID = $userID;
    $param_questionID = $questionID;
    $param_text = $text;

    if ($stmt->execute()) {
        http_response_code(200);
        echo "Answer Posted";
    } else {
        http_response_code(400);
    }
}
$stmt->close();
exit;

?>