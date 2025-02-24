<?php 
    include_once("env.php");
    $conn = new mysqli($servername, $username, $password, $database, $port);

    function startSession($persistant = false) {
        session_set_cookie_params($persistant ? 604800 : 0, '/', '', false);
        session_start();
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
                "message" => "User signed in"
            );
    
            startSession($remember);

            

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
?>
