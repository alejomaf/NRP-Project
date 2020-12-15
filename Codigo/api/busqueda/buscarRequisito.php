<?php

//----------COMPROBACIÓN DEL USUARIO CONECTADO----------\\
include "../../connection/checkLogin.php";
include "../utilities/consultas.php";
//-------------------------------------------------------\\

$busqueda="";


anadirAConsultaNumero("idRequisito","idRequisito");
anadirAConsultaTexto("nombre","nombre");
anadirAConsultaNumero("esfuerzo","esfuerzo");
anadirAConsultaNumero("Proyecto_idProyecto","Proyecto_idProyecto");
anadirAConsultaNumero("resuelto","resuelto");

mostrarDatos("requisito", $busqueda, $conn);
?>