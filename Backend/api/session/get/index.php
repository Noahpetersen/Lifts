<?php 
    session_start();

    header("Content-Type: application/json");
    header("Access-Control-Allow-Credentials: true");

    include_once("../../database.php");

    if($_SERVER['REQUEST_METHOD'] == 'GET') {
        $userEmail = $_SESSION['user'];

        $user = GetUserByEmail($userEmail);
        $userID = $user['id'];

        $sessions = GetSessionsByUser($userID);

        if ($sessions) {
            $response = $sessions;

            http_response_code(200);
            echo json_encode($response);
        }
        else {
            $response = array(
                "success" => false,
                "message" => "No sessions found"
            );

            http_response_code(204);
            echo json_encode($response);
        }

        
    }
    else {
        http_response_code(400);
        echo json_encode("invalid request method");
    }

?>