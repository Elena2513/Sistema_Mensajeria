var FuncionesGlobales = {


    //Cargar y validar el catálogo Tipo de difusión
    TipoDifusion: function (control) {
        $("#" + control).html("<option value=''>Seleccione...</option>"); // Mostrar "Seleccione" al inicio

        $.ajax({
            url: baseUrl + "/FxGlobales/TipoDifusion",
            type: "GET",
            dataType: "JSON",
            success: function (response) {  //LA FUNCION SUCCES CALLBACK SE UTILIZA PARA REALIZAR LA LISTA DESPLEGABLE
                var html = '';
                $.each(response, function (index, value) {
                    html += "<option value='" + value.CodTipoDifusion + "'>" + value.TipoDifusion + "</option>";
                });
                $("#" + control).append(html); // Agregar las opciones al select
            },
            beforeSend: function () {
                // No es necesario hacer nada antes de la petición AJAX
            }
        });
    },


    // Validar y Cargar el motivo de difusión
    MotivoDifusion: function (control, CodTipoDifusion) {
        $.ajax({
            url: baseUrl + "/FxGlobales/MotivoDifusion",
            data: {
                CodTipoDifusion: CodTipoDifusion
            },
            type: "Get",
            dataType: "JSON",
            beforeSend: function () {
                $("#" + control).html("<option value = ''> Cargando... </option>");
            }
        }).done(function (response) {
            html = "";
            $.each(response, function (index, value) {
                html += "<option value='" + value.CodMotivoDifusion + "'> " + value.MotivoDifusion + "</option>";
            })
            $("#" + control).html(html);
        })
    },  
   

}