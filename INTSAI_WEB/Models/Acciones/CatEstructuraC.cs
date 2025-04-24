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
    public class CatEstructuraC
    {
        public static List<CatEstructuraE> ListEstructuras()
        {
            List<CatEstructuraE> listado = new List<CatEstructuraE>();
            string strConnString = ConfigurationManager.ConnectionStrings["Conn_I"].ConnectionString;
            List<SqlParameter> parametros = new List<SqlParameter>();
            string sql = "Select * from TblCatEstructura order by [Estructura] asc";
            DataTable dt = new DataTable();
            dt = Data.Query(sql, parametros, System.Data.CommandType.Text, strConnString);
            foreach (DataRow item in dt.Rows)
            {
                CatEstructuraE fila = new CatEstructuraE();
                fila.CodEstructura = item["CodEstructura"].ToString();
                fila.CodTipoEstructura = item["CodTipoEstructura"].ToString();
                fila.Estructura = item["Estructura"].ToString();
                fila.CodPaisOrigen = item["CodPaisOrigen"].ToString();
                listado.Add(fila);
            }
            return listado;
        }
    }
}