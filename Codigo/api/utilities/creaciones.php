<?php


function anadirACreacionTexto($nombre, $valor){
    global $creacion;
    global $variables;

    if(isset($_POST[$valor])&&$_POST[$valor]!=""){ 
        $valor=$_POST[$valor];
        if($creacion==""){
            $variables="{$nombre}";
            $creacion="'{$valor}'";
        }else{
            $variables.=", {$nombre}";
            $creacion.=", '{$valor}'";
        }
    }
}
function anadirACreacionNumero($nombre, $valor){
    global $creacion;
    global $variables;
    if(isset($_POST[$valor])&&$_POST[$valor]!=""){ 
        $valor=$_POST[$valor];
        if($creacion==""){
            $variables="{$nombre}";
            $creacion="{$valor}";
        }else{
            $variables.=", {$nombre}";
            $creacion.=", {$valor}";
        }
    }
}
function crearDatos($tabla, $conn){
    global $creacion;
    global $variables;
    if($creacion==null||$creacion=="") exit();
    $sql="INSERT INTO {$tabla}({$variables}) VALUES ({$creacion});";
    print $sql;
    $conn->query($sql);
    echo $conn->error;
}
?>