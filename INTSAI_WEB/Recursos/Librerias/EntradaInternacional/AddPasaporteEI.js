var Pasaporte = [];

var Pasaport_EI = {

    AddPasaport_EI: function () {

        var Colecciondto = {
            NoPasaporte: $("#NoPasaporte_EI").val(),
            PaisEmision: $("#PaisEmision_EI").val(),
        };

        if (Pasaporte.find(i => i.NoPasaporte === Colecciondto.NoPasaporte)) {
            Swal.fire(
                "¡Ya se encuentra agregado este número de pasaporte!",
                "",
                "info"
            );
        } else {
            Pasaporte.push(Colecciondto);
            sessionStorage.setItem("EI_Pasaport", JSON.stringify(Pasaporte));
            this.TablePasaportEI();
            this.ContPasaport();           
        }            
    },

    TablePasaportEI: function () {
        var html = "";
        $.each(Pasaporte, function (index, value) {
            html += "<tr>";
            html += "<td>" + (index + 1) + "</td>";
            html += "<td>" + value.NoPasaporte + "</td>";
            html += "<td>" + value.PaisEmision + "</td>";
            html += "<td><a class='btn btn-danger btn-remove-Pasaport btn-sm text-light' data-index='" + index + "'><i class='icon-trash3'></i></a></td>";
            html += "</tr>";
        });
        $("#Table-PasaporteEI").html(html);
    },

    //Contar Pasaporte
    ContPasaport: function () {
        var ttalPasaport = Pasaporte.length;
        document.getElementById('TtalPasaporte').textContent = ttalPasaport;
    },

    Limpiar: function () {
        $("#NoPasaporte_EI").val("");
        $("#PaisEmision_EI").val("");
    },

    DeletePasaport: function (index) {
        Pasaporte.splice(index, 1);
        sessionStorage.setItem("EI_Pasaport", JSON.stringify(Pasaporte));
        this.TablePasaportEI();
        this.ContPasaport();
    },

}

$(function () {

    //Agregar Pasaporte
    $(".btn-AddPasaportEI").click(function () {
        Pasaport_EI.AddPasaport_EI();
        Pasaport_EI.Limpiar();
    });

    //Remover Pasaporte
    $("#Table-PasaporteEI").on("click", "tr td .btn-remove-Pasaport", function () {
        index = parseInt($(this).attr("data-index"));
        Pasaport_EI.DeletePasaport(index);
    });


})