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

        if(isset($data->email, $data->password)) {

            $email = $data->email;
            $password = $data->password;
            $remember = $data->remember;

            $signIn = userSignIn($email, $password, $remember);

            if($signIn['success']) {
                http_response_code(200);
                echo json_encode($signIn['message']);
            }
            else {
                http_response_code(400);
                echo json_encode($signIn['message']);
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