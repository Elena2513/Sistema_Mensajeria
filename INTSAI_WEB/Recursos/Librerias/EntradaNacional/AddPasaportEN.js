var Pasaporte = [];

var Pasaporte_EN = {

    AddPasaporte_EN: function () {

        var Registrodtos = {
            NoPasaporte: $("#NoPasaporte_EN").val(),
            PaisEmision: $("#PaisEmision_EN").val(),
        };

        if (Pasaporte.find(i => i.NoPasaporte === Registrodtos.NoPasaporte)) {
            Swal.fire(
                "¡Ya se encuentra agregado este número de pasaporte!",
                "",
                "info"
            );
        } else {
            Pasaporte.push(Registrodtos);
            sessionStorage.setItem("EN_Pasaport", JSON.stringify(Pasaporte));
            this.TablePasaportEN();
            this.ContPasaport();
        }
    },

    TablePasaportEN: function () {
        var html = "";
        $.each(Pasaporte, function (index, value) {
            html += "<tr>";
            html += "<td>" + (index + 1) + "</td>";
            html += "<td>" + value.NoPasaporte + "</td>";
            html += "<td>" + value.PaisEmision + "</td>";
            html += "<td><a class='btn btn-danger btn-remove-Pasaport btn-sm text-light' data-index='" + index + "'><i class='icon-trash3'></i></a></td>";
            html += "</tr>";
        });
        $("#Table-PasaporteEN").html(html);
    },

    //Contar Pasaporte
    ContPasaport: function () {
        var ttalPasaport = Pasaporte.length;
        document.getElementById('TtalPasaporte').textContent = ttalPasaport;
    },

    Limpiar: function () {
        $("#NoPasaporte_EN").val("");
        $("#PaisEmision_EN").val("");
    },

    DeletePasaport: function (index) {
        Pasaporte.splice(index, 1);
        sessionStorage.setItem("EN_Pasaport", JSON.stringify(Pasaporte));
        this.TablePasaportSI();
        this.ContPasaport();
    },
}

$(function () {

    //Agregar Pasaporte
    $(".btn-AddPasaportEN").click(function () {
        Pasaporte_EN.AddPasaporte_EN();
        Pasaporte_EN.Limpiar();
    });

    //Remover Pasaporte
    $("#Table-PasaporteEN").on("click", "tr td .btn-remove-Pasaport", function () {
        index = parseInt($(this).attr("data-index"));
        Pasaporte_EN.DeletePasaport(index);
    });
})