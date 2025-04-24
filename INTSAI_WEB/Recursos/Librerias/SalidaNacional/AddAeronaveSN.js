var Aeronave = [];

var Aeronav_SN = {

    Add_AeronavSN: function () {

        var DatoAeronave = {

            Serie: $("#NumSerie_SN").val(),
        };

        if (Aeronave.find(i => i.Serie === DatoAeronave.Serie)) {
            Swal.fire(
                "¡Ya se encuentra agregado el número de serie!",
                "",
                "info"
            );
        } else {
            Aeronave.push(DatoAeronave);
            sessionStorage.setItem("SN_Aeronave", JSON.stringify(Aeronave));
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
        $("#Table-AeronaveSN").html(html);
    },

    EliminarAeronav: function (index) {
        Aeronave.splice(index, 1);
        sessionStorage.setItem("SN_Aeronave", JSON.stringify(Aeronave));
        this.RenderTablaA();
        this.ContAeronave();
    },

    //Contar Aeronave
    ContAeronave: function () {
        var ttalAeronav = Aeronave.length;
        document.getElementById('TtalAeronave').textContent = ttalAeronav;
    },

    Limpiar: function () {
        $("#NumSerie_SN").val("");
    }
}

$(function () {

    //Agregar Aeronave
    $(".btn-AddAeroSN").click(function () {
        Aeronav_SN.Add_AeronavSN();
        Aeronav_SN.Limpiar();
    });

    //Remover Aeronave
    $("#Table-AeronaveSN").on("click", "tr td .btn-remove-Aeronav", function () {
        index = parseInt($(this).attr("data-index"));
        Aeronav_SN.EliminarAeronav(index);
    });
});