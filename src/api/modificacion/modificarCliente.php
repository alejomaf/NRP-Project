<?php

//----------COMPROBACIÓN DEL USUARIO CONECTADO----------\\
include "../../connection/checkLogin.php";
include "../utilities/modificaciones.php";
//-------------------------------------------------------\\

$modificacion="";

$idCliente=$_POST["idCliente"];

anadirAModificacionTexto("nombre", "nombre");
anadirAModificacionTexto("relevancia", "relevancia");
anadirAModificacionNumero("Proyecto_idProyecto","Proyecto_idProyecto");

mostrarDatos("cliente", "idCliente", $idCliente, $conn);
?>