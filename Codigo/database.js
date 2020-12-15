var idProyecto = null;
//IDProyecto, DEFINIR!!!

var clientes = null;
var relaciones = null;
var requisitos = null;
var valoraciones = null;

async function cargarValores(){
    if(idProyecto==null) return;
 
    clientes = await realizarConsulta("api/busqueda/buscarCliente.php",{Proyecto_idProyecto: idProyecto});
    relaciones = await realizarConsulta("api/busqueda/buscarRelacion.php",{Proyecto_idProyecto: idProyecto});
    requisitos = await realizarConsulta("api/busqueda/buscarRequisito.php",{Proyecto_idProyecto: idProyecto});
    valoraciones = await realizarConsulta("api/busqueda/buscarValoracion.php",{Proyecto_idProyecto: idProyecto});
}


//eliminarDato("relacion",{idRelacion: idQueVayasAPasar});
async function eliminarDato(tabla, id){
    await realizarConsulta("api/busqueda/eliminar"+tabla+".php",id);
    cargarValores()
}

//actualizarDato("relacion",{relacion: relacionValor});
async function actualizarDato(tabla, valor){
    await realizarConsulta("api/modificacion/eliminar"+tabla+".php",valor);
    cargarValores();
}

//anadirDato("relacion",{Requisito_idRequisito: requisito1, Requisito_idRequisito1: requisito2, relacion: relacionValor});
async function anadirDato(tabla, valor){
    await realizarConsulta("api/creacion/crear"+tabla+".php",valor);
    cargarValores();
}
