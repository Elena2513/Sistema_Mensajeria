var Arma = [];

var Arma_EI = {

    Add_ArmaEI: function () {

        var RegistroArma = {
            Tipo: $("#Tipo_EI").val(),
            Modelo: $("#Modelo_EI").val(),
            Serie: $("#Serie_EI").val(),
        };

        if (Arma.find(i => i.Tipo === RegistroArma.Tipo)) {
            Swal.fire(
                "¡Ya se encuentra agregada esta Arma!",
                "",
                "info"
            );
        } else {
            Arma.push(RegistroArma);
            sessionStorage.setItem("EI_Armas", JSON.stringify(Arma));
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
        $("#Tipo_EI").val("");
        $("#Modelo_EI").val("");
        $("#Serie_EI").val("")
    },

    EliminarArma: function (index) {
        Arma.splice(index, 1);
        sessionStorage.setItem("EI_Armas", JSON.stringify(Arma));
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

        $("#Table-ArmasEI").html(html);
    }
}

$(function () {

    //Agregar Arma
    $(".btn-AgregArmasEI").click(function () {
        Arma_EI.Add_ArmaEI();
        Arma_EI.Limpiar();
    });

    //Remover Arma
    $("#Table-ArmasEI").on("click", "tr td .btn-remove-Arma", function () {
        index = parseInt($(this).attr("data-index"));
        Arma_EI.EliminarArma(index);
    });
});