<?php

//----------COMPROBACIÓN DEL USUARIO CONECTADO----------\\
include "../../connection/checkLogin.php";
include "../utilities/creaciones.php";
//-------------------------------------------------------\\

anadirACreacionNumero("Proyecto_idProyecto","Proyecto_idProyecto");
anadirACreacionTexto("nombre","nombre");
anadirACreacionTexto("relevancia","relevancia");

crearDatos("cliente", $conn);
?>