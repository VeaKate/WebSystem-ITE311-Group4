<?php
    $host = "localhost";
    $user = "root";
    $password = "admin123";
    $database = "Warehouse_MG";
    $port = 3307;
    $conn;
    try{
        $conn = new mysqli($host, $user, $password, $database, $port);
        if ($conn->connect_error) {
            throw new Exception("Connection failed: " . $conn->connect_error);
        }
    } catch (Exception $e) {
        echo "Error: " . $e->getMessage();
    }
?>