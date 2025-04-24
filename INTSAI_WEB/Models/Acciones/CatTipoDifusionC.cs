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
    public class CatTipoDifusionC
    {
        public static List<CatTipoDifusionE> List_TipoDifusion()
        {
            List<CatTipoDifusionE> listado = new List<CatTipoDifusionE>();
            string strConnString = ConfigurationManager.ConnectionStrings["Conn_I"].ConnectionString;
            List<SqlParameter> parametros = new List<SqlParameter>();
            string sql = "Select * from TblCatTipoDifusion where ESTADO = 1 order by [TipoDifusion] asc";
            DataTable dt = new DataTable();
            dt = Data.Query(sql, parametros, System.Data.CommandType.Text, strConnString);
            foreach (DataRow item in dt.Rows)
            {
                CatTipoDifusionE fila = new CatTipoDifusionE();
                fila.CodTipoDifusion = item["CodTipoDifusion"].ToString();
                fila.TipoDifusion = item["TipoDifusion"].ToString();
                listado.Add(fila);
            }
            return listado;
        }
    }
}