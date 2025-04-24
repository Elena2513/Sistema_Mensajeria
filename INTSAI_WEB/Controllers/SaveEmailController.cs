using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using INTSAI_WEB.Models.Acciones;
using INTSAI_WEB.Models.Entidades;

namespace INTSAI_WEB.Controllers
{
    public class SaveEmailController : Controller
    {
        // GET: SaveEmail
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Guardar()
        {
            HttpPostedFileBase archivoAdjunto = Request.Files["archivoAdjunto"];

            if (archivoAdjunto != null && archivoAdjunto.ContentLength > 0)
            {
                byte[] mailBytes;
                using (var binaryReader = new BinaryReader(archivoAdjunto.InputStream))
                {
                    mailBytes = binaryReader.ReadBytes(archivoAdjunto.ContentLength);
                }

                var A = new DetalleAdjuntoSolicitud
                {
                    Archivo = mailBytes
                };

                // Aquí debes llamar a tu método para guardar la solicitud en la base de datos
                MensajeriaC.SaveCorreo(A);
            }

            return Json(new { success = true });

    }    }
}