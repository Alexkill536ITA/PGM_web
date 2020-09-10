<?php
if(isset($_POST['register-submit'])) {
    require 'dbh.inc.php';
    $username = $_POST['name'];
    $password = $_POST['Password'];
    $passwordRepeat = $_POST['rep_Password'];
    
    if(empty($username)||empty($password)||empty($passwordRepeat)) {
        header("Location: ../Register.php?error=emptyfields&uid=".$username);
        exit();
    } elseif ($password !== $passwordRepeat) {
        header("Location: ../Register.php?error=password_does_not_match");
        exit();
    } else {
        $sql = "SELECT Id_discord FORM utenti WHERE Id_discord=?";
        $stmt = mysqli_stmt_init($conn);
        if(!mysqli_stmt_prepare($stmt, $sql)) {
            header("Location: ../Register.php?error=sqlerror");
            exit();
        } else {
            mysqli_stmt_bind_param($stmt, "s", $username);
            mysqli_stmt_execute($stmt);
            mysqli_stmt_store_result($stmt);
            $resultCheck = mysqli_stmt_num_rows($stmt);
            if ($resultCheck > 0) {
                header("Location: ../Register.php?error=usertaken");
                exit();
            } else {
                $sql = "INSERT INTO utenti (Id_discord, password) VALUES (?,?)";
                $stmt = mysqli_stmt_init($conn);
                if(!mysqli_stmt_prepare($stmt, $sql)) {
                    header("Location: ../Register.php?error=sqlerror");
                    exit();
                } else {
                    $hashedPwd = password_hash($password, PASSWORD_DEFAULT);
                    mysqli_stmt_bind_param($stmt, "ss", $username, $hashedPwd);
                    mysqli_stmt_execute($stmt);
                    header("Location: ../Register.php?signup=success");
                    exit();
                }
            }
        }
    }
    mysqli_stmt_close($stmt);
    mysqli_close($conn);
} else {
    header("Location: ../Register.php");
    exit();
}