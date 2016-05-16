<?php
// getting the data from angular.
    $postdata = file_get_contents("php://input");
    $parameters = json_decode($postdata,true);
    $pseudo = $parameters["pseudo"];

// Connexion Data.
    $servername = "db624774209.db.1and1.com";
    $database   = "db624774209";
    $username = "dbo624774209";
    $password = "loliBanane72";
    
try {
    $conn = new PDO("mysql:host=$servername;dbname=$database", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $request = $conn->prepare("SELECT * FROM users WHERE pseudo = :pseudo"); 
    $request->execute(array(
        'pseudo' => $pseudo
        ));

    // set the resulting array to associative
    $request->setFetchMode(PDO::FETCH_ASSOC);
    echo json_encode($request->fetchAll());
}
catch(PDOException $e) {
    echo "Error: " . $e->getMessage();
}
$conn = null;
?>