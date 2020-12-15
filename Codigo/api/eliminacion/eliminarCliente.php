<?php
//----------COMPROBACIÓN DEL USUARIO CONECTADO----------\\
include "../../connection/checkLogin.php";
include "../utilities/eliminaciones.php";
//-------------------------------------------------------\\

$idCliente=$_POST["idCliente"];

eliminarDatos("valoracion", "Cliente_idCliente", $idCliente, $conn);
eliminarDatos("cliente", "idCliente", $idCliente, $conn);
?>