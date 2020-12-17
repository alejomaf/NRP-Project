var idProyecto = null;
var proyecto = null;
//IDProyecto, DEFINIR!!!

var clientes = [];
var relaciones = [];
var requisitos = [];
var valoraciones = [];

async function cargarValores() {
	
	if (idProyecto == null) return;
	
	var proyectoAux = await realizarConsulta("api/busqueda/buscarProyecto.php", {
		idProyecto: idProyecto
	});
	
	proyecto = proyectoAux[0];

	clientes = await realizarConsulta("api/busqueda/buscarCliente.php", {
		Proyecto_idProyecto: idProyecto
	});
	if (clientes == null) clientes = [];



	relaciones = await realizarConsulta("api/busqueda/buscarRelacion.php", {
		Proyecto_idProyecto: idProyecto
	});
	if (relaciones == null) relaciones = [];



	requisitos = await realizarConsulta("api/busqueda/buscarRequisito.php", {
		Proyecto_idProyecto: idProyecto
	});
	if (requisitos == null) requisitos = [];


	
		if (clientes.length != 0) {
			valoraciones = [];
			for (t = 0; t < clientes.length; t++) {
				var valCli = [];
				valCli = await realizarConsulta("api/busqueda/buscarValoracion.php", {
					Cliente_idCliente: clientes[t].idCliente
				});
				
				valoraciones.push(valCli);
			}
		}
	
/*
	valoraciones = await realizarConsulta("api/busqueda/buscarValoracion.php", {
		Cliente_idCliente: 1
	});
	*/
	if (valoraciones == null) valoraciones = [];
}


//eliminarDato("relacion",{idRelacion: idQueVayasAPasar});
async function eliminarDato(tabla, id) {
	await realizarConsulta("api/eliminacion/eliminar" + tabla + ".php", id);
	cargarValores()
}

//actualizarDato("relacion",{relacion: relacionValor});
async function actualizarDato(tabla, valor) {
	await realizarConsulta("api/modificacion/modificar" + tabla + ".php", valor);
	cargarValores();
}

//anadirDato("relacion",{Requisito_idRequisito: requisito1, Requisito_idRequisito1: requisito2, relacion: relacionValor});
async function anadirDato(tabla, valor) {
	await realizarConsulta("api/creacion/crear" + tabla + ".php", valor);
	cargarValores();
}
