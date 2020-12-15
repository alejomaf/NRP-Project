<?php

include "../../connection/connection.php";

$name=$_POST["name"];
$password=$_POST["password"];
$email=$_POST["email"];
$department=$_POST["department"];
$phone=$_POST["phone"];



$sql="INSERT INTO usuario(nombre, contrasena, correoElectronico, rango, departamento, telefono) VALUES ('".$name."','".$password."','".$email."',-1,".$department.",".$phone.");";

$conn->query($sql);
echo $conn->error;
?>