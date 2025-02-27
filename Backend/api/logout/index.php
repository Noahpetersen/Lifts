<?php
    session_start();
    header("Content-Type: application/json");
    header("Access-Control-Allow-Credentials: true");

    // Clear all session variables
    $_SESSION = [];

    // Destroy the session
    session_destroy();

    // Remove session cookie properly
    if (isset($_COOKIE[session_name()])) {
        setcookie(session_name(), "", time() - 3600, "/", "", true, true); // Secure & HTTP-only
    }

    echo json_encode(["success" => true]);
?>