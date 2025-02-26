<?php 
    header("Content-Type: application/json");
    header("Access-Control-Allow-Credentials: true");

    include_once("../../database.php");

    if($_SERVER['REQUEST_METHOD'] == 'POST') {
        $data = json_decode(file_get_contents("php://input"));
        $userID = null;

        if(isset($data->user)) {
            $user = GetUserByEmail($data->user);
            $userID = $user['id'];
        }
        else {
            echo json_encode("User not found");
        }

        if($userID) {
            CreateSession($data->title, $data->exercises, $userID);
        }

        $response = array(
            "success" => true,
            "message" => "Session created"
        );

        http_response_code(200);
        echo json_encode($response);
    }
    else {
        http_response_code(400);
        echo json_encode("invalid request method");
    }

?>