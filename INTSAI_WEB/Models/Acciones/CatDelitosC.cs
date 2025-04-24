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
    public class CatDelitosC
    {
        public static List<CatDelitosE> ListDelitos()
        {
            List<CatDelitosE> listado = new List<CatDelitosE>();
            string strConnString = ConfigurationManager.ConnectionStrings["Conn_I"].ConnectionString;
            List<SqlParameter> parametros = new List<SqlParameter>();
            string sql = "Select * from [NameEmpresa].[dbo].[TblCatDelitos] order by [Nombre] asc";
            DataTable dt = new DataTable();
            dt = Data.Query(sql, parametros, System.Data.CommandType.Text, strConnString);
            foreach (DataRow item in dt.Rows)
            {
                CatDelitosE fila = new CatDelitosE();
                fila.CodDelito = item["CodDelito"].ToString();
                fila.Nombre = item["Nombre"].ToString();
                listado.Add(fila);
            }
            return listado;
        }
    }
}