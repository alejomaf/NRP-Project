<?php

//----------COMPROBACIÓN DEL USUARIO CONECTADO----------\\
include "../../connection/checkLogin.php";
include "../utilities/creaciones.php";
//-------------------------------------------------------\\

anadirACreacionTexto("ip", "ip");
anadirACreacionTexto("mac", "mac");
anadirACreacionTexto("boca", "boca");
anadirACreacionTexto("armario", "armario");
anadirACreacionTexto("usuario", "usuario");
anadirACreacionTexto("contrasena", "contrasena");
anadirACreacionNumero("Objeto_idObjeto", "objeto");

crearDatos("configuracion", $conn);
?>