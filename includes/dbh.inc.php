<?php

$servername = "localhost";
$dBUsername = "root";
$dBPassword = "";
$dBName = "Piccolo_Grande_Mondo";

$conn = mysql_connect($servername, $dBUsername, $dBPassword, $dBName);

if(!$conn) {
    die("Connection Failed: ".mysql_connect_error());
}