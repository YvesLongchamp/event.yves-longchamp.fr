<?php

// getting the data from angular.
    $postdata = file_get_contents("php://input");
    $parameters = json_decode($postdata);
    $pseudo = $parameters->pseudo;
    $email = $parameters->email;

$servername = "db624774209.db.1and1.com";
$database   = "db624774209";
$username = "dbo624774209";
$password = "not my password D:";
try {
    // connection
    $conn = new PDO("mysql:host=$servername;dbname=$database", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // request
    $request = $conn->prepare('INSERT INTO users(pseudo, email) VALUES (:pseudo, :email)')
    or exit(print_r($conn->errorInfo())); 

    $request->execute(array(
        'pseudo' => $pseudo,
        'email' => $email
        ));
    echo "Changes have been done successfully.";
}
catch(PDOException $e) {
    echo "Error: " . $e->getMessage();
}
print_r($conn->errorInfo());
$conn = null;
?>