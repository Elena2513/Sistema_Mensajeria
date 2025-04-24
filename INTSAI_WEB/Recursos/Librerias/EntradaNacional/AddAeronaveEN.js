var Aeronave = [];

var Aeronav_EN = {

    Add_AeronavEN: function () {

        var DatoAeronave = {

            Serie: $("#NumSerie_EN").val(),
        };

        if (Aeronave.find(i => i.Serie === DatoAeronave.Serie)) {
            Swal.fire(
                "¡Ya se encuentra agregado el número de serie!",
                "",
                "info"
            );
        } else {
            Aeronave.push(DatoAeronave);
            sessionStorage.setItem("EN_Aeronave", JSON.stringify(Aeronave));
            this.RenderTablaA();
            this.ContAeronave();
        }
    },

    RenderTablaA: function () {
        var html = "";
        $.each(Aeronave, function (index, value) {
            html += "<tr>";
            html += "<td>" + (index + 1) + "</td>";
            html += "<td>" + value.Serie + "</td>";
            html += "<td><a class='btn btn-danger btn-remove-Aeronav btn-sm text-light' data-index='" + index + "'><i class='icon-trash3'></i></a></td>";
            html += "</tr>";
        });
        $("#Table-AeronaveEN").html(html);
    },

    EliminarAeronav: function (index) {
        Aeronave.splice(index, 1);
        sessionStorage.setItem("EN_Aeronave", JSON.stringify(Aeronave));
        this.RenderTablaA();
        this.ContAeronave();
    },

    //Contar Aeronave
    ContAeronave: function () {
        var ttalAeronav = Aeronave.length;
        document.getElementById('TtalAeronave').textContent = ttalAeronav;
    },

    Limpiar: function () {
        $("#NumSerie_EN").val("");
    }
}

$(function () {

    //Agregar Aeronave
    $(".btn-AddAeroEN").click(function () {
        Aeronav_EN.Add_AeronavEN();
        Aeronav_EN.Limpiar();
    });

    //Remover Aeronave
    $("#Table-AeronaveEN").on("click", "tr td .btn-remove-Aeronav", function () {
        index = parseInt($(this).attr("data-index"));
        Aeronav_EN.EliminarAeronav(index);
    });
});