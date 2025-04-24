var Vehiculo = [];

var VehiculoSI = {

    Add_Vehiculo: function () {

        var RegVehiculo = {
            Chasis: $("#vin_SI").val(),
        };

        if (Vehiculo.find(i => i.Chasis === RegVehiculo.Chasis)) {
            Swal.fire(
                "¡Ya se encuentra agregado este Chasis",
                "",
                "info"
            );
        } else {
            Vehiculo.push(RegVehiculo);
            sessionStorage.setItem("SI_Vehiculos", JSON.stringify(Vehiculo));
            this.RenderTable();
            this.ContarVehiculo();
        }
    },

    //Contar Vehiculo
    ContarVehiculo: function () {
        var ttalvehiculo = Vehiculo.length;
        document.getElementById('TtalVehiculos').textContent = ttalvehiculo;
    },

    Limpiar: function () {
        $("#vin_SI").val("");
    },

    EliminarVehiculo: function (index) {
        Vehiculo.splice(index, 1);
        sessionStorage.setItem("SI_Vehiculos", JSON.stringify(Vehiculo));
        this.RenderTable();
        this.ContarVehiculo();
    },


    RenderTable: function () {
        var html = "";
        $.each(Vehiculo, function (index, value) {
            html += "<tr>";
            html += "<td>" + (index + 1) + "</td>";
            html += "<td>" + value.Chasis + "</td>";
            html += "<td><a class='btn btn-danger btn-remove-Vehiculo btn-sm text-light' data-index='" + index + "'><i class='icon-trash3'></i></a></td>";
            html += "</tr>";
        });

        $("#Table-VehiculoSI").html(html);
    }
}

$(function () {
    //Agregar Vehiculo
    $(".btn-AddVhiculoSI").click(function () {
        VehiculoSI.Add_Vehiculo();
        VehiculoSI.Limpiar();
    });

    //Remover Vehiculo
    $("#Table-VehiculoSI").on("click", "tr td .btn-remove-Vehiculo", function () {
        index = parseInt($(this).attr("data-index"));
        VehiculoSI.EliminarVehiculo(index);
    });

});
