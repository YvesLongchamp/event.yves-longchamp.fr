
mysqli.php
<?php
    $host_name  = "db624774209.db.1and1.com";
    $database   = "db624774209";
    $user_name  = "dbo624774209";
    $password   = "loliBanane72";


    $connect = mysqli_connect($host_name, $user_name, $password, $database);
    
    if(mysqli_connect_errno())
    {
    echo '<p>La connexion n a pas été réalisée : '.mysqli_connect_error().'</p>';
    }
    else
    {
    echo '<p>La connexion a été réalisée.</p>';
    }
?>
