
var proyectos = [];

async function cargarProyectos(){
    proyectos = await realizarConsulta("api/busqueda/buscarProyecto.php", {
        nombre: "%"
    });
    if (proyectos == null) proyectos = [];

    for(var p in proyectos){
        var tr=document.createElement("tr");
        var a=document.createElement("a");
        a.setAttribute("href","main.php?idProyecto="+proyectos[p].idProyecto);
        a.innerHTML = proyectos[p].nombre;
        var td=document.createElement("td");
        var btn1=document.createElement("button");
        btn1.setAttribute("type","button");
        btn1.setAttribute("class","btn btn-primary mx-2");
        btn1.setAttribute("onclick","showModalProyecto(true,"+p+")");
        btn1.innerHTML = "Modificar";
        var btn2=document.createElement("button");
        btn2.setAttribute("type","button");
        btn2.setAttribute("class","btn btn-primary mx-2");
        btn2.setAttribute("onclick","showModalProyecto(false,"+p+")");
        btn2.innerHTML = "Eliminar";

        
        td.append(a);
        td.append(btn1);
        td.append(btn2);
        tr.append(td);
        $("#filaProyectos").append(tr);
    }
}

async function showModalProyecto(tipo, pos){
    proyecto = await proyectos[pos];
    if(tipo){
        $("#tituloModal").text("Modificar proyecto");
        $("#anadirModal").text("Modificar");
        $("#nombreAddModal").val(proyecto.nombre);
        $("#relevanciaAddModal").val(proyecto.limiteEsfuerzo);
        $("#anadirModal").attr("onclick","modificarProyecto("+pos+")");
        $("#ventanaFlotante").modal("show");
    }else{
        await eliminarDato("Proyecto",{idProyecto:proyecto.idProyecto});
        location.reload();
    }
}

async function modificarProyecto(pos){
    var proyectoAntiguo =proyectos[pos];
    var nombre= $("#nombreAddModal").val();
    var relevancia = $("#relevanciaAddModal").val();

    if(nombre==""||relevancia==""||(nombre==proyectoAntiguo.nombre&&relevancia==proyectoAntiguo.relevancia)) return;
    await actualizarDato("Proyecto",{idProyecto:proyectoAntiguo.idProyecto, nombre:nombre, relevancia:relevancia});
    location.reload();
}

function mostrarCreacionProyecto(){
    $("#tituloModal").text("Crear proyecto");
    $("#anadirModal").text("Crear");
        $("#nombreAddModal").val("");
        $("#relevanciaAddModal").val("");
        $("#anadirModal").attr("onclick","crearProyecto()");

    $("#ventanaFlotante").modal("show");

}

function crearProyecto() {
	var nombre = $("#nombreAddModal").val();
	var limiteEsfuerzo = $("#relevanciaAddModal").val();

	if (nombre == "" || limiteEsfuerzo == "") return;

	anadirDato("Proyecto", {
		nombre: nombre,
		limiteEsfuerzo: limiteEsfuerzo
    });
    
    location.reload();
}
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

cargarProyectos();