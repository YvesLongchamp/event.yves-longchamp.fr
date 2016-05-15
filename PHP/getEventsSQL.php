<?php

// Connexion Data.
    $servername = "db624774209.db.1and1.com";
    $database   = "db624774209";
    $username = "dbo624774209";
    $password = "Not my password D:";

try {
    $conn = new PDO("mysql:host=$servername;dbname=$database", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $stmt = $conn->prepare("SELECT e.name, e.location, e.description, e.availability, s.beginning_date FROM events e, schedules s, is_decided isd 
        WHERE e.event_id = isd.event_id
        AND isd.schedule_id = s.schedule_id"); 
    $stmt->execute();

    // set the resulting array to associative
    $stmt->setFetchMode(PDO::FETCH_ASSOC);
    echo json_encode($stmt->fetchAll());
}

catch(PDOException $e) {
    echo "Error: " . $e->getMessage();
}
$conn = null;
?>