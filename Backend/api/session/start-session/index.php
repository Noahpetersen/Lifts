<?php
    include_once("../../database.php");

    header('Content-Type: application/json');

    session_start();

    if ($_SERVER["REQUEST_METHOD"] === "GET") {
        // Get session ID from URL
        $sessionId = $_GET['sessionId'] ?? null;
        $user = $_SESSION['user'];

        $userID = GetUserByEmail($user);

        if (!$sessionId) {
            echo json_encode(["error" => "Session ID is required"]);
            exit;
        }

        $sessions = GetAllExercisesFromSession($sessionId);

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
?>