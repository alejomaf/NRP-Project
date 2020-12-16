<?php
function eliminarDatos($tabla, $columna, $valor, $conn){

    $sql="DELETE FROM {$tabla} WHERE {$columna}={$valor};";
    $conn->query($sql);

    echo $conn->error;
}    

?>