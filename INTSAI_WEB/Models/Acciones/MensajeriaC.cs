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
    public class MensajeriaC
    {
        public static List<MensajeriaE> List_Msj_EntradaInternacional (string referencia, string nombrepersona, string tipodifusion, string motivodifusion, int TipoBusqueda, DateTime? FechaInicio, DateTime? FechaFinal)
        {
            List<MensajeriaE> Lista = new List<MensajeriaE>();
            string strConnString = ConfigurationManager.ConnectionStrings["Conn_I"].ConnectionString;
            List<SqlParameter> parametros = new List<SqlParameter>();
          
            parametros.Add(new SqlParameter("Rereferencia", referencia));
            parametros.Add(new SqlParameter("NombrePersona", nombrepersona));
            parametros.Add(new SqlParameter("TipoDifusion", tipodifusion));
            parametros.Add(new SqlParameter("MotivoDifusion", motivodifusion));            
            parametros.Add(new SqlParameter("FechaInicio", FechaInicio));
            parametros.Add(new SqlParameter("FechaFinal", FechaFinal));
            parametros.Add(new SqlParameter("TipoBusqueda", TipoBusqueda));           

            string sql = "dbo.INTSAIWEB_FiltroMsj_EntradaInternacional";
            DataTable dt = Data.Query(sql, parametros, System.Data.CommandType.StoredProcedure, strConnString);

            foreach (DataRow dr in dt.Rows)
            {
                MensajeriaE m = new MensajeriaE();
                m.IdMensaje = dr["IdMensaje"].ToString();
                m.IdMsgReferencia = dr["IdMsgReferencia"].ToString();
                m.ReferenciaOCN = dr["ReferenciaOCN"].ToString();
                m.remitente = dr["Remitente"].ToString();
                m.Prioridad = dr["Prioridad"].ToString();
                m.TipoTitulo = dr["TituloMensaje"].ToString();
                m.Delito = dr["Delito"].ToString();
                m.FechaMensaje = DateTime.Parse(dr["FechaMensaje"].ToString());
                m.FechaIngreso = DateTime.Parse(dr["FechaIngreso"].ToString());
                m.Estructura = dr["Estructura"].ToString();
                m.TipoDifusion = dr["TipoDifusion"].ToString();
                m.NombrePersona = dr["NombrePersona"].ToString();
                m.usuario = dr["usuario"].ToString();
                m.motivodifusion = dr["motivodifusion"].ToString();
                Lista.Add(m);
            }

            return Lista;
         }


        public static List<MensajeriaE> List_Msj_SalidaInternacional(string referenciaSI, string nombrepersonaSI, string tipodifusionSI, string motivodifusionSI, int TipoBusquedaSI, DateTime? Finicio, DateTime? Ffinal)
        {
            List<MensajeriaE> Lista = new List<MensajeriaE>();
            string strConnString = ConfigurationManager.ConnectionStrings["Conn_I"].ConnectionString;
            List<SqlParameter> parametros = new List<SqlParameter>();
            parametros.Add(new SqlParameter("Rereferencia", referenciaSI));
            parametros.Add(new SqlParameter("NombrePersona", nombrepersonaSI));
            parametros.Add(new SqlParameter("TipoDifusion", tipodifusionSI));
            parametros.Add(new SqlParameter("MotivoDifusion", motivodifusionSI));
            parametros.Add(new SqlParameter("FechaInicio", Finicio));
            parametros.Add(new SqlParameter("FechaFinal", Ffinal));
            parametros.Add(new SqlParameter("TipoBusqueda", TipoBusquedaSI));
            string sql = "INTSAIWEB_FiltroMsj_SalidaInternacional";
            DataTable dt = Data.Query(sql, parametros, System.Data.CommandType.StoredProcedure, strConnString);

            foreach (DataRow dr in dt.Rows)
            {
                MensajeriaE m = new MensajeriaE();
                m.IdMensaje = dr["IdMensaje"].ToString();
                m.IdMsgReferencia = dr["IdMsgReferencia"].ToString();
                m.ReferenciaOCN = dr["ReferenciaOCN"].ToString();
                m.remitente = dr["Remitente"].ToString();
                m.TipoTitulo = dr["TituloMensaje"].ToString();
                m.Delito = dr["Delito"].ToString();
                m.FechaMensaje = DateTime.Parse(dr["FechaMensaje"].ToString());
                m.FechaIngreso = DateTime.Parse(dr["FechaIngreso"].ToString());
                m.Estructura = dr["Estructura"].ToString();
                m.TipoDifusion = dr["TipoDifusion"].ToString();
                m.NombrePersona = dr["NombrePersona"].ToString();
                m.usuario = dr["usuario"].ToString();
                m.motivodifusion = dr["motivodifusion"].ToString();
                Lista.Add(m);
            }
            return Lista;
        }

        public static List<MensajeriaE> List_Msj_EntradaNac(string referenciaEN, string nombrepersonaEN, string tipodifusionEN, string motivodifusionEN, int TipoBusquedaEN, DateTime? FInicioEN, DateTime? FfinalEN)
        {
            List<MensajeriaE> Lista = new List<MensajeriaE>();
            string strConnString = ConfigurationManager.ConnectionStrings["Conn_I"].ConnectionString;
            List<SqlParameter> parametros = new List<SqlParameter>();
            parametros.Add(new SqlParameter("Rereferencia", referenciaEN));
            parametros.Add(new SqlParameter("NombrePersona", nombrepersonaEN));
            parametros.Add(new SqlParameter("TipoDifusion", tipodifusionEN));
            parametros.Add(new SqlParameter("MotivoDifusion", motivodifusionEN));
            parametros.Add(new SqlParameter("FechaInicio", FInicioEN));
            parametros.Add(new SqlParameter("FechaFinal", FfinalEN));
            parametros.Add(new SqlParameter("TipoBusqueda", TipoBusquedaEN));
            string sql = "INTSAIWEB_FiltroMsj_EntradaNacional";
            DataTable dt = Data.Query(sql, parametros, System.Data.CommandType.StoredProcedure, strConnString);

            foreach (DataRow dr in dt.Rows)
            {
                MensajeriaE m = new MensajeriaE();
                m.IdMensaje = dr["IdMensaje"].ToString();
                m.IdMsgReferencia = dr["IdMsgReferencia"].ToString();
                m.ReferenciaOCN = dr["ReferenciaOCN"].ToString();
                m.remitente = dr["Remitente"].ToString();
                m.TipoTitulo = dr["TituloMensaje"].ToString();
                m.Delito = dr["Delito"].ToString();
                m.FechaMensaje = DateTime.Parse(dr["FechaMensaje"].ToString());
                m.FechaIngreso = DateTime.Parse(dr["FechaIngreso"].ToString());
                m.Estructura = dr["Estructura"].ToString();
                m.TipoDifusion = dr["TipoDifusion"].ToString();
                m.NombrePersona = dr["NombrePersona"].ToString();
                m.usuario = dr["usuario"].ToString();
                m.motivodifusion = dr["motivodifusion"].ToString();
                Lista.Add(m);
            }
            return Lista;
        }
        public static List<MensajeriaE> List_Msj_SalidaNacional(string referenciaSN, string NpersonaSN, string tipodifusionSN, string motivodifusionSN, int TipoBusquedaSN, DateTime? FinicioSN, DateTime? FfinalSN)
        {
            List<MensajeriaE> Lista = new List<MensajeriaE>();
            string strConnString = ConfigurationManager.ConnectionStrings["Conn_I"].ConnectionString;
            List<SqlParameter> parametros = new List<SqlParameter>();
            parametros.Add(new SqlParameter("Rereferencia", referenciaSN));
            parametros.Add(new SqlParameter("NombrePersona", NpersonaSN));
            parametros.Add(new SqlParameter("TipoDifusion", tipodifusionSN));
            parametros.Add(new SqlParameter("MotivoDifusion", motivodifusionSN));
            parametros.Add(new SqlParameter("FechaInicio", FinicioSN));
            parametros.Add(new SqlParameter("FechaFinal", FfinalSN));
            parametros.Add(new SqlParameter("TipoBusqueda", TipoBusquedaSN));
            string sql = "INTSAIWEB_FiltroMsj_SalidaNacional";
            DataTable dt = Data.Query(sql, parametros, System.Data.CommandType.StoredProcedure, strConnString);

            foreach (DataRow dr in dt.Rows)
            {
                MensajeriaE m = new MensajeriaE();
                m.IdMensaje = dr["IdMensaje"].ToString();
                m.IdMsgReferencia = dr["IdMsgReferencia"].ToString();
                m.ReferenciaOCN = dr["ReferenciaOCN"].ToString();
                m.remitente = dr["Remitente"].ToString();
                m.TipoTitulo = dr["TituloMensaje"].ToString();
                m.Delito = dr["Delito"].ToString();
                m.FechaMensaje = DateTime.Parse(dr["FechaMensaje"].ToString());
                m.FechaIngreso = DateTime.Parse(dr["FechaIngreso"].ToString());
                m.Estructura = dr["Estructura"].ToString();
                m.TipoDifusion = dr["TipoDifusion"].ToString();
                m.NombrePersona = dr["NombrePersona"].ToString();
                m.usuario = dr["usuario"].ToString();
                m.motivodifusion = dr["motivodifusion"].ToString();
                Lista.Add(m);
            }
            return Lista;
        }

        public static int SaveCorreo (DetalleAdjuntoSolicitud A)
        {
            List<DetalleAdjuntoSolicitud> lista = new List<DetalleAdjuntoSolicitud>();
            string strConnString = ConfigurationManager.ConnectionStrings["Conn_IN"].ConnectionString;
            List<SqlParameter> parameters = new List<SqlParameter>();
            parameters.Add(new SqlParameter("Id", A.Id));
            parameters.Add(new SqlParameter("IdMensaje", A.IdMensaje));
            parameters.Add(new SqlParameter("Archivo", A.Archivo));
            parameters.Add(new SqlParameter("NombreArchivo", A.NombreArchivo));
            parameters.Add(new SqlParameter("TipoSolicitud", A.TipoSolicitud));
            string query = "SaveDocumtoAdjunto";
            try
            {
                Data.Query(query, parameters, CommandType.StoredProcedure, strConnString); 
                return 1;
            }
            catch
            {
                return 0;
            }
        }



        public static List<MensajeriaE> MensajeConsulta(int Tipo, string Referncia, string NombrePers, string Tdifusion, string Mdifusion, int TBusqueda, DateTime? FInicio, DateTime? Ffinal)
        {
            List<MensajeriaE> Lista = new List<MensajeriaE>();
            string strConnString = ConfigurationManager.ConnectionStrings["Conn_IN"].ConnectionString;
            List<SqlParameter> parametros = new List<SqlParameter>();

            parametros.Add(new SqlParameter("Tipo", Tipo));
            parametros.Add(new SqlParameter("Rereferencia", Referncia));
            parametros.Add(new SqlParameter("NombrePersona", NombrePers));
            parametros.Add(new SqlParameter("TipoDifusion", Tdifusion));
            parametros.Add(new SqlParameter("MotivoDifusion", Mdifusion));
            parametros.Add(new SqlParameter("FechaInicio", FInicio));
            parametros.Add(new SqlParameter("FechaFinal", FInicio));
            parametros.Add(new SqlParameter("TipoBusqueda", TBusqueda));

            string sql = "INTSAI_WEB.dbo.[BuscarMensaje]";
            DataTable dt = Data.Query(sql, parametros, System.Data.CommandType.StoredProcedure, strConnString);

            foreach (DataRow dr in dt.Rows)
            {
                MensajeriaE m = new MensajeriaE();
                m.IdMensaje = dr["IdMensaje"].ToString();
                m.IdMsgReferencia = dr["IdMsgReferencia"].ToString();
                m.ReferenciaOCN = dr["ReferenciaOCN"].ToString();
                m.remitente = dr["Remitente"].ToString();
                m.Prioridad = dr["Prioridad"].ToString();
                m.TipoTitulo = dr["TituloMensaje"].ToString();
                m.Delito = dr["Delito"].ToString();
                m.FechaMensaje = DateTime.Parse(dr["FechaMensaje"].ToString());
                m.FechaIngreso = DateTime.Parse(dr["FechaIngreso"].ToString());
                m.Estructura = dr["Estructura"].ToString();
                m.TipoDifusion = dr["TipoDifusion"].ToString();
                m.NombrePersona = dr["NombrePersona"].ToString();
                m.usuario = dr["usuario"].ToString();
                m.motivodifusion = dr["motivodifusion"].ToString();
                Lista.Add(m);
            }

            return Lista;
        }


    }
}