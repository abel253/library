<?php
require_once 'db.php';

$data = json_decode(file_get_contents("php://input"));
$action = $_GET['action'] ?? '';

// ISSUE ITEM
if ($action == 'issue') {
    // 1. Check if user exists and can borrow
    $stmt = $pdo->prepare("SELECT status FROM users WHERE user_id = ?");
    $stmt->execute([$data->userId]);
    $user = $stmt->fetch();

    if ($user['status'] == 'ABLE_TO_BORROW') {
        $due_date = date('Y-m-d', strtotime('+14 days'));
        
        $pdo->beginTransaction();
        // Insert Transaction
        $stmt = $pdo->prepare("INSERT INTO borrow_transactions (user_id, item_id, issue_date, due_date, status) VALUES (?, ?, CURDATE(), ?, 'ISSUED')");
        $stmt->execute([$data->userId, $data->itemId, $due_date]);
        
        // Update Item Status
        $stmt = $pdo->prepare("UPDATE items SET status = 'CHECKED_OUT' WHERE item_id = ?");
        $stmt->execute([$data->itemId]);
        
        $pdo->commit();
        echo json_encode(["success" => true, "dueDate" => $due_date]);
    } else {
        echo json_encode(["error" => "User cannot borrow"]);
    }
}

// RETURN ITEM
if ($action == 'return') {
    $pdo->beginTransaction();
    
    // Update Transaction
    $stmt = $pdo->prepare("UPDATE borrow_transactions SET return_date = CURDATE(), status = 'RETURNED' WHERE item_id = ? AND status = 'ISSUED'");
    $stmt->execute([$data->itemId]);
    
    // Set Item Available
    $stmt = $pdo->prepare("UPDATE items SET status = 'AVAILABLE' WHERE item_id = ?");
    $stmt->execute([$data->itemId]);
    
    $pdo->commit();
    echo json_encode(["success" => true]);
}
?>