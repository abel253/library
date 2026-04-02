<?php
require_once 'db.php';

$data = json_decode(file_get_contents("php://input"));
$action = $_GET['action'] ?? '';

if ($action == 'update_fine') {
    $stmt = $pdo->prepare("UPDATE fine_config SET fine_per_day = ?, max_fine = ? WHERE item_type = 'Book'");
    $stmt->execute([$data->fineRate, $data->maxFine]);
    echo json_encode(["success" => true]);
}

if ($action == 'update_due_date') {
    $stmt = $pdo->prepare("UPDATE system_config SET config_value = ? WHERE config_key = 'default_due_days'");
    $stmt->execute([$data->days]);
    echo json_encode(["success" => true]);
}

if ($action == 'get_overdue') {
    // Uses the VIEW created in your SQL file
    $stmt = $pdo->query("SELECT * FROM vw_overdue_items");
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
}
?>