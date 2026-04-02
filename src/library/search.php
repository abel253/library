<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

require_once 'db.php';

// Get search parameters from the URL
$searchTerm = isset($_GET['search']) ? $_GET['search'] : '';
$searchType = isset($_GET['type']) ? $_GET['type'] : 'title';

// Validate search type to prevent SQL injection
$allowedTypes = ['title', 'author', 'isbn'];
if (!in_array($searchType, $allowedTypes)) {
    $searchType = 'title';
}

try {
    // SQL Query using placeholders for security
   $query = "SELECT * FROM items WHERE $searchType LIKE :term LIMIT 100";
    $stmt = $pdo->prepare($query);
    $stmt->execute(['term' => "%$searchTerm%"]);
    
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Return the data as JSON
    echo json_encode($results);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Database error: " . $e->getMessage()]);
}
?>