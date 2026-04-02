<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

require_once 'db.php';

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

$data = json_decode(file_get_contents("php://input"));
$action = $_GET['action'] ?? '';

if ($action == 'signup') {
    if (empty($data->user_id) || empty($data->password) || empty($data->email)) {
        echo json_encode(["error" => "Missing required fields"]);
        exit;
    }

    $password = password_hash($data->password, PASSWORD_BCRYPT);
    
    try {
        $stmt = $pdo->prepare("INSERT INTO users (user_id, password_hash, name, email, user_type, department) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->execute([
            $data->user_id, 
            $password, 
            $data->name, 
            $data->email, 
            $data->userType, 
            $data->department
        ]);
        echo json_encode(["success" => true, "message" => "User registered successfully"]);
    } catch (PDOException $e) {
        http_response_code(400);
        if ($e->getCode() == 23000) { // Duplicate entry error code
            echo json_encode(["error" => "Username or Email already exists"]);
        } else {
            echo json_encode(["error" => "Database error: " . $e->getMessage()]);
        }
    }
} 

if ($action == 'login') {
    if (empty($data->username) || empty($data->password)) {
        echo json_encode(["error" => "Missing credentials"]);
        exit;
    }

    $stmt = $pdo->prepare("SELECT * FROM users WHERE user_id = ? OR email = ?");
    $stmt->execute([$data->username, $data->username]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($data->password, $user['password_hash'])) {
        unset($user['password_hash']); // Don't send the hash to the frontend
        echo json_encode(["success" => true, "user" => $user]);
    } else {
        http_response_code(401);
        echo json_encode(["error" => "Invalid username or password"]);
    }
}
?>