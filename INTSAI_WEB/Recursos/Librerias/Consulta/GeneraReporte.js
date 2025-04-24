
var GenerarReporte = {

    //MENSAJERIA DE SALIDA INTERNACIONAL
    Rpt_SalidaInternacional: function () {        
        $.ajax({
            url: baseUrl + "/Reportes/GeneraRPT",
            type: "GET",
            data: {
                FecIni: $("#FechaInicioRpt").val(),
                FecFin: $("#FechaFinalRpt").val(),
                Cuenta: $("#usuario").val(),
                Filtro: "",
                tipoReporte: $("#Tipo_Reporte").val(),
            },
            dataType: "JSON",
            beforeSend: function () {
                $("modal-data-preview").modal();
            }
        }).done(function (response) {
            var Inicio = $("#FechaInicioRpt").val();
            var Final = $("#FechaFinalRpt").val();

            html = "";
            html += "<div class='row'>";            
            html += "<div class='col-2 col-sm-2 col-lg-2'>";
            html += "<img src='/Recur_Logo/Imagen/Roja.jpg'  width='60%'>";           
            html += "</div>";

            html += "<div class='col-8 col-sm-8 col-lg-8 text-xs-center'>";
            html += "<h2 style='margin:0px; padding:0px;'>NOMBRE INSTITUCION</h2>";
            html += "<h4 style='margin:0px; padding:0px;'>SUB TEMA</h4>";   
            //html += "<h3 style='margin:0px; padding:0px;'>" + response.Delegacion + "</h3>";
            html += "</div>";

            html += "<div class='col-2 col-sm-2 col-lg-2'>";
            html += "<img src='/Recur_Logo/Imagen/florcita.jpg'  width='60%'>";
            html += "</div>";
            html += "</div>";

            // Contenedor para todo el reporte
            //html += "<div id='reporte-completo'>";          

            html += "<div class='row text-xs-center'>";
            html += "<h4 style='margin:0px; padding:0px;'>MENSAJERIA DE SALIDA DEL " + Inicio +  "  HASTA  " + Final + "</h4>";
            html += "</div>";

            html += "<div class='row'>";
            html += "</div>";
            
            var Grupo1 = response.filter(function (item) {
                return item.CodGrupo1 == 1;     
            });

            html += "<br/>";
            html += "<div>";
            html += "<table class='col-8 col-sm-8 col-lg-8 text-xs-center table table-responsive'>";
            html += "<thead>";

            // Agregar la fila de encabezado solo una vez
            var encabezadoAgregado = false;

            $.each(Grupo1, function (index, value1) {

                if (!encabezadoAgregado) {
                    html += "<tr>";
                    html += "<th colspan='2'>" + value1.Grupo1 + "</th>"; // Ajustar el número de columnas según lo que necesites
                    html += "</tr>";
                    encabezadoAgregado = true; // Evitar que se repita
                }             
            });
            html += "</thead>";            
            // Agregar el cuerpo de la tabla
            html += "<tbody>";

            var TtalGnral = 0;
            $.each(Grupo1, function (index, value) {
                TtalGnral += value.Total;
                html += "<tr>";               
                html += "<td>" + value.Estructura + "</td>";
                html += "<td><strong>" + value.Total + "</strong></td>";                    
                html += "</tr>";
            });

            html += "</tbody>"; // Cerrar el cuerpo de la tabla correctamente

            //pie de página
            let tfoot = "<tfoot>";
            tfoot += "<tr>";
            tfoot += "<td>TOTAL</td>";
            tfoot += "<td><strong>" + TtalGnral + "</strong></td>";
            tfoot += "</tr>";
            tfoot += "</tfoot>";        
            html += tfoot; // Agregar el pie de página al HTML
                     
            html += "</table>";  
            html += "</div>";  // Cierre del div de GRUPO1

            // DESDE AQUÍ INICIA EL GRUPO3  ********** ////////////////
            var Grupo3 = response.filter(function (item) {
                return item.CodGrupo1 == 3;
            });

            if (Grupo3.length > 0) {
                html += "<br/>";
                html += "<div>";
                html += "<table class='col-8 col-sm-8 col-lg-8 text-xs-center table table-responsive'>";
                html += "<thead>";

                // Agregar encabezado solo una vez
                html += "<tr>";
                html += "<th colspan='3'>" + Grupo3[0].Grupo1 + "</th>"; // Título general del grupo
                html += "</tr>";
                html += "<tr>";
                html += "<th>Estructura</th>";
                html += "<th>Total</th>";
                html += "</tr>";

                html += "</thead>";

                // Cuerpo de la tabla
                html += "<tbody>";
                var Ttalgrupo3 = 0;

                $.each(Grupo3, function (index, value2) {
                    Ttalgrupo3 += value2.Total;
                    html += "<tr>";
                    html += "<td>" + value2.Estructura + "</td>";
                    html += "<td>" + value2.Total + "</td>";
                    html += "</tr>";
                });

                html += "</tbody>";

                // Pie de página
                html += "<tfoot>";
                html += "<tr>";
                html += "<td colspan='2'><strong>TOTAL</strong></td>";
                html += "<td><strong>" + Ttalgrupo3 + "</strong></td>";
                html += "</tr>";
                html += "</tfoot>";

                html += "</table>";
                html += "</div>";
            }

            /////////// GRUPO 4 *********************************/////////////////////////////////////
            var Grupo4 = response.filter(function (item) {
                return item.CodGrupo1 == 4;
            });

            html += "<br/>";
            html += "<div>";
            html += "<table class='table table-responsive'>";
            html += "<thead>";

            // Agregar la fila de encabezado solo una vez
            var encabezadoAgregado = false;

            $.each(Grupo4, function (index, value1) {

                if (!encabezadoAgregado) {
                    html += "<tr>";
                    html += "<th colspan='2'>" + value1.Grupo1 + "</th>"; // Ajustar el número de columnas según lo que necesites
                    html += "</tr>";
                    encabezadoAgregado = true; // Evitar que se repita
                }
            });
            html += "</thead>";
            html += "<tbody>";

            var TtalDifusion = 0;
            var estructuraAnterior = ""; // Variable para mantener la estructura anterior
            var totalSeccion = 0; // Total por sección


            $.each(Grupo4, function (index, value) {
                // Verificar si la estructura ha cambiado
                if (estructuraAnterior !== value.Estructura) {
                    // Si la estructura cambia, agregar el nombre de la nueva estructura solo una vez
                    if (estructuraAnterior !== "") {
                        //html += "<tr><td colspan='2'><hr></td></tr>";  // Separador entre estructuras
                        // Agregar el total de la sección anterior
                        html += "<tr><td><strong>TOTAL " + estructuraAnterior + "</strong></td><td><strong>" + totalSeccion + "</strong></td></tr>";
                    }
                    html += "<tr><td colspan='2'><strong>" + value.Estructura + "</strong></td></tr>";
                    estructuraAnterior = value.Estructura; // Actualizar la estructura anterior
                    totalSeccion = 0; // Reiniciar el total de la nueva sección

                }

                // Mostrar los valores de TipoDifusion y Total
                totalSeccion += value.Total; // Sumar al total de la sección
                TtalDifusion += value.Total; // Sumar al total general

                //console.log(TtalDifusion);
                html += "<tr>";
                html += "<td>" + value.TipoDifusion + "</td>";
                html += "<td>" + value.Total + "</td>";
                html += "</tr>";
            });

            html += "</tbody>"; // Cerrar el cuerpo de la tabla correctamente


            // Agregar el total de la última sección
            //html += "<tr><td colspan='2'><hr></td></tr>";
            html += "<tr><td><strong>TOTAL " + estructuraAnterior + "</strong></td><td><strong>" + totalSeccion + "</strong></td></tr>";


            //pie de página
            //let tfoot4 = "<tfoot>";
            //tfoot4 += "<tr>";
            //tfoot4 += "<td><strong> TOTAL GENERAL</strong></td>";
            //tfoot4 += "<td><strong>" + TtalDifusion + "</strong></td>";
            //tfoot4 += "</tr>";
            //tfoot4 += "</tfoot>";
            //html += tfoot4; // Agregar el pie de página al HTML

            html += "</table>";
            html += "</div>";    // Cierre del div de GRUPO4

            // Cierre del contenedor principal para todo el reporte
            html += "</div>";  // Cierre del div con id "reporte-completo"

            $("#data-preview").html(html);

            //setTimeout(() => {
            //    console.log(document.getElementById('reporte-completo')); // Verifica si existe en el DOM
            //    console.log($("#reporte-completo").html());  // Contenedor con ID único para todo el reporte
         
            //}, 500);

            $("#modal-data-preview").modal();     
            
        });      
    },

    //CONSOLIDADO DE CONSULTAS POR OCN - PTO EXTERNO
    ConsultaOCN_PE: function () {

        function generarTabla(datos, inicio, final) {
            let agrupados = {};

            datos.forEach(({ Grupo1, Estructura, Total }) => {
                if (!agrupados[Estructura]) {
                    agrupados[Estructura] = { Nominal: 0, Vehiculos: 0, Pasaporte: 0, Total: 0 };
                }

                // Inicializar si el campo Grupo1 aún no ha sido asignado
                if (!(Grupo1 in agrupados[Estructura])) {
                    agrupados[Estructura][Grupo1] = 0;
                }

                agrupados[Estructura][Grupo1] += Total;
                agrupados[Estructura].Total += Total;
            });

            let totalGeneral = { Nominal: 0, Vehiculos: 0, Pasaporte: 0, Total: 0 };

            Object.keys(agrupados).forEach((estructura) => {
                totalGeneral.Nominal += agrupados[estructura].Nominal;
                totalGeneral.Vehiculos += agrupados[estructura].Vehiculos;
                totalGeneral.Pasaporte += agrupados[estructura].Pasaporte;
                totalGeneral.Total += agrupados[estructura].Total;
            });

            let html = `      
        <table border='2' id="tablaDatos">
            <thead>
             <tr>
                 <th colspan="5" style="text-align:center; font-size:16px; padding:10px;">
                     CONSOLIDADO DE CONSULTAS DESDE ${inicio} HASTA ${final}
                 </th>
              </tr>
                <tr>
                    <th>Estructura</th>
                    <th>Nominal</th>
                    <th>Vehiculos</th>
                    <th>Pasaporte</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>`;

            // Generar filas para cada estructura
            Object.keys(agrupados).forEach((estructura) => {
                html += `<tr>
            <td>${estructura}</td>
            <td>${agrupados[estructura].Nominal}</td>
            <td>${agrupados[estructura].Vehiculos}</td>
            <td>${agrupados[estructura].Pasaporte}</td>
            <td>${agrupados[estructura].Total}</td>
        </tr>`;
            });

            // Agregar fila de totales generales
            html += `<tr style="font-weight: bold;">
        <td>Total</td>
        <td>${totalGeneral.Nominal}</td>
        <td>${totalGeneral.Vehiculos}</td>
        <td>${totalGeneral.Pasaporte}</td>
        <td>${totalGeneral.Total}</td>
     </tr>`;

            html += `</tbody></table>`;

            // Insertar el título y la tabla en el contenedor
            document.getElementById('contenedor-tabla').innerHTML = html;
        }

        // Petición AJAX para obtener los datos
        $(document).ready(function () {
            $.ajax({
                url: baseUrl + "/Reportes/GeneraRPT",
                type: 'GET',
                data: {
                    FecIni: $("#FechaInicioRpt").val(),
                    FecFin: $("#FechaFinalRpt").val(),
                    Cuenta: $("#usuario").val(),
                    Filtro: "",
                    tipoReporte: $("#Tipo_Reporte").val(),
                },
                dataType: 'JSON',
                success: function (response) {
                    var inicio = $("#FechaInicioRpt").val();
                    var final = $("#FechaFinalRpt").val();
                    generarTabla(response, inicio, final);
                },
                error: function (xhr, status, error) {
                    console.error('Error al obtener los datos:', error);
                }
            });
        });
    },

    //MENSAJERIA RECEPCIONADA MUNDIAL (GLOBAL)
    Rpt_Msj_Global: function () {
        $.ajax({
            url: baseUrl + "/Reportes/GeneraRPT",
            type: "GET",
            data: {
                FecIni: $("#FechaInicioRpt").val(),
                FecFin: $("#FechaFinalRpt").val(),
                Cuenta: '',
                Filtro: '',
                tipoReporte: $("#Tipo_Reporte").val(),
            },
            dataType: "JSON",
            beforeSend: function () {
                $("modal-data-preview").modal();
            }
        }).done(function (response) {
            var Inicio = $("#FechaInicioRpt").val();
            var Final = $("#FechaFinalRpt").val();
            let html = "";

            html += "<div class='row text-xs-center'>";
            html += "<h4 style='margin:0px; padding:0px;'>MENSAJERIA RECEPCIONADA MUNDIAL DEL " + Inicio + "  HASTA  " + Final + "</h4>";
            html += "</div><br/>";

            // Separar el grupo especial No == 4
            const motivos = response.filter(item => item.No === 4);
            const otros = response.filter(item => item.No !== 4);

            // --------------------- GRUPOS NORMALES ----------------------
            const tiposUnicos = [...new Set(otros.map(item => item.Tipo))]
            .filter(tipo => tipo !== "MENSAJES POR MOTIVO DE DIFUSION");

            tiposUnicos.forEach(tipo => {
                const grupo = otros.filter(item => item.Tipo === tipo);

                html += "<div class='table-responsive mb-4'>";
                html += "<table class='table table-bordered'>";
                html += "<thead><tr><th colspan='2' style='background-color:#f0f0f0; text-align:center;'>" + tipo + "</th></tr></thead>";
                html += "<tbody>";

                let total = 0;

                grupo.forEach(item => {
                    total += item.Cantidad;
                    html += "<tr>";
                    html += "<td>" + item.Continente + "</td>";
                    html += "<td class='text-end'><strong>" + item.Cantidad + "</strong></td>";
                    html += "</tr>";
                });

                html += "<tr>";
                html += "<td><strong>TOTAL</strong></td>";
                html += "<td class='text-end'><strong>" + total + "</strong></td>";
                html += "</tr>";

                html += "</tbody></table></div>";
            });

            // ------------------- GRUPO ESPECIAL No == 4 -------------------
            var Tipo4 = response.filter(function (item) {
                return item.No == 4;
            });

            html += "<br/>";
            html += "<div>";
            html += "<table class='table table-responsive'>";
            html += "<thead>";

            // Agregar la fila de encabezado solo una vez
            var encabezadoAgregado = false;

            $.each(Tipo4, function (index, value1) {
                if (!encabezadoAgregado) {
                    html += "<tr>";
                    html += "<th colspan='2'>" + value1.Tipo + "</th>"; // Ajustar el número de columnas según lo que necesites
                    html += "</tr>";
                    encabezadoAgregado = true; // Evitar que se repita
                }
            });
            html += "</thead>";
            html += "<tbody>";

            var TtalContinente = 0;
            var ContinenteAnterior = ""; // Variable para mantener la estructura anterior
            var totalSeccion = 0; // Total por sección

            $.each(Tipo4, function (index, value) {
                // Verificar si la estructura ha cambiado
                if (ContinenteAnterior !== value.CodContinente) {
                    // Si la estructura cambia, agregar el nombre de la nueva estructura solo una vez
                    if (ContinenteAnterior !== "") {
                        // Agregar el total de la sección anterior
                        html += "<tr><td><strong>TOTAL " + ContinenteAnterior + "</strong></td><td><strong>" + totalSeccion + "</strong></td></tr>";
                    }
                    html += "<tr><td colspan='2'><strong>" + value.CodContinente + "</strong></td></tr>";
                    ContinenteAnterior = value.CodContinente; // Actualizar la estructura anterior
                    totalSeccion = 0; // Reiniciar el total de la nueva sección
                }

                totalSeccion += value.Cantidad; // Sumar al total de la sección
                TtalContinente += value.Cantidad; // Sumar al total general

                html += "<tr>";
                html += "<td>" + value.Continente + "</td>";
                html += "<td>" + value.Cantidad + "</td>";
                html += "</tr>";
            });

            // Cantidad general de todos los grupos
            html += "<tr><td><strong>TOTAL " + ContinenteAnterior + "</strong></td><td><strong>" + totalSeccion + "</strong></td></tr>";
            html += "</tbody></table></div>";

            // Mostrar en el modal
            $("#data-preview").html(html);
            $("#modal-data-preview").modal();
        });
    },

    //MENSAJERIA RECEPCIONADA NICARAGUA
    Rpt_Msj_Nicaragua: function () {
        $.ajax({
            url: baseUrl + "/Reportes/GeneraRPT",
            type: "GET",
            data: {
                FecIni: $("#FechaInicioRpt").val(),
                FecFin: $("#FechaFinalRpt").val(),
                Cuenta: '',
                Filtro: '',
                tipoReporte: $("#Tipo_Reporte").val(),
            },
            dataType: "JSON",
            beforeSend: function () {
                $("modal-data-preview").modal();
            }
        }).done(function (response) {
            var Inicio = $("#FechaInicioRpt").val();
            var Final = $("#FechaFinalRpt").val();
            let html = "";

            html += "<div class='row text-xs-center'>";
            html += "<h4 style='margin:0px; padding:0px;'>MENSAJERIA RECEPCIONADA PARA NICARAGUA DEL " + Inicio + "  HASTA  " + Final + "</h4>";
            html += "</div><br/>";

            // Separar el grupo especial No == 4           
            const otros = response.filter(item => item.No !== 4);

            // --------------------- GRUPOS NORMALES ----------------------
            const tiposUnicos = [...new Set(otros.map(item => item.Tipo))]
                .filter(tipo => tipo !== "MENSAJES POR MOTIVO DE DIFUSION"); //Agregar filtro para excluir de la lista MENSAJES POR MOTIVO DE DIFUSION

            tiposUnicos.forEach(tipo => {
                const grupo = otros.filter(item => item.Tipo === tipo);

                html += "<div class='table-responsive mb-4'>";
                html += "<table class='table table-bordered'>";
                html += "<thead><tr><th colspan='2' style='background-color:#f0f0f0; text-align:center;'>" + tipo + "</th></tr></thead>";
                html += "<tbody>";

                let total = 0;

                grupo.forEach(item => {
                    total += item.Cantidad;
                    html += "<tr>";
                    html += "<td>" + item.Continente + "</td>";
                    html += "<td class='text-end'><strong>" + item.Cantidad + "</strong></td>";
                    html += "</tr>";
                });

                html += "<tr>";
                html += "<td><strong>TOTAL</strong></td>";
                html += "<td class='text-end'><strong>" + total + "</strong></td>";
                html += "</tr>";

                html += "</tbody></table></div>";
            });

            // ------------------- GRUPO ESPECIAL No == 4 -------------------
            var Tipo4 = response.filter(function (item) {
                return item.No == 4;
            });

            html += "<br/>";
            html += "<div>";
            html += "<table class='table table-responsive'>";
            html += "<thead>";

            // Agregar la fila de encabezado solo una vez
            var encabezadoAgregado = false;

            $.each(Tipo4, function (index, value1) {
                if (!encabezadoAgregado) {
                    html += "<tr>";
                    html += "<th colspan='2'>" + value1.Tipo + "</th>"; // Ajustar el número de columnas según lo que necesites
                    html += "</tr>";
                    encabezadoAgregado = true; // Evitar que se repita
                }
            });
            html += "</thead>";
            html += "<tbody>";

            var TtalContinente = 0;
            var ContinenteAnterior = ""; // Variable para mantener la estructura anterior
            var totalSeccion = 0; // Total por sección

            $.each(Tipo4, function (index, value) {
                // Verificar si la estructura ha cambiado
                if (ContinenteAnterior !== value.CodContinente) {
                    // Si la estructura cambia, agregar el nombre de la nueva estructura solo una vez
                    if (ContinenteAnterior !== "") {
                        // Agregar el total de la sección anterior
                        html += "<tr><td><strong>TOTAL " + ContinenteAnterior + "</strong></td><td><strong>" + totalSeccion + "</strong></td></tr>";
                    }
                    html += "<tr><td colspan='2'><strong>" + value.CodContinente + "</strong></td></tr>";
                    ContinenteAnterior = value.CodContinente; // Actualizar la estructura anterior
                    totalSeccion = 0; // Reiniciar el total de la nueva sección
                }

                totalSeccion += value.Cantidad; // Sumar al total de la sección
                TtalContinente += value.Cantidad; // Sumar al total general

                html += "<tr>";
                html += "<td>" + value.Continente + "</td>";
                html += "<td>" + value.Cantidad + "</td>";
                html += "</tr>";
            });

            // Cantidad general de todos los grupos
            html += "<tr><td><strong>TOTAL " + ContinenteAnterior + "</strong></td><td><strong>" + totalSeccion + "</strong></td></tr>";
            html += "</tbody></table></div>";

            // Mostrar en el modal
            $("#data-preview").html(html);
            $("#modal-data-preview").modal();
        });
    },

    //MENSAJERIA DE ENTRADA NACIONAL
    Rpt_EntradaNacional: function () {
        $.ajax({
            url: baseUrl + "/Reportes/GeneraRPT",
            type: "GET",
            data: {
                FecIni: $("#FechaInicioRpt").val(),
                FecFin: $("#FechaFinalRpt").val(),
                Cuenta: $("#usuario").val(),
                Filtro: "",
                tipoReporte: $("#Tipo_Reporte").val(),
            },
            dataType: "JSON",
            beforeSend: function () {
                $("modal-data-preview").modal();
            }
        }).done(function (response) {
            var Inicio = $("#FechaInicioRpt").val();
            var Final = $("#FechaFinalRpt").val();

            html = "";
            html += "<div class='row'>";
            html += "<div class='col-2 col-sm-2 col-lg-2'>";
            html += "<img src='/Recur_Logo/Imagen/Roja.jpg'  width='60%'>";
            html += "</div>";

            html += "<div class='col-8 col-sm-8 col-lg-8 text-xs-center'>";
            html += "<h2 style='margin:0px; padding:0px;'>NOMBRE INSTITUCION</h2>";
            html += "<h4 style='margin:0px; padding:0px;'>SUB TEMA</h4>";
            //html += "<h3 style='margin:0px; padding:0px;'>" + response.Delegacion + "</h3>";
            html += "</div>";

            html += "<div class='col-2 col-sm-2 col-lg-2'>";
            html += "<img src='/Recur_Logo/Imagen/florcita.jpg'  width='60%'>";
            html += "</div>";
            html += "</div>";

            // Contenedor para todo el reporte
            //html += "<div id='reporte-completo'>";          

            html += "<div class='row text-xs-center'>";
            html += "<h4 style='margin:0px; padding:0px;'>MENSAJERIA DE ENTRADA NACIONAL DEL " + Inicio + "  HASTA  " + Final + "</h4>";
            html += "</div>";

            html += "<div class='row'>";
            html += "</div>";

            var Grupo1 = response.filter(function (item) {
                return item.CodGrupo1 == 5;

            });

            html += "<br/>";
            html += "<div>";
            html += "<table class='col-8 col-sm-8 col-lg-8 text-xs-center table table-responsive'>";
            html += "<thead>";

            // Agregar la fila de encabezado solo una vez
            var encabezadoAgregado = false;

            $.each(Grupo1, function (index, value1) {

                if (!encabezadoAgregado) {
                    html += "<tr>";
                    html += "<th colspan='2'>" + value1.Grupo1 + "</th>"; // Ajustar el número de columnas según lo que necesites
                    html += "</tr>";
                    encabezadoAgregado = true; // Evitar que se repita
                }

            });
            html += "</thead>";

            // Agregar el cuerpo de la tabla
            html += "<tbody>";

            var TtalGnral = 0;

            $.each(Grupo1, function (index, value) {

                TtalGnral += value.Total;
                html += "<tr>";
                html += "<td>" + value.Estructura + "</td>";
                html += "<td><strong>" + value.Total + "</strong></td>";
                html += "</tr>";
            });

            html += "</tbody>"; // Cerrar el cuerpo de la tabla correctamente

            //pie de página
            let tfoot = "<tfoot>";
            tfoot += "<tr>";
            tfoot += "<td>TOTAL</td>";
            tfoot += "<td><strong>" + TtalGnral + "</strong></td>";
            tfoot += "</tr>";
            tfoot += "</tfoot>";
            html += tfoot; // Agregar el pie de página al HTML

            html += "</table>";

            html += "</div>";  // Cierre del div de GRUPO1

            // DESDE AQUÍ EMPIEZA EL GRUPO3  ********************////////////////

            var Grupo3 = response.filter(function (item) {
                return item.CodGrupo1 == 3;
            });

            html += "<br/>";
            html += "<div>";
            html += "<table class='table table-bordered table-responsive'>";
            html += "<thead>";

            html += "<tr>";
            html += "<th colspan='2'>TIPO DIFUSION DE MENSAJERIA DE SALIDA</th>";                      
            html += "</tr>";
            html += "</thead>";

            html += "<tbody>";
            var Ttden = 0;
            $.each(Grupo3, function (index, value3) {
                Ttden += value3.Total;
                html += "<tr>";
                html += "<td>" + value3.Estructura + "</td>";
                html += "<td>" + value3.Total + "</td>";              
                html += "</tr>";
            });
            html += "</tbody>";

            html += "<tfoot>";
            html += "<tr><td><strong>TOTAL</strong></td><td><strong>" + Ttden + "</strong></td></tr>";
            html += "</tfoot>";

            html += "</table>";
            html += "</div>";  // Cierre del div de GRUPO3


            /////////// GRUPO 4 *********************************/////////////////////////////////////
            var Grupo4 = response.filter(function (item) {
                return item.CodGrupo1 == 4;
            });

            html += "<br/>";
            html += "<div>";
            html += "<table class='table table-responsive'>";
            html += "<thead>";

            // Agregar la fila de encabezado solo una vez
            var encabezadoAgregado = false;

            $.each(Grupo4, function (index, value1) {

                if (!encabezadoAgregado) {
                    html += "<tr>";
                    html += "<th colspan='2'>" + value1.Grupo1 + "</th>"; // Ajustar el número de columnas según lo que necesites
                    html += "</tr>";
                    encabezadoAgregado = true; // Evitar que se repita
                }
            });
            html += "</thead>";
            html += "<tbody>";

            var TtalDifusion = 0;
            var estructuraAnterior = ""; // Variable para mantener la estructura anterior
            var totalSeccion = 0; // Total por sección


            $.each(Grupo4, function (index, value) {
                // Verificar si la estructura ha cambiado
                if (estructuraAnterior !== value.Estructura) {
                    // Si la estructura cambia, agregar el nombre de la nueva estructura solo una vez
                    if (estructuraAnterior !== "") {
                        //html += "<tr><td colspan='2'><hr></td></tr>";  // Separador entre estructuras
                        // Agregar el total de la sección anterior
                        html += "<tr><td><strong>TOTAL " + estructuraAnterior + "</strong></td><td><strong>" + totalSeccion + "</strong></td></tr>";
                    }
                    html += "<tr><td colspan='2'><strong>" + value.Estructura + "</strong></td></tr>";
                    estructuraAnterior = value.Estructura; // Actualizar la estructura anterior
                    totalSeccion = 0; // Reiniciar el total de la nueva sección

                }

                // Mostrar los valores de TipoDifusion y Total
                totalSeccion += value.Total; // Sumar al total de la sección
                TtalDifusion += value.Total; // Sumar al total general

                //console.log(TtalDifusion);
                html += "<tr>";
                html += "<td>" + value.TipoDifusion + "</td>";
                html += "<td>" + value.Total + "</td>";
                html += "</tr>";
            });

            html += "</tbody>"; // Cerrar el cuerpo de la tabla correctamente
            
            // Agregar el total de la última sección
            //html += "<tr><td colspan='2'><hr></td></tr>";
            html += "<tr><td><strong>TOTAL " + estructuraAnterior + "</strong></td><td><strong>" + totalSeccion + "</strong></td></tr>";

            html += "</table>";
            html += "</div>";    // Cierre del div de GRUPO4

            // Cierre del contenedor principal para todo el reporte
            html += "</div>";  // Cierre del div con id "reporte-completo"

            $("#data-preview").html(html);          

            $("#modal-data-preview").modal();

        });
    },


   


}