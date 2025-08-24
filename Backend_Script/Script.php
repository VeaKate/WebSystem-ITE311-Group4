<?php
    include ("database.php");
    /*headers to allowed request*/ 
    header('Access-Control-Allow-Origin: http://127.0.0.1:5500'); //frontend link
    header('Access-Control-Allow-Methods: POST'); //method
    header('Access-Control-Allow-Headers: Content-Type');//
    header('Content-Type: application/json');

    /*Log in Logic*/ 

    if($_SERVER['REQUEST_METHOD'] == 'POST' && $_SERVER['REQUEST_URI'] == '/WebSystem-ITE311-Group4/Backend_Script/Script.php/login') {
        $input = json_decode(file_get_contents('php://input'), true);
        if (isset($input['email']) && isset($input['password'])) {
            $email = $input['email'];
            $password = $input['password'];
            $query = "SELECT * FROM management_staff WHERE email = ?";
            $stmt = $conn->prepare($query);
            $stmt->bind_param("s", $email); 
            $stmt->execute();
            $result = $stmt->get_result();
            if($result->num_rows > 0) {
                $user_data = $result->fetch_assoc();
                $hashed_password = $user_data['password'];
                $role = $user_data['role']; 
                if(password_verify($password, $hashed_password)) {
                    echo json_encode(['success' => 'Valid User', 'role' => $role]);
                } else {
                    echo json_encode(['error' => 'Credentials do not match']);
                }
            } else {
                echo json_encode(['error' => 'User  not found']);
            }
        } else {
            echo json_encode(['error' => 'Email and password are required']);
        }
    } else {
        echo json_encode(['error' => 'Restricted Access']);
    }
?>
