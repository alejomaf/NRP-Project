<?php
//----------COMPROBACIÓN DEL USUARIO CONECTADO----------\\
include "../../connection/checkLogin.php";
include "../utilities/eliminaciones.php";
//-------------------------------------------------------\\

$idUsuario=$_POST["idUsuario"];

eliminarDatos("prestado", "Usuario_idUsuario", $idUsuario, $conn);
eliminarDatos("usuario", "idUsuario", $idUsuario, $conn);
?>