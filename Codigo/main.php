<head>
	<title>NRP-Decision</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/css/bootstrap.min.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
	<script src="main.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/js/bootstrap.bundle.min.js"></script>
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
</head>

<body style="background-color:#fbedff">
	<br>
	<div class="d-flex justify-content-center">
		<div class="rounded-circle py-3 px-3" style="background-color: white">
			<h2 class="font-weight-bold"> Problema de la toma de decisiones </h2>
		</div>
	</div>
	<br>

	<div class="d-flex justify-content-center">
		<div class="col-md-8 mb-3">
			<form>
				<div class="form-group">
					<label>Introduce el límite de esfuerzo</label>
					<input type="text" class="form-control" id="limiteEsfuerzo" placeholder="Introduce el límite de esfuerzo">
				</div>
				<div class="form-group">
					<label>Introduce el límite de satisfacción</label>
					<input type="text" class="form-control" id="limiteSatisfaccion" placeholder="WIP debido a optimizaciones">
				</div>


				<input type="button" class="btn btn-block btn-primary" onclick="calcularTodo()" value="Calcular requisitos óptimos">

				<br><br>


				<div>
					<button type="button" class="btn btn-primary" onclick="showModal(true)">Añadir cliente
					</button>
					
					<button type="button" class="btn btn-primary" onclick="showModal(false)">Añadir requisito	
					</button>
					
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

				<div id="ventanaFlotante" class="modal">
					<!-- Modal content -->
					<div class="modal-content w-75">
						<h5 id="tituloModal">Añadir</h5>
						<form>
							<div class="form-group">
								<label for="formGroupExampleInput">Nombre</label>
								<input type="text" class="form-control" id="nombreAddModal" placeholder="Nombre">
							</div>
							<div class="form-group">
								<label for="formGroupExampleInput2" id="segundoCampo">Relevancia</label>
								<input type="number" class="form-control" id="relevanciaAddModal" placeholder="Relevancia">
							</div>
						</form>
						<div class="btn-group">
							<button type="button" id="añadirModal" class="btn btn-primary">Añadir</button>
							<button type="button" class="btn btn-primary" style="visibility:hidden"></button>
							<button type="button" class="btn btn-primary" onclick="hideModal()">Cancelar</button>
						</div>


					</div>
				</div>



				<br>
				<div class="d-flex justify-content-center">
					<div class="rounded-circle py-3 px-3" style="background-color: yellow">
						<h2 class="font-weight-bold"> Resultados </h2>
					</div>
				</div>
				<br>

				<div>
					<table class="table table-sm">
						<tbody>
							<tr>
								<th scope="row">Satisfacción</th>
								<td id="satisfaccionTotal">42</td>
							</tr>
							<tr>
								<th scope="row">Esfuerzo del desarrollo</th>
								<td id="esfuerzoDesarrollo">512</td>
							</tr>
							<tr>
								<th scope="row">Satisfacción dentro del límite de esfuerzo</th>
								<td id="satisfaccionDentroDelLimite">232</td>
							</tr>
							<tr>
								<th scope="row">Requisitos óptimos</th>
								<td id="requisitosFinales">R1, R2, R3</td>
							</tr>
						</tbody>
					</table>
				</div>

			</form>
		</div>
	</div>

</body>
