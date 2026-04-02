<?php
require_once 'db.php';

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'GET':
        $search = $_GET['search'] ?? '';
        $type = $_GET['type'] ?? 'title';
        
        $query = "SELECT * FROM items WHERE $type LIKE ?";
        $stmt = $pdo->prepare($query);
        $stmt->execute(["%$search%"]);
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"));
        $stmt = $pdo->prepare("INSERT INTO items (title, author, isbn, call_number, location, item_type) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->execute([$data->title, $data->author, $data->isbn, $data->callNumber, $data->location, 'Book']);
        echo json_encode(["success" => true, "id" => $pdo->lastInsertId()]);
        break;

    case 'DELETE':
        $id = $_GET['id'];
        $stmt = $pdo->prepare("DELETE FROM items WHERE item_id = ?");
        $stmt->execute([$id]);
        echo json_encode(["success" => true]);
        break;
}
?>