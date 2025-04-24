using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using INTSAI_WEB.Models.Entidades;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;


namespace INTSAI_WEB.Models.Acciones
{
    public class CatTipo_InvolucradoC
    {
        public static List<CatTipo_InvolucradoE> List_TipoInvolucrado()
        {
            List<CatTipo_InvolucradoE> listado = new List<CatTipo_InvolucradoE>();
            string strConnstring = ConfigurationManager.ConnectionStrings["Conn_I"].ConnectionString;
            List<SqlParameter> parametros = new List<SqlParameter>();
            string sql = "SELECT * FROM [NameEmpresa].[dbo].[TblTipoInvolucrado] order by [TipoInvolucrado] asc";
            DataTable dt = new DataTable();
            dt = Data.Query(sql, parametros, System.Data.CommandType.Text, strConnstring);

            foreach (DataRow item in dt.Rows)
            {
                CatTipo_InvolucradoE fila = new CatTipo_InvolucradoE();
                fila.CodTipoInvolucrado = item["CodTipoInvolucrado"].ToString();
                fila.TipoInvolucrado = item["TipoInvolucrado"].ToString();
                listado.Add(fila);
            }
            return listado;
        }
    }
}