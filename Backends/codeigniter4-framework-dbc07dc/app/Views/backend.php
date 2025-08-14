<?php
/*develop by: user@AlcaydeJ*/
    /*headers*/ 
    include('databaseconn.php');
    header('Content-Type: application/json');
    
    /*routing*/
    $reqMethod = $_SERVER["REQUEST_METHOD"];
    $reqURI = $_SERVER["REQUEST_URI"];


    /*required request method*/
   if($_SERVER['REQUEST_METHOD' !== 'POST']) {
        http_response_code(401);
        echo json_encode(["Error:"=>"This page is restricted"]);
        exit;
    }

    /*Login*/
    if($reqMethod == "POST" && $reqURI == "/login") {
        $data = json_decode(file_get_contents("php://input"), true);
        $email = $data["email"];
        $role = $data["role"];
        $password = $data["password"];
        $hashedpassword = password_hash($password, PASSWORD_DEFAULT);
        $query = "SELECT * FROM employee WHERE email = ? AND password = ? AND role = ?";
        $stmt = mysqli_prepare($conn, $query);
        if($stmt) {
            mysqli_stmt_bind_param($stmt, "sss", $email, $role, $password);
            mysqli_stmt_execute($stmt);
            $result = mysqli_stmt_get_result($stmt);
            if(mysqli_num_rows($result) > 0) {
                $row = mysqli_fetch_assoc($result);
                http_response_code(200);
                echo json_encode(["success"=>"Log in Successfully!"]);
            } else {
                http_response_code(404);
                echo json_encode(["Error:"=>"Credentials not found!"]);
            }
        }
    }
?>