<?php
// getting the data from angular.
    $postdata = file_get_contents("php://input");
    $parameters = json_decode($postdata,true);
    $name = $parameters["name"];
    $availability = $parameters["availability"];
    $begin_date = $parameters["beginning_date"];
    $ending_date = $parameters["ending_date"];
    $location = $parameters["location"];
    $description = $parameters["description"];
    $pseudo = $parameters["username"];

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
    $requestD = $conn->prepare('INSERT INTO events (name, location, availability, description, user_id) 
        VALUES(:name, :location, :Availability, :description, (
        SELECT id FROM users WHERE pseudo = :pseudo));
        INSERT INTO schedules (beginning_date, ending_date) 
            VALUES(:beginning_date, :ending_date);
        INSERT INTO is_decided (event_id, schedule_id) 
        SELECT e.event_id, s.schedule_id FROM events e, schedules s
        WHERE s.beginning_date = :beginning_date AND s.ending_date = :ending_date
        AND e.name = :name;')
    or exit(print_r($conn->errorInfo())); 
    $requestD->execute(array(
        'name' => $name,
        'location' => $location,
        'Availability' => $availability,
        'description' => $description,
        'pseudo' => $pseudo,
        'beginning_date' => $begin_date,
        'ending_date' => $ending_date
    ));
}
catch(PDOException $e) {
    echo "Error: " . $e->getMessage();
}
print_r($conn->errorInfo());
$conn = null;
?>