
// Función genérica para exportar según el formato
function ExportarRpt_Mensajeria(TipoFormato, NameRpt) {
 
    TipoFormato = TipoFormato.toLowerCase(); // Convertimos a minúsculas para evitar errores

    switch (TipoFormato) {
        case "excel":
            exportarExcel(NameRpt);
            break;
        case "pdf":
            exportarPDF(NameRpt);
            break;
        case "word":
            exportarWord(NameRpt);
            break;
        default:
            alert("Formato no soportado.");
    }
}



// Función para exportar a Excel
function exportarExcel(NameRpt) {
    var element = document.getElementById("data-preview");  // Asegúrate de que este sea el id correcto del contenedor con los datos.

    // Usando SheetJS para convertir el contenido del modal en un archivo Excel
    var wb = XLSX.utils.table_to_book(element, { sheet: "Sheet1" });
    XLSX.writeFile(wb, NameRpt + ".xlsx");  // Nombre del archivo Excel
}


// Función para exportar a PDF
function exportarPDF(NameRpt) {
    var element = document.getElementById("data-preview");  // Asegúrate de que este sea el id correcto del contenedor con los datos.

    // Usando html2pdf para convertir el contenido del modal en un archivo PDF
    html2pdf()
        .from(element) 
        .save(NameRpt + ".pdf" );  // Nombre del archivo PDF
}

function exportarWord(NameRpt) {
    // Obtener el contenido del elemento con id "data-preview" (puede ser una tabla o cualquier otro contenido HTML)
    var element = document.getElementById("data-preview");

    // Obtener solo el HTML del contenedor
    var htmlContent = element.innerHTML;

    // Usamos html-docx-js para convertir el contenido HTML a un Blob de Word
    var converted = htmlDocx.asBlob(htmlContent);

    // Crear un enlace para permitir la descarga del archivo .docx
    var link = document.createElement('a');
    link.href = URL.createObjectURL(converted); // Creamos un URL a partir del Blob
    link.download = NameRpt + ".docx"; // Definimos el nombre del archivo a descargar
    link.click();  // Simulamos un clic en el enlace para que se descargue el archivo
}


// FUNCION PARA EXPORTAR LOS DOCUMENTOS EN LOS FORMATOS DESDE EL PREVIEW
$(".btn-export-Mensajeria").click(function () {
    let TipoReporte = parseInt($("#Tipo_Reporte").val(), 10);
    let NameRpt = "";

    switch (TipoReporte) {

        case 1:
            NameRpt = "Mensajeria de salida Internacional";        
            break;
        case 2:
            NameRpt = "Mensajeria Entrada Nacional";
            break;
        case 3:
            NameRpt = "Mensajeria Recepcioanda Mundial";
            break;
        case 4:
            NameRpt = "Mensajeria Recepcionada Nicaragua";
            break;
        default:
            alert("REPORTE INVÁLIDO");
                break;
    }

    let TipoFormato = $(this).attr("data-formato");  // Obtener formato del botón (pdf, excel, word)
    ExportarRpt_Mensajeria(TipoFormato, NameRpt);
});
