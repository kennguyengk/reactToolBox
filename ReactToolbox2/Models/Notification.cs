using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace ReactToolbox2.Models
{
    public class Notification
    {
        public int ID { get; set; }
        public string Message { get; set; }
        [JsonConverter(typeof(OnlyDateConverter))]
        [Column(TypeName = "DateTime2")]
        public DateTime StartDT { get; set; }
        [JsonConverter(typeof(OnlyDateConverter))]
        [Column(TypeName = "DateTime2")]
        public DateTime ExpireDT { get; set; }
        [JsonConverter(typeof(OnlyDateConverter))]
        [Column(TypeName = "DateTime2")]
        public DateTime InsertedDT { get; set; }
        //public int InsertedByID { get; set; }
    }
}