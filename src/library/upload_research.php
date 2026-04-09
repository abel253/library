<?php
// CORS እንዲፈቅድ (ከ React ጋር ለመገናኘት)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");

include 'db.php'; // ያንተን $pdo ኮኔክሽን ይይዛል

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // ቼክ፡ ፋይል እና ርዕስ መኖሩን
    if (isset($_FILES['research_file']) && isset($_POST['title'])) {
        $title = $_POST['title'];
        $file = $_FILES['research_file'];

        // ፋይሉ የሚቀመጥበት ፎልደር
        $target_dir = "uploads/";
        
        // ፎልደሩ ከሌለ እንዲፈጠር
        if (!file_exists($target_dir)) {
            mkdir($target_dir, 0777, true);
        }

        // የፋይሉን ስም ልዩ ለማድረግ (በሰዓት እንቀይረዋለን)
        $file_name = time() . "_" . basename($file["name"]);
        $target_file = $target_dir . $file_name;

        // ፋይሉን ወደ ፎልደሩ ማዛወር
        if (move_uploaded_file($file["tmp_name"], $target_file)) {
            try {
                // መረጃውን ዳታቤዝ ውስጥ ማስገባት
                $stmt = $pdo->prepare("INSERT INTO research (title, file_path) VALUES (?, ?)");
                $stmt->execute([$title, $target_file]);

                echo json_encode(["status" => "success", "message" => "File uploaded successfully"]);
            } catch (PDOException $e) {
                echo json_encode(["status" => "error", "message" => "Database error: " . $e->getMessage()]);
            }
        } else {
            echo json_encode(["status" => "error", "message" => "Failed to move uploaded file."]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Missing file or title."]);
    }
}
?>