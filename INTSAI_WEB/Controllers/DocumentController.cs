using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using INTSAI_WEB.Models.Acciones;
using INTSAI_WEB.Models.Entidades;


namespace INTSAI_WEB.Controllers
{
    public class DocumentController : Controller
    {
        // GET: Document
        public ActionResult Index()
        {
            return View();
        }



        //FORZAR LA DESCARGA DEL ARCHIVO
        [HttpPost]
        public ActionResult DescargarDocumento(string IdMensaje)
        {
            try
            {
                // Obtén los datos del documento desde la base de datos
                DocumentoE documento = DocumentoC.Get(IdMensaje); 

                if (documento == null || documento.Mensaje == null || documento.Mensaje.Length == 0)
                {
                    return new HttpStatusCodeResult(404, "Documento no encontrado.");
                }

                byte[] archivoBytes = documento.Mensaje;

                // Detecta el tipo MIME basándose en los primeros bytes
                string mimeType = DetectarMimeType(archivoBytes);
                if (string.IsNullOrEmpty(mimeType))
                {
                    return new HttpStatusCodeResult(415, "Tipo de archivo no soportado.");
                }

                // Genera un nombre dinámico para el archivo con extensión
                string extension = ObtenerExtensionDesdeMime(mimeType);
                string nombreArchivo = string.IsNullOrEmpty(extension)
                    ? documento.Nombre
                    : $"{documento.Nombre}.{extension}";

                // Cambiar a 'inline' para abrir el archivo en lugar de descargarlo
                //Response.AppendHeader("Content-Disposition", $"inline; filename={nombreArchivo}");

                // Devolver el archivo para su descarga
                Response.AppendHeader("Content-Disposition", $"attachment; filename={nombreArchivo}");
                return File(archivoBytes, mimeType);  // Forzar descarga
            }
            catch (Exception ex)
            {
                return new HttpStatusCodeResult(500, "Error al descargar el archivo: " + ex.Message);
            }
        }      


        // Detectar el MIME Type del archivo, basándose en los primeros bytes
        private string DetectarMimeType(byte[] archivo)
        {
            // Asegurarse de que el archivo tenga al menos 4 bytes
            if (archivo.Length < 4)
            {
                return null;
            }

            // Extraemos los primeros 4 bytes para hacer una comparación inicial
            var header = BitConverter.ToString(archivo.Take(4).ToArray()).Replace("-", "").ToUpper();

            // Detecta el tipo MIME basándose en los primeros 4 bytes
            switch (header)
            {
                case "25504446": return "application/pdf"; // PDF
                case "D0CF11E0":
                    if (archivo.Length > 8 && archivo[4] == 0xA1 && archivo[5] == 0xB1)
                    {
                        return "application/vnd.ms-outlook"; // MSG (Outlook)
                    }
                    return "application/octet-stream"; // Un tipo por defecto si no es MSG
                case "FFD8FF": return "image/jpeg"; // JPG
                case "89504E47": return "image/png"; // PNG
                default:
                    return "application/octet-stream"; // Tipo desconocido
            }
        }

        private string ObtenerExtensionDesdeMime(string mimeType)
        {
            switch (mimeType)
            {
                case "application/pdf": return "pdf";
                case "application/vnd.ms-outlook": return "msg";
                case "image/jpeg": return "jpg";
                case "image/png": return "png";
                default: return "bin"; // Para archivos binarios desconocidos
            }
        }




    }

}