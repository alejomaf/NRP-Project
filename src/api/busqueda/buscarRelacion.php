<?php

//----------COMPROBACIÓN DEL USUARIO CONECTADO----------\\
include "../../connection/checkLogin.php";
include "../utilities/consultas.php";
//-------------------------------------------------------\\

$busqueda="";


anadirAConsultaNumero("Requisito_idRequisito","Requisito_idRequisito");
anadirAConsultaNumero("Requisito_idRequisito1","Requisito_idRequisito1");
anadirAConsultaNumero("relacion","relacion");
anadirAConsultaNumero("idRelacion","idRelacion");

mostrarDatos("relacion", $busqueda, $conn);
?>