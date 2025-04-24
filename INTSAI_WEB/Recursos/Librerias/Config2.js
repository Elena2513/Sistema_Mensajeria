let getUrl = window.location;
//let baseUrl = getUrl.protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1];
let baseUrl = getUrl.protocol + "//" + getUrl.host ;
let indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
indexedDB.deleteDatabase('object');
var dataBase = null;
var active = null;
const expresiones = {

    identificacion: /^([0-9]{13}[a-zA-Z]{1})*$/,
    nombre: /^[a-zA-Z ]*$/,
    imei: /^[0-9]{15}$/


};
const validarCampo = (expresion, input, campo) => {
    if (expresion.test(input.val())) {
        $(campo).attr("border-primary");
        return true;
    } else {
        $(campo).attr("border-danger");
        return false;
    }
};


myDB = {

    load: function (reload) {

        loadData(reload);


    }


};


function loadData(reload) {


    $.ajax({
        url: baseUrl + "/LocalData/full",
        type: "GET",
        dataType: "JSON",
        beforeSend: function () {

            $("#modal-loading").modal();
        }
    }).done(function (response) {

        $("#modal-loading").modal("hide");
        let info = "";
        let html = "";
        let i = 0;
        $.each(response, function (index, value)
        {
            i++;
            html += "<tr>";
            html += "<td>" + i + "</td>";
            html += "<td>" + index + "</td>";
            html += "<td>" + value.length + "</td>";
            html += "<td><i class='fa fa-check'></td>";
            html += "<td></td>";
            html += "</tr>";


            info += index + ": " + value.length + " registros<br>";
            if (index !== "rol" || index !=="userSector")
            sessionStorage.setItem(index, JSON.stringify(value));

        });
        
        $("#table-storage").html(html);

            $("#alert").show();
            $("#modal-loading").modal("hide");
            $("#alert").attr("class","alert alert-success");
            $("#alert").html("<h4>Se cargaron los datos correctamente</h4>");
            $("#alert").fadeOut(6000);
        
        if (reload) {
            location.reload();
        }
        

    }).fail(function (error) {

        sessionStorage.isLoaded = false;

    });
}

recorrer = function (objeto, isTable,control,valueData,showData,dataFilter,filter)
{
    
    if (sessionStorage.getItem(objeto) !== null) {

        let html = "";
        let data = JSON.parse(sessionStorage.getItem(objeto));

        if (isTable) {

            $.each(data, function (index,value) {

                html += "<tr>";
                html += "<td>" + (index + 1) + "</td>";

                $.each(showData, function (index2, value2) {

                    html += "<td>" + value[value2] + "</td>";
                });

                html += "<td><a class='btn btn-success text-light btn-selected-barrio' data-key='" + value[valueData] + "' data-name='" + value[dataFilter] + "' data-other='" + value[filter]+"'  >Seleccionar</td>";
                html += "</tr>";

            });

            $(control).html(html);
            $(".DataTable").DataTable();
        }
        else {

            html = "<option value=''>Seleccione una opcion</option>";

            $.each(data, function (index, value) {

                if (filter) {

                    let xdata = showData.split(".");

                    if (xdata.length > 1) {
                       
                        let x = xdata[0];
                        let y = xdata[1];
                        console.log(x);
                        console.log(y);

                        html += "<option value='" + value[valueData] + "'>" + value[x][y] + "</option>";

                    } else {

                        if (value[dataFilter] === filter) {
                            html += "<option value='" + value[valueData] + "'>" + value[showData] + "</option>";
                        }
                    }

                }
                else {

                    html += "<option value='" + value[valueData] + "'>" + value[showData] + "</option>";
                }

               
            });
        }

        $(control).html(html);

    }
    
}

$(".btn-delete").click(function (e) {
    e.preventDefault();
    $("#modal-dialog-yesnot").modal({
        backdrop: false,
        keyboard: false
    });
    $("#dialog-title").html("<i class='fa fa-exclamation-triangle'></i> Eliminar");
    $("#dialog-text").text("Usted esta seguro que desea eliminar " + $(this).attr("data-content"));
    $("#btn-yes").attr("href", $(this).attr("href"));
});

$("#btn-yes").click(function () {

    $("#modal-loading").modal(
        {
            backdrop: false,
            keyboard: false
        });

});

show_cache_data = function (url) {



}
//FUNCIONES PARA MOSTRAR EL MENSAJE

function Mensaje(msj) {
    swal({
        title: "INTSAI_WEB",
        text: msj,
        imageUrl: "~/resources/img/logoPn.png"
    });


}

function MensajeGuardado(msj) {

    swal('INTSAI_WEB', msj, 'success')
};

//async function save(Url, args) {
//    let result;

//    try {
//        result = await $.ajax({
//            url: Url,
//            type: 'POST',
//            data: args,
//            beforeSend: function () {

//                $(".btn-sync").hide();
//                $("#btn-sync").hide();
//            },
//            error: function (error) {
               
//                let html = "";
//                html += "<div class='alert alert-danger'>";
//                html += "<h4>Error en sincronizacion</h4>";
//                html += "<button type='button' class='close' data-dismiss='alert' >";
//                html += "<span aria-hidden='true'>&times;</span>";
//                html += "</button>";
//                html += "<p>Error de Conectividad</p>";
//                html += "</div>";
//                $("#alert").html(html);
//            }
//        }).done(function (response) {

//            total = response.update + response.add;
//           let html = "";
//            html += "<div class='alert alert-success'>";
//            html += "<h4>Sincronizacion realizada con exito</h4>";
//            html += "<button type='button' class='close' data-dismiss='alert' >";
//            html += "<span aria-hidden='true'>&times;</span>";
//            html += "</button>";
//            html += "<p>" + response.message + "</p>";
//            html += "</div>";
//            $("#alert").html(html);
           
//        });

//        return result;
//    } catch (error) {

//        let html = "";
//        html += "<div class='alert alert-danger'>";
//        html += "<h4>Error en sincronizacion</h4>";
//        html += "<button type='button' class='close' data-dismiss='alert' >";
//        html += "<span aria-hidden='true'>&times;</span>";
//        html += "</button>";
//        html += "<p>Error de Conectividad</p>";
//        html += "</div>";
//        $("#alert").html(html);
//    }
//}

async function save(Url, args) {
    let result;

    try {
        result = await $.ajax({
            url: Url,
            type: 'POST',
            data: args, // Usar FormData directamente
            processData: false, // Deshabilitar el procesamiento automático de datos
            contentType: false, // Deshabilitar el encabezado Content-Type automático
            beforeSend: function () {
                $(".btn-sync").hide();
                $("#btn-sync").hide();
            },
            error: function (error) {
                let html = "<div class='alert alert-danger'>";
                html += "<h4>Error en sincronizacion</h4>";
                html += "<button type='button' class='close' data-dismiss='alert' >";
                html += "<span aria-hidden='true'>&times;</span>";
                html += "</button>";
                html += "<p>Error de Conectividad</p>";
                html += "</div>";
                $("#alert").html(html);
            }
        }).done(function (response) {
            total = response.update + response.add;
            let html = "<div class='alert alert-success'>";
            html += "<h4>Sincronizacion realizada con exito</h4>";
            html += "<button type='button' class='close' data-dismiss='alert' >";
            html += "<span aria-hidden='true'>&times;</span>";
            html += "</button>";
            html += "<p>" + response.message + "</p>";
            html += "</div>";
            $("#alert").html(html);
        });

        return result;
    } catch (error) {
        let html = "<div class='alert alert-danger'>";
        html += "<h4>Error en sincronizacion</h4>";
        html += "<button type='button' class='close' data-dismiss='alert' >";
        html += "<span aria-hidden='true'>&times;</span>";
        html += "</button>";
        html += "<p>Error de Conectividad</p>";
        html += "</div>";
        $("#alert").html(html);
    }
}

function toListSessionStorage() {

    let html = "";
    
    $.each(sessionStorage, function (index, value) {
        console.log(value);
        html += "<tr>";
        html += "<td>" + (index + 1) + "</td>";
        switch (value) {
            case "puntoApoyos":
                html += "<td>" + value + "</td>";
                html += "<td><i class='fa fa-check'></i></td>";
                break;
            case "personaInteres":
                html += "<td>" + value + "</td>";
                html += "<td><i class='fa fa-check'></i></td>";
                break;
            case "focoDelictivos":
                html += "<td>" + value + "</td>";
                html += "<td><i class='fa fa-check'></i></td>";
                break;
            case "grupoPresion":
                html += "<td>" + value + "</td>";
                html += "<td><i class='fa fa-check'></i></td>";
                break;
            
            default:
                html += "<td>" + value + "</td>";
                html += "<td><i class='fa fa-check'></i></td>";
                break;
        }
        
        html += "</tr>"; 
        
    });
    $("#table-storage").html(html);
}


function json2Date(date) {


    if (date[0] === "/") {
        var myDate = new Date(parseInt(date.replace("/Date(", "").replace(")/", ""), 10));
        var day = myDate.getDate();
        var monthIndex = myDate.getMonth();
        var year = myDate.getFullYear();

        if ((monthIndex + 1) < 10) {
            monthIndex = "0" + (monthIndex+1);
        }
        else {
            monthIndex = (monthIndex +  1);
        }

        if (day < 10) {
            day = "0" + day;
        }

        var newdate = year + "-" + (monthIndex) + "-" + day;
        return newdate;
    }
    else {
        return date;
    }
    
   
   
}

function json2RealDate(date) {
    var myDate = new Date(parseInt(date.replace("/Date(", "").replace(")/", ""), 10));
    return Date.parse(myDate);
}
