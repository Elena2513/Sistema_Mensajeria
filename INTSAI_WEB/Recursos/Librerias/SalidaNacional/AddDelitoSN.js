var Delitos = [];

var DelitosPersonaSN =
{
    AddDelitos: function () {

        var ArrayDelitos = {
            Persona: $("#Delitos_IdPersona option:selected").text(),
            CodDelito: $("#CodDelitos").val(),
            Delito: $("#CodDelitos option:selected").text(),
        };

        if (Delitos.find(e => e.Delito === ArrayDelitos.Delito && e.Persona === ArrayDelitos.Persona)) {
            // Mensaje de validación.
            Swal.fire(
                "¡ La persona ya posee el delito !",
                "",
                "info"
            );
        } else {
            Delitos.push(ArrayDelitos);
            sessionStorage.setItem("SN_ListaDelitos", JSON.stringify(Delitos));
            this.RenderTableDelitos();
            this.contardelitos();
            $("#modal_AddDelitos").modal("hide");
        }
    },

    Limpiar: function () {
        $("#Delitos_IdPersona").val("");
        $("#CodDelitos").val("");
    },

    Remover_delito: function (index) {
        Delitos.splice(index, 1);
        sessionStorage.setItem("SN_ListaDelitos", JSON.stringify(Delitos));

        this.RenderTableDelitos();
        this.contardelitos();
    },

    contardelitos: function () {
        var ttaldelitos = Delitos.length;
        document.getElementById('TotalDelitos').textContent = ttaldelitos;
    },

    RenderTableDelitos: function () {
        html = "";
        $.each(Delitos, function (index, value) {
            html += "<tr>";
            html += "<td>" + (index + 1) + "</td>";
            html += "<td>" + (value.Persona) + "</td>";
            html += "<td>" + (value.CodDelito) + "</td>";
            html += "<td>" + (value.Delito) + "</td>";
            html += "<td><a class='btn btn-danger btn-remove-delito btn-sm text-light' data-index='" + index + "'><i class='icon-trash3'></i></a></td>";
            html += "</tr>";
        });

        $("#Tabla-DelitoSN").html(html);
    }

}

$(function () {

    $(".btn-addDelitoSN").click(function () {
        DelitosPersonaSN.Limpiar();
    });

    $("#Form-AddDelitos").submit(function (e) {
        e.preventDefault();
        DelitosPersonaSN.AddDelitos();
    });

    $("#Tabla-DelitoSN").on("click", "tr td .btn-remove-delito", function () {
        index = parseInt($(this).attr("data-index"));
        DelitosPersonaSN.Remover_delito(index);
    });
})