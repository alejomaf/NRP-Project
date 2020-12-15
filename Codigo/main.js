async function realizarConsulta(ubicacion, consulta) {
	var datosProcesados = null;
	await $.post(ubicacion, consulta,
		function (data, status) {
			//console.log(data);
			if (data == "" || data == null || data == "Fallo") datosProcesados = null;
			else datosProcesados = JSON.parse(data);
		});
	if (datosProcesados == null) return null;
	return datosProcesados;
}
//ubicacion=(await realizarConsulta("apis/busqueda/buscarUbicacion.php",{idUbicacion: objeto.Ubicacion_idUbicacion}))[0];

function addCliente(nombre, relevancia, idCliente) {


	var fila = document.createElement("tr");
	fila.setAttribute("id", idCliente);

	var nombreCliente = document.createElement("th");
	nombreCliente.setAttribute("scope", "row");
	nombreCliente.innerHTML = nombre;

	fila.append(nombreCliente);

	if (requisitos.length != 0) {
		for (k = 0; k < requisitos.length; k++) {
			var rec1 = document.createElement("td");
			var requisito1 = document.createElement("input");
			requisito1.setAttribute("id", "requisito_");
			requisito1.setAttribute("type", "text");
			requisito1.setAttribute("class", "form-control");
			rec1.append(requisito1);
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
}

function addRequisito(nombre, relevancia) {

	var long = requisitos[requisitos.length - 1];
	var etiqueta = "R" + (requisitos.length == 0 ? 0 : parseInt(long.idRequisito.substring(10, long.idRequisito.length - 1)));

	var nombreRequisito = document.createElement("th");
	nombreRequisito.setAttribute("scope", "col");
	nombreRequisito.innerHTML = etiqueta;

	var prioridadAux = $("#nombreColumnas .prioridadCliente");
	$("#nombreColumnas .prioridadCliente").remove();
	$("#nombreColumnas").append(nombreRequisito);
	$("#nombreColumnas").append(prioridadAux);

	var sumaEsfuerzo = document.createElement("td");


	if ($.isNumeric(relevancia)) {
		sumaEsfuerzo.innerHTML = relevancia;
	} else {
		sumaEsfuerzo.innerHTML = 0;
	}

	var prioridadTotal = $("#prioridadTotal");
	$("#prioridadTotal").remove();

	$("#esfuerzoRequisito").append(sumaEsfuerzo);
	$("#esfuerzoRequisito").append(prioridadTotal);

	for (j = 0; j < clientes.length; j++) {
		var rec1 = document.createElement("td");

		var requisito1 = document.createElement("input");
		requisito1.setAttribute("id", "requisito_");
		requisito1.setAttribute("type", "text");
		requisito1.setAttribute("class", "form-control");

		rec1.append(requisito1);

		$("#" + clientes[j].idCliente + " .relevancia").remove();

		var relevanciaCliente = document.createElement("td");
		relevanciaCliente.setAttribute("class", "relevancia");
		relevanciaCliente.innerHTML = clientes[j].relevancia;

		$("#" + clientes[j].idCliente).append(rec1);
		$("#" + clientes[j].idCliente).append(relevanciaCliente);
	}


	var requi = document.createElement("tr");
	var identifier = document.createElement("td");
	var nomReq = document.createElement("td");

	identifier.innerHTML = etiqueta;
	requi.append(identifier);

	nomReq.innerHTML = nombre;
	requi.append(nomReq);

	$("#tablaReq").append(requi);

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
		resuleto: 1
	};

	await anadirDato("Requisito", requisito);
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

	$("#" + cliente.idCliente + " :input").each(function () {
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
	if (clirec == 0) {
		$("#nombreAddModal").val("");
		$("#segundoCampo").text("Relevancia");
		$("#relevanciaAddModal").attr("placeholder", "Relevancia");
		$("#relevanciaAddModal").val("");
		$("#tituloModal").text("Añadir cliente");
		$("#añadirModal").attr("onclick", "crearCliente()");
	} else if (clirec == 2) {
		$("#nombreAddModal").val("");
		$("#segundoCampo").text("Límite de esfuerzo");
		$("#relevanciaAddModal").attr("placeholder", "Límite de esfuerzo");
		$("#relevanciaAddModal").val("");
		$("#tituloModal").text("Crear proyecto");
		$("#añadirModal").attr("onclick", "crearProyecto()");
	} else {
		$("#nombreAddModal").val("");
		$("#segundoCampo").text("Esfuerzo");
		$("#relevanciaAddModal").attr("placeholder", "Esfuerzo");
		$("#relevanciaAddModal").val("");
		$("#tituloModal").text("Añadir requisito");
		$("#añadirModal").attr("onclick", "crearRequisito()");
	}
	$("#ventanaFlotante").modal("show");
}

function hideModal() {
	$("#ventanaFlotante").modal("hide");
}

function calcularTodo() {

	var requisitosFinales = [];

	for (var i = 0; i < requisitos.length; i++) {
		requisitosFinales.push(addReqConValor(requisitos[i]));
	}
	var sol = calcularRequisitos(requisitosFinales, parseInt($("#limiteEsfuerzo").val()));

	$("#satisfaccionTotal").text(sol.maxValue);

	var esfuerzoFinal = 0;

	for (var i = 0; i < sol.subset.length; i++) {
		esfuerzoFinal += parseInt(sol.subset[i].esfuerzo);
	}

	$("#esfuerzoDesarrollo").text(esfuerzoFinal);

	var requisitosOptimos = "";
	for (var i = 0; i < sol.subset.length; i++) {
		requisitosOptimos += sol.subset[i].nombre;
		if (i < sol.subset.length - 1) {
			requisitosOptimos += ", ";
		}
	}

	$("#requisitosFinales").text(requisitosOptimos);


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
		nombre: requisito.etiqueta,
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
	$("#limiteEsfuerzo").val('');
});

function crearProyecto() {
	var nombre = $("#nombreAddModal").val();
	var limiteEsfuerzo = $("#relevanciaAddModal").val();

	if (nombre == "" || limiteEsfuerzo == "") return;

	anadirDato("Proyecto", { nombre: nombre, limiteEsfuerzo: limiteEsfuerzo });
}
var tablaCopiadisima = document.getElementById("resetearTabla");
async function cargarDatos() {
	//
	document.getElementById("resetearTabla").innerHTML="";
	$("#resetearTabla").append(tablaCopiadisima);
	//$("#tablaCopia").clone().appendTo($("#resetearTabla"));
	await cargarValores();

	if (clientes == null) clientes = [];
	if (relaciones == null) relaciones = [];
	if (requisitos == null) requisitos = [];
	if (valoraciones == null) valoraciones = [];

	if (requisitos.length != 0) {
		for (var r in requisitos) {
			await addRequisito(requisitos[r].nombre, requisitos[r].esfuerzo);
		}
	}
	if (clientes.length != 0) {
		for (var t in clientes) {
			await addCliente(clientes[t].nombre, clientes[t].relevancia, clientes[t].idCliente);
		}
	}

	if (valoraciones.length != 0) {
		var valores = [requisitos.length];
		for (o = 0; o < clientes.length; o++) {
			for (l = 0; l < requisitos.length; l++) {
				valores[l] = 0;
				for (h = 0; h < valoraciones.length; h++) {
					if (clientes[o].idCliente == valoraciones.Cliente_idCliente && requisitos[l].idRequisito == valoraciones.Requisito_idRequisito) {
						valores[l] = valoraciones[h];
						break;
					}
				}
			}
			asignarValorRequisitosCliente(clientes[o], valores);
		}
	}

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
	addCliente(nombre, relevancia);
}

async function crearRequisito() {
	var nombre = $("#nombreAddModal").val();
	var relevancia = $("#relevanciaAddModal").val();

	if (nombre == "" || relevancia == "") return;

	await anadirRequisito(nombre, relevancia);
	addRequisito(nombre, relevancia);
}