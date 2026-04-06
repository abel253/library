<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
require_once 'db.php';

$action = $_GET['action'] ?? '';

// ጊዜያቸው ያለፈባቸውን መጽሐፍት ዝርዝር (ከSQL View የተወሰደ)
if ($action == 'overdue_report') {
    $stmt = $pdo->query("SELECT * FROM vw_overdue_items");
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
}

// አጠቃላይ የቤተመጻሕፍቱ ስታቲስቲክስ (ለAdmin Dashboard)
if ($action == 'system_stats') {
    $stats = [];
    $stats['total_books'] = $pdo->query("SELECT SUM(quantity) FROM items")->fetchColumn();
    $stats['total_users'] = $pdo->query("SELECT COUNT(*) FROM users")->fetchColumn();
    $stats['issued_books'] = $pdo->query("SELECT COUNT(*) FROM borrow_transactions WHERE status = 'ISSUED'")->fetchColumn();
    echo json_encode($stats);
}
?>