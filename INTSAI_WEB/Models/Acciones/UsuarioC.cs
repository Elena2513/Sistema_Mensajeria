using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using INTSAI_WEB.Models.Entidades;

namespace INTSAI_WEB.Models.Acciones
{
    public class UsuarioC
    {
        public static UsuarioE Get_Usuario(string Cuenta, string Password)
        {
            UsuarioE u = new UsuarioE();
            string strConnString = ConfigurationManager.ConnectionStrings["Conn_IN"].ConnectionString;
            List<SqlParameter> parametros = new List<SqlParameter>();
            parametros.Add(new SqlParameter("Cuenta", Cuenta));
            parametros.Add(new SqlParameter("Password", Password));
            parametros.Add(new SqlParameter("Accion", 1));
            string sql = "INTSAI_WEB.dbo.BuscarUsuario";
            DataTable dt = Data.Query(sql, parametros, CommandType.StoredProcedure, strConnString);

            if (dt.Rows.Count > 0)
            {
                u.IdUsuario = int.Parse(dt.Rows[0]["IdUsuario"].ToString());
                u.NombreRol = dt.Rows[0]["Rol"].ToString();
                u.Cuenta = dt.Rows[0]["Cuenta"].ToString();
                u.Password = dt.Rows[0]["Password"].ToString();
                u.CodEstructura = dt.Rows[0]["CodEstructura"].ToString();
                u.Estructura = dt.Rows[0]["Estructura"].ToString();
                u.Carnet = dt.Rows[0]["Carnet"].ToString();
                u.Chip = dt.Rows[0]["Chip"].ToString();
                u.Oficina = dt.Rows[0]["Oficina"].ToString();
                u.Especialidad = dt.Rows[0]["Especialidad"].ToString();
                u.NombreCompleto = dt.Rows[0]["NombreCompleto"].ToString();            
            }
            return u;
        }
    }
}