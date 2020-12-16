<?php

function anadirAModificacionTexto($nombre, $valor){
    global $modificacion;
    if(isset($_POST[$valor])&&$_POST[$valor]!=""){ 

        $valor=$_POST[$valor];
        if($modificacion==""){
            $modificacion=" {$nombre} = '{$valor}'";
        }else{
            $modificacion.=", {$nombre} = '{$valor}'";
        }
    }
}
function anadirAModificacionNumero($nombre, $valor){
    global $modificacion;
    if(isset($_POST[$valor])&&$_POST[$valor]!=""){

        $valor=$_POST[$valor];
        
        if($modificacion==""){
            $modificacion=" {$nombre} = {$valor}";
        }else{
            $modificacion.=", {$nombre} = {$valor}";
        }
    }
}
function mostrarDatos($tabla, $idModificacion, $valorIdModificacion, $conn){
    global $modificacion;
    if($modificacion==null||$modificacion=="") exit();
    $sql="UPDATE {$tabla} SET {$modificacion} WHERE {$idModificacion}= {$valorIdModificacion}";
    $conn->query($sql);
    echo $conn->error;
}

?>