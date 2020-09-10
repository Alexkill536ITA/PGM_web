<?php
if(isset($_POST['login-submit'])) {
    require 'dbh.inc.php';
    $username = $_POST['name'];
    $password = $_POST['Password'];
    
    if(empty($username)||empty($password)) {
        header("Location: ../Login.php?error=emptyfields");
        exit();
    } else {
        $sql = "SELECT * FROM utenti WHERE Id_discord=?";
        $stmt = mysqli_stmt_init($conn);
        if (!mysqli_stmt_prepare($stmt, $sql)) {
            header("Location: ../Login.php?error=sqlerror");
            exit();
        } else {
            mysqli_stmt_bind_param($stmt, "ss", $username, $password);
            mysqli_stmt_execute($stmt);
            $result = mysqli_stmt_get_result($stmt);
            if ($row = mysqli_fetch_assoc()) {
                $pwdCheck = password_verify($password, $row['password']);
                if ($pwdCheck == false) {
                    header("Location: ../Login.php?error=wrongpwd");
                    exit();
                } elseif ($pwdCheck == true) {
                    session_start();
                    $_SESSION['userID'] = $row['Id'];
                    $_SESSION['Id_discord'] = $row['Id_discord'];
                    
                    header("Location: ../Home.php?login=success");
                    exit();
                    
                } else {
                    header("Location: ../Login.php?error=wrongpwd");
                    exit(); 
                }
            } else {
                header("Location: ../Login.php?error=nouser");
                exit();
            }
        }
    }
} else {
    header("Location: ../login.php");
    exit();
}