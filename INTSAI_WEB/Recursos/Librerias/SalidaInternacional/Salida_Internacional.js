
var SalidaInternacional = {

    //LISTADO DE SALIDAS INTERNACIONALES
    Listado: function () {
        $.ajax({
            url: baseUrl + "/SMS_Salida_Internac/FiltroMsj",
            type: "GET",
            dataType: "JSON",
            data: {
                ReferenciaOCNSI: $("#SI_ReferenciaOCN").val(),
                nombrepersonaSI: document.getElementById("SI_Persona").value,
                tipodifusionSI: $("#SI_TipoDifusion").val(),
                motivodifusionSI: $("#SI_MotivoDifusion").val(),
                Finicio: $("#fechaInicial").val(),
                Ffinal: $("#fechaFinal").val(),
                TipoBusquedaSI: $("#TipoBusqueda").val()
            },
            beforeSend: function () {
                html = "<tr><td colspan='6' class='text-center '><i class='fa fa-spin spinner'></i><h5> Cargando... </h5></td></tr>"
                $("#Table-SalidaInternacional").html(html);
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

                    html += "<td><button type='button' class='btn mr-1 mb-1 "+ color +" btn-sm btn-report' data-index='" + value.IdMensaje + "'><i class='icon-files-o'> VER </button></td>";
                    html += "</tr>";
                });
                $("#Table-SalidaInternacional").html(html);
                $("#list-SalidaInternacional").DataTable();
                $("#TotalSalidaInt").text(indice);
            } else {
                html = "<tr><td colspan='6' class='text-center '><i class='icon-arrow15'></i><h5> No tiene datos relacionado a su filtro</h5></td></tr>"
                $("#Table-SalidaInternacional").html(html);
            }

        })
    },

    LimpiarFiltro: function () {
        //Limpiar los controles del filtro
        $("#SI_ReferenciaOCN").val("");
        $("#SI_Persona").val("");
        $("#SI_TipoDifusion").val("");
        $("#SI_MotivoDifusion").val("");
        $("#TipoBusqueda").val("");
    },

    Clear_RegistroSI: function () {
        //LIMPIAR LA SESSION STORAGE
        sessionStorage.clear();

        //Inicializar los arrays
        Delitos = [];
        Personas = [];
        Arma = [];
        Vehiculo = [];
        Aeronave = [];
        Pasaporte = [];

        $("#FechIngreso").val("");
        $("#FechMensaje").val("");
        $("#Referencia_SI").val("");
        $("#MReferenciaOCN_SI").val("");
        $("#ViaRecepcion").val("");
        $("#EstSolicitnt").val("");
        $("#TipoPrioridad").val("");
        $("#TipoDif").val("");
        $("#MotivoDif").val("");
        $("#TipoEspecialidad").val("");
        $("#email_SI").val("");
        this.ClearTablePers();
        this.ClearTbleDelits();
        this.ClearTableArma();
        this.ClearTableVehiculo();
        this.ClearTableAeronav();
        this.ClearTablePasaport()
    },

    ClearTablePers: function () {
        var tbody = document.getElementById("Table-PersonasSI")
        //Mientras el tbody tenga hijos los elimina
        while (tbody.firstChild) {
            tbody.removeChild(tbody.firstChild)
        }
    },

    ClearTbleDelits: function () {
        var tbody = document.getElementById("Tabla-DelitosSI")
        //Mientras el tbody tenga hijos los elimina
        while (tbody.firstChild) {
            tbody.removeChild(tbody.firstChild)
        }
    },

    ClearTableArma: function () {
        var tbody = document.getElementById("Table-ArmasSI")
        //Mientras el tbody tenga hijos los elimina
        while (tbody.firstChild) {
            tbody.removeChild(tbody.firstChild)
        }
    },

    ClearTableVehiculo: function () {
        var tbody = document.getElementById("Table-VehiculoSI")
        //Mientras el tbody tenga hijos los elimina
        while (tbody.firstChild) {
            tbody.removeChild(tbody.firstChild)
        }
    },

    ClearTableAeronav: function () {
        var tbody = document.getElementById("Table-AeronaveSI")
        //Mientras el tbody tenga hijos los elimina
        while (tbody.firstChild) {
            tbody.removeChild(tbody.firstChild)
        }
    },

    ClearTablePasaport: function () {
        var tbody = document.getElementById("Table-PasaporteSI")
        //Mientras el tbody tenga hijos los elimina
        while (tbody.firstChild) {
            tbody.removeChild(tbody.firstChild)
        }
    },

    //Cargar la lista de las personas de salida Internacional en el select de delitos
    CargarPersonas: function () {

        var valor = sessionStorage.getItem("SI_ListaPersonas");
        var obj = JSON.parse(valor);
        var html = "";
        obj.forEach(function (sujeto) {
            html += "<option value=" + sujeto.Id + ">" + sujeto.NombrePersona + "</option>";
        });

        $("#Delitos_IdPersona").html(html);
    }


}

$(function () {
  
    //Cargar Tipo de difusión Registro de salida Internacional
    FuncionesGlobales.TipoDifusion("TipoDif");

    //Cargar el motivo de difusión de Registrar Salida en el panel Tipo y motivo de difusión.
    $("#TipoDif").change(function (e) {
        FuncionesGlobales.MotivoDifusion("MotivoDif", $(this).val());
    });

    //Cargar Tipo de difusion en el Filtro --Bandeja de solicitud
    FuncionesGlobales.TipoDifusion("SI_TipoDifusion");

    //cargando el motivo de difusion de acuerdo al tipo del filtro -- Bandeja de solicitud
    $("#SI_TipoDifusion").change(function (e) {
        FuncionesGlobales.MotivoDifusion("SI_MotivoDifusion", $(this).val());
    });

    // Validar el Evento click del botón de filtro
    document.querySelector(".btn-FiltroSI").addEventListener("click", function () {
        // Validar los campos requeridos antes de enviar el formulario
        var tipoBusqueda = document.getElementById("TipoBusqueda").value;

        if (tipoBusqueda === "1" && !document.getElementById("SI_ReferenciaOCN").value.trim()) {
            alert("Por favor, complete el campo de ReferenciaOCN.");
        } else if (tipoBusqueda === "2" && !document.getElementById("SI_Persona").value.trim()) {
            alert("Por favor, complete el campo de persona involucrada.");
        } else if (tipoBusqueda === "3" && (!document.getElementById("SI_TipoDifusion").value.trim() /*|| !document.getElementById("SI_MotivoDifusion").value.trim()*/)) {
            alert("Por favor, complete los campos de tipo y motivo de difusión.");
        } else {
                 // Aquí puedes enviar el formulario o realizar otras acciones según sea necesario
                 // Ejemplo: document.getElementById("formulario").submit();
                 SalidaInternacional.Listado();
                 SalidaInternacional.LimpiarFiltro();
                 alert("Formulario enviado correctamente.");
                }
    });

    //var adjuntarEmail = null;
    var AdjuntarArchivo = null;


    // Maneja el evento de cambio del input de archivo para almacenar el archivo en una variable global
    document.getElementById('email_SI').addEventListener('change', function (event) {
        //adjuntarEmail = event.target.files[0];
        AdjuntarArchivo = event.target.files[0];
    });

    //Maneja el evento del envío del formulario
    document.getElementById('Form_SalidaInternacional').addEventListener('submit', function (event) {
        event.preventDefault();
         
        // Validar manualmente los campos
        var isValid = true;
        var errorMessage = '';


        var FchaIngreso = document.getElementById('FechIngreso').value;
        var FchaMsje = document.getElementById('FechMensaje').value;       
        var SReferenciaOCNS = document.getElementById('Referencia_SI').value;
        var MReferenciaOCNS = document.getElementById('MReferenciaOCN_SI').value;
        var Vrecepcion = document.getElementById('ViaRecepcion').value;
        var EstSolictnt = document.getElementById('EstSolicitnt').value;        
        var prioridadS = document.getElementById('PrioridadSI').value;
        var Tdifision = document.getElementById('TipoDif').value;
        var Mdifusion = document.getElementById('MotivoDif').value;
        var Tespecialidad = document.getElementById('TipoEspecialidad').value;

        if (!FchaIngreso) {
            isValid = false;
            errorMessage += 'Fecha de Ingreso es requerida.\n';
        }
        if (!FchaMsje) {
            isValid = false;
            errorMessage += 'Fecha de Mensaje es requerida.\n';
        }
        if (!SReferenciaOCNS) {
            isValid = false;
            errorMessage += 'S/Referencia es requerida.\n';
        }
        if (!MReferenciaOCNS) {
            isValid = false;
            errorMessage += 'M/Referencia es requerida.\n';
        }
        if (!Vrecepcion) {
            isValid = false;
            errorMessage += 'La Vía de recepción es requerida.\n';
        }
        if (!EstSolictnt) {
            isValid = false;
            errorMessage += 'La Estructura solicitante es requerida.\n';
        }
        if (!prioridadS) {
            isValid = false;
            errorMessage += 'La Prioridad es requerida.\n';
        }
        if (!Tdifision) {
            isValid = false;
            errorMessage += 'Tipo de difusión es requerido.\n';
        }
        if (!Mdifusion) {
            isValid = false;
            errorMessage += 'Motivo de difusión es requerido.\n';
        }
        if (!Tespecialidad) {
            isValid = false;
            errorMessage += 'La Especialidad es requerida.\n';
        }

        if (!isValid) {
            Swal.fire('Error', errorMessage, 'error');
            return;
        }

        var formData = new FormData(this);
        if (AdjuntarArchivo) {          
            formData.append('AdjuntarArchivo', AdjuntarArchivo);
        }

        GuardarReg(formData);

        function GuardarReg(formData) {
            //Obtener los datos del sessionstorage
            var listPerson = JSON.parse(sessionStorage.getItem("SI_ListaPersonas")) || [];
            var listDelits = JSON.parse(sessionStorage.getItem("SI_ListaDelitos")) || []; 
            var listArma = JSON.parse(sessionStorage.getItem("SI_Armas")) || [];
            var listVehiculo = JSON.parse(sessionStorage.getItem("SI_Vehiculos")) || [];
            var listAeronav = JSON.parse(sessionStorage.getItem("SI_Aeronave")) || [];
            var listPasaport = JSON.parse(sessionStorage.getItem("SI_Pasaport")) || [];

            if (listPerson.length === 0) {
                Swal.fire(
                    "¡Ingrese Persona!",
                    "Personas",
                    "info"
                );
            } else if (listDelits.length === 0) {
                Swal.fire(
                    "¡Ingrese delitos !",
                    "Objetos",
                    "info"
                );
            } else if (listPerson.length !== listDelits.length) {
                Swal.fire(
                    "¡La cantidad de Personas no Coinciden con los Delitos !",
                    "",
                    "info"
                );
            } else {
                        var Collection_data = {
                            IdMsjReferencia: $("#MReferenciaOCN_SI").val(),
                            ReferenciaOCN: $("#Referencia_SI").val(),
                            CodTipoDifusion: $("#TipoDif").val(),
                            CodViaRecepcion: 'I24/7',
                            CodEstrucOrigen: "",
                            CodEspecialidad: $("#TipoEspecialidad").val(),
                            CodEstruct_Solictnt: $("#EstSolicitnt").val(),
                            FechaMensaje: $("#FechMensaje").val(),
                            FechaIngreso: $("#FechIngreso").val(),
                            CodTipoEnvioMensaje: '0002',
                            Prioridad: $("#PrioridadSI").val(),
                            CodMotivoDifusion: $("#MotivoDif").val(),
                            NombreArchivo: $("#email_SI").val(), // Obtener el nombre del archivo
                            CodEstado: "0001",
                            CodTipoConsulta: "",
                            Personas: JSON.stringify(listPerson), // Convertir a JSON string
                            Delitos: JSON.stringify(listDelits), // Convertir a JSON string
                            Arma: JSON.stringify(listArma),
                            Vehiculo: JSON.stringify(listVehiculo),
                            Aeronave: JSON.stringify(listAeronav),
                            Pasaporte: JSON.stringify(listPasaport),
                        };

                        // Añadir los datos a formData
                         for (var key in Collection_data) {
                             formData.append(key, Collection_data[key]);
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
                            "info");
                   }

        }
    });

})