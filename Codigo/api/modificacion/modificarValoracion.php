<?php

//----------COMPROBACIÓN DEL USUARIO CONECTADO----------\\
include "../../connection/checkLogin.php";
include "../utilities/modificaciones.php";
//-------------------------------------------------------\\

$modificacion="";

$idValoracion=$_POST["idValoracion"];

anadirAModificacionNumero("Cliente_idCliente","Cliente_idCliente");
anadirAModificacionNumero("Requisito_idRequisito","Requisito_idRequisito");
anadirAModificacionNumero("valoracion","valoracion");
anadirAModificacionNumero("idValoracion","idValoracion");

mostrarDatos("valoracion", "idValoracion", $idValoracion, $conn);
?>