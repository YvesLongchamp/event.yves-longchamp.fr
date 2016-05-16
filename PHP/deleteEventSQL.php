<?php
// getting the data from angular.
    $postdata = file_get_contents("php://input");
    var_dump($postdata);
    $parameters = json_decode($postdata,true);
    $name = $parameters["name"];
    $description = $parameters["description"];
    $location = $parameters["location"];

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
    $request = $conn->prepare('DELETE FROM events 
        WHERE name = :name AND description = :description AND location = :location;')
    or exit(print_r($conn->errorInfo())); 
    $request->execute(array(
        'name' => $name,
        'description' => $description,
        'location' => $location,
        ));
}
catch(PDOException $e) {
    echo "Error: " . $e->getMessage();
}
$conn = null;
?>