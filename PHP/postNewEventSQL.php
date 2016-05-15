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
    $request = $conn->prepare('SELECT COUNT(event_id) FROM events WHERE name = :name') // We don't want two events to have the same name
    or exit(print_r($conn->errorInfo())); 
    $request->execute(array(
        'name' => $name
    ));
    if($request->fetchAll() == '0') {
        // Insert into events
        $request = $conn->prepare('INSERT INTO events (name, location, Availability, description, user_id) 
            VALUES(:name, :location, :Availability, :description, (
            SELECT id FROM users WHERE pseudo = :username));')
        or exit(print_r($conn->errorInfo())); 
        $request->execute(array(
            'name' => $name,
            'location' => $location,
            'Availability' => $availability,
            'description' => $description,
            'username' => $username
        ));

        // Insert into schedules
        $request = $conn->prepare('INSERT INTO schedules (beginning_date, ending_date) 
            VALUES(:beginning_date, :ending_date);')
        or exit(print_r($conn->errorInfo())); 
        $request->execute(array(
            'beginning_date' => $begin_date,
            'ending_date' => $ending_date
        ));

        // Connecting the two
        $request = $conn->prepare('INSERT INTO is_decided (event_id, schedule_id) 
            SELECT e.event_id, s.schedule_id FROM events e, schedules s
            WHERE s.beginning_date = :beginning_date AND s.ending_date = :ending_date
            AND e.name = :name;')
        or exit(print_r($conn->errorInfo())); 
        $request->execute(array(
            'beginning_date' => $begin_date,
            'ending_date' => $ending_date,
            'name' => $name
        ));
        echo 'true';
    } else {
        echo 'false';
    }
}
catch(PDOException $e) {
    echo "Error: " . $e->getMessage();
}
print_r($conn->errorInfo());
$conn = null;
?>