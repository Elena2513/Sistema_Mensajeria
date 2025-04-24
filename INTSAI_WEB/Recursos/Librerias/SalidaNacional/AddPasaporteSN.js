var Pasaporte = [];

var Pasaport_SN = {

    AddPasaport_SN: function () {

        var Registrodtos = {
            NoPasaporte: $("#NoPasaporte_SN").val(),
            PaisEmision: $("#PaisEmision_SN").val(),
        };

        if (Pasaporte.find(i => i.NoPasaporte === Registrodtos.NoPasaporte)) {
            Swal.fire(
                "¡Ya se encuentra agregado este número de pasaporte!",
                "",
                "info"
            );
        } else {
            Pasaporte.push(Registrodtos);
            sessionStorage.setItem("SN_Pasaport", JSON.stringify(Pasaporte));
            this.TablePasaportSN();
            this.ContPasaport();
        }
    },

    TablePasaportSN: function () {
        var html = "";
        $.each(Pasaporte, function (index, value) {
            html += "<tr>";
            html += "<td>" + (index + 1) + "</td>";
            html += "<td>" + value.NoPasaporte + "</td>";
            html += "<td>" + value.PaisEmision + "</td>";
            html += "<td><a class='btn btn-danger btn-remove-Pasaport btn-sm text-light' data-index='" + index + "'><i class='icon-trash3'></i></a></td>";
            html += "</tr>";
        });
        $("#Table-PasaporteSN").html(html);
    },

    //Contar Pasaporte
    ContPasaport: function () {
        var ttalPasaport = Pasaporte.length;
        document.getElementById('TtalPasaporte').textContent = ttalPasaport;
    },

    Limpiar: function () {
        $("#NoPasaporte_SN").val("");
        $("#PaisEmision_SN").val("");
    },

    DeletePasaport: function (index) {
        Pasaporte.splice(index, 1);
        sessionStorage.setItem("SN_Pasaport", JSON.stringify(Pasaporte));
        this.TablePasaportSN();
        this.ContPasaport();
    },

}

$(function () {

    //Agregar Pasaporte
    $(".btn-AddPasaportSN").click(function () {
        Pasaport_SN.AddPasaport_SN();
        Pasaport_SN.Limpiar();
    });

    //Remover Pasaporte
    $("#Table-PasaporteSN").on("click", "tr td .btn-remove-Pasaport", function () {
        index = parseInt($(this).attr("data-index"));
        Pasaport_SN.DeletePasaport(index);
    });


})