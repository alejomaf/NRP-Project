<?php

//----------COMPROBACIÓN DEL USUARIO CONECTADO----------\\
include "../../connection/checkLogin.php";
include "../utilities/modificaciones.php";
//-------------------------------------------------------\\

$modificacion="";

$idRequisito=$_POST["idRequisito"];

anadirAModificacionNumero("idRequisito","idRequisito");
anadirAModificacionTexto("nombre","nombre");
anadirAModificacionNumero("esfuerzo","esfuerzo");
anadirAModificacionNumero("Proyecto_idProyecto","Proyecto_idProyecto");
anadirAModificacionNumero("resuelto","resuelto");

mostrarDatos("requisito", "idRequisito", $idRequisito, $conn);
?>