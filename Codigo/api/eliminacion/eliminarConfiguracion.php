<?php
//----------COMPROBACIÓN DEL USUARIO CONECTADO----------\\
include "../../connection/checkLogin.php";
include "../utilities/eliminaciones.php";
//-------------------------------------------------------\\

$idConfiguracion=$_POST["idConfiguracion"];

eliminarDatos("configuracion", "idConfiguracion", $_POST["idConfiguracion"], $conn);

?>