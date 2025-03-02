<?php 
    header("Content-Type: application/json");
    header("Access-Control-Allow-Credentials: true");

    include_once("../../database.php");

    if($_SERVER['REQUEST_METHOD'] == 'GET') {
        $exercises = GetAllExercises();

        if ($exercises) {
            $response = $exercises;

            http_response_code(200);
            echo json_encode($response);
        }
        else {
            $response = array(
                "success" => false,
                "message" => "No exercises found"
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