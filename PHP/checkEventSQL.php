<?php
// getting the data from angular.
    $postdata = file_get_contents("php://input");
    $parameters = json_decode($postdata,true);
    $name = $parameters["name"];

// Connexion Data.
    $servername = "db624774209.db.1and1.com";
    $database   = "db624774209";
    $username = "dbo624774209";
    $password = "loliBanane72";

try {
    $conn = new PDO("mysql:host=$servername;dbname=$database", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $request = $conn->prepare("SELECT e.location, e.description, sc.beginning_date, sc.ending_date 
        FROM events e, schedules sc, is_decided isd 
        WHERE e.name = :name 
        AND isd.event_id = e.event_id
        AND isd.schedule_id = sc.schedule_id"); 
    $request->execute(array(
        'name' => $name
    ));
    $result = $request->fetchAll();
    $resultJson = json_encode($result);
    echo $resultJson;
}
catch(PDOException $e) {
    echo "Error: " . $e->getMessage();
}
$conn = null;
?>