<head>
	<title>NRP-Decision</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/css/bootstrap.min.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
	<script src="js/proyectos.js"></script>
	<script src="database.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/js/bootstrap.bundle.min.js"></script>
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
</head>

<body style="background-color:#e1e9f4">


	<br>
	<div class="d-flex justify-content-center">
			<h2 class="font-weight-bold"> <u>Problema de la siguiente versión</u> </h2>
	</div>
	<br>

	<div class="d-flex justify-content-center">
		<div class="col-md-8 mb-3">

			<div>
				<button type="button" class="btn btn-block btn-outline-primary my-4" onclick="mostrarCreacionProyecto()">Crear proyecto
				</button>
				<table class="table table-sm" id="tabla">
					<h3>Tabla de proyectos</h3>
					<br>
					<thead>
						<tr>
							<th scope="col">Proyecto</th>
							<th scope="col">Opciones</th>
						</tr>
					</thead>
					<tbody id="filaProyectos">
					</tbody>

				</table>

			</div>
		</div>
	</div>

</body>

<div id="ventanaFlotante" class="modal" tabindex="-1" role="dialog">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div>
				<div class="m-2 w-100 text-content-center">
					<h4 class="text-center" id="tituloModal">Añadir</h4>
				</div>
				<div class="form-group m-1">
					<label for="formGroupExampleInput">Nombre</label>
					<input type="text" class="form-control" id="nombreAddModal" placeholder="Nombre">
				</div>
				<div class="form-group m-1">
					<label for="formGroupExampleInput2" id="segundoCampo">Límite esfuerzo</label>
					<input type="number" class="form-control" id="relevanciaAddModal" placeholder="Límite esfuerzo">
				</div>
				<div class="btn-group w-100">
					<button type="button" id="anadirModal" class="btn btn-primary m-2">Añadir</button>
					<button type="button" class="btn btn-secondary m-2" onclick="$('#ventanaFlotante').modal('hide')">Cancelar</button>
				</div>
			</div>

		</div>
	</div>
</div>
