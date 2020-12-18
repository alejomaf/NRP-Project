async function realizarConsulta(ubicacion, consulta) {
	var datosProcesados = null;
	await $.post(ubicacion, consulta,
		function (data, status) {
			if (data == "" || data == null || data == "Fallo") datosProcesados = null;
			else datosProcesados = JSON.parse(data);
		});
	if (datosProcesados == null) return null;
	return datosProcesados;
}
//ubicacion=(await realizarConsulta("apis/busqueda/buscarUbicacion.php",{idUbicacion: objeto.Ubicacion_idUbicacion}))[0];

async function addCliente(nombre, relevancia, idCliente) {

	var fila = document.createElement("tr");
	fila.setAttribute("id", "fila_" + idCliente);

	var nombreCliente = document.createElement("th");
	nombreCliente.setAttribute("style", "cursor:pointer");
	nombreCliente.setAttribute("onclick", "verInformacion(0,'" + nombre + "'," + relevancia + ", " + idCliente + ",null)");
	//ANADIR ONCLICK

	nombreCliente.setAttribute("scope", "row");
	nombreCliente.innerHTML = nombre;

	fila.append(nombreCliente);

	await cargarValores();

	if (requisitos.length != 0) {
		for (k = 0; k < requisitos.length; k++) {
			var rec1 = document.createElement("td");
			var input = document.createElement("input");
			input.setAttribute("id", valoraciones[$("#filaClientes tr").length][k].idValoracion);
			input.setAttribute("type", "text");
			input.setAttribute("class", "form-control");
			input.value = valoraciones[$("#filaClientes tr").length][k].valoracion;

			rec1.append(input);
			fila.append(rec1);
		}
	}

	var relevanciaCliente = document.createElement("td");
	relevanciaCliente.setAttribute("class", "relevancia");

	if ($.isNumeric(relevancia)) {
		relevanciaCliente.innerHTML = relevancia;
	} else {
		relevancia = "1"
		relevanciaCliente.innerHTML = 1;
	}

	fila.append(relevanciaCliente);

	$("#filaClientes").append(fila);
	hideModal();

}

async function anadirCliente(nombre, relevancia) {
	//Genero el cliente y le asigno la id en la que va a pertenecer su fila
	var cliente = {
		nombre: nombre,
		relevancia: relevancia,
		Proyecto_idProyecto: idProyecto
	};

	await anadirDato("Cliente", cliente);
	await cargarValores();

	cliente = clientes[clientes.length - 1];

	for (r in requisitos) {

		await cargarValores();
		var valoracion = {
			Cliente_idCliente: cliente.idCliente,
			Requisito_idRequisito: requisitos[r].idRequisito,
			valoracion: 0
		};
		await anadirDato("Valoracion", valoracion);
	}
}

async function addRequisito(nombre, relevancia, idRequisito, resuelto) {

	var long = requisitos[requisitos.length - 1];
	var etiqueta = "R" + (requisitos.length == 0 ? 0 : parseInt(idRequisito));


	//añade la columna en la penultima
	var nombreRequisito = document.createElement("th");
	nombreRequisito.setAttribute("style", "cursor:pointer");
	nombreRequisito.setAttribute("onclick", "verInformacion(1,'" + nombre + "'," + relevancia + ", " + idRequisito + "," + resuelto + ")");

	nombreRequisito.setAttribute("scope", "col");
	nombreRequisito.innerHTML = etiqueta;
	//nombreRequisito.style.text-align = "center";
	nombreRequisito.style.margin = "auto";
	nombreRequisito.style.position = "relative";
	nombreRequisito.style.top = "50%";

	var check = document.createElement("input");
	check.setAttribute("id", "check_" + idRequisito);
	check.setAttribute("type", "checkbox");
	//check.style.text-align = "center";
	check.style.margin = "auto";
	check.style.position = "relative";
	check.style.top = "50%";


	var cabeza = document.createElement("div");
	cabeza.append(nombreRequisito);
	cabeza.append(check);


	var cabeza2 = document.createElement("th");
	cabeza2.append(cabeza);

	cabeza2.setAttribute("class", "mx-auto");

	cabeza2.style.textAlign = "center"
	var prioridadAux = $("#nombreColumnas .prioridadCliente");
	$("#nombreColumnas .prioridadCliente").remove();
	$("#nombreColumnas").append(cabeza2);
	$("#nombreColumnas").append(prioridadAux);
	/////////////////////////////////////////////////////////////

	//añade el esfuerzo del requisito al final de la columna
	var esfuerzoReq = document.createElement("td");

	if ($.isNumeric(relevancia)) {
		esfuerzoReq.innerHTML = relevancia;
	} else {
		esfuerzoReq.innerHTML = 0;
	}

	var prioridadTotal = $("#prioridadTotal");
	$("#prioridadTotal").remove();

	$("#esfuerzoRequisito").append(esfuerzoReq);
	$("#esfuerzoRequisito").append(prioridadTotal);
	//////////////////////////////////////////////////////////////

	await cargarValores();
	//añade los inputs por cada cliente
	//if (!cargando)
	for (j = 0; j < clientes.length; j++) {
		var rec1 = document.createElement("td");

		var input = document.createElement("input");
		input.setAttribute("id", valoraciones[j][requisitos.length - 1].idValoracion);
		input.setAttribute("type", "text");
		input.setAttribute("class", "form-control");
		input.value = "0";

		rec1.append(input);

		$("#fila_" + clientes[j].idCliente + " .relevancia").remove();

		var relevanciaCliente = document.createElement("td");
		relevanciaCliente.setAttribute("class", "relevancia");
		relevanciaCliente.innerHTML = clientes[j].relevancia;

		$("#fila_" + clientes[j].idCliente).append(rec1);
		$("#fila_" + clientes[j].idCliente).append(relevanciaCliente);
	}
	//////////////////////////////////////////////////////////////

	//añade la leyenda de requisitos totales
	var requi = document.createElement("tr");
	var identifier = document.createElement("td");
	var nomReq = document.createElement("td");

	identifier.innerHTML = etiqueta;
	requi.append(identifier);

	nomReq.innerHTML = nombre;
	requi.append(nomReq);

	$("#tablaReq").append(requi);
	//////////////////////////////////////////////////////////////
	hideModal();
}

function asignarIdRequisito() {
	if (requisitos.length == 0) return 1;
	var requisitoAux = requisitos[requisitos.length - 1];
	return parseInt(requisitoAux.idRequisito.substring(10, requisitoAux.idRequisito.length - 1)) + 1;
}

async function anadirRequisito(nombre, esfuerzo) {
	//Genero el cliente y le asigno la id en la que va a pertenecer su fila
	var requisito = {
		nombre: nombre,
		esfuerzo: esfuerzo,
		Proyecto_idProyecto: idProyecto,
		resuelto: 0
	};

	await anadirDato("Requisito", requisito);
	await cargarValores();

	requisito = requisitos[requisitos.length - 1];

	for (c in clientes) {
		await cargarValores();

		var valoracion = {
			Cliente_idCliente: clientes[c].idCliente,
			Requisito_idRequisito: requisito.idRequisito,
			valoracion: 0
		};
		await anadirDato("Valoracion", valoracion);
	}
}

function configurarFilaValores(valorRequisitos) {

	for (i = 0; i < requisitos.length; i++) {

		var campo = document.createElement("td");

		var valor = document.createElement("input");
		valor.setAttribute("class", "form-control");
		valor.setAttribute("type", "text");

		campo.append(valor);

		valorRequisitos.append(campo);
	}

}

function cogerValorRequisitosCliente(cliente) {
	var valores = []

	$("#fila_" + cliente.idCliente + " :input").each(function () {
		if ($(this).val().length == 0 || !$.isNumeric($(this).val())) {
			valores.push("0")
		} else {
			valores.push($(this).val());
		}
	});

	return valores;
}

function cogerValorClienteRequisitos(requisito) {
	if (clientes.length == 0) return;
	var valores = [];
	var posicion = requisitos.indexOf(requisito);

	for (l = 0; l < clientes.length; l++) {
		valores.push(cogerValorRequisitosCliente(clientes[l])[posicion]);
	}

	return valores;
}

function showModal(clirec) {
	switch (clirec) {
		case 0: //crear cliente
			$("#nombreAddModal").show();
			$("#primerCampo").show();
			$("#segundoCampo").show();
			$("#relevanciaAddModal").show();
			$("#relevanciaAddModal").show();
			$("#nombreAddModal").val("");
			$("#segundoCampo").text("Relevancia");
			$("#relevanciaAddModal").attr("placeholder", "Relevancia");
			$("#relevanciaAddModal").val("");
			$("#tituloModal").text("Añadir cliente");
			$("#añadirModal").text("Añadir");
			$("#añadirModal").attr("onclick", "crearCliente()");
			break;
		case 1: //crear requisito
			$("#nombreAddModal").show();
			$("#primerCampo").show();
			$("#segundoCampo").show();
			$("#relevanciaAddModal").show();
			$("#relevanciaAddModal").show();
			$("#nombreAddModal").val("");
			$("#segundoCampo").text("Esfuerzo");
			$("#relevanciaAddModal").attr("placeholder", "Esfuerzo");
			$("#relevanciaAddModal").val("");
			$("#tituloModal").text("Añadir requisito");
			$("#añadirModal").text("Añadir");
			$("#añadirModal").attr("onclick", "crearRequisito()");
			break;
		case 2: //crear proyecto
			$("#nombreAddModal").show();
			$("#primerCampo").show();
			$("#segundoCampo").show();
			$("#relevanciaAddModal").show();
			$("#relevanciaAddModal").show();
			$("#nombreAddModal").val("");
			$("#segundoCampo").text("Límite de esfuerzo");
			$("#relevanciaAddModal").attr("placeholder", "Límite de esfuerzo");
			$("#relevanciaAddModal").val("");
			$("#tituloModal").text("Crear proyecto");
			$("#añadirModal").text("Crear");
			$("#añadirModal").attr("onclick", "crearProyecto()");
			break;
		case 3: //guardar valoraciones
			$("#nombreAddModal").hide();
			$("#primerCampo").hide();
			$("#segundoCampo").hide();
			$("#relevanciaAddModal").hide();
			$("#relevanciaAddModal").hide();
			$("#tituloModal").text("¿Seguro que deseas guardar?");
			$("#añadirModal").text("Guardar");
			$("#añadirModal").attr("onclick", "guardarValoracion()");
			break;
		case 4: //guardar requisitos solucionados
			$("#nombreAddModal").hide();
			$("#primerCampo").hide();
			$("#segundoCampo").hide();
			$("#relevanciaAddModal").hide();
			$("#relevanciaAddModal").hide();
			$("#tituloModal").text("¿Deseas marcarlos como finalizado?");
			$("#añadirModal").text("Guardar");
			$("#añadirModal").attr("onclick", "guardarRequisitos()");
			break;
	}

	$("#ventanaFlotante").modal("show");
}

function hideModal() {
	$("#ventanaFlotante").modal("hide");
}

function calcularSolucion() {
	var requisitosFinales = [];

	var esfuerzoSeleccionado = 0;
	var forzados = [];
	for (var i = 0; i < requisitos.length; i++) {
		if (!$("#check_" + requisitos[i].idRequisito)[0].checked) {
			requisitosFinales.push(addReqConValor(requisitos[i]));
		} else {
			forzados.push(addReqConValor(requisitos[i]))
			esfuerzoSeleccionado += parseInt(requisitos[i].esfuerzo);
		}
	}
	if (esfuerzoSeleccionado > parseInt(proyecto.limiteEsfuerzo)) {
		return [];
	}
	var sol = calcularRequisitos(requisitosFinales, parseInt(proyecto.limiteEsfuerzo) - esfuerzoSeleccionado);
	return [sol, forzados];
}

async function calcularTodo() {

	var sol = calcularSolucion()[0];
	var forz = calcularSolucion()[1];

	var satForz = 0;

	for (r in forz) {
		satForz += calcularSatisfaccionRequisito(requisitos[forz[r].posicion]);
	}

	satForz += sol.maxValue;
	$("#satisfaccionTotal").text(satForz);

	var esfuerzoFinal = 0;

	for (var i = 0; i < forz.length; i++) {
		esfuerzoFinal += parseInt(forz[i].esfuerzo);
	}

	for (var i = 0; i < sol.subset.length; i++) {
		esfuerzoFinal += parseInt(sol.subset[i].esfuerzo);
	}

	$("#esfuerzoDesarrollo").text(esfuerzoFinal);

	var requisitosOptimos = "";

	for (var i = 0; i < forz.length; i++) {
		requisitosOptimos += forz[i].nombre;
		if (i < forz.length - 1) {
			requisitosOptimos += ", ";
		}
	}

	if (requisitosOptimos != "" && sol.subset.length != 0)
		requisitosOptimos += ", ";

	for (var i = 0; i < sol.subset.length; i++) {
		requisitosOptimos += sol.subset[i].nombre;
		if (i < sol.subset.length - 1) {
			requisitosOptimos += ", ";
		}
	}

	$("#requisitosFinales").text(requisitosOptimos);

	/*
		var maxContribuidor = clientes[0];
		var contribuidor = 0;
		for (var i = 0; i < clientes.length; i++) {
			var contr = contribucion(clientes[i], sol.subset);
			if (contr > contribuidor) {
				contribuidor = contr;
				maxContribuidor = clientes[i];
			}
		}
		$("#contribucion").text(maxContribuidor.nombre);
		*/


	calcularProductividad(esfuerzoFinal, satForz);
	calcularContribucion(satForz);
	calcularCobertura();

	$("#Calc").attr("hidden", true);
	$("#guardarSolucion").attr("hidden", false);
}

function contribucion(cliente, solucion) {
	var valores = cogerValorRequisitosCliente(cliente);
	var suma = 0;
	for (var i = 0; i < valores.length; i++) {
		suma += parseInt(valores[i]);
	}
	return suma * parseInt(cliente.relevancia);
}


function addReqConValor(requisito) {
	var req = {
		posicion: requisitos.lastIndexOf(requisito),
		nombre: "R" + requisito.idRequisito,
		esfuerzo: requisito.esfuerzo, //w o peso
		satisfaccionDelRequisito: calcularSatisfaccionRequisito(requisito) //la suma del (requisito * pesoDelCliente) de todos los clientes
	};
	return req;
}

function calcularSatisfaccionRequisito(req) {
	var satisfaccion = 0;
	var clientesAux = cogerValorClienteRequisitos(req);

	for (var i = 0; i < clientes.length; i++) {
		satisfaccion += parseInt(clientesAux[i]) * parseInt(clientes[i].relevancia);
	}

	return satisfaccion;
}

function calcularRequisitos(totalRequisitos, esfuerzoMaximo) {

	var memo = [];

	for (var i = 0; i < totalRequisitos.length; i++) {
		var row = [];
		for (var cap = 1; cap <= esfuerzoMaximo; cap++) {
			row.push(getSolucion(i, cap));
		}
		memo.push(row);
	}

	return (getLast());

	function getLast() {
		var lastRow = memo[memo.length - 1];
		return lastRow[lastRow.length - 1];
	}

	function getSolucion(row, cap) {
		const NO_SOLUTION = {
			maxValue: 0,
			subset: []
		};
		var col = cap - 1;
		var lastItem = totalRequisitos[row];
		var remaining = cap - lastItem.esfuerzo;

		var lastSolution = row > 0 ? memo[row - 1][col] || NO_SOLUTION : NO_SOLUTION;
		var lastSubSolution = row > 0 ? memo[row - 1][remaining - 1] || NO_SOLUTION : NO_SOLUTION;

		if (remaining < 0) {
			return lastSolution;
		}
		var lastValue = lastSolution.maxValue;
		var lastSubValue = lastSubSolution.maxValue;

		var newValue = lastSubValue + lastItem.satisfaccionDelRequisito;
		if (newValue >= lastValue) {
			var _lastSubSet = lastSubSolution.subset.slice();
			_lastSubSet.push(lastItem);
			return {
				maxValue: newValue,
				subset: _lastSubSet
			};
		} else {
			return lastSolution;
		}
	}
}

$(document).ready(function () {
	cargarDatos();

	$("#defaultOpen").click();
});

function crearProyecto() {
	var nombre = $("#nombreAddModal").val();
	var limiteEsfuerzo = $("#relevanciaAddModal").val();

	if (nombre == "" || limiteEsfuerzo == "") return;

	anadirDato("Proyecto", {
		nombre: nombre,
		limiteEsfuerzo: limiteEsfuerzo
	});
}

async function cargarDatos() {
	await cargarValores();

	
	$("#nomProyecto").text(proyecto.nombre);
	$("#limiteEsfuerzo").text("Límite de esfuerzo: " + proyecto.limiteEsfuerzo);

	if (requisitos.length != 0) {
		for (var r in requisitos) {
			await addRequisito(requisitos[r].nombre, requisitos[r].esfuerzo, requisitos[r].idRequisito, requisitos[r].resuelto);
		}
	}
	
	if (clientes.length != 0) {
		for (var t in clientes) {
			await addCliente(clientes[t].nombre, clientes[t].relevancia, clientes[t].idCliente);
		}
	}

	for (r in requisitosResueltos) {
		var reqFin = requisitosResueltos[r]
		listarReq(reqFin.nombre, reqFin.idRequisito);
	}
	cargarBotones();
}

function listarReq(nombre, idRequisito) {

	var etiqueta = "R" + (requisitos.length == 0 ? 0 : parseInt(idRequisito));

	//añade la leyenda de requisitos totales
	var requi = document.createElement("tr");
	var identifier = document.createElement("td");
	var nomReq = document.createElement("td");

	identifier.innerHTML = etiqueta;
	requi.append(identifier);

	nomReq.innerHTML = nombre;
	requi.append(nomReq);

	$("#tablaReqFin").append(requi);
}

function asignarValorRequisitosCliente(cliente, valores) {
	var k = 0
	$("#" + cliente.idCliente + " :input").each(function () {
		$(this).val() = valores[k];
		k++;
	});
}

async function crearCliente() {
	var nombre = $("#nombreAddModal").val();
	var relevancia = $("#relevanciaAddModal").val();

	if (nombre == "" || relevancia == "") return;


	await anadirCliente(nombre, relevancia);
	await cargarValores();
	addCliente(nombre, relevancia, clientes[clientes.length - 1].idCliente);
}

async function crearRequisito() {
	var nombre = $("#nombreAddModal").val();
	var relevancia = $("#relevanciaAddModal").val();

	if (nombre == "" || relevancia == "") return;

	await anadirRequisito(nombre, relevancia);
	await cargarValores();
	addRequisito(nombre, relevancia, requisitos[requisitos.length - 1].idRequisito, requisitos[requisitos.length - 1].resuelto);
}

async function guardarValoracion() {

	for (o = 0; o < clientes.length; o++) {
		k = 0;
		$("#fila_" + clientes[o].idCliente + " :input").each(function () {
			valoraciones[o][k].valoracion = $(this).val();
			actualizarDato("Valoracion", valoraciones[o][k]);
			k++;
		});
	}
	hideModal();
}

async function guardarRequisitos() {

	var solucion = calcularSolucion();

	for (r in solucion[0].subset) {
		requisitos[solucion[0].subset[r].posicion].resuelto = 1;
		actualizarDato("Requisito", requisitos[solucion[0].subset[r].posicion]);
	}

	for (r in solucion[1]) {
		requisitos[solucion[1][r].posicion].resuelto = 1;
		actualizarDato("Requisito", requisitos[solucion[1][r].posicion]);
	}

	hideModal();
	await location.reload()
}

async function anadirValoracion(idCli, idReq, val) {

	var valoracion = {
		idCliente: idCli,
		idRequisito: idReq,
		valor: val,
		Proyecto_idProyecto: idProyecto
	};

	await anadirDato("Valoracion", valoracion);
}

async function verInformacion(tipo, nombre, relevancia, id, resuelto) {
	$("#relevanciaInfo").val(relevancia);
	$("#nombreInfo").val(nombre);
	if (tipo == 0) {
		$("#nombreNameInfo").text("Nombre");
		$("#relevanciaNameInfo").text("Relevancia");
		$("#formularioResuelto").hide();
	} else {
		$("#nombreNameInfo").text("Nombre");
		$("#relevanciaNameInfo").text("Esfuerzo");
		$("#formularioResuelto").show();
		if (resuelto == 0) $("#resueltoInfo").prop('checked', false);
		else $("#resueltoInfo").prop('checked', true);
	}
	$("#editInfo").attr("onclick", "eliminarOModificar(false," + tipo + "," + id + ")");
	$("#delInfo").attr("onclick", "eliminarOModificar(true," + tipo + "," + id + ")");

	$("#informacionObjeto").modal("show");
}


async function eliminarOModificar(eliminar, tipo, id) {
	if ($('#resueltoInfo').is(':checked')) var resuelto = 1;
	else var resuelto = 0;
	var nombre = $("#nombreInfo").val();
	var relevancia = $("#relevanciaInfo").val();

	if (tipo == 1) {
		//$("#resueltoInfo").is(':checked')
		if (eliminar) await eliminarDato("Requisito", {
			idRequisito: id
		});
		else if (nombre == "" || relevancia == "") return;
		else {
			await actualizarDato("Requisito", {
				idRequisito: id,
				nombre: nombre,
				esfuerzo: relevancia,
				resuelto: resuelto
			});
		}
	} else {
		if ($("#resueltoInfo").is(':checked')) var resuelto = 1;
		else var resuelto = 0;
		if (eliminar) await eliminarDato("Cliente", {
			idCliente: id
		});
		else if (nombre == "" || relevancia == "") return;
		else {
			await actualizarDato("Cliente", {
				idCliente: id,
				nombre: nombre,
				relevancia: relevancia
			});
		}
	}

	await location.reload();
}
