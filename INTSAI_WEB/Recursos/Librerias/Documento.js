const Opendocument = {
  

    async verDocumento(IdMensaje) {
        try {

            // Validación si IdMensaje es null, undefined o vacío
            if (!IdMensaje) {
                alert("Documento no encontrado.");
                return;
            }

            // Llama al endpoint para obtener y descargar el documento
            const response = await fetch('/Document/DescargarDocumento', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ IdMensaje })
            });

            if (!response.ok) {
                if (response.status === 415) {
                    alert("El archivo tiene un formato no soportado.");
                } else {
                    throw new Error(`Error al obtener el archivo: ${response.statusText}`);
                }
            }

            // Convierte la respuesta en un blob (archivo binario)
            const blob = await response.blob();


            // Validación si el archivo está dañado (vacío)
            if (blob.size === 0) {
                alert("Error al intentar abrir el documento.");
                return;
            }

            // Obtén el nombre del archivo desde el header Content-Disposition
            const contentDisposition = response.headers.get('Content-Disposition');
            const fileName = contentDisposition
                ? contentDisposition.split('filename=')[1].replace(/"/g, '')
                : 'documento_descargado';

            // Crea un enlace de descarga para el archivo
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName; // Asigna el nombre del archivo
            a.click();
            URL.revokeObjectURL(url);  // Libera el objeto URL creado

        } catch (error) {
            console.error("Error al intentar abrir el documento:", error);
            alert("Ocurrió un error al intentar abrir el documento.");
        }
    } 

}



$(function () {
      
    $(function () {
        $(document).ready(function () {
            // Asignar el evento de clic a los botones dentro de las filas de la tabla
            $("#Table-EntradaInternacional").on("click", "tr td .btn-reporte", function () {
                const IdMensaje = $(this).attr("data-index"); // Obtener el ID del mensaje desde el atributo "data-index"
                Opendocument.verDocumento(IdMensaje); // Llamar a la función para abrir el archivo
            });
        });
                     
    });


    $(function () {
        $(document).ready(function () {
            // Asignar el evento de clic a los botones dentro de las filas de la tabla
            $("#Table-EntradaNac").on("click", "tr td .btn-reportEN", function () {
                const IdMensaje = $(this).attr("data-index"); // Obtener el ID del mensaje desde el atributo "data-index"
                Opendocument.verDocumento(IdMensaje); // Llamar a la función para abrir el archivo
            });
        });

    });

})



