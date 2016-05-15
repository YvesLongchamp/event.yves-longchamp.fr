<?php
// getting the data from angular.
    $postdata = file_get_contents("php://input");
    $parameters = json_decode($postdata,true);
    $name = $parameters["name"];
    $availability = $parameters["availability"];
    var_dump($availability);
    $begin_date = $parameters["beginning_date"];
    $ending_date = $parameters["ending_date"];
    $location = $parameters["location"];
    $description = $parameters["description"];
    $username = $parameters["username"];

// Connexion data
    $servername = "db624774209.db.1and1.com";
    $database   = "db624774209";
    $username = "dbo624774209";
    $passwordDB = "Not my password D:";
try {
    // connexion
    $conn = new PDO("mysql:host=$servername;dbname=$database", $username, $passwordDB);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    // request

    // Insert into events
    $request = $conn->prepare('UPDATE events SET location= :location, Availability = :Availability, 
        description = :description
        WHERE name = :name ;')
    or exit(print_r($conn->errorInfo())); 
    $request->execute(array(
        'name' => $name,
        'location' => $location,
        'Availability' => $availability,
        'description' => $description
    ));

    // Insert into schedules
    $request = $conn->prepare('UPDATE schedules SET beginning_date = :beginning_date, ending_date = :ending_date 
        WHERE schedule_id = (SELECT isd.schedule_id FROM events e, is_decided isd
            WHERE e.event_id = isd.event_id AND e.name = :name);')
    or exit(print_r($conn->errorInfo())); 
    $request->execute(array(
        'beginning_date' => $begin_date,
        'ending_date' => $ending_date,
        'name' => $name
    ));

}
catch(PDOException $e) {
    echo "Error: " . $e->getMessage();
}
$conn = null;
?>