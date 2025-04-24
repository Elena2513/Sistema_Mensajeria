using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace INTSAI_WEB.Permisos
{
    public class ValidarSesionAttribute: ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            if (HttpContext.Current.Session["Cuenta"] == null)
            {

                filterContext.Result = new RedirectResult("~/Acceso/Login");
            }

            base.OnActionExecuting(filterContext);
        }

    }
}