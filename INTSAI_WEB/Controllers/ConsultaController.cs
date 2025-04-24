using INTSAI_WEB.Models.Acciones;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace INTSAI_WEB.Controllers
{
    public class ConsultaController : Controller
    {
        // GET: Consulta
        public ActionResult Consulta()
        {
            return View();
        }

        [HttpGet]
        public JsonResult FiltroConsulta(int Tipo, string referencia, string nombrepersona, string tipodifusion, string motivodifusion, int TipoBusqueda, DateTime? FechaInicio, DateTime? FechaFinal)
        {
            var json = Json(MensajeriaC.MensajeConsulta(Tipo, referencia, nombrepersona, tipodifusion, motivodifusion, TipoBusqueda, FechaInicio, FechaInicio), JsonRequestBehavior.AllowGet);
            return json;
        }
    }
}