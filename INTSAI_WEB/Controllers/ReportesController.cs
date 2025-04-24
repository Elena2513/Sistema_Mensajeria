using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using INTSAI_WEB.Models.Acciones;

namespace INTSAI_WEB.Controllers
{
    public class ReportesController : Controller
    {
        // GET: Reportes
        public ActionResult Reportes()
        {
            return View();
        }


        [HttpGet]
        public JsonResult GeneraRPT (DateTime? FecIni, DateTime? FecFin, string Cuenta, string Filtro, int tipoReporte)
        {
            var json = Json(ReportesC.RPT_SalidaInternacional(FecIni, FecFin, Cuenta, Filtro, tipoReporte),JsonRequestBehavior.AllowGet);
            json.MaxJsonLength = int.MaxValue;
            return json;

        }
    }
}