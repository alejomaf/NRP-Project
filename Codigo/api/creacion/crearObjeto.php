<?php

//----------COMPROBACIÓN DEL USUARIO CONECTADO----------\\
include "../../connection/checkLogin.php";
include "../utilities/creaciones.php";
//-------------------------------------------------------\\
global $creacion;
global $variables;

anadirACreacionTexto("mejorassEquipo", "mejorasEquipo");
anadirACreacionTexto("observaciones", "observaciones");
anadirACreacionNumero("organizativa", "organizativa");
anadirACreacionTexto("etiqueta", "etiqueta");
anadirACreacionTexto("GrupoObjetos_idGrupoObjetos", "grupoObjetos");
anadirACreacionTexto("Ubicacion_idUbicacion", "ubicacion");
anadirACreacionTexto("codigo", "codigo");
if(isset($_POST["fechaAdquisicion"])&&$_POST["fechaAdquisicion"]!=""){
$variables.=", fechaAdquisicion";
$creacion.=", date('{$_POST["fechaAdquisicion"]}')";
}

crearDatos("objeto", $conn);

$sql2="UPDATE grupoobjetos SET cantidad = cantidad + 1, cantidadDisponible = cantidadDisponible + 1 WHERE idGrupoObjetos = {$_POST["grupoObjetos"]}";
$conn->query($sql2);
?>