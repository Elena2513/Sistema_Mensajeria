using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using INTSAI_WEB.Models.Entidades;
using INTSAI_WEB.Models.Acciones;

namespace INTSAI_WEB.Controllers
{
    public class FxGlobalesController : Controller
    {
        // GET: FxGlobales
        public ActionResult Index()
        {
            return View();
        }
        
        //CONTROL AL TIPO DE DIFUSIÓN
        [HttpGet]
        public JsonResult TipoDifusion()
        {
            return Json(CatTipoDifusionC.List_TipoDifusion(), JsonRequestBehavior.AllowGet);
        }

        //cONTROL AL MOTIVO DE DIFUSIÓN
        [HttpGet]
        public JsonResult MotivoDifusion(string CodTipoDifusion)
        {
            return Json(CatMotivoDifusionC.List_Motivo_Difusion(CodTipoDifusion), JsonRequestBehavior.AllowGet);
        }
    }
}