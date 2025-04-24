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
    public class CatOficinaC
    {
        public static List<CatOficinaE> List_Oficina(string CodEspecialidad)
        {
            List<CatOficinaE> listado = new List<CatOficinaE>();
            string strConnString = ConfigurationManager.ConnectionStrings["Conn_I"].ConnectionString;
            List<SqlParameter> parametros = new List<SqlParameter>();
            string sql = "Select * from Tbl_CatOficina where Estado = 1 AND (CodigoEspecialidad '" + CodEspecialidad + "')";
            DataTable dt = new DataTable();
            dt = Data.Query(sql, parametros, System.Data.CommandType.Text, strConnString);
            foreach (DataRow item in dt.Rows)
            {
                CatOficinaE fila = new CatOficinaE();
                fila.CodigoOficina = item["CodigoOficina"].ToString();
                fila.CodigoEspecialidad = item["CodigoEspecialidad"].ToString();
                fila.Oficina = item["Oficina"].ToString();
                listado.Add(fila);
            }
            return listado;
        }

    }
}