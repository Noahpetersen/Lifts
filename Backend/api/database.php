<?php 
    include_once("env.php");
    $conn = new mysqli($servername, $username, $password, $database, $port);

    function startSession(string $email, $persistant = false) {
        session_set_cookie_params([
            "lifetime" => $persistant ? 60 * 60 * 24 * 30 : 0, // 30 days if persistent
            "path" => "/",
            "domain" => "",  // Leave empty for automatic domain setting
            "secure" => true,  // Set to true in production with HTTPS
            "httponly" => true,  // Prevent JavaScript access // Allow cross-origin requests
            "samesite" => "none"  // Prevent CSRF
        ]);
    
        session_start();
        $_SESSION['user'] = $email;
    }

    function GetUserByEmail($email) {
        global $conn;

        $stmt = mysqli_prepare($conn, "SELECT * FROM users WHERE email = ?");
        mysqli_stmt_bind_param($stmt, "s", $email);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);

        if(mysqli_num_rows($result) > 0) {
            return mysqli_fetch_assoc($result);
        }
        else {
            return null;
        }
    }

    function userSignUp($email, $password, $username) {
        global $conn;

        $stmt = mysqli_prepare($conn, "SELECT * FROM users WHERE email = ? OR username = ?");
        mysqli_stmt_bind_param($stmt, "ss", $email, $username);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);

        if(mysqli_num_rows($result) > 0) {
            $response = array(
                "success" => false,
                "message" => "User already exists"
            );

            return $response;
            exit();
        }

        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        $stmt = mysqli_prepare($conn, "INSERT INTO users (email, password, username) VALUES (?, ?, ?)");
        mysqli_stmt_bind_param($stmt, "sss", $email, $hashedPassword, $username);
        mysqli_stmt_execute($stmt);

        $response = array(
            "success" => true,
            "message" => "User created"
        );

        return $response;
    }

    function userSignIn($email, $password, $remember) {
        global $conn;

        $stmt = mysqli_prepare($conn, "SELECT * FROM users WHERE email = ?");
        mysqli_stmt_bind_param($stmt, "s", $email);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);

        if(mysqli_num_rows($result) == 0) {
            $response = array(
                "success" => false,
                "message" => "User does not exist"
            );

            return $response;
            exit();
        }

        $row = mysqli_fetch_assoc($result);

        if(password_verify($password, $row['password'])) {
            $response = array(
                "success" => true,
                "message" => $row['email']
            );
    
            startSession($email, $remember);

            return $response;
        }
        else {
            $response = array(
                "success" => false,
                "message" => "Invalid password"
            );

            return $response;
        }
    }

    function CreateSession($title, $exercises, $userID) {
        global $conn;

        $stmt = mysqli_prepare($conn, "INSERT INTO sessions (user_id, name) VALUES (?, ?)");
        mysqli_stmt_bind_param($stmt, "is", $userID, $title);
        mysqli_stmt_execute($stmt);
        $sessionID = mysqli_insert_id($conn);
        
        PopulateExercises($exercises, $sessionID);

    }

    function PopulateExercises($exercises, $sessionID) {
        global $conn;

        foreach($exercises as $index => $exercise) {
            $exerciseID = null;

            $stmt = mysqli_prepare($conn, "SELECT * FROM exercises WHERE name = ?");
            mysqli_stmt_bind_param($stmt, "s", $exercise->name);
            mysqli_stmt_execute($stmt);
            $result = mysqli_stmt_get_result($stmt);

            if(mysqli_num_rows($result) == 0) {
                $stmt = mysqli_prepare($conn, "INSERT INTO exercises (name) VALUES (?)");
                mysqli_stmt_bind_param($stmt, "s", $exercise->name);
                mysqli_stmt_execute($stmt);

                $exerciseID = mysqli_insert_id($conn);
            }
            else {
                $exerciseID = mysqli_fetch_assoc($result)['id'];
            }

            $stmt = mysqli_prepare($conn, "INSERT INTO session_exercises (session_id, exercise_id, sets_count, order_index) VALUES (?, ?, ?, ?)");
            mysqli_stmt_bind_param($stmt, "iiii", $sessionID, $exerciseID, $exercise->sets, $index);
            mysqli_stmt_execute($stmt);
        }
    }

    function GetSessionsByUser($userID) {
        global $conn;
    
        $stmt = mysqli_prepare($conn, "SELECT 
                sessions.id AS session_id, sessions.name AS session_name, sessions.created_at,
                session_exercises.id AS session_exercise_id, session_exercises.order_index,
                exercises.id AS exercise_id, exercises.name AS exercise_name
            FROM sessions
            LEFT JOIN session_exercises ON sessions.id = session_exercises.session_id
            LEFT JOIN exercises ON session_exercises.exercise_id = exercises.id
            WHERE sessions.user_id = ?
            ORDER BY sessions.created_at DESC, session_exercises.order_index ASC"
        );
    
        mysqli_stmt_bind_param($stmt, "i", $userID);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);
    
        $sessions = array();
    
        while ($row = mysqli_fetch_assoc($result)) {
            $sessionID = $row['session_id'];
    
            // If this session is not in the array, add it
            if (!isset($sessions[$sessionID])) {
                $sessions[$sessionID] = [
                    'id' => $sessionID,
                    'name' => $row['session_name'],
                    'created_at' => $row['created_at'],
                    'exercises' => [] // Empty array to hold exercises
                ];
            }
    
            // If the session has an exercise, add it to the exercises array
            if ($row['exercise_id']) {
                $sessions[$sessionID]['exercises'][] = [
                    'id' => $row['exercise_id'],
                    'name' => $row['exercise_name'],
                    'order_index' => $row['order_index']
                ];
            }
        }
    
        return array_values($sessions); // Reset array keys for clean JSON output
    }
    
    function GetAllExercises() {
        global $conn;

        $stmt = mysqli_prepare($conn, "SELECT * FROM exercises");
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);

        $exercises = array();

        while ($row = mysqli_fetch_assoc($result)) {
            $exercises[] = $row;
        }

        return $exercises;
    }
?>
