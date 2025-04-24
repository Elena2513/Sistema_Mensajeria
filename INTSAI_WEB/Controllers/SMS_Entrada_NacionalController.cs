using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using INTSAI_WEB.Models.Acciones;
using INTSAI_WEB.Models.Entidades;
using Newtonsoft.Json;

namespace INTSAI_WEB.Controllers
{
    public class SMS_Entrada_NacionalController : Controller
    {
        // GET: SMS_Entrada_Nacional
        public ActionResult EntradaNacional()
        {
            return View();
        }

        [HttpGet]
        public JsonResult FiltrosEntradaNac(string ReferenciaOCNEN, string nombrepersonaEN, string tipodifusionEN, string motivodifusionEN, int TipoBusquedaEN, DateTime? FInicioEN, DateTime? FfinalEN)
        {
            var json = Json(MensajeriaC.List_Msj_EntradaNac(ReferenciaOCNEN, nombrepersonaEN, tipodifusionEN, motivodifusionEN, TipoBusquedaEN, FInicioEN, FfinalEN), JsonRequestBehavior.AllowGet);
            return json;
        }

        //[HttpPost]
        //public ActionResult Guardar()
        //{
        //    var control = new SolicitudE();

        //    // Obtener los datos del archivo adjunto
        //    HttpPostedFileBase CorreoAdjunto = Request.Files["CorreoAdjunto"];
        //    if (CorreoAdjunto != null && CorreoAdjunto.ContentLength > 0)
        //    {
        //        byte[] mailBytes;
        //        using (var binaryReader = new BinaryReader(CorreoAdjunto.InputStream))
        //        {
        //            mailBytes = binaryReader.ReadBytes(CorreoAdjunto.ContentLength);
        //        }
        //        control.ArchivoAdjunto = mailBytes;
        //        control.NombreArchivo = CorreoAdjunto.FileName;
        //    }

        //    // Obtener los datos adicionales del formulario
        //    control.IdMsjReferencia = Request.Form["IdMsjReferencia"];
        //    control.ReferenciaOCN = Request.Form["ReferenciaOCN"];
        //    control.CodTipoDifusion = Request.Form["CodTipoDifusion"];
        //    control.CodViaRecepcion = Request.Form["CodViaRecepcion"];
        //    control.CodEstrucOrigen = Request.Form["CodEstrucOrigen"]; //Especialista pto externo
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