<?php
// getting the data from angular.
    $postdata = file_get_contents("php://input");
    $parameters = json_decode($postdata,true);
    $pseudo = $parameters["pseudo"];
// Connexion data
    $servername = "db624774209.db.1and1.com";
    $database   = "db624774209";
    $username = "dbo624774209";
    $passwordDB = "loliBanane72";
try {
    // connexion
    $conn = new PDO("mysql:host=$servername;dbname=$database", $username, $passwordDB);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    // request
    $request = $conn->prepare('SELECT e.name ,e.location, e.description, sc.beginning_date, sc.ending_date, e.availability 
        FROM events e, schedules sc, is_decided isd
        WHERE e.user_id = (SELECT id FROM users WHERE pseudo = :pseudo)
        AND isd.event_id = e.event_id
        AND isd.schedule_id = sc.schedule_id;')
    or exit(print_r($conn->errorInfo())); 
    $request->execute(array(
        'pseudo' => $pseudo
        ));
    $request->setFetchMode(PDO::FETCH_ASSOC);
    $result = $request->fetchAll();
    echo json_encode($result);
}
catch(PDOException $e) {
    echo "Error: " . $e->getMessage();
}
$conn = null;
?>