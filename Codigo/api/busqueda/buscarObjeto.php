<?php

//----------COMPROBACIÓN DEL USUARIO CONECTADO----------\\
include "../../connection/checkLogin.php";
include "../utilities/consultas.php";
//-------------------------------------------------------\\

$busqueda="";

anadirAConsultaNumero("idObjeto","idObjeto");
anadirAConsultaTexto("mejorasEquipo","mejorasEquipo");
anadirAConsultaTexto("codigo","codigo");
anadirAConsultaNumero("GrupoObjetos_idGrupoObjetos","GrupoObjetos_idGrupoObjetos");
anadirAConsultaNumero("Ubicacion_idUbicacion","Ubicacion_idUbicacion");
anadirAConsultaNumero("disponible","disponible");
anadirAConsultaNumero("eliminado","eliminado");
anadirAConsultaTexto("etiqueta","etiqueta");
anadirAConsultaTexto("observaciones","observaciones");
anadirAConsultaNumero("organizativa","organizativa");

mostrarDatos("objeto", $busqueda, $conn);
?>