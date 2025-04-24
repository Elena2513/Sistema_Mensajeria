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
    public class ReportesC
    {
        //ESTA CLASE SOLO SIRVE PARA EL TIPO REPORTE # 1 Y # 2 PORQUE SUS COLUMNAS SON IGUALES
        public static List<ReportesE> RPT_SalidaInternacional(DateTime? FecIni, DateTime? FecFin, string Cuenta, string Filtro, int tipoReporte)
        {
            List<ReportesE> listado = new List<ReportesE>();
            string strConnstring = ConfigurationManager.ConnectionStrings["Conn_IN"].ConnectionString;
            List<SqlParameter> parametros = new List<SqlParameter>();
            parametros.Add(new SqlParameter("FecIni", FecIni));
            parametros.Add(new SqlParameter("FecFin", FecFin));
            parametros.Add(new SqlParameter("Cuenta", Cuenta));
            parametros.Add(new SqlParameter("Filtro", Filtro));
            parametros.Add(new SqlParameter("tipoReporte", tipoReporte));
            string sql = "[dbo].[SP_GenerarReporte]";
            DataTable dt = new DataTable();
            dt = Data.Query(sql, parametros, System.Data.CommandType.StoredProcedure, strConnstring);

            foreach (DataRow item in dt.Rows)
            {
                ReportesE fila = new ReportesE();

                // Validar si la columna existe y tiene un valor antes de asignar
                fila.Usuario = item.Table.Columns.Contains("Usuario") && item["Usuario"] != DBNull.Value ? item["Usuario"].ToString() : string.Empty;
                fila.CodGrupo1 = item.Table.Columns.Contains("CodGrupo1") && item["CodGrupo1"] != DBNull.Value ? int.Parse(item["CodGrupo1"].ToString()) : 0;
                fila.Grupo1 = item.Table.Columns.Contains("Grupo1") && item["Grupo1"] != DBNull.Value ? item["Grupo1"].ToString() : string.Empty;
                fila.CodEstructura = item.Table.Columns.Contains("CodEstructura") && item["CodEstructura"] != DBNull.Value ? item["CodEstructura"].ToString() : string.Empty;
                fila.Estructura = item.Table.Columns.Contains("Estructura") && item["Estructura"] != DBNull.Value ? item["Estructura"].ToString() : string.Empty;
                fila.CodMotivoDifusion = item.Table.Columns.Contains("CodMotivoDifusion") && item["CodMotivoDifusion"] != DBNull.Value ? item["CodMotivoDifusion"].ToString() : string.Empty;
                fila.TipoDifusion = item.Table.Columns.Contains("TipoDifusion") && item["TipoDifusion"] != DBNull.Value ? item["TipoDifusion"].ToString() : string.Empty;
                fila.Total = item.Table.Columns.Contains("Total") && item["Total"] != DBNull.Value ? int.Parse(item["Total"].ToString()) : 0;

                fila.No = item.Table.Columns.Contains("No") && item["No"] != DBNull.Value ? item["No"].ToString() : string.Empty;
                fila.Tipo = item.Table.Columns.Contains("Tipo") && item["Tipo"] != DBNull.Value ? item["Tipo"].ToString() : string.Empty;
                fila.CodContinente = item.Table.Columns.Contains("CodContinente") && item["CodContinente"] != DBNull.Value ? item["CodContinente"].ToString() : string.Empty;
                fila.Continente = item.Table.Columns.Contains("Continente") && item["Continente"] != DBNull.Value ? item["Continente"].ToString() : string.Empty;
                fila.Cantidad = item.Table.Columns.Contains("Cantidad") && item["Cantidad"] != DBNull.Value ? int.Parse(item["Cantidad"].ToString()) : 0;

                fila.Repuesta = item.Table.Columns.Contains("Repuesta") && item["Repuesta"] != DBNull.Value ? int.Parse(item["Repuesta"].ToString()) : 0;
                fila.CodEstructuraInterna = item.Table.Columns.Contains("CodEstructuraInterna") && item["CodEstructuraInterna"] != DBNull.Value ? item["CodEstructuraInterna"].ToString() : string.Empty;
                fila.nivel = item.Table.Columns.Contains("nivel") && item["nivel"] != DBNull.Value ? item["nivel"].ToString() : string.Empty;
                fila.TipoConsulta = item.Table.Columns.Contains("TipoConsulta") && item["TipoConsulta"] != DBNull.Value ? item["TipoConsulta"].ToString() : string.Empty;
                fila.IdRepuesta = item.Table.Columns.Contains("IdRepuesta") && item["IdRepuesta"] != DBNull.Value ? int.Parse(item["IdRepuesta"].ToString()) : 0;

                listado.Add(fila);
            }

            return listado;

        }






    }
}