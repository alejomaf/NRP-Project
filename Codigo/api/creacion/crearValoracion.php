<?php

//----------COMPROBACIÓN DEL USUARIO CONECTADO----------\\
include "../../connection/checkLogin.php";
include "../utilities/creaciones.php";
//-------------------------------------------------------\\


anadirACreacionNumero("Cliente_idCliente","Cliente_idCliente");
anadirACreacionNumero("Requisito_idRequisito","Requisito_idRequisito");
anadirACreacionNumero("valoracion","valoracion");
anadirACreacionNumero("idValoracion","idValoracion");

crearDatos("valoracion", $conn);
?>