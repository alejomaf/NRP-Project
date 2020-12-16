<?php
//----------COMPROBACIÓN DEL USUARIO CONECTADO----------\\
include "../../connection/checkLogin.php";
include "../utilities/eliminaciones.php";
//-------------------------------------------------------\\

eliminarDatos("relacion", "idRelacion", $_POST["idRelacion"], $conn);
?>