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
    public class CatViaRecepcionC
    {
        public static List<CatViaRecepcionE> List_ViaRecepcion()
        {
            List<CatViaRecepcionE> listado = new List<CatViaRecepcionE>();
            string strConnString = ConfigurationManager.ConnectionStrings["Conn_I"].ConnectionString;
            List<SqlParameter> parametros = new List<SqlParameter>();
            string sql = "Select * from [dbo].[TblCatViasRecepcion] where Operadores = 1 order by ViaRecepcion asc";
            //string sql = "Select * from [dbo].[TblCatViasRecepcion]";
            DataTable dt = new DataTable();
            dt = Data.Query(sql, parametros, System.Data.CommandType.Text, strConnString);
            foreach (DataRow item in dt.Rows)
            {
                CatViaRecepcionE fila = new CatViaRecepcionE();
                fila.CodViaRecepcion = item["CodViaRecepcion"].ToString();
                fila.ViaRecepcion = item["ViaRecepcion"].ToString();
                listado.Add(fila);
            }
            return listado;
        }
    }
}