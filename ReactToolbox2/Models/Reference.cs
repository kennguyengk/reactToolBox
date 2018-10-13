using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using Newtonsoft.Json;

namespace ReactToolbox2.Models
{
    public class ReferenceForImt
    {
        public int Id { get; set; }
        [StringLength(150)]
        public string ReferenceLabel  { get; set; }
        public string ReferenceFieldName { get; set; }
        [JsonConverter(typeof(OnlyDateConverter))]
        [Column(TypeName = "DateTime2")]
        public DateTime StartDate { get; set; }
        [JsonConverter(typeof(OnlyDateConverter))]
        [Column(TypeName = "DateTime2")]
        public DateTime EndDate { get; set; }

        
    }
}