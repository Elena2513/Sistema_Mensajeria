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
    public class CatEspecialidadesC
    {

        public static List<CatEspecialidadesE> ListEspecialidades()
        {
            List<CatEspecialidadesE> listado = new List<CatEspecialidadesE>();
            string strConnString = ConfigurationManager.ConnectionStrings["Conn_I"].ConnectionString;
            List<SqlParameter> parametros = new List<SqlParameter>();
            string sql = "Select * from TblCatEspecialidades where [Vigencia] = 1 order by [Especialidades] asc";
            DataTable dt = new DataTable();
            dt = Data.Query(sql, parametros, System.Data.CommandType.Text, strConnString);
            foreach (DataRow item in dt.Rows)
            {
                CatEspecialidadesE fila = new CatEspecialidadesE();
                fila.IdEspecialidades = item["IdEspecialidades"].ToString();
                fila.Especialidades = item["Especialidades"].ToString();
                listado.Add(fila);
            }
            return listado;
        }

    }
}