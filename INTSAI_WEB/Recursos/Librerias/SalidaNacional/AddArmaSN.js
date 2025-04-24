var Arma = [];

var Arma_SN = {

    Add_ArmaSN: function () {

        var RegistroArma = {
            Tipo: $("#Tipo_SN").val(),
            Modelo: $("#Modelo_SN").val(),
            Serie: $("#Serie_SN").val(),
        };

        if (Arma.find(i => i.Tipo === RegistroArma.Tipo)) {
            Swal.fire(
                "¡Ya se encuentra agregada esta Arma!",
                "",
                "info"
            );
        } else {
            Arma.push(RegistroArma);
            sessionStorage.setItem("SN_Armas", JSON.stringify(Arma));
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
        $("#Tipo_SN").val("");
        $("#Modelo_SN").val("");
        $("#Serie_SN").val("")
    },

    EliminarArma: function (index) {
        Arma.splice(index, 1);
        sessionStorage.setItem("SN_Armas", JSON.stringify(Arma));
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

        $("#Table-ArmasSN").html(html);
    }
};


$(function () {

    // Event delegation for remove button
    $(document).on('click', '.btn-remove-Arma', function () {
        var index = $(this).data('index');
        Arma_SN.EliminarArma(index);
    });


    //Agregar Arma
    $(".btn-AgregArmasSN").click(function () {
        Arma_SN.Add_ArmaSN();
        Arma_SN.Limpiar();
    });

    //Remover Arma
    //$("#Table-ArmasSN").on("click", "tr td .btn-remove-Arma", function () {
    //    index = parseInt($(this).attr("data-index"));
    //    Arma_SN.EliminarArma(index);
    //});
});