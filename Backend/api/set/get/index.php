<?php 

    include_once '../../database.php';

    if($_SERVER['REQUEST_METHOD'] == 'GET') {
        $sessionExerciseID = $_GET['sessionExerciseID'];
        $setNumber = $_GET['exerciseSet'];

        if($sessionExerciseID == null || $setNumber == null) {
            $response = array(
                "success" => false,
                "message" => "Missing required fields"
            );

            http_response_code(400);
            echo json_encode($response);
            exit;
        }

        $setHistory = GetSetHistory($sessionExerciseID, $setNumber);


        $response = array(
            "success" => true,
            "message" => "Set history retrieved",
            "setHistory" => $setHistory
        );

        http_response_code(200);
        echo json_encode($setHistory);
    }
?>