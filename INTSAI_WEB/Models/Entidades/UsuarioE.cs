using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace INTSAI_WEB.Models.Entidades
{
    public class UsuarioE
    {
        public int IdUsuario { get; set; }
        public int IdRol { get; set; }
        public string NombreRol { get; set; }
        public string CodEstructura { get; set; }
        public string Estructura { get; set; }
        public string Carnet { get; set; }        
        public string Chip { get; set; }        
        public string PrimerNombre { get; set; }
        public string SegundoNombre { get; set; }
        public string PrimerApellido { get; set; }
        public string SegundoApellido { get; set; }
        public string NombreCompleto { get; set; }
        public string Grado { get; set; }      
        public string Cuenta { get; set; }
        public string Password { get; set; }
        public string Oficina { get; set; }
        public string Especialidad { get; set; }


    }
}