var clientes = [];
var requisitos = [];

function addCliente() {

	var nombre = $("#nombreAddModal").val();
	var relevancia = $("#relevanciaAddModal").val();

	var idFila = 1;
	//Configuro el id de las filas
	if (clientes.length != 0) idFila = clientes[clientes.length - 1].idFila + 1;

	var fila = document.createElement("tr");
	fila.setAttribute("id", idFila);

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
	relevanciaCliente.innerHTML = relevancia;

	fila.append(relevanciaCliente);

	anadirCliente(idFila, nombre, relevancia);
	$("#filaClientes").append(fila);
	hideModal();

}

function anadirCliente(idFila, nombre, relevancia) {
	//Genero el cliente y le asigno la id en la que va a pertenecer su fila
	var cliente = {
		idFila: idFila,
		nombre: nombre,
		relevancia: relevancia
	};

	clientes.push(cliente);
}

function addRequisito() {

	var nombre = $("#nombreAddModal").val();
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
	sumaEsfuerzo.innerHTML = $("#relevanciaAddModal").val();

	var prioridadTotal = $("#prioridadTotal");
	$("#prioridadTotal").remove();

	$("#esfuerzoRequisito").append(sumaEsfuerzo);
	$("#esfuerzoRequisito").append(prioridadTotal);

	anadirRequisito(etiqueta, nombre, sumaEsfuerzo.innerHTML);

	for (j = 0; j < clientes.length; j++) {
		var rec1 = document.createElement("td");

		var requisito1 = document.createElement("input");
		requisito1.setAttribute("id", "requisito_");
		requisito1.setAttribute("type", "text");
		requisito1.setAttribute("class", "form-control");

		rec1.append(requisito1);

		$("#" + clientes[j].idFila + " .relevancia").remove();

		var relevanciaCliente = document.createElement("td");
		relevanciaCliente.setAttribute("class", "relevancia");
		relevanciaCliente.innerHTML = clientes[j].relevancia;

		$("#" + clientes[j].idFila).append(rec1);
		$("#" + clientes[j].idFila).append(relevanciaCliente);
	}

	hideModal();
}

function asignarIdRequisito() {
	if (requisitos.length == 0) return 1;
	var requisitoAux = requisitos[requisitos.length - 1];
	return parseInt(requisitoAux.idRequisito.substring(10, requisitoAux.idRequisito.length - 1)) + 1;
}

function anadirRequisito(etiqueta, nombre, esfuerzo) {
	//Genero el cliente y le asigno la id en la que va a pertenecer su fila
	var requisito = {
		etiqueta: etiqueta,
		nombre: nombre,
		esfuerzo: esfuerzo,
		idRequisito: "requisito" + asignarIdRequisito()
	};

	requisitos.push(requisito);
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

	$("#" + cliente.idFila + " :input").each(function () {
		valores.push($(this).val());
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
	if (clirec) {
		$("#nombreAddModal").val("");
		$("#segundoCampo").text("Relevancia");
		$("#relevanciaAddModal").attr("placeholder", "Relevancia");
		$("#relevanciaAddModal").val("");
		$("#tituloModal").text("Añadir cliente");

		$("#añadirModal").attr("onclick", "addCliente()");
	} else {
		$("#nombreAddModal").val("");
		$("#segundoCampo").text("Esfuerzo");
		$("#relevanciaAddModal").attr("placeholder", "Esfuerzo");
		$("#relevanciaAddModal").val("");
		$("#tituloModal").text("Añadir requisito");

		$("#añadirModal").attr("onclick", "addRequisito()");
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

}

function addReqConValor(reqisito) {
	var req = {
		nombre: reqisito.etiqueta,
		esfuerzo: reqisito.esfuerzo, //w o peso
		satisfaccionDelRequisito: calcularSatisfaccionRequisito(reqisito) //la suma del (requisito * pesoDelCliente) de todos los clientes
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
