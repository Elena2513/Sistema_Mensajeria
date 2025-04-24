var Aeronave = [];

var Aeronav_SI = {

    Add_AeronavSI: function () {

        var DtoAeronave = {

            Serie: $("#NumSerie_SI").val(),
        };

        if (Aeronave.find(i => i.Serie === DtoAeronave.Serie)) {
            Swal.fire(
                "¡Ya se encuentra agregado el número de serie!",
                "",
                "info"
            );
        } else {
            Aeronave.push(DtoAeronave);
            sessionStorage.setItem("SI_Aeronave", JSON.stringify(Aeronave));
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
        $("#Table-AeronaveSI").html(html);
    },

    EliminarAeronav: function (index) {
        Aeronave.splice(index, 1);
        sessionStorage.setItem("SI_Aeronave", JSON.stringify(Aeronave));
        this.RenderTablaA();
        this.ContAeronave();
    },

    //Contar Aeronave
    ContAeronave: function () {
        var ttalAeronav = Aeronave.length;
        document.getElementById('TtalAeronave').textContent = ttalAeronav;
    },

    Limpiar: function () {
        $("#NumSerie_SI").val("");
    }
}

$(function () {

    //Agregar Aeronave
    $(".btn-AddAeroSI").click(function () {
        Aeronav_SI.Add_AeronavSI();
        Aeronav_SI.Limpiar();
    });

    //Remover Aeronave
    $("#Table-AeronaveSI").on("click", "tr td .btn-remove-Aeronav", function () {
        index = parseInt($(this).attr("data-index"));
        Aeronav_SI.EliminarAeronav(index);
    });
});
