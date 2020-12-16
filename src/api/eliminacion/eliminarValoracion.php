<?php
//----------COMPROBACIÓN DEL USUARIO CONECTADO----------\\
include "../../connection/checkLogin.php";
include "../utilities/eliminaciones.php";
//-------------------------------------------------------\\

eliminarDatos("valoracion", "idValoracion", $_POST["idValoracion"], $conn);
?>