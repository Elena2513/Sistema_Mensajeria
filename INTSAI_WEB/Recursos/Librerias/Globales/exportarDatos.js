// Función genérica para exportar según el formato
function exportarTabla(idTabla, formato, NameMsj) {
    let tabla = document.getElementById(idTabla);

    if (!tabla) {
        alert("No se encontró la tabla con ID: " + idTabla);
        return;
    }

    formato = formato.toLowerCase(); // Convertimos a minúsculas para evitar errores

    switch (formato) {
        case "excel":
            exportarExcel(tabla, NameMsj);
            break;
        case "pdf":
            exportarPDF(tabla, NameMsj);
            break;
        case "word":
            exportarWord(tabla, NameMsj);
            break;
        default:
            alert("Formato no soportado.");
    }
}

// Exportar a Excel con SheetJS
function exportarExcel(tabla, NameMsj) {
    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.table_to_sheet(tabla);
    XLSX.utils.book_append_sheet(wb, ws, "Reporte");
    XLSX.writeFile(wb, NameMsj + ".xlsx");
}

// Exportar a PDF con html2pdf
//function exportarPDF(tabla, NameMsj) {
//    html2pdf().from(tabla).set({
//        margin: 10,
//        filename: NameMsj + ".pdf",
//        image: { type: 'jpeg', quality: 0.98 },
//        html2canvas: { scale: 2 },
//        jsPDF: { orientation: 'landscape' }
//    }).save();
//}

function exportarPDF(tabla, NameMsj) {
    setTimeout(() => {
        html2pdf().from(tabla).set({
            margin: 10,
            filename: NameMsj + ".pdf",
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { orientation: 'landscape' }
        }).save();
    }, 500); // espera medio segundo antes de exportar
}


// Exportar a Word
function exportarWord(tabla, NameMsj) {
    let contenido = "<html><head><meta charset='UTF-8'></head><body>";
    contenido += tabla.outerHTML;
    contenido += "</body></html>";

    let blob = new Blob(['\ufeff', contenido], { type: 'application/msword' });
    let url = URL.createObjectURL(blob);

    let link = document.createElement("a");
    link.href = url;
    link.download = NameMsj + ".doc";
    document.body.appendChild(link);
    link.click();
}


//function exportarTabla(tabla, formato, NameMsj) {
//    if (!tabla) {
//        alert("No se encontró la tabla.");
//        return;
//    }

//    formato = formato.toLowerCase();

//    switch (formato) {
//        case "excel":
//            exportarExcel(tabla, NameMsj);
//            break;
//        case "pdf":
//            exportarPDF(tabla, NameMsj);
//            break;
//        case "word":
//            exportarWord(tabla, NameMsj);
//            break;
//        default:
//            alert("Formato no soportado.");
//    }
//}
