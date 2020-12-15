<?php

//----------COMPROBACIÓN DEL USUARIO CONECTADO----------\\
include "../../connection/checkLogin.php";
include "../utilities/consultas.php";
//-------------------------------------------------------\\

$busqueda="";


anadirAConsultaNumero("idUsuario","idUsuario");
anadirAConsultaTexto("nombre","name");
anadirAConsultaTexto("contrasena","password");
anadirAConsultaTexto("correoElectronico","email");
anadirAConsultaNumero("rango","rank");
anadirAConsultaNumero("departamento","department");
anadirAConsultaNumero("telefono","phone");


mostrarDatos("usuario", $busqueda, $conn);
?>