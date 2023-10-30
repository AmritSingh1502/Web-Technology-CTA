<?php

function OpenConn()
{

    $servername = "localhost";
    $username = "root";
    $password = "ankit";
    $database = "sdmcetquery";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $database);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    return $conn;
}

function CloseCon($conn)
{
    $conn->close();
}

?>