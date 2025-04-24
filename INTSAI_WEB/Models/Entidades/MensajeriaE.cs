using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace INTSAI_WEB.Models.Entidades
{
    public class MensajeriaE
    {     
        public string IdMensaje { get; set; }
        public string IdMsgReferencia { get; set; }
        public string ReferenciaOCN { get; set; }
        public string remitente { get; set; }
        public string TipoTitulo { get; set; }
        public string Delito { get; set; }
        public DateTime FechaMensaje { get; set; }
        public DateTime FechaIngreso { get; set; }
        public string Estructura { get; set; }
        public string TipoDifusion { get; set; }
        public string NombrePersona { get; set; }
        public string usuario { get; set; }
        public string motivodifusion { get; set; }
        public string Prioridad { get; set; }
    }
}