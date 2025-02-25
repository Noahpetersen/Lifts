<?php
    session_start();
    header("Content-Type: application/json");
    header("Access-Control-Allow-Credentials: true");

    // Destroy session
    session_destroy();

    // Remove cookie
    setcookie("session_id", "", time() - 3600, "/");

    echo json_encode(["success" => true]);
?>