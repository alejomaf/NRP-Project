function calcularProductividad(esfuerzo, satisfaccion) {
	//satisfaccion total entre esfuerzo total. Por cada requisito de la solucion.
	$("#productividad").text(satisfaccion / esfuerzo);


}

function calcularContribucion(satis) {
	//satisfaccion de cada cliente entre la satisfaccion total

	for (c in clientes) {

		var soluciones = calcularSolucion();
		var satisfaccionCliente = 0;
		for (s in soluciones[0].subset) {

			satisfaccionCliente += (valoraciones[c][soluciones[0].subset[s].posicion].valoracion) * clientes[c].relevancia;
		}

		for (s in soluciones[1]) {

			satisfaccionCliente += (valoraciones[c][soluciones[1][s].posicion].valoracion) * clientes[c].relevancia;
		}

		console.log(satisfaccionCliente);


		var fila = document.createElement("tr");
		fila.setAttribute("id", "filaContribucion_" + clientes[c].idCliente);

		var nombreCliente = document.createElement("th");

		nombreCliente.setAttribute("scope", "row");
		nombreCliente.innerHTML = clientes[c].nombre;

		fila.append(nombreCliente);

		var rec1 = document.createElement("td");
		var texto = Math.round(((satisfaccionCliente / satis) + Number.EPSILON) * 100);

		rec1.innerHTML = texto + " %";
		fila.append(rec1);
		$("#filaContribucion").append(fila);

	}
}



function calcularCobertura() {
	//lista de clientes
	//las valoraciones de lor req de la solucion entre el total de valoraciones del req

	for (c in clientes) {

		var soluciones = calcularSolucion();
		var valoracionCliente = 0;
		var valoracionSolucion = 0;
		for (s in soluciones[0].subset) {
			valoracionSolucion += parseInt(valoraciones[c][soluciones[0].subset[s].posicion].valoracion);
		}
		
		for (s in soluciones[1]) {
			valoracionSolucion += parseInt(valoraciones[c][soluciones[1][s].posicion].valoracion);
		}
		
		var valAux = cogerValorRequisitosCliente(clientes[c])
		for (v in valAux) {
			valoracionCliente += parseInt(valAux[v]);
		}
		

		var fila = document.createElement("tr");
		fila.setAttribute("id", "filaCobertura_" + clientes[c].idCliente);

		var nombreCliente = document.createElement("th");

		nombreCliente.setAttribute("scope", "row");
		nombreCliente.innerHTML = clientes[c].nombre;

		fila.append(nombreCliente);

		var rec1 = document.createElement("td");
		var texto = Math.round(((valoracionSolucion / valoracionCliente) + Number.EPSILON) * 100);

		rec1.innerHTML = texto + " %";
		fila.append(rec1);
		$("#filaCobertura").append(fila);

	}
}
