<?php
//----------COMPROBACIÓN DEL USUARIO CONECTADO----------\\
include "../../connection/checkLogin.php";
include "../utilities/eliminaciones.php";
//-------------------------------------------------------\\

eliminarDatos("prestado", "idPrestado", $_POST["idPrestamo"], $conn);
?>