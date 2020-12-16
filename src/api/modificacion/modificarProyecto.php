<?php

//----------COMPROBACIÓN DEL USUARIO CONECTADO----------\\
include "../../connection/checkLogin.php";
include "../utilities/modificaciones.php";
//-------------------------------------------------------\\

$modificacion="";

$idProyecto=$_POST["idProyecto"];

anadirAModificacionNumero("nombre","nombre");
anadirAModificacionNumero("limiteEsfuerzo","limiteEsfuerzo");

mostrarDatos("proyecto", "idProyecto", $idProyecto, $conn);
?>