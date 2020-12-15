<?php

//----------COMPROBACIÓN DEL USUARIO CONECTADO----------\\
include "../../connection/checkLogin.php";
include "../utilities/creaciones.php";
//-------------------------------------------------------\\

anadirACreacionNumero("Requisito_idRequisito","Requisito_idRequisito");
anadirACreacionNumero("Requisito_idRequisito1","Requisito_idRequisito1");
anadirACreacionNumero("relacion","relacion");
anadirACreacionNumero("idRelacion","idRelacion");

crearDatos("relacion", $conn);
?>