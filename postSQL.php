<?php
// getting the data from angular.
    $postdata = file_get_contents("php://input");
    $parameters = json_decode($postdata,true);
    $pseudo = $parameters->pseudo;
    $email = $parameters->email;
    $password = $parameters->password;
    $passhash = password_hash($password, PASSWORD_BCRYPT);


$servername = "db624774209.db.1and1.com";
$database   = "db624774209";
$username = "dbo624774209";
$passwordDB = "Not my password D:";
try {
    // connection
    $conn = new PDO("mysql:host=$servername;dbname=$database", $username, $passwordDB);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    // request
    $request = $conn->prepare('INSERT INTO users(pseudo,email,password) VALUES (:pseudo, :email, :password)')
    or exit(print_r($conn->errorInfo())); 
    $request->execute(array(
        'pseudo' => $pseudo,
        'email' => $email,
        'password' => $passhash
        ));
}
catch(PDOException $e) {
    echo "Error: " . $e->getMessage();
}
print_r($conn->errorInfo());
$conn = null;
?>
