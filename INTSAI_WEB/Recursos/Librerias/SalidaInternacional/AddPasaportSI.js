var Pasaporte = [];

var Pasaport_SI = {

    AddPasaport_SI: function () {

        var Registrodtos = {
            NoPasaporte: $("#NoPasaporte_SI").val(),
            PaisEmision: $("#PaisEmision_SI").val(),
        };

        if (Pasaporte.find(i => i.NoPasaporte === Registrodtos.NoPasaporte)) {
            Swal.fire(
                "¡Ya se encuentra agregado este número de pasaporte!",
                "",
                "info"
            );
        } else {
            Pasaporte.push(Registrodtos);
            sessionStorage.setItem("SI_Pasaport", JSON.stringify(Pasaporte));
            this.TablePasaportSI();
            this.ContPasaport();
        }
    },

    TablePasaportSI: function () {
        var html = "";
        $.each(Pasaporte, function (index, value) {
            html += "<tr>";
            html += "<td>" + (index + 1) + "</td>";
            html += "<td>" + value.NoPasaporte + "</td>";
            html += "<td>" + value.PaisEmision + "</td>";
            html += "<td><a class='btn btn-danger btn-remove-Pasaport btn-sm text-light' data-index='" + index + "'><i class='icon-trash3'></i></a></td>";
            html += "</tr>";
        });
        $("#Table-PasaporteSI").html(html);
    },

    //Contar Pasaporte
    ContPasaport: function () {
        var ttalPasaport = Pasaporte.length;
        document.getElementById('TtalPasaporte').textContent = ttalPasaport;
    },

    Limpiar: function () {
        $("#NoPasaporte_SI").val("");
        $("#PaisEmision_SI").val("");
    },

    DeletePasaport: function (index) {
        Pasaporte.splice(index, 1);
        sessionStorage.setItem("SI_Pasaport", JSON.stringify(Pasaporte));
        this.TablePasaportSI();
        this.ContPasaport();
    },

}

$(function () {

    //Agregar Pasaporte
    $(".btn-AddPasaportSI").click(function () {
        Pasaport_SI.AddPasaport_SI();
        Pasaport_SI.Limpiar();
    });

    //Remover Pasaporte
    $("#Table-PasaporteSI").on("click", "tr td .btn-remove-Pasaport", function () {
        index = parseInt($(this).attr("data-index"));
        Pasaport_SI.DeletePasaport(index);
    });


})
