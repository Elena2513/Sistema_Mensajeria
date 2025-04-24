
var Eintenacional = {
    //LISTADO DE ENTRADAS INTERNACIONALES
    Listado: function () {
        $.ajax({
            url: baseUrl + "/SMS_Entrada_Internac/FiltroMensajeria",
            type: "GET",
            dataType: "JSON",
            data: {
                referencia: $("#referencia").val(),
                nombrepersona: document.getElementById("pers_Involucrada").value,
                tipodifusion: $("#TipoDifusion").val(),
                motivodifusion: $("#MotivoDifusion").val(),
                FechaInicio: $("#Finicial").val(),
                FechaFinal: $("#Ffinal").val(),
                TipoBusqueda: $("#Tipo_busqueda").val()

            },
            beforeSend: function () {
                html = "<tr><td colspan='6' class='text-center '><i class='fa fa-spin spinner'></i><h5> Cargando... </h5></td></tr>"
                $("#Table-EntradaInternacional").html(html);
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
                    html += "<td><button type='button' class='btn mr-1 mb-1 " + color + " btn-sm btn-reporte' data-index='" + value.IdMensaje + "'><i class='icon-files-o'> VER </button></td>";                  
                    html += "</tr>";
                });
          
                $("#Table-EntradaInternacional").html(html);
                $("#list-EntradaInternacional").DataTable();
                $("#TotalEI").text(indice);
            } else {
                html = "<tr><td colspan='6' class='text-center '><i class='icon-arrow15'></i><h5> No tiene datos relacionado a su filtro</h5></td></tr>"
                $("#Table-EntradaInternacional").html(html);
            }
        })
    },  
  
    LimpiarFiltro: function () {
        //Limpiar los controles del filtro
        $("#referencia").val("");
        $("#pers_Involucrada").val("");
        $("#TipoDifusion").val("");
        $("#MotivoDifusion").val("");
        $("#Tipo_busqueda").val("");
    },

    //Función para Limpiar registro de mensajeria
    Clear_Registro: function () {

        //limpiar la sesión storage
        sessionStorage.clear();

        //Inicializar los arrays
        Delitos = [];
        Personas = [];
        Arma = [];
        Vehiculo = [];
        Aeronave = [];
        Pasaporte = [];


        $("#fIngreso").val("");
        $("#fMensaje").val("");
        $("#Prioridad").val("");
        $("#Sreferencia").val("");
        $("#Mreferencia").val("");
        $("#Estruc_origen").val("");
        $("#Tipo_difusion").val("");
        $("#Motivo_Difusion").val("");
        $("#NamePers").val("");
        $("#archivoEmail").val("");
        this.ClearTablePersona();
        this.ClearTableDelitos();
        this.ClearTableArma();
        this.ClearTableVehiculo();
        this.ClearTableAeronav();
        this.ClearTablePasaport()
    },

    ClearTablePersona: function () {
        var tbody = document.getElementById("Table-personasEI")
        //Mientras el tbody tenga hijos los elimina
        while (tbody.firstChild) {
            tbody.removeChild(tbody.firstChild)
        }
    },

    ClearTableDelitos: function () {
        var tbody = document.getElementById("Tabla-DelitoEI")
        //Mientras el tbody tenga hijos los elimina
        while (tbody.firstChild) {
            tbody.removeChild(tbody.firstChild)
        }
    },

    ClearTableArma: function () {
        var tbody = document.getElementById("Table-ArmasEI")
        //Mientras el tbody tenga hijos los elimina
        while (tbody.firstChild) {
            tbody.removeChild(tbody.firstChild)
        }
    },

    ClearTableVehiculo: function () {
        var tbody = document.getElementById("Table-VehiculoEI")
        //Mientras el tbody tenga hijos los elimina
        while (tbody.firstChild) {
            tbody.removeChild(tbody.firstChild)
        }
    },

    ClearTableAeronav: function () {
        var tbody = document.getElementById("Table-AeronaveEI")
        //Mientras el tbody tenga hijos los elimina
        while (tbody.firstChild) {
            tbody.removeChild(tbody.firstChild)
        }
    },

    ClearTablePasaport: function () {
        var tbody = document.getElementById("Table-PasaporteEI")
        //Mientras el tbody tenga hijos los elimina
        while (tbody.firstChild) {
            tbody.removeChild(tbody.firstChild)
        }
    },

    //Cargar la lista de las personas de Entrada Internacional en el select de delitos
    CargarPersonas: function () {

        var valor = sessionStorage.getItem("EI_ListaPersonas");
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
    FuncionesGlobales.TipoDifusion("Tipo_difusion");

    //Cargar el motivo de difusión de Registrar Entrada en el panel Tipo y motivo de difusión.
    $("#Tipo_difusion").change(function (e) {
        FuncionesGlobales.MotivoDifusion("Motivo_Difusion", $(this).val());
    });

    //Cargar Tipo de difusion en el Filtro -- Bandeja de solicitud
    FuncionesGlobales.TipoDifusion("TipoDifusion");

    //cargando el motivo de difusion de acuerdo al tipo difusion del filtro --Bandeja de solicitud
    $("#TipoDifusion").change(function (e) {
        FuncionesGlobales.MotivoDifusion("MotivoDifusion", $(this).val());
    });    

    // Validar el Evento click del botón de filtro
    document.querySelector(".btn-filtro").addEventListener("click", function () {
        // Validar los campos requeridos antes de enviar el formulario
        var tipoBusqueda = document.getElementById("Tipo_busqueda").value;

        if (tipoBusqueda === "1" && !document.getElementById("referencia").value.trim()) {
            alert("Por favor, complete el campo de referencia.");
        } else if (tipoBusqueda === "2" && !document.getElementById("pers_Involucrada").value.trim()) {
            alert("Por favor, complete el campo de persona involucrada.");
        } else if (tipoBusqueda === "3" && (!document.getElementById("TipoDifusion").value.trim() /*|| !document.getElementById("MotivoDifusion").value.trim()*/)) {
            alert("Por favor, complete los campos de tipo y motivo de difusión.");
        } else {
                // Aquí puedes enviar el formulario o realizar otras acciones según sea necesario
                // Ejemplo: document.getElementById("formulario").submit();
                Eintenacional.Listado();
                Eintenacional.LimpiarFiltro();
                alert("Formulario enviado correctamente.");
               }       
    });        
   

    //var archivoAdjunto = null;
    var AdjuntarArchivo = null;

    // Maneja el evento de cambio del input de archivo para almacenar el archivo en una variable global
    document.getElementById('archivoEmail').addEventListener('change', function (event) {
        AdjuntarArchivo = event.target.files[0];
    });

    // Maneja el evento de envío del formulario
    document.getElementById('Form_EntradaInternacional').addEventListener('submit', function (event) {
        event.preventDefault(); // Evita el envío del formulario por defecto
         
        //validar los campos 
        // Validar manualmente los campos
        var isValid = true;
        var errorMessage = '';

        var fIngreso = document.getElementById('fIngreso').value;
        var fMensaje = document.getElementById('fMensaje').value;
        var PrioridadE = document.getElementById('prioridEI').value;
        var Sreferencia = document.getElementById('Sreferencia').value;
        var Mreferencia = document.getElementById('Mreferencia').value;
        var Estruc_origen = document.getElementById('Estruc_origen').value;        

        if (!fIngreso) {
            isValid = false;
            errorMessage += 'Fecha de Ingreso es requerida.\n';
        }
        if (!fMensaje) {
            isValid = false;
            errorMessage += 'Fecha de Mensaje es requerida.\n';
        }
        if (!PrioridadE) {
            isValid = false;
            errorMessage += 'Prioridad es requerida.\n';
        }
        if (!Sreferencia) {
            isValid = false;
            errorMessage += 'Número de referencia es requerido.\n';
        }
        if (!Mreferencia) {
            isValid = false;
            errorMessage += 'Mensaje de referencia es requerido.\n';
        }
        if (!Estruc_origen) {
            isValid = false;
            errorMessage += 'Estructura de origen es requerida.\n';
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

        //// Cerrar el modal de registros
        //$("#Registro_EI").modal("hide");
        
    });

    function Guardar(formData) {
        // Obtener datos de sessionStorage
        var persons = JSON.parse(sessionStorage.getItem("EI_ListaPersonas")) || [];
        var delitos = JSON.parse(sessionStorage.getItem("EI_ListaDelitos")) || [];
        var arma = JSON.parse(sessionStorage.getItem("EI_Armas")) || [];
        var vehiculo = JSON.parse(sessionStorage.getItem("EI_Vehiculos")) || [];
        var aeronave = JSON.parse(sessionStorage.getItem("EI_Aeronave")) || [];
        var pasaporte = JSON.parse(sessionStorage.getItem("EI_Pasaport")) || [];

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
                  var data_msj = {
                      IdMsjReferencia: $("#Mreferencia").val(),
                      ReferenciaOCN: $("#Sreferencia").val(),
                      CodTipoDifusion: $("#Tipo_difusion").val(),
                      CodViaRecepcion: 'I24/7',
                      CodEstrucOrigen: $("#Estruc_origen").val(),
                      CodEspecialidad: "",
                      CodEstruct_Solictnt: "",
                      FechaMensaje: $("#fMensaje").val(),
                      FechaIngreso: $("#fIngreso").val(),
                      CodTipoEnvioMensaje: '0001',
                      Prioridad: $("#prioridEI").val(),
                      Nacional: 1, // valor hardcodeado
                      CodMotivoDifusion: $("#Motivo_Difusion").val(),
                      NombreArchivo: $("#archivoEmail").val(), // Obtener el nombre del archivo
                      CodEstado: "0001",
                      CodTipoConsulta: "",
                      Personas: JSON.stringify(persons), // Convertir a JSON string
                      Delitos: JSON.stringify(delitos), // Convertir a JSON string
                      Arma: JSON.stringify(arma),
                      Vehiculo: JSON.stringify(vehiculo),
                      Aeronave: JSON.stringify(aeronave),
                      Pasaporte: JSON.stringify(pasaporte),
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

        
                 //##n de cambios:
        //         1. change en archivoEmail : Solo almacena el archivo seleccionado en la variable archivoAdjunto.
        //    2.submit en el formulario
        //      el comportamiento por defecto del envío del formulario con event.preventDefault().
        //      - Crea un nuevo FormData  usandothis(el formulario).
        //      - Agrega el archivo adjunto si existe.
        //      - Llama a la función Guardar con el FormData.
        //      - Cierra y limpia el modal de registro.
        //   3.  FunciónGuardar : Se mantiene igual, realiza validaciones, construye data_msj, añade datos a formData, y envía mediante AJAX.
        
        
             //ESTA FUNCIONALIDAD MANDA A GUARDAR TODOS LOS DATOS AL CARGAR EL ARCHIVO DEL EMAIL SIN NECESIDAD DE TOCAR EL BOTON GUARDAR
            ////Añadir la funcionalidad de Guardar en tu JavaScript para manejar el envío del formulario con el archivo adjunto.
            //document.getElementById('archivoEmail').addEventListener('change', function (event) {
            //    var archivoAdjunto = event.target.files[0];
            //    var formData = new FormData(document.getElementById('Form_EntradaInternacional'));
            //    formData.append('archivoAdjunto', archivoAdjunto);
        
            //    Guardar(formData);
            //});
        
            //function Guardar(formData) {
            //    // Obtener datos de sessionStorage
            //    var persons = JSON.parse(sessionStorage.getItem("EI_ListaPersonas")) || [];
            //    var delitos = JSON.parse(sessionStorage.getItem("EI_ListaDelitos")) || [];
        
            //    if (persons == undefined || persons.length == 0) {
            //        Swal.fire(
            //            "¡Ingrese Persona!",
            //            "Personas",
            //            "info"
            //        );
            //    } else if (delitos == undefined || delitos.length == 0) {
            //        Swal.fire(
            //            "¡Ingrese delitos !",
            //            "Objetos",
            //            "info"
            //        );
            //    } else if (persons.length != delitos.length) {
            //        Swal.fire(
            //            "¡La cantidad de Personas no Coinciden con los Delitos !",
            //            "",
            //            "info"
            //        );
            //    } else {
            //              var data_msj = {
            //                  IdMsjReferencia: $("#Mreferencia").val(),
            //                  ReferenciaOCN: $("#Sreferencia").val(),
            //                  CodTipoDifusion: $("#Tipo_difusion").val(),
            //                  CodViaRecepcion: 'I24/7',
            //                  CodEstrucOrigen: $("#Estruc_origen").val(),
            //                  FechaMensaje: $("#fMensaje").val(),
            //                  FechaIngreso: $("#fIngreso").val(),
            //                  CodTipoEnvioMensaje: '0001',
            //                  Prioridad: $("#Prioridad").val(),
            //                  CodMotivoDifusion: $("#Motivo_Difusion").val(),
            //                  NombreArchivo: $("#archivoEmail").val(), // Obtener el nombre del correo,
            //                  CodEstado: "0001",
            //                  CodTipoConsulta: "",
            //                  Personas: JSON.stringify(persons), // Convertir a JSON string
            //                  Delitos: JSON.stringify(delitos) // Convertir a JSON string
            //              };
        
            //             for (var key in data_msj) {
            //                 formData.append(key, data_msj[key]);
            //             }
        
            //             $.ajax({
            //                     url: baseUrl + "/SMS_Entrada_Internac/Guardar",
            //                     type: 'POST',
            //                     data: formData,
            //                     processData: false,
            //                     contentType: false,
            //                     success: function (response) {
            //                         console.log(response);
            //                         if (response.success) {
            //                             //$("#Registro_EI").modal("hide");
            //                         } else {
            //                             alert("Error al guardar la solicitud.");
            //                         }
            //                     },
            //                      error: function (error) {
            //                         console.log(error);
            //                         alert("Error al enviar la solicitud.");
            //                      }
            //             });                      
            //           }       
        
            //}


    
                     
 })