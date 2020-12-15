<?php

//----------COMPROBACIÓN DEL USUARIO CONECTADO----------\\
include "../../connection/checkLogin.php";
include "../utilities/consultas.php";
//-------------------------------------------------------\\

$busqueda="";

anadirAConsultaTexto("retiradoPor","retiradoPor");
anadirAConsultaTexto("fechaSalida","fechaSalida");
anadirAConsultaTexto("fechaEntrega","fechaEntrega");
anadirAConsultaTexto("fechaEstimadaEntrega","fechaEstimadaEntrega");
anadirAConsultaNumero("Usuario_idUsuario","Usuario_idUsuario");
anadirAConsultaNumero("Objeto_idObjeto","Objeto_idObjeto");
anadirAConsultaNumero("Objeto_GrupoObjetos_idGrupoObjetos","Objeto_GrupoObjetos_idGrupoObjetos");
anadirAConsultaNumero("Objeto_Ubicacion_idUbicacion","Objeto_Ubicacion_idUbicacion");
anadirAConsultaTexto("solicitado","solicitado");
anadirAConsultaNumero("estado","estado");
anadirAConsultaNumero("idPrestado","idPrestado");

mostrarDatos("prestado", $busqueda, $conn);
?>