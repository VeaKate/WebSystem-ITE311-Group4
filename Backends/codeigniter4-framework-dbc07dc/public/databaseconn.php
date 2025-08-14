<?php
    $host = "localhost";
    $user = "root";
    $pass = "admin123";
    $port = 3307;
    $name = "Warehouse_Management";
    $conn;

    try{
        $conn = mysqli_connect($host, $user, $pass,
    $name, $port);
        echo "Connected!";
    } catch(Exception $e) {
        echo "Error: " .$e->getMessage();
    }
?>