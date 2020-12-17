async function cargarBotones() {
    for (var r in requisitos) {
        addBoton($("#requisitosRelaciones1"), requisitos[r]);
    }
    $("#requisitosRelaciones2").hide();
    cargarRelaciones();
}
async function addBoton(lugar, requisito) {
    var option = document.createElement("option");
    option.setAttribute("value", requisito.idRequisito);
    option.innerHTML = requisito.nombre;

    lugar.append(option);
}

async function seleccionarRequisito() {
    var idReqSel = $("#requisitosRelaciones1").children("option:selected").val();
    $("#requisitosRelaciones2").html("");
    addBoton($("#requisitosRelaciones2"), { idRequisito: -1, nombre: "Selecciona el requisito" });

    if (idReqSel == -1) {
        $("#requisitosRelaciones2").hide();
        return;
    }
    $("#requisitosRelaciones2").show();
    for (var r in requisitos) {
        if (await tieneRelacion(requisitos[r])) {
            if (requisitos[r].idRequisito != idReqSel)
                addBoton($("#requisitosRelaciones2"), requisitos[r]);
        }
    }
}

async function tieneRelacion(requisito) {
    for (var r in relaciones) {
        if (relaciones[r].Requisito_idRequisito == requisito.idRequisito || relaciones[r].Requisito_idRequisito1 == requisito.idRequisito) return false;
    }
    return true;
}

async function cargarRelaciones() {
    for (var r in relaciones) {
        var image = document.createElement("img");
        var relacion = await relaciones[r].relacion;
        switch (relacion) {
            case "0":
                image.setAttribute("src", "images/arrowRight.png");
                break;
            case "1":
                image.setAttribute("src", "images/doubleArrow.png");
                break;
            case "2":
                image.setAttribute("src", "images/arrowRightN.png");
                break;
        }
        var tr = document.createElement("tr");
        tr.setAttribute("style", "cursor:pointer");
        tr.setAttribute("onclick", "modalModificarRelacion(" + relaciones[r].idRelacion + ")")
        var td = document.createElement("td");
        td.setAttribute("class", "align-middle");
        td.innerHTML = await cogerRequisito(relaciones[r].Requisito_idRequisito);

        var td2 = document.createElement("td");
        td2.setAttribute("class", "align-middle");

        td2.append(image);

        var td3 = await document.createElement("td");
        td3.setAttribute("class", "align-middle");
        td3.innerHTML = await cogerRequisito(relaciones[r].Requisito_idRequisito1);

        tr.append(td);
        tr.append(td2);
        tr.append(td3);

        $("#tablaRelaciones").append(tr);
    }
}

async function modalModificarRelacion(idRelacion) {
    $('#relationModal').modal('show');
    relacion = await cogerRelacion(idRelacion);
    $("#tipoRelacionesModificar").val(relacion.relacion);
    $("#modificarRelacion").attr("onclick", "modificarRelacion(" + idRelacion + "," + relacion.relacion + ")")
    $("#eliminarRelacion").attr("onclick", "eliminarRelacion(" + idRelacion + ")");
}

async function cogerRequisito(idRequisito) {
    for (var req in requisitos) {
        if (requisitos[req].idRequisito == idRequisito) {
            var texto = requisitos[req].nombre
            return texto;
        }
    }
    return "";
}
async function cogerRelacion(idRelacion) {
    for (var rel in relaciones) {
        if (relaciones[rel].idRelacion == idRelacion) {
            return relaciones[rel];
        }
    }
    return null;
}


async function crearRelacion() {
    var Requisito_idRequisito = $("#requisitosRelaciones1").children("option:selected").val();
    var Requisito_idRequisito1 = $("#requisitosRelaciones2").children("option:selected").val();
    var relacion = $("#tipoRelaciones").children("option:selected").val();

    if (Requisito_idRequisito == -1 || Requisito_idRequisito1 == -1 || relacion == -1) return;

    relacionAux = { Requisito_idRequisito: Requisito_idRequisito, Requisito_idRequisito1: Requisito_idRequisito1, relacion: relacion, Proyecto_idProyecto: idProyecto };
    await anadirDato("Relacion", relacionAux);
    location.reload();
}
async function modificarRelacion(idRelacion, relacion) {
    relacionSel = $("#tipoRelacionesModificar").val();
    if (relacionSel == relacion) return;
    relacionAux = { idRelacion: idRelacion, relacion: relacionSel };
    await actualizarDato("Relacion", relacionAux);
    location.reload();
}
async function eliminarRelacion(idRelacion) {
    relacionAux = { idRelacion: idRelacion };
    await eliminarDato("Relacion", relacionAux);
    location.reload();
}

async function accionARealizar(idRequisito, idRequisito1) {
    for (var r in relaciones) {
        if (relaciones[r].idRequisito == idRequisito && relaciones[r].idRequisito1 == idRequisito1) {
            return relaciones[r].idRelacion;
        }
    }
    return -1;
}

async function gestionRelacion(tipoRelacion, tipo, requisito, requisito2) {
    var requisito = requisitos[requisito];
    var requisito2 = requisitos[requisito2];

    if (tipoRelacion != -1) var relacion = relaciones[tipoRelacion];

    if (tipoRelacion == -1) {
        if (tipo == 1) {
            await crearRelacion(requisito, requisito2, tipo);
        } else if (tipo == -1) return;
        else {
            await crearRelacion(requisito, requisito2, tipo);
        }
    } else if (tipoRelacion == 1) {
        if (tipo == -1) {
            await eliminarRelacion(relacion.idRelacion);
            await eliminarRelacion(buscarPar(relacion).idRelacion);
        } else if (tipo == 1) {
            return;
        } else {
            await modificarRelacion(relacion.idRelacion, tipo);
        }
    } else {
        if (tipo == -1) {
            await eliminarRelacion(relacion.idRelacion);
        } else {
            await modificarRelacion(relacion.idRelacion, tipo);
        }
    }
    location.reload();
}

async function buscarPar(relacion) {
    for (var r in relaciones) {
        if (relaciones[r].Requisito_idRequisito == relacion.Requisito_idRequisito1 && relaciones[r].Requisito_idRequisito1 == relacion.Requisito_idRequisito) return relaciones[r];
    }
    return null;
}

async function inicializarRelaciones() {
    for (var r in requisitos) {
        await addRequisitoRelacion(requisitos[r].nombre, requisitos[r].esfuerzo, requisitos[r].idRequisito);
    }
    for (var r in requisitos) {
        await addClienteRelacion(requisitos[r].esfuerzo, requisitos[r].idRequisito, r);
    }
}
