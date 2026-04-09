<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include 'db.php';

try {
    // ሪሰርቾቹን በአዲስነታቸው ቅደም ተከተል ማምጣት
    $stmt = $pdo->query("SELECT * FROM research ORDER BY id DESC");
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($results);
} catch (PDOException $e) {
    echo json_encode(["error" => "Database error: " . $e->getMessage()]);
}
?>