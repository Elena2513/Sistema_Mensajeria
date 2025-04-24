using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using INTSAI_WEB.Models.Entidades;
using INTSAI_WEB.Models.Acciones;
using System.IO;
using Newtonsoft.Json;

namespace INTSAI_WEB.Controllers
{
    public class SMS_Salida_NacionalController : Controller
    {
        // GET: SMS_Salida_Nacional
        public ActionResult SalidaNacional()
        {
            return View();
        }

        [HttpGet]
        public JsonResult FiltroMsjSalidaNac(string ReferenciaOCN, string nombrepersona, string tipodifusion, string motivodifusion, int TipoBusqueda, DateTime? FechaInicio, DateTime? FechaFinal)
        {
            var json = Json(MensajeriaC.List_Msj_SalidaNacional(ReferenciaOCN, nombrepersona, tipodifusion, motivodifusion, TipoBusqueda, FechaInicio, FechaFinal), JsonRequestBehavior.AllowGet);
            return json;
        }

        //[HttpPost]
        //public ActionResult Guardar()
        //{
        //    var control = new SolicitudE();

        //    // Obtener los datos del archivo adjunto
        //    HttpPostedFileBase EmailAdjunto = Request.Files["EmailAdjunto"];
        //    if (EmailAdjunto != null && EmailAdjunto.ContentLength > 0)
        //    {
        //        byte[] mailBytes;
        //        using (var binaryReader = new BinaryReader(EmailAdjunto.InputStream))
        //        {
        //            mailBytes = binaryReader.ReadBytes(EmailAdjunto.ContentLength);
        //        }
        //        control.ArchivoAdjunto = mailBytes;
        //        control.NombreArchivo = EmailAdjunto.FileName;
        //    }

        //    // Obtener los datos adicionales del formulario
        //    control.IdMsjReferencia = Request.Form["IdMsjReferencia"];
        //    control.ReferenciaOCN = Request.Form["ReferenciaOCN"];
        //    control.CodTipoDifusion = Request.Form["CodTipoDifusion"];
        //    control.CodViaRecepcion = Request.Form["CodViaRecepcion"];
        //    control.CodEstrucOrigen = Request.Form["CodEstrucOrigen"];
        //    control.CodEspecialidad = Request.Form["CodEspecialidad"];
        //    control.CodEstruct_Solictnt = Request.Form["CodEstruct_Solictnt"];
        //    control.FechaMensaje = Request.Form["FechaMensaje"];
        //    control.FechaIngreso = Request.Form["FechaIngreso"];
        //    control.CodTipoEnvioMensaje = Request.Form["CodTipoEnvioMensaje"];
        //    control.Prioridad = Request.Form["Prioridad"];
        //    control.CodMotivoDifusion = Request.Form["CodMotivoDifusion"];
        //    control.CodEstado = Request.Form["CodEstado"];
        //    control.CodTipoConsulta = Request.Form["CodTipoConsulta"];

        //    // Información del usuario
        //    control.Usuario = Session["NombreCompleto"].ToString();  //"USERprueba";
        //    control.CodEstructuraInterna = Session["CodEstructura"].ToString();  //"0001";
        //    control.Carnet = Session["Carnet"].ToString(); //"60985";

        //    //Inicializar las listas en caso que el JSON no este presente
        //    control.Personas = new List<DetallePersonaSolicitud>();
        //    control.Delitos = new List<DetalleDelitosSolicitud>();
        //    control.Arma = new List<Arma>();
        //    control.Vehiculo = new List<Vehiculo>();
        //    control.Aeronave = new List<Aeronave>();
        //    control.Pasaporte = new List<Pasaporte>();


        //    // Obtener datos de Personas y Delitos
        //    var personasJson = Request.Form["Personas"];
        //    var delitosJson = Request.Form["Delitos"];
        //    var ArmaJson = Request.Form["Arma"];
        //    var VehiculoJson = Request.Form["Vehiculo"];
        //    var AeronaveJson = Request.Form["Aeronave"];
        //    var PasaporteJson = Request.Form["Pasaporte"];


        //    // Deserializar solo si el JSON no es nulo o vacío
        //    control.Personas = !string.IsNullOrEmpty(personasJson) ? JsonConvert.DeserializeObject<List<DetallePersonaSolicitud>>(personasJson) : new List<DetallePersonaSolicitud>();
        //    control.Delitos = !string.IsNullOrEmpty(delitosJson) ? JsonConvert.DeserializeObject<List<DetalleDelitosSolicitud>>(delitosJson) : new List<DetalleDelitosSolicitud>();
        //    control.Arma = !string.IsNullOrEmpty(ArmaJson) ? JsonConvert.DeserializeObject<List<Arma>>(ArmaJson) : new List<Arma>();
        //    control.Vehiculo = !string.IsNullOrEmpty(VehiculoJson) ? JsonConvert.DeserializeObject<List<Vehiculo>>(VehiculoJson) : new List<Vehiculo>();
        //    control.Aeronave = !string.IsNullOrEmpty(AeronaveJson) ? JsonConvert.DeserializeObject<List<Aeronave>>(AeronaveJson) : new List<Aeronave>();
        //    control.Pasaporte = !string.IsNullOrEmpty(PasaporteJson) ? JsonConvert.DeserializeObject<List<Pasaporte>>(PasaporteJson) : new List<Pasaporte>();

        //    // Guardar la solicitud 
        //    var idMensaje = SolicitudC.GuardarSolicitud(control);

        //    return Json(new { success = true, mensaje = "Guardado", idMensaje = idMensaje });
        //}

    }
}