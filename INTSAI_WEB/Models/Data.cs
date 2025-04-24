using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace INTSAI_WEB.Models
{
    public class Data
    {
        public static DataTable Query(string slq, List<SqlParameter> parametros, CommandType tipo, string conexion)
        {
            DataTable dt = new DataTable();
            SqlDataReader dr;
            try
            {
                SqlCommand cmd = new SqlCommand(slq, new SqlConnection(conexion));
                cmd.CommandTimeout = 90000;
                cmd.CommandType = tipo;
                foreach (var p in parametros)
                {
                    cmd.Parameters.Add(p);
                }

                cmd.Connection.Open();
                dr = cmd.ExecuteReader();
                dt.Load(dr);
                cmd.Connection.Close();

            }
            catch (Exception e)
            {
                dt.Columns.Add("Error");
                dt.Rows.Add(e.Message);
            }

            return dt;
        }
    }
}