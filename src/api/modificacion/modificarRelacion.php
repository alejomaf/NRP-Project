<?php

//----------COMPROBACIÓN DEL USUARIO CONECTADO----------\\
include "../../connection/checkLogin.php";
include "../utilities/modificaciones.php";
//-------------------------------------------------------\\

$modificacion="";

$idRelacion=$_POST["idRelacion"];

anadirAModificacionNumero("Requisito_idRequisito","Requisito_idRequisito");
anadirAModificacionNumero("Requisito_idRequisito1","Requisito_idRequisito1");
anadirAModificacionNumero("relacion","relacion");

mostrarDatos("relacion", "idRelacion", $idRelacion, $conn);
?>