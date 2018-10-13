using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ReactToolbox2.Models
{
    public class Attachment
    {
        
        public int CaseId { get; set; }
        public int ModuleId { get; set; }
        public int FileName { get; set; }

        public string Urlpath { get; set; }
        public string Type { get; set; }
        public string Size { get; set; }

        public int CreatedById { get; set; }
        public string LoadedDate { get; set; }
        public IEnumerable<HttpPostedFileBase> Files { get; set; }


        public virtual Reference ModuleName { get; set; }
        public virtual Employee CreatedBy { get; set; }
    }
}