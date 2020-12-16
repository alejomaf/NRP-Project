<head>
	<title>NRP-Decision</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/css/bootstrap.min.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
	<script src="main.js"></script>
	<script src="database.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/js/bootstrap.bundle.min.js"></script>
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
</head>

<script>
	var idProyecto = <?php echo $_GET["idProyecto"]; ?>;
</script>

<body style="background-color:#fbedff">


	<br>
	<div class="d-flex justify-content-center">
		<div class="rounded-circle py-3 px-3" style="background-color: #fbedff">
			<h2 class="font-weight-bold"> Problema de la siguiente versión </h2>
		</div>
	</div>
	<br>

	<div class="d-flex justify-content-center">
		<div class="col-md-8 mb-3">
			<div class="form-group">
				<label>Introduce el límite de esfuerzo</label>
				<input type="text" class="form-control" id="limiteEsfuerzo" placeholder="Introduce el límite de esfuerzo">
			</div>
			<div class="form-group">
				<label>Introduce el límite de satisfacción</label>
				<input type="text" class="form-control" id="limiteSatisfaccion" placeholder="WIP debido a optimizaciones">
			</div>

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
						<!--
						<tr>
							<th scope="row">Cobertura de los requisitos</th>
							<td id="productividad">WIP</td>
						</tr>

						<tr>
							<th scope="row">Cliente que más contribuye</th>
							<td id="contribucion"></td>
						</tr>
-->
					</tbody>
				</table>
			</div>

			<br>
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


			<!--TABLA DE RELACIONES-->
			<br>
			<div class="d-flex justify-content-center">
				<h2 class="font-weight-bold"> Relaciones </h2>
			</div>
			<br>

			<table class="table table-sm" id="tablaRelaciones">
				<thead>
					<tr id="nombreColumnasRelaciones">
						<th scope="col">Clientes\Relaciones</th>
						<th scope="col" class="prioridadClienteRelacion">Wi</th>
					</tr>
				</thead>
				<tbody id="filaClientesRelaciones">
					<tr id="esfuerzoRequisitoRelacion">
						<!--Siempre el mismo valor-->
						<th scope="row">Ef</th>
						<td id="prioridadTotalRelacion">X</td>
					</tr>
				</tbody>
			</table>
					
		</div>
	</div>

	<br>



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