<?php

//----------COMPROBACIÓN DEL USUARIO CONECTADO----------\\
include "../../connection/checkLogin.php";
include "../utilities/consultas.php";
//-------------------------------------------------------\\

$busqueda="";


anadirAConsultaNumero("Cliente_idCliente","Cliente_idCliente");
anadirAConsultaNumero("Requisito_idRequisito","Requisito_idRequisito");
anadirAConsultaNumero("valoracion","valoracion");
anadirAConsultaNumero("idValoracion","idValoracion");

mostrarDatos("valoracion", $busqueda, $conn);
?>