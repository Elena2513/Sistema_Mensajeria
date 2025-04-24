using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace INTSAI_WEB.Models.Entidades
{
    public class SolicitudE
    {
        public string IdMensaje { get; set; }
        public string IdMsjReferencia { get; set; }
        public Byte[] ArchivoAdjunto { get; set; }
        public string NombreArchivo { get; set; }
        public string ReferenciaOCN { get; set; }
        public string CodTipoDifusion { get; set; }
        public string CodViaRecepcion { get; set; }
        public string CodEstrucOrigen { get; set; }
        public string CodEspecialidad { get; set; }
        public string CodEstruct_Solictnt { get; set; }
        public string FechaIngreso { get; set; }
        public string HoraIngreso { get; set; }
        public string FechaMensaje { get; set; }
        public string TituloMensaje { get; set; }
        public string Remitente { get; set; }
        public string CodTipoEnvioMensaje { get; set; }
        public string CodEstructuraInterna { get; set; }
        public string DescripcionMensaje { get; set; }
        public int PlazoDefinido { get; set; }
        public string Usuario { get; set; }
        public string Carnet { get; set; }
        public string CodEstado { get; set; }
        public string Prioridad { get; set; }
        public int Nacional { get; set; }
        public string CodTipoConsulta { get; set; }
        public string CodEspecialista { get; set; }
        public string PuntoExterno { get; set; }
        public string ProyectoEspecial { get; set; }
        public string Motivo { get; set; }
        public string CodMotivoDifusion { get; set; }
        public List<DetallePersonaSolicitud> Personas { get; set; }
        public List<DetalleDelitosSolicitud> Delitos { get; set; }    
        public List<Arma> Arma { get; set; }
        public List<Vehiculo> Vehiculo { get; set; }
        public List<Aeronave> Aeronave { get; set; }
        public List<Pasaporte> Pasaporte { get; set; }

    }

    public class DetallePersonaSolicitud
    {
        public int Id { get; set; }
        public string IdMensaje { get; set; }
        public string NombrePersona { get; set; }
        public string IdPais { get; set; }
        public string Pais { get; set; }
        public string CodTipoInvolucrado { get; set; }
        public string TipoInvolucrado { get; set; }
    }

    public class DetalleDelitosSolicitud
    {
        public string CodDelito { get; set; }
        public string Delito { get; set; }
        public string IdMensaje { get; set; }
    }

    public class DetalleAdjuntoSolicitud
    {
        public int Id { get; set; }
        public string IdMensaje { get; set; }
        public byte[] Archivo { get; set; }
        public string NombreArchivo { get; set; }
        public string TipoSolicitud { get; set; }
    }

    public class Arma
    {
        public int Id { get; set; }
        public string IdMensaje { get; set; }
        public string Tipo { get; set; }
        public string Modelo { get; set; }
        public string Serie { get; set; }
        public DateTime FechaRegistro { get; set; }

    }

    public class Vehiculo
    {
        public int Id { get; set; }
        public string Chasis { get;set;}
        public string IdMensaje { get; set; }
        public DateTime FechaRegistro { get; set; }

    }

    public class Aeronave
    {
        public int Id { get; set; }
        public string IdMensaje {get;set;}
        public string Serie { get; set; }
        public DateTime FechaRegistro { get; set; }
    }

    public class Pasaporte
    {
        public int Id { get; set; }
        public string IdMensajae { get; set; }
        public string NoPasaporte { get; set; }
        public string PaisEmision { get; set; }
        public DateTime FechaRegistro { get; set; }
    }

  
}