<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include 'db.php';

try {
    // 1. ተማሪዎችን መቁጠር (users ቴብል)
    $userStmt = $pdo->query("SELECT COUNT(*) as total_users FROM users");
    $userRow = $userStmt->fetch(PDO::FETCH_ASSOC);

    // 2. መጽሐፍትን መቁጠር (ማሳሰቢያ፡ የመጽሐፍቱ ቴብል ስም 'books' ወይም 'items' መሆኑን አረጋግጥ)
    $bookStmt = $pdo->query("SELECT COUNT(*) as total_books FROM items"); 
    $bookRow = $bookStmt->fetch(PDO::FETCH_ASSOC);

    // ሁለቱንም ውጤቶች በ JSON መላክ
    echo json_encode([
        "studentCount" => (int)$userRow['total_users'],
        "bookCount" => (int)$bookRow['total_books']
    ]);

} catch (PDOException $e) {
    echo json_encode([
        "error" => $e->getMessage(),
        "studentCount" => 0,
        "bookCount" => 0
    ]);
}
?>