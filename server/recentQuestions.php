<?php
include 'db_connection.php';

$conn = OpenConn();


$sql = " SELECT q.questionID , q.title, q.date_updated, 
u.username, a.text
from questions q JOIN users u ON q.userID=u.userID 
LEFT JOIN answers a ON a.questionID=q.questionID 
ORDER BY date_updated DESC";

if ($stmt = $conn->execute_query($sql)) {
    $result = $stmt->fetch_all(MYSQLI_ASSOC);
    echo json_encode($result);
}


?>