<?php
//----------COMPROBACIÓN DEL USUARIO CONECTADO----------\\
include "../../connection/checkLogin.php";
include "../utilities/eliminaciones.php";
//-------------------------------------------------------\\

$idObjeto=$_POST["idObjeto"];

$sql3= "SELECT * FROM objeto WHERE idObjeto={$idObjeto}";

$result=$conn->query($sql3);

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $idGrupoObjetos=$row["GrupoObjetos_idGrupoObjetos"];
    }
    $sql2="UPDATE grupoobjetos SET cantidad = cantidad - 1, cantidadDisponible = cantidadDisponible - 1 WHERE idGrupoObjetos={$idGrupoObjetos}";
    $result=$conn->query($sql2);   
}

eliminarDatos("configuracion", "Objeto_idObjeto", $idObjeto, $conn);
eliminarDatos("prestado", "Objeto_idObjeto", $idObjeto, $conn);
eliminarDatos("objeto", "idObjeto", $idObjeto, $conn);




?>