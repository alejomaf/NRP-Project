<head>
	<title>NRP-Decision</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/css/bootstrap.min.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
	<script src="main.js"></script>
	<script src="js/relaciones.js"></script>
	<script src="database.js"></script>
	<script src="pestanas.js"></script>
	<script src="js/metricas.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/js/bootstrap.bundle.min.js"></script>
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">

	<style>
		/* Set height of body and the document to 100% to enable "full page tabs" */
		body,
		html {
			height: 100%;
			margin: 0;
			font-family: Arial;
		}

		/* Style tab links */
		.tablink {
			background-color: #BBB;
			color: black;
			float: left;
			border: none;
			outline: none;
			cursor: pointer;
			padding: 14px 16px;
			font-size: 17px;
			width: 20%;
		}

		.tablink:hover {
			background-color: #777;
		}

		/* Style the tab content (and add height:100% for full page content) */
		.tabcontent {
			color: black;
			display: none;
			padding: 100px 20px;
			height: 100%;
		}

		/* Style the tab buttons */
		.tablink2 {
			background-color: #555;
			color: white;
			float: left;
			border: none;
			outline: none;
			cursor: pointer;
			padding: 14px 16px;
			font-size: 17px;
			width: 33%;
		}

		/* Change background color of buttons on hover */
		.tablink2:hover {
			background-color: #777;
		}

		/* Set default styles for tab content */
		.tabcontent2 {
			color: white;
			display: none;
			padding: 50px;
			text-align: center;
		}

	</style>
</head>

<script>
	var idProyecto = <?php echo $_GET["idProyecto"]; ?>;

</script>

<body style="background-color:#fbedff">


	<div class="d-flex justify-content-center">
		<div class="rounded-circle py-3 px-3" style="background-color: #fbedff" align="center">
			<h3> Problema de la siguiente versión </h3>
			<h1 class="font-weight-bold" id="nomProyecto"></h1>
			<h5 id="limiteEsfuerzo"></h5>
		</div>
	</div>

	<button class="tablink" onclick="openPage('Calculo', this, 'FFF9AA')" id="defaultOpen">Calculo</button>
	<button class="tablink" onclick="openPage('Resultado', this, 'FFBFBF')">Resultado</button>
	<button class="tablink" onclick="openPage('Requisitos', this, 'BFD1EA')">Requisitos</button>
	<button class="tablink" onclick="openPage('Metricas', this, 'CCC8EE')">Metricas</button>
	<button class="tablink" onclick="openPage('Relaciones', this, 'BFEDBF')">Relaciones</button>


	<div id="Calculo" class="tabcontent">
		<div class="d-flex justify-content-center">
			<div class="col-md-8 mb-3">
				<div>
					<div class="btn btn-group w-100">
						<button type="button" class="btn btn-primary mx-2" onclick="showModal(0)">Añadir cliente
						</button>

						<button type="button" class="btn btn-primary mx-2" onclick="showModal(1)">Añadir requisito
						</button>

						<button type="submit" class="btn btn-primary mx-2" onclick="showModal(3)">Guardar
						</button>
					</div>
					<br><br>
					<table class="table table-sm" id="tabla">
						<h3>Tabla de valores</h3><br>
						<thead>
							<tr id="nombreColumnas">
								<th scope="col">Clientes</th>
								<th scope="col" class="prioridadCliente">Wi</th>
							</tr>
						</thead>
						<tbody id="filaClientes">
							<!--Siempre última fila-->
						</tbody>
						<tr id="esfuerzoRequisito">
							<!--Siempre el mismo valor-->
							<th scope="row">Ef</th>
							<td id="prioridadTotal">X</td>
						</tr>
					</table>

				</div>

				<br>
				<input type="button" class="btn btn-block btn-primary" onclick="calcularTodo()" value="Calcular requisitos óptimos">
				<br>
			</div>
		</div>
	</div>
	<div id="Resultado" class="tabcontent">
		<div class="d-flex justify-content-center">
			<div class="rounded-circle py-3 px-3" style="background-color: #fbedff">
				<h2 class="font-weight-bold"> Resultados </h2>
			</div>
		</div>
		<br>

		<div>
			<table class="table table-sm">
				<tbody>
					<tr>
						<th scope="row">Esfuerzo del desarrollo</th>
						<td id="esfuerzoDesarrollo"></td>
					</tr>
					<tr>
						<th scope="row">Satisfacción dentro del límite de esfuerzo</th>
						<td id="satisfaccionTotal"></td>
					</tr>
					<tr>
						<th scope="row">Requisitos óptimos</th>
						<td id="requisitosFinales"></td>
					</tr>
				</tbody>
			</table>

			<input type="button" class="btn btn-block btn-primary" onclick="showModal(4)" value="Marcar requisitos optimos" id="guardarSolucion" hidden=true>
		</div>
	</div>

	<!--TABLA DE LEYENDA DE REQUISITOS-->
	<br>
	<div id="Requisitos" class="tabcontent">
		<div class="d-flex justify-content-center">
			<h2 class="font-weight-bold"> Requisitos </h2>
		</div>
		<br>

		<div>
			<table class="table table-sm" id="tablaReq">
				<tr>
					<th scope="row">Identificador</th>
					<th id="esfuerzoDesarrollo">Requisito</th>
				</tr>
			</table>
		</div>
	</div>
	<!--TABLA DE METRICA DE CALIDAD-->

	<button class="tablink2" onclick="openMetrica('prod', this, 'green')">Productividad</button>
	<button class="tablink2" onclick="openMetrica('cont', this, 'blue')">Contribucion</button>
	<button class="tablink2" onclick="openMetrica('cobe', this, 'orange')">Cobertura</button>

	<div id="Metricas" class="tabcontent">
		<br>
		<div class="d-flex justify-content-center">
			<div class="rounded-circle py-3 px-3" style="background-color: #fbedff">
				<h2 class="font-weight-bold"> Metricas de calidad </h2>
			</div>
		</div>
		<br>
		<div id="prod" class="tabcontent2">
			<div class="d-flex justify-content-center">
				<div id="prod" class="rounded-circle py-3 px-3" style="background-color: #fbedff">
					<h3 class="font-weight-bold"> Productividad </h3>

					<h5 id="productividad"></h5>

				</div>
			</div>
			<div>
			</div>

			<div id="cont" class="tabcontent2">
				<div class="d-flex justify-content-center">
					<div class="rounded-circle py-3 px-3" style="background-color: #fbedff">
						<h3 class="font-weight-bold"> Contribucion </h3>
					</div>
				</div>
				<table id="cobertura" class="table table-sm">
					<tbody id="filaContribucion">

					</tbody>
				</table>
			</div>
			<div id="cobe" class="tabcontent2">
				<div class="d-flex justify-content-center">
					<div class="rounded-circle py-3 px-3" style="background-color: #fbedff">
						<h3 class="font-weight-bold"> Cobertura </h3>
					</div>
				</div>

				<table id="contribucion" class="table table-sm">
					<tbody id="filaCobertura">

					</tbody>
				</table>
			</div>
		</div>
	</div>
	<!--TABLA DE RELACIONES-->
	<div id="Relaciones" class="tabcontent">
		<br>
		<div class="d-flex justify-content-center">
			<h2 class="font-weight-bold"> Relaciones </h2>
		</div>
		<br>

		<table class="table table-sm">
			<tbody>
				<tr>
					<td><select id="requisitosRelaciones1" class="custom-select" onchange="seleccionarRequisito();">
							<option value=-1>Selecciona un requisito</option>
						</select></td>
					<td><select id="requisitosRelaciones2" class="custom-select">
							<option value=-1>Selecciona el requisito</option>
						</select></td>
					<td><select id="tipoRelaciones" class="custom-select">
							<option value=-1>Selecciona la relación</option>
							<option value=0>Implicación</option>
							<option value=1>Combinación</option>
							<option value=2>Exclusión</option>
						</select></td>
				</tr>
			</tbody>
		</table>
		<button type="button" class="btn btn-primary btn-block" onclick="crearRelacion()">Crear relación</button>
		<!--TABLA DE RELACIONES CREADAS-->
		<br>
		<div class="d-flex justify-content-center">
			<h4 class="font-weight-bold"> Relaciones creadas </h4>
		</div>
		<br>

		<table class="table table-sm">
			<tbody id="tablaRelaciones">
			</tbody>
		</table>
	</div>

	<br>


	<div id="relationModal" class="modal" tabindex="-1" role="dialog">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div>
					<div class="m-2 w-100 text-content-center">
						<h4 class="text-center">Modificar o eliminar relación</h4>
					</div>
					<div class="form-group m-1">
						<select id="tipoRelacionesModificar" class="custom-select">
							<option value=0>Implicación</option>
							<option value=1>Combinación</option>
							<option value=2>Exclusión</option>
						</select></td>
					</div>
					<div class="btn-group w-100">
						<button type="button" id="modificarRelacion" class="btn btn-primary m-2">Modificar relación</button>
						<button type="button" class="btn btn-danger m-2" id="eliminarRelacion">Eliminar</button>
					</div>
				</div>

			</div>
		</div>
	</div>

	<div id="ventanaFlotante" class="modal" tabindex="-1" role="dialog">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div>
					<div class="m-2 w-100 text-content-center">
						<h4 class="text-center" id="tituloModal">Añadir</h4>
					</div>
					<div class="form-group m-1">
						<label for="formGroupExampleInput" id="primerCampo">Nombre</label>
						<input type="text" class="form-control" id="nombreAddModal" placeholder="Nombre">
					</div>
					<div class="form-group m-1">
						<label for="formGroupExampleInput2" id="segundoCampo">Relevancia</label>
						<input type="number" class="form-control" id="relevanciaAddModal" placeholder="Relevancia">
					</div>
					<div class="btn-group w-100">
						<button type="button" id="añadirModal" class="btn btn-primary m-2">Añadir</button>
						<button type="button" class="btn btn-secondary m-2" onclick="hideModal()">Cancelar</button>
					</div>
				</div>

			</div>
		</div>
	</div>

</body>

<div id="informacionObjeto" class="modal" tabindex="-1" role="dialog">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div>
				<div class="m-2 w-100 text-content-center">
					<h4 class="text-center" id="tituloModalInfo">Modificar o eliminar elemento</h4>
				</div>
				<div class="form-group m-1">
					<label for="formGroupExampleInput" id="nombreNameInfo">Nombre</label>
					<input type="text" class="form-control" id="nombreInfo">
				</div>
				<div class="form-group m-1">
					<label for="formGroupExampleInput2" id="relevanciaNameInfo">Relevancia</label>
					<input type="number" class="form-control" id="relevanciaInfo">
				</div>
				<div id="formularioResuelto" class="form-check">
					<input class="form-check-input" type="checkbox" value="" id="resueltoInfo">
					<label class="form-check-label">
						Resuelto
					</label>
				</div>
				<div class="btn-group w-100">
					<button type="button" id="editInfo" class="btn btn-primary m-2">Modificar</button>
					<button type="button" id="delInfo" class="btn btn-danger m-2">Eliminar</button>
				</div>
			</div>

		</div>
	</div>
</div>
