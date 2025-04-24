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
    public class CatPaisC
    {
        public static List<CatPaisE> ListPaises()
        {
            List<CatPaisE> listado = new List<CatPaisE>();
            string strConnString = ConfigurationManager.ConnectionStrings["Conn_IN"].ConnectionString;
            List<SqlParameter> parametros = new List<SqlParameter>();
            string sql = "SELECT [CodPais],[Pais] FROM  INTSAI_WEB.[dbo].[TblCatPais] ORDER BY Pais ASC";
            DataTable dt = new DataTable();
            dt = Data.Query(sql, parametros, System.Data.CommandType.Text, strConnString);
            foreach (DataRow item in dt.Rows)
            {
                CatPaisE fila = new CatPaisE();
                fila.CodPais = item["CodPais"].ToString();
                fila.Pais = item["Pais"].ToString();
                //fila.Region = item["Region"].ToString();
                listado.Add(fila);
            }
            return listado;

        }
    }
}