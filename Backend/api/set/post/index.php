<?php 
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE, PUT");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    include_once('../../database.php');

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        $data = json_decode(file_get_contents("php://input"));

        $sets = [];

        try {
            foreach ($data as $set) {
                // Make sure sessionExerciseID and other values exist in the set
                if (isset($set->weight, $set->reps, $set->sessionExerciseID, $set->exerciseSet)) {
                    $setData = array(
                        'weight' => $set->weight,
                        'reps' => $set->reps,
                        'session_exercise_id' => $set->sessionExerciseID, // Fixed this line
                        'set_number' => $set->exerciseSet
                    );
            
                    $setPost = registerSet($setData); // Assuming this is a function that processes the data
                    $sets[] = $setPost['message'];
                } else {
                    throw new Exception("Missing required fields");
                }
            }
        } catch (Exception $e) {
            $result = array(
                'success' => false,
                'message' => $e->getMessage() // More specific error message
            );

            http_response_code(400);
            echo json_encode($result);
            exit; // Ensure that the rest of the code doesn't run after an error
        }

        // Successfully registered sets
        $result = array(
            'success' => true,
            'message' => 'Sets registered',
            'sets' => $sets // Include the sets array in the response
        );

        http_response_code(201);
        echo json_encode($result);
    } else {
        // Handle invalid request method
        $result = array(
            'success' => false,
            'message' => 'Invalid request method'
        );
        echo json_encode($result);
    }
?>