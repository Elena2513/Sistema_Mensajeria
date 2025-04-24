
var EntradaNacional = {

    //LISTADO DE ENTRADA NACIONAL
    Lista: function () {
        $.ajax({
            url: baseUrl + "/SMS_Entrada_Nacional/FiltrosEntradaNac",
            type: "GET",
            dataType: "JSON",
            data: {
                ReferenciaOCNEN: $("#EN_ReferenciaOCN").val(),
                nombrepersonaEN: document.getElementById("EN_Persona").value,
                tipodifusionEN: $("#EN_TipoDifusion").val(),
                motivodifusionEN: $("#EN_MotivoDifusion").val(),
                FInicioEN: $("#EN_Finicial").val(),
                FfinalEN: $("#EN_Ffinal").val(),
                TipoBusquedaEN: $("#TipoBusquedaEN").val()
            },
            beforeSend: function () {
                html = "<tr><td colspan='6' class='text-center '><i class='fa fa-spin spinner'></i><h5> Cargando... </h5></td></tr>"
                $("#Table-EntradaNac").html(html);
            }
        }).done(function (response) {

            indice = 0;
            if (response.length > 0) {
                html = "";
                $.each(response, function (index, value) {

                    indice++;
                    html += "<tr data-id='" + value.IdMensaje + "'>";
                    html += "<td>" + indice + "</td>";
                    html += "<td>" + json2Date(value.FechaMensaje) + "</td>";
                    html += "<td>" + value.remitente + "</td>";
                    html += "<td>" + json2Date(value.FechaIngreso) + "</td>";
                    html += "<td>" + value.TipoDifusion + "</td>";
                    html += "<td>" + value.motivodifusion + "</td>";
                    html += "<td>" + value.Delito + "</td>";
                    html += "<td>" + value.TipoTitulo + "</td>";
                    html += "<td>" + value.ReferenciaOCN + "</td>";
                    html += "<td>" + value.IdMsgReferencia + "</td>";
                    
                    if (parseInt(value.Prioridad) == 1) {
                        color = "btn-light text-dark";

                    } else if (parseInt(value.Prioridad) == 2) {
                        color = "btn-info text-light";

                    } else if (parseInt(value.Prioridad) == 3) {
                        color = "btn-warning text-dark";

                    } else {
                            color = "btn-danger text-light";
                            }


                    html += "<td><button type='button' class='btn mr-1 mb-1 " + color + " btn-sm btn-reportEN' data-index='" + value.IdMensaje + "'><i class='icon-files-o'> VER </button></td>";
                    html += "</tr>";
                });
                $("#Table-EntradaNac").html(html);
                $("#list-EntradaNacional").DataTable();
                $("#TtalEntradaNac").text(indice);
            } else {
                html = "<tr><td colspan='6' class='text-center '><i class='icon-arrow15'></i><h5> No tiene datos relacionado a su filtro</h5></td></tr>"
                $("#Table-EntradaNac").html(html);
            }
        })
    },

    LimpiarFiltro: function () {
        //Limpiar los controles del filtro
        $("#EN_ReferenciaOCN").val("");
        $("#EN_Persona").val("");
        $("#EN_TipoDifusion").val("");
        $("#EN_MotivoDifusion").val("");
        $("#TipoBusquedaEN").val("");
    },

    //Función para limpiar filtros de mensajeria
    LimpiarRegistrs: function () {
        //limpiar la sesión storage
        sessionStorage.clear();

        //Inicializar los arrays
        Delitos = [];
        Personas = [];
        Arma = [];
        Vehiculo = [];
        Aeronave = [];
        Pasaporte = [];

        $("#Fingreso").val("");
        $("#Fmensaje").val("");
        $("#TipoPrioridaEN").val("");
        $("#ViaRecepcionEN").val("");
        $("#EspecialidadEN").val("");
        $("#TipoDifusionEN").val("");
        $("#Motivo_DifusionEN").val("");
        $("#archivoEmail_EN").val("");
        this.ClearTablaPersons();
        this.ClearTablaDelits();
        this.ClearTableArma();
        this.ClearTableVehiculo();
        this.ClearTableAeronav();
        this.ClearTablePasaport()
    },

    ClearTablaPersons: function () {
        var tbody = document.getElementById("Tabla-PersonaEN")
        //Mientras el tbody tenga hijos los elimina
        while (tbody.firstChild) {
            tbody.removeChild(tbody.firstChild)
        }
    },

    ClearTablaDelits: function () {
        var tbody = document.getElementById("Tabla-DelitosEN")
        //Mientras el tbody tenga hijos los elimina
        while (tbody.firstChild) {
            tbody.removeChild(tbody.firstChild)
        }
    },

    ClearTableArma: function () {
        var tbody = document.getElementById("Table-ArmasEN")
        //Mientras el tbody tenga hijos los elimina
        while (tbody.firstChild) {
            tbody.removeChild(tbody.firstChild)
        }
    },

    ClearTableVehiculo: function () {
        var tbody = document.getElementById("Table-VehiculoEN")
        //Mientras el tbody tenga hijos los elimina
        while (tbody.firstChild) {
            tbody.removeChild(tbody.firstChild)
        }
    },

    ClearTableAeronav: function () {
        var tbody = document.getElementById("Table-AeronaveEN")
        //Mientras el tbody tenga hijos los elimina
        while (tbody.firstChild) {
            tbody.removeChild(tbody.firstChild)
        }
    },

    ClearTablePasaport: function () {
        var tbody = document.getElementById("Table-PasaporteEN")
        //Mientras el tbody tenga hijos los elimina
        while (tbody.firstChild) {
            tbody.removeChild(tbody.firstChild)
        }
    },


    //Cargar la lista de las personas de Entrada Nacional en el select de delitos
    CargarPersonas: function () {

        var valor = sessionStorage.getItem("EN_ListaPersonas");
        var obj = JSON.parse(valor);
        var html = "";
        obj.forEach(function (sujeto) {
            html += "<option value=" + sujeto.Id + ">" + sujeto.NombrePersona + "</option>";
        });

        $("#Delitos_IdPersona").html(html);
    }
}

$(function () {

    //Cargar Tipo de difusión Registro Entrada Nacional
    FuncionesGlobales.TipoDifusion("TipoDifusionEN");

    //Cargar el motivo de difusión en el panel Tipo y motivo de difusión.
    $("#TipoDifusionEN").change(function (e) {
        FuncionesGlobales.MotivoDifusion("Motivo_DifusionEN", $(this).val());
    });

    //Cargar Tipo de difusion en el Filtro --Bandeja de Entrada Nacional
    FuncionesGlobales.TipoDifusion("EN_TipoDifusion");

    //cargando el motivo de difusion de acuerdo al tipo del filtro -- Bandeja de Entrada Nacional
    $("#EN_TipoDifusion").change(function (e) {
        FuncionesGlobales.MotivoDifusion("EN_MotivoDifusion", $(this).val());
    });

    // Validar el Evento click del botón de filtro
    document.querySelector(".btn-FiltroEN").addEventListener("click", function () {
        // Validar los campos requeridos antes de enviar el formulario
        var tipoBusqueda = document.getElementById("TipoBusquedaEN").value;

        if (tipoBusqueda === "1" && !document.getElementById("EN_ReferenciaOCN").value.trim()) {
            alert("Por favor, complete el campo de ReferenciaOCN.");
        } else if (tipoBusqueda === "2" && !document.getElementById("EN_Persona").value.trim()) {
            alert("Por favor, complete el campo de persona involucrada.");
        } else if (tipoBusqueda === "3" && (!document.getElementById("EN_TipoDifusion").value.trim() /*|| !document.getElementById("SI_MotivoDifusion").value.trim()*/)) {
            alert("Por favor, complete los campos de tipo y motivo de difusión.");
        } else {
            // Aquí puedes enviar el formulario o realizar otras acciones según sea necesario
            // Ejemplo: document.getElementById("formulario").submit();
            EntradaNacional.Lista();
            EntradaNacional.LimpiarFiltro();
                  alert("Formulario enviado correctamente.");
               }        
    });


    //var CorreoAdjunto = null;
    var AdjuntarArchivo = null;

    // Maneja el evento de cambio del input de archivo para almacenar el archivo en una variable global
    document.getElementById('archivoEmail_EN').addEventListener('change', function (event) {
        AdjuntarArchivo = event.target.files[0];
    });

    //Maneja el evento del envío del formulario
    document.getElementById('Form_EntradaNac').addEventListener('submit', function (event) {
        event.preventDefault(); // Evita el envío del formulario por defecto

    
        //validar los campos 
        var isValid = true;
        var errorMessage = '';

        var fchaIngreso = document.getElementById('Fingreso').value;
        var fchaMsj = document.getElementById('Fmensaje').value;
        var tipoPrioridad = document.getElementById('TipoPrioridaEN').value;
        var viaRecep = document.getElementById('ViaRecepcionEN').value;
        var Especialidad = document.getElementById('EspecialidadEN').value;
        var tipoDifusión = document.getElementById('TipoDifusionEN').value;
        var MotivoDifusion = document.getElementById('Motivo_DifusionEN').value;

        if (!fchaIngreso) {
            isValid = false;
            errorMessage += 'Fecha de Ingreso es requerida.\n';
        }
        if (!fchaMsj) {
            isValid = false;
            errorMessage += 'Fecha de Mensaje es requerida.\n';
        }
        if (!tipoPrioridad) {
            isValid = false;
            errorMessage += 'Prioridad es requerida.\n';
        }
        if (!viaRecep) {
            isValid = false;
            errorMessage += 'Via de Recepción es requerida.\n';
        }
        if (!Especialidad) {
            isValid = false;
            errorMessage += 'Tipo Especialidad es requerida.\n';
        }
        if (!tipoDifusión) {
            isValid = false;
            errorMessage += 'Tipo de difusión es requerida.\n';
        }
        if (!MotivoDifusion) {
            isValid = false;
            errorMessage += 'Motivo de difusión es requerida.\n';
        }

        if (!isValid) {
            Swal.fire('Error', errorMessage, 'error');
            return;
        }

        var formData = new FormData(this);
        if (AdjuntarArchivo) {
            formData.append('AdjuntarArchivo', AdjuntarArchivo);
        }

        GuardarDtos(formData);

        // Cerrar el modal de registro
        //$("#Registro_EntradaNac").modal("hide");
    });

    function GuardarDtos(formData) {
        // Obtener datos de sessionStorage
        var persons = JSON.parse(sessionStorage.getItem("EN_ListaPersonas")) || [];
        var delitos = JSON.parse(sessionStorage.getItem("EN_ListaDelitos")) || [];
        var armas = JSON.parse(sessionStorage.getItem("EN_Armas")) || [];
        var vehiculos = JSON.parse(sessionStorage.getItem("EN_Vehiculos")) || [];
        var aeonave = JSON.parse(sessionStorage.getItem("EN_Aeronave")) || [];
        var pasaporte = JSON.parse(sessionStorage.getItem("EN_Pasaport")) || [];


        if (persons.length === 0) {
            Swal.fire(
                "¡Ingrese Persona!",
                "Personas",
                "info"
            );
        } else if (delitos.length === 0) {
            Swal.fire(
                "¡Ingrese delitos !",
                "Objetos",
                "info"
            );
        } else if (persons.length !== delitos.length) {
            Swal.fire(
                "¡La cantidad de Personas no Coinciden con los Delitos !",
                "",
                "info"
            );
        } else {
                    var coleccion_dtos = {
                        IdMsjReferencia: "",
                        ReferenciaOCN: "",
                        CodTipoDifusion: $("#TipoDifusionEN").val(),
                        CodViaRecepcion: document.getElementById("ViaRecepcionEN").selectedOptions[0].text,// $("#ViaRecepcionEN").val(), 
                        CodEstrucOrigen: $("#EspecialidadEN").val(), //Origen especialidad
                        CodEspecialidad: "",
                        CodEstruct_Solictnt: "",
                        FechaMensaje: $("#Fmensaje").val(),
                        FechaIngreso: $("#Fingreso").val(),
                        CodTipoEnvioMensaje: '0004',
                        Prioridad: $("#TipoPrioridaEN").val(),
                        CodMotivoDifusion: $("#Motivo_DifusionEN").val(),
                        NombreArchivo: $("#archivoEmail_EN").val(), // Obtener el nombre del archivo
                        CodEstado: "0001", //Activo
                        CodTipoConsulta: "",
                        Personas: JSON.stringify(persons), // Convertir a JSON string
                        Delitos: JSON.stringify(delitos), // Convertir a JSON string
                        Arma: JSON.stringify(armas),
                        Vehiculo: JSON.stringify(vehiculos),
                        Aeronave: JSON.stringify(aeonave),
                        Pasaporte: JSON.stringify(pasaporte),
                    };

                    // Añadir los datos a formData
                    for (var key in coleccion_dtos) {
                        formData.append(key, coleccion_dtos[key]);
                    }

                    // Enviar los datos mediante una solicitud AJAX
                    $.ajax({
                        url: baseUrl + "/GuardaSolicitud/Guardar",
                        type: 'POST',
                        data: formData,
                        processData: false,
                        contentType: false,
                        success: function (response) {
                            console.log(response);
                            if (response.success) {
                                // Aquí puedes añadir lógica para manejar un guardado exitoso
                            } else {
                                alert("Error al guardar la solicitud.");
                            }
                        },
                        error: function (error) {
                            console.log(error);
                            alert("Error al enviar la solicitud.");
                        }                         
                    });

                     Swal.fire("¡Registro Guardado con éxito !",
                         "",
                         "success");
               }

    }


})