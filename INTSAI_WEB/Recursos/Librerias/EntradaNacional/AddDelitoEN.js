var Delitos = [];

var DelitosPersonaEN =
{
    Agregar: function () {

        var ColeccionDelitos = {
            Persona: $("#Delitos_IdPersona option:selected").text(),
            CodDelito: $("#CodDelitos").val(),
            Delito: $("#CodDelitos option:selected").text(),
        };

        if (Delitos.find(e => e.Delito === ColeccionDelitos.Delito && e.Persona === ColeccionDelitos.Persona)) {
            // Mensaje de validación.
            Swal.fire(
                "¡ La persona ya posee el delito !",
                "",
                "info"
            );
        } else {
            Delitos.push(ColeccionDelitos);
            sessionStorage.setItem("EN_ListaDelitos", JSON.stringify(Delitos));

            html = "";
            $.each(Delitos, function (index, value) {
                html += "<tr>";
                html += "<td>" + (index + 1) + "</td>";
                html += "<td>" + value.Persona + "</td>";
                html += "<td>" + value.CodDelito + "</td>";
                html += "<td>" + value.Delito + "</td>";
                html += "<td><a class='btn btn-danger btn-remove-delito btn-sm text-light' data-index='" + index + "'><i class='icon-bin'></i></a></td>";
                html += "</tr>";
            });
            $("#Tabla-DelitosEN").html(html);
            this.ContarDlits();
            $("#modal_AddDelitos").modal("hide");
        }
    },

    Limpiar: function () {
        $("#Delitos_IdPersona").val("");
        $("#CodDelitos").val("");
    },

    Remover_delito: function (index) {
        Delitos.splice(index, 1);
        sessionStorage.setItem("EN_ListaDelitos", JSON.stringify(Delitos));

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

        $("#Tabla-DelitosEN").html(html);
        this.ContarDlits();
    },

    ContarDlits: function () {
        var TtalDlts = Delitos.length;
        document.getElementById('TtaldltsEN').textContent = TtalDlts;
    }
}

$(function () {

    $(".btn-addDelitosEN").click(function () {
        DelitosPersonaEN.Limpiar();
    });

    $("#Form-AddDelitos").submit(function (e) {
        e.preventDefault();
        DelitosPersonaEN.Agregar();
    });

    $("#Tabla-DelitosEN").on("click", "tr td .btn-remove-delito", function () {
        index = parseInt($(this).attr("data-index"));
        DelitosPersonaEN.Remover_delito(index);
    });

})
