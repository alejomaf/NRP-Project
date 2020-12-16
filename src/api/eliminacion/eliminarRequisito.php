<?php
//----------COMPROBACIÓN DEL USUARIO CONECTADO----------\\
include "../../connection/checkLogin.php";
include "../utilities/eliminaciones.php";
//-------------------------------------------------------\\

$idRequisito=$_POST["idRequisito"];

eliminarDatos("relacion", "Requisito_idRequisito", $idRequisito, $conn);
eliminarDatos("relacion", "Requisito_idRequisito1", $idRequisito, $conn);
eliminarDatos("valoracion", "Requisito_idRequisito", $idRequisito, $conn);
eliminarDatos("requisito", "idRequisito", $idRequisito, $conn);
?>