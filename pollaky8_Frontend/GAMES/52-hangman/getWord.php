<?php


$servername = "localhost";
$username = "root";
$password = "";
$dbname = "hangman";

$conn = new mysqli($servername, $username, $password, $dbname);

$sql = "SELECT COUNT(id) AS 'index' FROM `szavak`;";
$result = mysqli_query($conn, $sql);
$row = mysqli_fetch_assoc($result);
$total = intval($row['index']);

$randomnum = random_int(0, $total);

$sql = "SELECT word, category FROM `szavak` WHERE id = $randomnum;";
$result = mysqli_query($conn, $sql);
$row = mysqli_fetch_assoc($result);

$word = $row['word'];
$category = $row['category'];

$conn->close();

echo json_encode([
    'word' => strtolower($word),
    'category' => strtolower($category)
]);
?>
