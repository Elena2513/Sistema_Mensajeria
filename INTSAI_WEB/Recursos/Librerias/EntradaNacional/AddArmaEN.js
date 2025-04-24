var Arma = [];  //ARREGLO

//objeto
var Arma_EN = {

    //método
    Add_ArmaEN: function () {

        //crear nuevo objeto con tres campos
        var RegistroArmaEN = {
            Tipo: $("#Tipo_EN").val(),
            Modelo: $("#Modelo_EN").val(),
            Serie: $("#Serie_EN").val(),
        };

        if (Arma.find(i => i.Tipo === RegistroArmaEN.Tipo)) {
            Swal.fire(
                "¡Ya se encuentra agregada esta Arma!",
                "",
                "info"
            );
        } else {
            Arma.push(RegistroArmaEN);
            sessionStorage.setItem("EN_Armas", JSON.stringify(Arma));
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
        $("#Tipo_EN").val("");
        $("#Modelo_EN").val("");
        $("#Serie_EN").val("")
    },

    EliminarArma: function (index) {
        Arma.splice(index, 1);
        sessionStorage.setItem("EN_Armas", JSON.stringify(Arma));
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

        $("#Table-ArmasEN").html(html);
    }
}

$(function () {

    //Agregar Arma
    $(".btn-AddArmaEN").click(function () {
        Arma_EN.Add_ArmaEN();
        Arma_EN.Limpiar();
    });

    //Remover Arma
    $("#Table-ArmasEN").on("click", "tr td .btn-remove-Arma", function () {
        index = parseInt($(this).attr("data-index"));
        Arma_EN.EliminarArma(index);
    });
});