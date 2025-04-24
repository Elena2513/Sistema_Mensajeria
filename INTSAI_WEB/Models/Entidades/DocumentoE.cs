using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace INTSAI_WEB.Models.Entidades
{
    public class DocumentoE
    {
        public string IdMensaje { get; set; } = string.Empty; // VARCHAR -> string
                                                            
        public byte[] Mensaje { get; set; }   // Definir 'Mensaje' como un arreglo de bytes
        public string Nombre { get; set; } = string.Empty; // VARCHAR -> string
    }

}