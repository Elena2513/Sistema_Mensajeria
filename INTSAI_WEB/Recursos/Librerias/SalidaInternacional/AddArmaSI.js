var Arma = [];

var Arma_SI = {

    Add_ArmaSI: function () {

        var RegArma = {
            Tipo: $("#Tipo_SI").val(),
            Modelo: $("#Modelo_SI").val(),
            Serie: $("#Serie_SI").val(),
        };

        if (Arma.find(i => i.Tipo === RegArma.Tipo)) {
            Swal.fire(
                "¡Ya se encuentra agregada esta Arma!",
                "",
                "info"
            );
        } else {
            Arma.push(RegArma);
            sessionStorage.setItem("SI_Armas", JSON.stringify(Arma));
            this.RenderTable();
            this.ContarArma();
        }
    },

    //Contar Arma
    ContarArma: function () {
        var ttalArma = Arma.length;
        document.getElementById('TtalArmas').textContent = ttalArma;
    },

    Limpiar: function () {
        $("#Tipo_SI").val("");
        $("#Modelo_SI").val("");
        $("#Serie_SI").val("")
    },

    EliminarArma: function (index) {
        Arma.splice(index, 1);
        sessionStorage.setItem("SI_Armas", JSON.stringify(Arma));
        this.RenderTable();
        this.ContarArma();
    },

    RenderTable: function () {
        var html = "";
        $.each(Arma, function (index, value) {
            html += "<tr>";
            html += "<td>" + (index + 1) + "</td>";
            html += "<td>" + value.Tipo + "</td>";
            html += "<td>" + value.Modelo + "</td>";
            html += "<td>" + value.Serie + "</td>";
            html += "<td><a class='btn btn-danger btn-remove-Arma btn-sm text-light' data-index='" + index + "'><i class='icon-trash3'></i></a></td>";
            html += "</tr>";
        });

        $("#Table-ArmasSI").html(html);
    }
}

$(function () {

    //Agregar Arma
    $(".btn-AgregArmasSI").click(function () {
        Arma_SI.Add_ArmaSI();
        Arma_SI.Limpiar();
    });

    //Remover Arma
    $("#Table-ArmasSI").on("click", "tr td .btn-remove-Arma", function () {
        index = parseInt($(this).attr("data-index"));
        Arma_SI.EliminarArma(index);
    });
});
