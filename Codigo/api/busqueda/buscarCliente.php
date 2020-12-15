<?php

//----------COMPROBACIÓN DEL USUARIO CONECTADO----------\\
include "../../connection/checkLogin.php";
include "../utilities/consultas.php";
//-------------------------------------------------------\\

$busqueda="";

anadirAConsultaNumero("Proyecto_idProyecto","Proyecto_idProyecto");
anadirAConsultaTexto("nombre","nombre");
anadirAConsultaTexto("relevancia","relevancia");
anadirAConsultaNumero("idCliente","idCliente");

mostrarDatos("cliente", $busqueda, $conn);
?>