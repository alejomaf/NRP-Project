<?php

//----------COMPROBACIÓN DEL USUARIO CONECTADO----------\\
include "../../connection/checkLogin.php";
include "../utilities/consultas.php";
//-------------------------------------------------------\\

$busqueda="";


anadirAConsultaNumero("idProyecto","idProyecto");
anadirAConsultaTexto("nombre","nombre");
anadirAConsultaNumero("limiteEsfuerzo","limiteEsfuerzo");

mostrarDatos("proyecto", $busqueda, $conn);
?>