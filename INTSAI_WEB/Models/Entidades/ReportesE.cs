using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace INTSAI_WEB.Models.Entidades
{
    public class ReportesE
    {
        // ATRIBUTOS PARA REPORTE 1 y 2
        public string Usuario { get; set; }
        public int CodGrupo1 { get; set; }
        public string Grupo1 { get; set; }
        public string CodEstructura { get; set; }
        public string Estructura { get; set; }
        public string CodMotivoDifusion { get; set; }
        public string TipoDifusion { get; set; }
        public int Total { get; set; }


        // ATRIBUTOS PARA EL REPORTE TIPO 3 Y 4
        public string No { get; set; }
        public string Tipo { get; set; }
        public string CodContinente  { get; set; }
        public string Continente { get; set; }
        public int Cantidad { get; set; }   //quitar mas adelante


        //ATRIBUTOS PARA EL TIPO REPORTE 5, 6, 7, 8
        public int Repuesta { get; set; }   
        public string CodEstructuraInterna { get; set; }
        public string nivel { get; set; }
        public string TipoConsulta { get; set; }
        public string CodTipoConsulta { get; set; }
        public int IdRepuesta { get; set; }

    }
}