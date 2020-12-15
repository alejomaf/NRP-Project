<?php

//----------COMPROBACIÓN DEL USUARIO CONECTADO----------\\
include "../../connection/checkLogin.php";
include "../utilities/creaciones.php";
//-------------------------------------------------------\\


anadirACreacionNumero("idRequisito","idRequisito");
anadirACreacionTexto("nombre","nombre");
anadirACreacionNumero("esfuerzo","esfuerzo");
anadirACreacionNumero("Proyecto_idProyecto","Proyecto_idProyecto");
anadirACreacionNumero("resuelto","resuelto");

crearDatos("requisito", $conn);
?>