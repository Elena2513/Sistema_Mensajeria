var Snacional = {

    //LISTADO DE SALIDA NACIONAL
     Listado: function () {
        $.ajax({
            url: baseUrl + "/SMS_Salida_Nacional/FiltroMsjSalidaNac",
            type: "GET",
            dataType: "JSON",
            data: {
                ReferenciaOCNSN: $("#ReferenciaOCNSN").val(),
                nombrepersonaSN: document.getElementById("pers_InvolucradaSN").value,
                tipodifusionSN: $("#TipoDifusionSN").val(),
                motivodifusionSN: $("#MotivoDifusionSN").val(),
                FInicioSN: $("#FinicialSN").val(),
                FFinalSN: $("#FfinalSN").val(),
                TipoBusquedaSN: $("#Tipo_busquedaSN").val()

            },
            beforeSend: function () {
                html = "<tr><td colspan='6' class='text-center '><i class='fa fa-spin spinner'></i><h5> Cargando... </h5></td></tr>"
                $("#Table-SalidaNacional").html(html);
            }
        }).done(function (response) {

            indice = 0;
            if (response.length > 0) {
                html = "";
                $.each(response, function (index, value) {       
                    
                    indice++;
                    color = "";
                    //if (parseInt(value.Prioridad) == 1) {
                    //    color = "bg-success text-light";
                    //} else if (parseInt(value.Prioridad) == 2) {
                    //    color = "bg-warning text-dark";
                    //} else {
                    //    color = "bg-danger text-light";
                    //}
                    //html += "<tr class = '" + color + "'>";
                    html += "<tr data-id='" + value.IdMensaje + "'>";
                    html += "<td>" + indice + "</td>";
                    html += "<td>" + json2Date(value.FechaMensaje) + "</td>";  
                    html += "<td>" + value.remitente + "</td>";
                    html += "<td>" + json2Date(value.FechaIngreso) + "</td>";  
                    html += "<td>" + value.TipoDifusion + "</td>";
                    html += "<td>" + value.motivodifusion + "</td>";
                    html += "<td>" + value.TipoTitulo + "</td>";
                    html += "<td>" + value.Delito + "</td>";
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
                    html += "<td><button type='button' class='btn mr-1 mb-1 " + color + " btn-sm btn-reporte' data-index='" + value.IdMensaje + "'><i class='icon-files-o'> VER </button></td>";                  
                    html += "</tr>";
                });
          
                $("#Table-SalidaNacional").html(html);
                $("#list-SalidaNacional").DataTable();
                $("#TotalSN").text(indice);
            } else {
                html = "<tr><td colspan='6' class='text-center '><i class='icon-arrow15'></i><h5> No tiene datos relacionado a su filtro</h5></td></tr>"
                $("#Table-SalidaNacional").html(html);
            }
        })
    },  

    LimpiarFiltro: function () {
        //Limpiar los controles del filtro
        $("#ReferenciaOCNSN").val("");
        $("#pers_InvolucradaSN").val("");
        $("#TipoDifusionSN").val("");
        $("#MotivoDifusionSN").val("");
        $("#FinicialSN").val("");
        $("#FfinalSN").val("");
        $("#Tipo_busquedaSN").val("");      
    },

    //Función para Limpiar registro de mensajeria
    LimpiarTextos: function () {

        //limpiar la sesión storage
        sessionStorage.clear();

        //Inicializar los arrays
        Delitos = [];
        Personas = [];
        Arma = [];
        Vehiculo = [];
        Aeronave = [];
        Pasaporte = [];
      

        $("#SN_fmsj").val("");
        $("#SN_VR").val("");
        $("#SN_destino").val("");       
        $("#SN_Referencia").val("");
        $("#SN_Prioridad").val("");
        $("#SN_TipoDifusion").val("");
        $("#SN_MotivoDifusion").val("");
        $("#NamePers").val("");
        $("#archivoEmail").val("");
        this.LimpiarTablaPers();
        this.LimpiarTablaDelts()   
        this.ClearTableArma();
        this.ClearTableVehiculo();
        this.ClearTableAeronav();
        this.ClearTablePasaport()
    },

    LimpiarTablaPers: function () {
        var tbody = document.getElementById("Table-personaSN")
        //Mientras el tbody tenga hijos los elimina
        console.log(tbody);
        if (tbody) {
            while (tbody.firstChild) {
                tbody.removeChild(tbody.firstChild);
            }
        }
    },

   LimpiarTablaDelts: function () {
        var tbody = document.getElementById("Tabla-DelitoSN")
        //Mientras el tbody tenga hijos los elimina
       console.log(tbody);
       if (tbody) {
           while (tbody.firstChild) {
               tbody.removeChild(tbody.firstChild);
           }
       }
    },

    ClearTableArma: function () {
        var tbody = document.getElementById("Table-ArmasSN")
        //Mientras el tbody tenga hijos los elimina
        while (tbody.firstChild) {
            tbody.removeChild(tbody.firstChild)
        }
    },

    ClearTableVehiculo: function () {
        var tbody = document.getElementById("Table-VehiculoSN")
        //Mientras el tbody tenga hijos los elimina
        while (tbody.firstChild) {
            tbody.removeChild(tbody.firstChild)
        }
    },

    ClearTableAeronav: function () {
        var tbody = document.getElementById("Table-AeronaveSN")
        //Mientras el tbody tenga hijos los elimina
        while (tbody.firstChild) {
            tbody.removeChild(tbody.firstChild)
        }
    },

    ClearTablePasaport: function () {
        var tbody = document.getElementById("Table-PasaporteSN")
        //Mientras el tbody tenga hijos los elimina
        while (tbody.firstChild) {
            tbody.removeChild(tbody.firstChild)
        }
    },


    //Cargar la lista de las personas de Entrada Internacional en el select de delitos
    CargarPersonas: function () {

        var valor = sessionStorage.getItem("SN_ListaPersonas");
        var obj = JSON.parse(valor);
        var html = "";
        obj.forEach(function (sujeto) {
            html += "<option value=" + sujeto.Id + ">" + sujeto.NombrePersona + "</option>";
        });

        $("#Delitos_IdPersona").html(html);
    },  
}

$(function () {

    //Cargar Tipo de difusión de Registro de solicitud
    FuncionesGlobales.TipoDifusion("SN_TipoDifusion");

    //Cargar el motivo de difusión de Registrar Entrada en el panel Tipo y motivo de difusión.
    $("#SN_TipoDifusion").change(function (e) {
        FuncionesGlobales.MotivoDifusion("SN_MotivoDifusion", $(this).val());
    });

    //Cargar Tipo de difusion en el Filtro -- Bandeja de salida Nacional
    FuncionesGlobales.TipoDifusion("TipoDifusionSN");

    //cargando el motivo de difusion de acuerdo al tipo del filtro --Bandeja de salida Nacional
    $("#TipoDifusionSN").change(function (e) {
        FuncionesGlobales.MotivoDifusion("MotivoDifusionSN", $(this).val());
    });


    // Validar el Evento click del botón de filtro
    document.querySelector(".btn-filtroSN").addEventListener("click", function () {
        // Validar los campos requeridos antes de enviar el formulario
        var tipoBusqueda = document.getElementById("Tipo_busquedaSN").value;

        if (tipoBusqueda === "1" && !document.getElementById("ReferenciaOCNSN").value.trim()) {
            alert("Por favor, complete el campo de ReferenciaOCN.");
        } else if (tipoBusqueda === "2" && !document.getElementById("pers_InvolucradaSN").value.trim()) {
            alert("Por favor, complete el campo de persona involucrada.");
        } else if (tipoBusqueda === "3" && (!document.getElementById("TipoDifusionSN").value.trim() /*|| !document.getElementById("MotivoDifusion").value.trim()*/)) {
            alert("Por favor, complete los campos de tipo y motivo de difusión.");
        } else {
                 // Aquí puedes enviar el formulario o realizar otras acciones según sea necesario
                 // Ejemplo: document.getElementById("formulario").submit();
                 Snacional.Listado();
                 Snacional.LimpiarFiltro();
                 alert("Formulario enviado correctamente.");
                }
    }); 

    //var EmailAdjunto = null;
    var AdjuntarArchivo = null;

    // Maneja el evento de cambio del input de archivo para almacenar el archivo en una variable global
    document.getElementById('archivoEmailSN').addEventListener('change', function (event) {
        AdjuntarArchivo = event.target.files[0];
    });

    // Maneja el evento de envío del formulario
    document.getElementById('Form_SalidaNacional').addEventListener('submit', function (event) {
        event.preventDefault(); // Evita el envío del formulario por defecto
      
        //validar los campos 
        // Validar manualmente los campos
        var isValid = true;
        var errorMessage = '';
                
        var fechamsj = document.getElementById('SN_fmsj').value;
        var VrecepcionSN = document.getElementById('SN_VR').value;
        var DestinoSN = document.getElementById('SN_destino').value;
        var PrioridadSN = document.getElementById('SN_Prioridad').value;
        var TdifusionSN = document.getElementById('SN_TipoDifusion').value;
        var MdifusionSN = document.getElementById('SN_MotivoDifusion').value;
        var ReferenciaSN = document.getElementById('SN_Referencia').value;

      
        if (!fechamsj) {
            isValid = false;
            errorMessage += 'Fecha de Mensaje es requerida.\n';
        }
        if (!VrecepcionSN) {
            isValid = false;
            errorMessage += 'Via de recepción es requerida.\n';
        }
        if (!DestinoSN) {
            isValid = false;
            errorMessage += 'Destino es requerido.\n';
        }
        if (!PrioridadSN) {
            isValid = false;
            errorMessage += 'Prioridad es requerido.\n';
        }
        if (!TdifusionSN) {
            isValid = false;
            errorMessage += 'Tipo de Difusión es requerida.\n';
        }

        if (!MdifusionSN) {
            isValid = false;
            errorMessage += 'Motivo de Difusión es requerida.\n';
        }

        if (!ReferenciaSN) {
            isValid = false;
            errorMessage += 'Referencia es requerida.\n';
        }

        if (!isValid) {
            Swal.fire('Error', errorMessage, 'error');
            return;
        }

        var formData = new FormData(this);
        if (AdjuntarArchivo) {
            formData.append('AdjuntarArchivo', AdjuntarArchivo);
        }

        Guardar(formData);

        // Cerrar el modal de registros
        //$("#Registro_SN").modal("hide");   

    });



    function Guardar(formData) {
        // Obtener datos de sessionStorage
        var PersonaSN = JSON.parse(sessionStorage.getItem("SN_ListaPersonas")) || [];
        var delitoSN = JSON.parse(sessionStorage.getItem("SN_ListaDelitos")) || [];
        var armaSN = JSON.parse(sessionStorage.getItem("SN_Armas")) || [];
        var vehiculoSN = JSON.parse(sessionStorage.getItem("SN_Vehiculos")) || [];
        var aeronaveSN = JSON.parse(sessionStorage.getItem("SN_Aeronave")) || [];
        var pasaporteSN = JSON.parse(sessionStorage.getItem("SN_Pasaport")) || [];

        if (PersonaSN.length === 0) {
            Swal.fire(
                "¡Ingrese Persona!",
                "Personas",
                "info"
            );
        } else if (delitoSN.length === 0) {
            Swal.fire(
                "¡Ingrese delitos !",
                "Objetos",
                "info"
            );
        } else if (PersonaSN.length !== delitoSN.length) {
            Swal.fire(
                "¡La cantidad de Personas no Coinciden con los Delitos !",
                "",
                "info"
            );
        } else {
                    var data_msj = {
                        IdMsjReferencia: "",
                        ReferenciaOCN: $("#SN_Referencia").val(),
                        CodTipoDifusion: $("#SN_TipoDifusion").val(),
                        CodViaRecepcion: $("#SN_VR").val(),
                        CodEstrucOrigen: "",
                        CodEspecialidad: "",
                        CodEstruct_Solictnt: "",
                        FechaMensaje: $("#SN_fmsj").val(),
                        FechaIngreso: "",
                        CodTipoEnvioMensaje: '0005',  //Mensaje de salida Nacional
                        Prioridad: $("#SN_Prioridad").val(),
                        CodMotivoDifusion: $("#SN_MotivoDifusion").val(),
                        NombreArchivo: $("#archivoEmailSN").val(), // Obtener el nombre del archivo
                        CodEstado: "0001",
                        CodTipoConsulta: "",
                        Personas: JSON.stringify(PersonaSN), // Convertir a JSON string
                        Delitos: JSON.stringify(delitoSN), // Convertir a JSON string     
                        Arma: JSON.stringify(armaSN),
                        Vehiculo: JSON.stringify(vehiculoSN),
                        Aeronave: JSON.stringify(aeronaveSN),
                        Pasaporte: JSON.stringify(pasaporteSN),
                    };

                    // Añadir los datos a formData
                    for (var key in data_msj) {
                        formData.append(key, data_msj[key]);
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

});