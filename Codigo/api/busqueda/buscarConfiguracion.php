<?php

//----------COMPROBACIÓN DEL USUARIO CONECTADO----------\\
include "../../connection/checkLogin.php";
include "../utilities/consultas.php";
//-------------------------------------------------------\\

$busqueda="";


anadirAConsultaTexto("ip","ip");
anadirAConsultaTexto("mac","mac");
anadirAConsultaTexto("boca","boca");
anadirAConsultaTexto("armario","armario");
anadirAConsultaTexto("usuario","usuario");
anadirAConsultaTexto("contrasena","contrasena");
anadirAConsultaNumero("Objeto_idObjeto","Objeto_idObjeto");

mostrarDatos("configuracion", $busqueda, $conn);
?>