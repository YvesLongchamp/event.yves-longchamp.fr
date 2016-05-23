<?php

    $name = $_GET['name'];
// Connexion Data.
    $servername = "db624774209.db.1and1.com";
    $database   = "db624774209";
    $username = "dbo624774209";
    $passwordDB = "Not my password D:";

try {
    $conn = new PDO("mysql:host=$servername;dbname=$database", $username, $passwordDB);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $stmt = $conn->prepare("SELECT u.pseudo FROM users u, events e, engage eng 
        WHERE u.id = eng.id AND e.event_id = eng.event_id AND e.name = :name"); 
    $stmt->execute(array(
        'name' => $name
        ));

    // set the resulting array to associative
    $stmt->setFetchMode(PDO::FETCH_ASSOC);
    echo json_encode($stmt->fetchAll());
}

catch(PDOException $e) {
    echo "Error: " . $e->getMessage();
}
$conn = null;
?>