var Vehiculo = [];

var VehiculoEI = {

    Add_Vehiculo: function () {

        var RegVehiculo = {
            Chasis: $("#vin_EI").val(),
        };

        if (Vehiculo.find(i => i.Chasis === RegVehiculo.Chasis)) {
            Swal.fire(
                "¡Ya se encuentra agregado este Chasis",
                "",
                "info"
            );
        } else {
            Vehiculo.push(RegVehiculo);
            sessionStorage.setItem("EI_Vehiculos", JSON.stringify(Vehiculo));
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
        $("#vin_EI").val("");
       
    },

    EliminarVehiculo: function (index) {
        Vehiculo.splice(index, 1);
        sessionStorage.setItem("EI_Vehiculos", JSON.stringify(Vehiculo));
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

        $("#Table-VehiculoEI").html(html);
    }
}

$(function () {
    //Agregar Vehiculo
    $(".btn-AddVhiculoEI").click(function () {
        VehiculoEI.Add_Vehiculo();
        VehiculoEI.Limpiar();
    });

    //Remover Vehiculo
    $("#Table-VehiculoEI").on("click", "tr td .btn-remove-Vehiculo", function () {
        index = parseInt($(this).attr("data-index"));
        VehiculoEI.EliminarVehiculo(index);
    });

});