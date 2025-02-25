<?php
    header("Access-Control-Allow-Origin: http://localhost:5173"); // Change to your frontend URL
    header("Access-Control-Allow-Credentials: true"); // Required for cookies
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // Allow necessary methods
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    header("Content-Type: application/json");

    // Ensure PHP reads the correct session ID from the cookie
    if (isset($_COOKIE['PHPSESSID'])) {
        session_id($_COOKIE['PHPSESSID']);
    }

    session_start();

    // Debugging output
    error_log("PHPSESSID from Cookie: " . ($_COOKIE['PHPSESSID'] ?? "Not set"));
    error_log("Session ID in PHP: " . session_id());
    error_log("Session Data: " . print_r($_SESSION, true));

    if (!isset($_SESSION['user'])) {
        http_response_code(401);
        echo json_encode(["error" => "Unauthorized", "debug" => $_SESSION]);
        exit;
    }

    echo json_encode(["message" => "Authenticated", "user" => $_SESSION['user']]);
?>