using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using INTSAI_WEB.Models.Entidades;
using INTSAI_WEB.Models.Acciones;
using System.Web.Security;

namespace INTSAI_WEB.Controllers
{
    public class AccesoController : Controller
    {
        // GET: Acceso
        public ActionResult Login()
        {
            return View();
        }

        [HttpPost]
        public ActionResult IniciarSesion(UsuarioE User)
        {
            var result = UsuarioC.Get_Usuario(User.Cuenta, User.Password);

            if(result.Cuenta == null && result.Password == null)
            {
                ViewBag.Msg = "El Usuario o Contraseña es Incorrecto!!";
                return View("Login");
            }else
            {
                if(result.Cuenta.ToUpper() == User.Cuenta.ToUpper() && result.Password == User.Password)
                {
                    Session["Cuenta"] = result.Cuenta;
                    Session["NombreCompleto"] = result.NombreCompleto;
                    Session["Carnet"] = result.Carnet;
                    Session["IdRol"] = result.IdRol;
                    Session["Rol"] = result.NombreRol;
                    Session["CodEstructura"] = result.CodEstructura;
                    Session["Estructura"] = result.Estructura;
                    Session["Especialidad"] = result.Especialidad;
                    Session["Oficina"] = result.Oficina;
                    //return RedirectToAction("EntradaInternacional", "SMS_Entrada_Internac");
                    return RedirectToAction("Index", "Home");
                }
                else
                {
                    ViewBag.Msg = "El Usuario o Contraseña es Incorrecto!!";
                    return View("Login");
                }
            }
           
        }

        public ActionResult CerrarSesion()
        {
            //Con esto indicamos que la autenticación sea cerrada
            FormsAuthentication.SignOut();
            Session["Cuenta"] = null;

            return RedirectToAction("Login", "Acceso");
        }
    }
}