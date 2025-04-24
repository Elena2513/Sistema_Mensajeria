var Aeronave = [];

var Aeronav_EI = {

    Add_AeronavEI: function () {

        var DatoAeronave = {

            Serie: $("#NumSerie_EI").val(),          
        };       

        if (Aeronave.find(i => i.Serie === DatoAeronave.Serie)) {
            Swal.fire(
                "¡Ya se encuentra agregado el número de serie!",
                "",
                "info"
            );

        }else {
            Aeronave.push(DatoAeronave);
            sessionStorage.setItem("EI_Aeronave", JSON.stringify(Aeronave));
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
        $("#Table-AeronaveEI").html(html);
    },

    EliminarAeronav: function (index) {
        Aeronave.splice(index, 1);
        sessionStorage.setItem("EI_Aeronave", JSON.stringify(Aeronave));
        this.RenderTablaA();
        this.ContAeronave();
    },

    //Contar Aeronave
    ContAeronave: function () {
        var ttalAeronav = Aeronave.length;
        document.getElementById('TtalAeronave').textContent = ttalAeronav;
    },

    Limpiar: function () {
        $("#NumSerie_EI").val("");
    }
}

$(function () {

    //Agregar Aeronave
    $(".btn-AddAeroEI").click(function () {
        Aeronav_EI.Add_AeronavEI();
        Aeronav_EI.Limpiar();
    });

    //Remover Aeronave
    $("#Table-AeronaveEI").on("click", "tr td .btn-remove-Aeronav", function () {
        index = parseInt($(this).attr("data-index"));
        Aeronav_EI.EliminarAeronav(index);
    });
});