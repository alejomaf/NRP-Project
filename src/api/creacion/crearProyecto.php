<?php

//----------COMPROBACIÓN DEL USUARIO CONECTADO----------\\
include "../../connection/checkLogin.php";
include "../utilities/creaciones.php";
//-------------------------------------------------------\\


anadirACreacionTexto("nombre","nombre");
anadirACreacionNumero("limiteEsfuerzo","limiteEsfuerzo");

crearDatos("proyecto", $conn);
?>