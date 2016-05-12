<?php

// Connexion Data.
    $servername = "db624774209.db.1and1.com";
    $database   = "db624774209";
    $username = "dbo624774209";
    $password = "Not My password D:";

try {
    $conn = new PDO("mysql:host=$servername;dbname=$database", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $stmt = $conn->prepare("SELECT e.name, e.availability, s.beginning_date, e.location, e.description FROM events e, is_decided ids, schedules s
WHERE e.event_id = ids.event_id AND ids.schedule_id = s.schedule_id"); 
    $stmt->execute();

    // set the resulting array to associative
    $stmt->setFetchMode(PDO::FETCH_ASSOC);
    echo json_encode($stmt->fetchAll());
}
catch(PDOException $e) {
    echo "Error: " . $e->getMessage();
}
echo $results;
$conn = null;
?>