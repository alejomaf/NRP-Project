function addRequisitoRelacion(nombre, relevancia, idRequisito, resuelto) {

	var long = requisitos[requisitos.length - 1];
	var etiqueta = "R" + (requisitos.length == 0 ? 0 : parseInt(idRequisito));


	//añade la columna en la penultima
	var nombreRequisito = document.createElement("th");

	nombreRequisito.setAttribute("scope", "col");
	nombreRequisito.innerHTML = etiqueta;

	var prioridadAux = $("#nombreColumnasRelaciones .prioridadClienteRelacion");
	$("#nombreColumnasRelaciones .prioridadClienteRelacion").remove();
	$("#nombreColumnasRelaciones").append(nombreRequisito);
	$("#nombreColumnasRelaciones").append(prioridadAux);
	/////////////////////////////////////////////////////////////

	//añade el esfuerzo del requisito al final de la columna
	var esfuerzoReq = document.createElement("td");

	if ($.isNumeric(relevancia)) {
		esfuerzoReq.innerHTML = relevancia;
	} else {
		esfuerzoReq.innerHTML = 0;
	}

	var prioridadTotalRelacion = $("#prioridadTotalRelacion");
	$("#prioridadTotalRelacion").remove();

	$("#esfuerzoRequisitoRelacion").append(esfuerzoReq);
	$("#esfuerzoRequisitoRelacion").append(prioridadTotalRelacion);
	//////////////////////////////////////////////////////////////

	//añade los inputs por cada cliente
	//if (!cargando)
	for (j = 0; j < clientes.length; j++) {
		var rec1 = document.createElement("td");

		var requisito1 = document.createElement("input");
		requisito1.setAttribute("id", "sinGuardar");
		requisito1.setAttribute("type", "text");
		requisito1.setAttribute("class", "form-control");
		requisito1.value = "0";

		rec1.append(requisito1);

		$("#" + clientes[j].idCliente + " .relevancia").remove();

		var relevanciaCliente = document.createElement("td");
		relevanciaCliente.setAttribute("class", "relevancia");
		relevanciaCliente.innerHTML = clientes[j].relevancia;

		$("#" + clientes[j].idCliente).append(rec1);
		$("#" + clientes[j].idCliente).append(relevanciaCliente);
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

function addClienteRelacion(nombre, relevancia, idCliente) {

	var fila = document.createElement("tr");
	fila.setAttribute("id", idCliente);

	var nombreCliente = document.createElement("th");
	nombreCliente.setAttribute("style", "cursor:pointer");
	nombreCliente.setAttribute("onclick", "verInformacion(0,'" + nombre + "'," + relevancia + ", " + idCliente + ",null)");
	//ANADIR ONCLICK

	nombreCliente.setAttribute("scope", "row");
	nombreCliente.innerHTML = nombre;

	fila.append(nombreCliente);

	if (requisitos.length != 0) {
		for (k = 0; k < requisitos.length; k++) {
			var rec1 = document.createElement("td");
			var requisito1 = document.createElement("input");
			console.log($("#filaClientesRelaciones").size);
			requisito1.setAttribute("id", valoraciones[0][k].idValoracion);
			requisito1.setAttribute("type", "text");
			requisito1.setAttribute("class", "form-control");
			requisito1.value = valoraciones[$("#filaClientesRelaciones tr").length][k].valoracion;

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

	$("#filaClientesRelaciones").append(fila);
	hideModal();

}