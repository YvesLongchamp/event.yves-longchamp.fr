<?php
// getting the data from angular.
    $postdata = file_get_contents("php://input");
    $parameters = json_decode($postdata,true);
    $pseudo = $parameters["pseudo"];
    $password = $parameters["password"];
    

// connexion data
$servername = "db624774209.db.1and1.com";
$database   = "db624774209";
$username = "dbo624774209";
$passwordDB = "loliBanane72";
try {
    
    // connexion
    $conn = new PDO("mysql:host=$servername;dbname=$database", $username, $passwordDB);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // request
    $request = $conn->prepare('SELECT password FROM users WHERE pseudo = :pseudo ;')
    or exit(print_r($conn->errorInfo())); 
    $request->execute(array(
        'pseudo' => $pseudo
        ));

    // check
    $test = $request->fetchAll();
    $testHash = $test[0][password];
    if (password_verify($password, $testHash)) {
        setcookie("AYBABTU",$pseudo, time() +3600, "/");
        echo("true");
    } else {
        echo("false");
    }


}
catch(PDOException $e) {
    echo "Error: " . $e->getMessage();
}
$conn = null;
?>
