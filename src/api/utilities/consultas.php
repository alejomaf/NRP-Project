<?php
function anadirAConsultaTexto($nombre, $valor){
    global $busqueda;
    if(isset($_POST[$valor])&&$_POST[$valor]!=""){ 

        $valor=$_POST[$valor];
        if($busqueda==""){
            $busqueda=" {$nombre} LIKE '%{$valor}%'";
        }else{
            $busqueda.=" AND {$nombre} LIKE '%{$valor}%'";
        }
    }
}
function anadirAConsultaNumero($nombre, $valor){
    global $busqueda;
    if(isset($_POST[$valor])&&$_POST[$valor]!=""){

        $valor=$_POST[$valor];
        
        if($busqueda==""){
            $busqueda=" {$nombre} = {$valor}";
        }else{
            $busqueda.=" AND {$nombre} = {$valor}";
        }
    }
}
function mostrarDatos($tabla, $busqueda, $conn){
global $busqueda;
if($busqueda==null||$busqueda=="") exit();
$sql = "SELECT * FROM {$tabla} WHERE {$busqueda};";
$result = $conn->query($sql);

$data=array();
echo $conn->error;

if($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $data[]= $row;
    }
    echo json_encode($data);
}else{
    echo "Fallo";
}
}

?>