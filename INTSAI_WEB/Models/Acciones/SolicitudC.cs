using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Web;
using System.Windows.Input;
using INTSAI_WEB.Models.Entidades;

namespace INTSAI_WEB.Models.Acciones
{
    public class SolicitudC
    { 
        public static string GuardarSolicitud(SolicitudE S)
        {
            string strConnString = ConfigurationManager.ConnectionStrings["Conn_IN"].ConnectionString;
            #region GuardarSolicitud
            string sql = "[dbo].[Sp_GuardarSolicitudes]";
            List<SqlParameter> parametros = new List<SqlParameter>();
            parametros.Add(new SqlParameter("IdMensaje", S.IdMensaje));
            parametros.Add(new SqlParameter("IdMsjReferencia", S.IdMsjReferencia));
            parametros.Add(new SqlParameter("ReferenciaOCN", S.ReferenciaOCN));
            parametros.Add(new SqlParameter("CodTipoDifusion", S.CodTipoDifusion));
            parametros.Add(new SqlParameter("CodMotivoDifusion", S.CodMotivoDifusion));
            parametros.Add(new SqlParameter("CodViaRecepcion", S.CodViaRecepcion));
            parametros.Add(new SqlParameter("CodEstrucOrigen", S.CodEstrucOrigen));
            parametros.Add(new SqlParameter("CodEspecialidad", S.CodEspecialidad));
            parametros.Add(new SqlParameter("CodEstruct_Solicitnt", S.CodEstruct_Solictnt));
            parametros.Add(new SqlParameter("FechaIngreso", S.FechaIngreso));
            parametros.Add(new SqlParameter("FechaMensaje", S.FechaMensaje));
            parametros.Add(new SqlParameter("CodTipoEnvioMensaje", S.CodTipoEnvioMensaje));
            parametros.Add(new SqlParameter("CodEstructuraInterna", S.CodEstructuraInterna));
            parametros.Add(new SqlParameter("PlazoDefinido", S.PlazoDefinido));
            parametros.Add(new SqlParameter("Prioridad", S.Prioridad));
            parametros.Add(new SqlParameter("Nacional", S.Nacional));
            parametros.Add(new SqlParameter("Carnet", S.Carnet));
            parametros.Add(new SqlParameter("Usuario", S.Usuario));
            parametros.Add(new SqlParameter("CodEstado", S.CodEstado));
            parametros.Add(new SqlParameter("CodTipoConsulta", S.CodTipoConsulta));
            DataTable dt = Data.Query(sql, parametros, CommandType.StoredProcedure, strConnString);

            string Idmsj = dt.Rows[0][0].ToString();
            #endregion

            #region GuardarAdjunto

            DetalleAdjuntoSolicitud adjunto = new DetalleAdjuntoSolicitud
            {
                Id = 0,
                IdMensaje = Idmsj,
                NombreArchivo = S.NombreArchivo,
                Archivo = S.ArchivoAdjunto,
                TipoSolicitud = GetTipoSolicitud(int.Parse(S.CodTipoEnvioMensaje))
            };
            MensajeriaC.SaveCorreo(adjunto);
            #endregion 

            int Npersonas = S.Personas.Count;
            for (int i = 0; i < Npersonas; i++)
            {
                #region RegistroPersonas
                sql = "SavePersonas_Solicitud";
                parametros = new List<SqlParameter>
                {
                    new SqlParameter("@IdMensaje", Idmsj),
                    new SqlParameter("@NombrePersona", S.Personas[i].NombrePersona.Trim().ToUpper())
                };              
                dt = Data.Query(sql, parametros, CommandType.StoredProcedure, strConnString);
                int IdPersona = Convert.ToInt32(dt.Rows[0][0]);
                #endregion

                #region RegistroDelitos
                sql = "SaveDelitos_PersonaSolicitud";
                parametros = new List<SqlParameter>
                {
                    new SqlParameter("@CodDelito", S.Delitos[i].CodDelito),
                    new SqlParameter("@IdMensaje", Idmsj)
                };
               
                dt = Data.Query(sql, parametros, CommandType.StoredProcedure, strConnString);
                #endregion
            }

            #region Arma
            int Narmas = S.Arma.Count;
            for (int a = 0; a < Narmas; a++)
            {
                sql = "GuardarVarios_Solic";
                parametros = new List<SqlParameter>
                {
                 new SqlParameter("@IdMensaje", Idmsj),
                 new SqlParameter("@Tipo", 1),
                 new SqlParameter("@TipoArma", S.Arma[a].Tipo.Trim().ToString()),
                 new SqlParameter("@Modelo", S.Arma[a].Modelo.Trim().ToString()),
                 new SqlParameter("@Serie", S.Arma[a].Serie.Trim().ToString())
                };
                 
                dt = Data.Query(sql, parametros, CommandType.StoredProcedure, strConnString);
                int IdArma = Convert.ToInt32(dt.Rows[0][0]);
            }            
            #endregion

            #region Vehiculo
            int Nvehiculos = S.Vehiculo.Count;
            for(int v = 0; v < Nvehiculos; v++)
            {
                sql = "GuardarVarios_Solic";
                parametros = new List<SqlParameter> {
                   new SqlParameter("@IdMensaje", Idmsj),
                   new SqlParameter("@Tipo", 2),
                   new SqlParameter("@Chasis", S.Vehiculo[v].Chasis.Trim().ToString()),
                };              
                dt = Data.Query(sql, parametros, CommandType.StoredProcedure, strConnString);
                int Idvehiculo = Convert.ToInt32(dt.Rows[0][0]);
            }
            #endregion

            #region Aeronave
            int Naeronave = S.Aeronave.Count;
            for (int e = 0; e < Naeronave; e++)
            {
                sql = "GuardarVarios_Solic";
                parametros = new List<SqlParameter>
                {
                   new SqlParameter("@IdMensaje", Idmsj),
                   new SqlParameter("@Tipo", 3),
                   new SqlParameter("@Num_Serie", S.Aeronave[e].Serie.Trim().ToString())
                };                 
                dt = Data.Query(sql, parametros, CommandType.StoredProcedure, strConnString);
                int Idaeronave = Convert.ToInt32(dt.Rows[0][0]);
            }
            #endregion

            #region Pasaporte 
            int Npasaporte = S.Pasaporte.Count;
            for(int p = 0; p < Npasaporte; p++)
            {
                sql = "GuardarVarios_Solic";
                parametros = new List<SqlParameter>
                {
                   new SqlParameter("@IdMensaje", Idmsj),
                   new SqlParameter("@Tipo", 4),
                   new SqlParameter("@Num_Pasaport", S.Pasaporte[p].NoPasaporte.Trim().ToString()),
                   new SqlParameter("@Pais_Emision", S.Pasaporte[p].PaisEmision.Trim().ToString())
                };               
                dt = Data.Query(sql, parametros, CommandType.StoredProcedure, strConnString);
                int IdPasaporte = Convert.ToInt32(dt.Rows[0][0]);
            }
            #endregion
                       
            return Idmsj;
        }

        private static string GetTipoSolicitud(int codTipoEnvioMensaje)
        {
            return codTipoEnvioMensaje switch
            {
                1 => "Entrada Internacional",
                2 => "Salida Internacional",
                3 => "Consulta",
                4 => "Entrada Nacional",
                5 => "Salida Nacional",
                _=> "Desconocido"
            };
        }
    }
}