<?php
    header("Access-Control-Allow-Origin: *");

    // Allow specific HTTP methods
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE, PUT");
    
    // Allow specific headers
    header("Access-Control-Allow-Headers: Content-Type, Authorization");

    // Include database.php
    include_once("../database.php");
    

    if($_SERVER['REQUEST_METHOD'] == 'POST') {
        $data = json_decode(file_get_contents("php://input"));

        if(isset($data->username, $data->password, $data->email)) {

            $username = $data->username;
            $password = $data->password;
            $email = $data->email;

            $signUp = userSignUp($email, $password, $username);

            if($signUp['success']) {
                http_response_code(201);
                echo json_encode($signUp['message']);
            }
            else {
                http_response_code(400);
                echo json_encode($signUp['message']);
            }
        }
        else {
            http_response_code(400);
            echo json_encode("Invalid data");
        }
        
    }
    else {
        echo json_encode("invalid request method");
    }
?>