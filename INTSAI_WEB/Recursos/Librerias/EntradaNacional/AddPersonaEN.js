var Personas = [];

var AddPersonaEN = {

    Add_PersonaEN: function () {

        var involucrado = {
            NombrePersona: $("#EN_NamePers").val(),
            //IdPais: $("#CodPaisOrigen").val(),
            //Pais: $("#CodPaisOrigen option:selected").text(),
            //SelecPais = document.getElementById("CodPaisOrigen"),
            //Pais = SelecPais.options[SelecPais.selectedIndex].text,       
            //CodTipoInvolucrado: $("#CodTipoInvolucrado").val(),
            //TipoInvolucrado: $("#CodTipoInvolucrado option:selected").text(),
        };

        if (Personas.find(i => i.NombrePersona === involucrado.NombrePersona )) {
            Swal.fire(
                "¡Ya se encuentra agregada esa Persona!",
                "",
                "info"
            );
        } else if (involucrado.NombrePersona === "") {
                Swal.fire(
                    "¡El nombre no puede estar vacío.!",
                    "",
                    "info"
                     );
                return;
        }
         else {
                    Personas.push(involucrado);
                    sessionStorage.setItem("EN_ListaPersonas", JSON.stringify(Personas));

                    html = "";
                    $.each(Personas, function (index, value) {
                        html += "<tr>";
                        html += "<td>" + (index + 1) + "</td>";
                        html += "<td>" + (value.NombrePersona) + "</td>";
                        //html += "<td>" + (value.IdPais) + "</td>";
                        //html += "<td>" + (value.Pais) + "</td>";
                        //html += "<td>" + (value.CodTipoInvolucrado) + "</td>";
                        //html += "<td>" + (value.TipoInvolucrado) + "</td>";

                        html += "<td><a class='btn btn-danger btn-remove-integrante btn-sm text-light' data-index='" + index + "'><i class='icon-trash3'></i></a></td>";
                        html += "</tr>";
                    });
                     $("#Tabla-PersonaEN").html(html);
                     this.CuentaPers();
                     //$("#modal_AddPersona").modal("hide");

                    EntradaNacional.CargarPersonas();
              }
    },

    Limpiar: function () {
        $("#EN_NamePers").val("");
        //$("#CodPaisOrigen").val("");
        //$("#CodTipoInvolucrado").val("");
    },

    //Función que permite eliminar a una persona con sus delitos asociados
    Remover_Integrante: function (index) {
        // Obtener el nombre de la persona a eliminar
        var personaNombre = Personas[index].NombrePersona;

        // Filtrar los delitos relacionados a la persona
        var delitosAEliminar = Delitos.filter(delito => delito.Persona === personaNombre);

        // Eliminar los delitos relacionados a la persona
        delitosAEliminar.forEach(delito => {
            var delitoIndex = Delitos.indexOf(delito);
            Delitos.splice(delitoIndex, 1);
        });

        // Actualizar la lista de delitos en sessionStorage
        sessionStorage.setItem("EN_ListaDelitos", JSON.stringify(Delitos));

        // Eliminar la persona
        Personas.splice(index, 1);

        // Actualizar la lista de personas en sessionStorage
        sessionStorage.setItem("EN_ListaPersonas", JSON.stringify(Personas));

        // Actualizar la tabla de delitos
        var htmlDelitos = "";
        Delitos.forEach((value, index) => {
            htmlDelitos += "<tr>";
            htmlDelitos += "<td>" + (index + 1) + "</td>";
            htmlDelitos += "<td>" + (value.Persona) + "</td>";
            htmlDelitos += "<td>" + (value.CodDelito) + "</td>";
            htmlDelitos += "<td>" + (value.Delito) + "</td>";
            htmlDelitos += "<td><a class='btn btn-danger btn-remove-delito btn-sm text-light' data-index='" + index + "'><i class='icon-trash3'></i></a></td>";
            htmlDelitos += "</tr>";
        });
        $("#Tabla-DelitosEN").html(htmlDelitos);

        // Actualizar la tabla de personas
        var htmlPersonas = "";
        Personas.forEach((value, index) => {
            htmlPersonas += "<tr>";
            htmlPersonas += "<td>" + (index + 1) + "</td>";
            htmlPersonas += "<td>" + (value.NombrePersona) + "</td>";
            //htmlPersonas += "<td>" + (value.IdPais) + "</td>";
            //htmlPersonas += "<td>" + (value.Pais) + "</td>";
            //htmlPersonas += "<td>" + (value.CodTipoInvolucrado) + "</td>";
            //htmlPersonas += "<td>" + (value.TipoInvolucrado) + "</td>";  
            htmlPersonas += "<td><a class='btn btn-danger btn-remove-integrante btn-sm text-light' data-index='" + index + "'><i class='icon-trash3'></i></a></td>";
            htmlPersonas += "</tr>";
        });
        $("#Tabla-PersonaEN").html(htmlPersonas);
        this.CuentaPers();
        // Actualizar la interfaz si es necesario
        EntradaNacional.CargarPersonas();
    },

    //Contador de personas
    CuentaPers: function () {
        var TtalPers = Personas.length;
        document.getElementById('TtalPersEN').textContent = TtalPers;
    }
}

$(function () {


    $("#Tabla-PersonaEN").on("click", "tr td .btn-remove-integrante", function () {
        index = parseInt($(this).attr("data-index"));
        AddPersonaEN.Remover_Integrante(index);
    });   

    //Agregar persoa por el evento click
    $(".btnAddPersonEN").click(function () {
        AddPersonaEN.Add_PersonaEN();
        AddPersonaEN.Limpiar();
    });


})
