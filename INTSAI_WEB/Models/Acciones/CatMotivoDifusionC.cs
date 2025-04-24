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
    public class CatMotivoDifusionC
    {
        public static List<CatMotivoDifusionE> List_Motivo_Difusion(string CodTipoDifusion )
        {
            List<CatMotivoDifusionE> listado = new List<CatMotivoDifusionE>();
            string strConnString = ConfigurationManager.ConnectionStrings["Conn_I"].ConnectionString;
            List<SqlParameter> parametros = new List<SqlParameter>();
            string sql = "Select * from TblCatMotivoDifusion where ESTADO = 1 AND (CodTipoDifusion = '" + CodTipoDifusion + "')";
            DataTable dt = new DataTable();
            dt = Data.Query(sql, parametros, System.Data.CommandType.Text, strConnString);
            foreach (DataRow item in dt.Rows)
            {
                CatMotivoDifusionE fila = new CatMotivoDifusionE();
                fila.CodMotivoDifusion = item["CodMotivoDifusion"].ToString();
                fila.CodTipoDifusion = item["CodTipoDifusion"].ToString();
                fila.MotivoDifusion = item["MotivoDifusion"].ToString();

                listado.Add(fila);
            }
            return listado;
        }

    }
}