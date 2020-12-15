<?php
//----------COMPROBACIÓN DEL USUARIO CONECTADO----------\\
include "../../connection/checkLogin.php";
include "../utilities/eliminaciones.php";
//-------------------------------------------------------\\

$idGrupoObjetos=$_POST["idGrupoObjetos"];

$sql = "SELECT * FROM objeto WHERE GrupoObjetos_idGrupoObjetos=".$idGrupoObjetos.";";
$result = $conn->query($sql);

echo $conn->error;

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $idObjeto=$row["idObjeto"];
        eliminarDatos("configuracion", "Objeto_idObjeto", $idObjeto, $conn);
        eliminarDatos("prestado", "Objeto_idObjeto", $idObjeto, $conn);
        eliminarDatos("objeto", "idObjeto", $idObjeto, $conn);
    }
}

eliminarDatos("grupoobjetos", "idGrupoObjetos", $idGrupoObjetos, $conn);

?>