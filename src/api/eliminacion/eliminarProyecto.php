<?php
//----------COMPROBACIÓN DEL USUARIO CONECTADO----------\\
include "../../connection/checkLogin.php";
include "../utilities/eliminaciones.php";
//-------------------------------------------------------\\

$idProyecto=$_POST["idProyecto"];

eliminarDatos("relacion", "Proyecto_idProyecto", $idProyecto, $conn);
eliminarDatos("requisito", "Proyecto_idProyecto", $idProyecto, $conn);
eliminarDatos("cliente","Proyecto_idProyecto", $idProyecto, $conn);
eliminarDatos("proyecto", "idProyecto", $idProyecto, $conn);
?>