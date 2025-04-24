var ConsultaMensajeria = {
    Listado: function () {
        // Identificar cuál radio button está seleccionado
        var selectedRadio = $('input[name="tipo"]:checked').attr('id');

        // Definir las variables comunes a todas las tablas
        var html, indice;

        // Realizar la petición AJAX con los parámetros de búsqueda
        $.ajax({
            url: baseUrl + "/Consulta/FiltroConsulta",
            type: "GET",
            dataType: "JSON",
            data: {               
                Tipo: $('input[name="tipo"]:checked').val(),
                referencia: $("#referencia").val(),
                nombrepersona: $("#pers_Involucrada").val(),
                tipodifusion: $("#TipoDifusion").val(),
                motivodifusion: $("#MotivoDifusion").val(),
                FechaInicio: $("#Finicial").val(),
                FechaFinal: $("#Ffinal").val(),
                TipoBusqueda: $("#Buscar_Filtro").val()
            },
            beforeSend: function () {
                html = "<tr><td colspan='6' class='text-center '><i class='fa fa-spin spinner'></i><h5> Cargando... </h5></td></tr>";
                // Muestra la tabla en estado de carga
                $("#Table-msjEI, #Table-msjEN, #Table-msjSI, #Table-msjSN").html(html);
            }
        }).done(function (response) {
            // Establecer los valores por defecto
            indice = 0;
            if (response.length > 0) {
                html = "";
                // Generar los datos de la tabla según los resultados obtenidos
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

                    // Lógica para los colores de prioridad
                    var color;
                    if (parseInt(value.Prioridad) == 1) {
                        color = "btn-light text-dark";
                    } else if (parseInt(value.Prioridad) == 2) {
                        color = "btn-info text-light";
                    } else if (parseInt(value.Prioridad) == 3) {
                        color = "btn-warning text-dark";
                    } else {
                        color = "btn-danger text-light";
                    }

                    html += "<td><button type='button' class='btn mr-1 mb-1 " + color + " btn-sm btn-Capturar' data-index='" + value.IdMensaje + "'><i class='icon-files-o'>Capturar </button></td>";
                    html += "</tr>";
                });

                // Mostrar los datos según el radio button seleccionado
                if (selectedRadio === "E_Internac") {                    
                    $("#Table-msjEI").html(html);                 
                    $("#list-msjEI").DataTable();
                    $("#TtalEI").text(indice);                  

                } else if (selectedRadio === "E_Nacional") {
                    $("#Table-msjEN").html(html);
                    $("#list-msjEN").DataTable();
                    $("#TtalEN").text(indice);

                } else if (selectedRadio === "S_Internacinal") {
                    $("#Table-msjSI").html(html);
                    $("#list-msjSI").DataTable();
                    $("#TtalSI").text(indice);

                } else if (selectedRadio === "S_Nacional") {
                    $("#Table-msjSN").html(html);
                    $("#list-msjSN").DataTable();
                    $("#TotalSN").text(indice);
                }
            } else {
                // Si no hay resultados, mostrar un mensaje
                html = "<tr><td colspan='6' class='text-center '><i class='icon-arrow15'></i><h5> No tiene datos relacionado a su filtro</h5></td></tr>";
                $("#Table-msjEI, #Table-msjEN, #Table-msjSI, #Table-msjSN").html(html);
            }
        });
    }
};


$(function () {

    //Cargar Tipo de difusion en el Filtro 
    FuncionesGlobales.TipoDifusion("TipoDifusion");

    //cargando el motivo de difusion de acuerdo al tipo difusion del filtro 
    $("#TipoDifusion").change(function (e) {
        FuncionesGlobales.MotivoDifusion("MotivoDifusion", $(this).val());
    });

    $(".btn-BuscaFiltro").on("click", function () {
              
        var selectedRadio = $('input[name="tipo"]:checked').val();

        if (!selectedRadio) {
            $("#error-message").text("Por favor, seleccione una opción de tipo de búsqueda.").show();
            return;
        }

        // Si todo está bien, ocultar el mensaje de error (si existe)
        $("#error-message").hide();

        // Ejecutar la función de filtrado
        ConsultaMensajeria.Listado();
       
    });



})
