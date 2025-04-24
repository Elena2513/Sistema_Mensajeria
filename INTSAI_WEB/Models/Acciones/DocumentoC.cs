using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using INTSAI_WEB.Models.Entidades;
using System.Data;

namespace INTSAI_WEB.Models.Acciones
{
    public class DocumentoC
    {
      
        public static DocumentoE Get(string IdMensaje)
            {
            DocumentoE d = new DocumentoE();
            string strConnString = ConfigurationManager.ConnectionStrings["Conn_Mensajes"].ConnectionString;
            List<SqlParameter> parameters = new List<SqlParameter>();
            parameters.Add(new SqlParameter("IdMensaje",IdMensaje));
            //string sql = "SELECT * FROM [Mensajes].[dbo].[TblMensajes] WHERE [IdMensaje] = @IdMensaje";
            string sql = "SELECT * FROM [Mensajes].[dbo].[TblMensajes] WHERE [IdMensaje] = @IdMensaje";
            DataTable dt = Data.Query(sql, parameters, System.Data.CommandType.Text, strConnString);
            if (dt.Rows.Count > 0)
            {
                d.IdMensaje = dt.Rows[0]["IdMensaje"].ToString();

                // Asumiendo que 'Mensaje' está en la primera fila y es de tipo byte[]
                if (dt.Rows.Count > 0 && dt.Rows[0]["Mensaje"] != DBNull.Value)
                {
                    // Asegúrate de que el campo 'Mensaje' sea de tipo byte[] en la base de datos
                    d.Mensaje = (byte[])dt.Rows[0]["Mensaje"];
                }
                d.Nombre = dt.Rows[0]["Nombre"].ToString();
            }
            return d;
        }
    }
}