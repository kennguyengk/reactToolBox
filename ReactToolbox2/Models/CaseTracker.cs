using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace ReactToolbox2.Models
{
    public class Case
    {
        public int ID { get; set; }
        public string CustomerName { get; set; }
        public string InternalID { get; set; }
        public Boolean IsMissingInfo { get; set; }
        public Boolean IsNegativeNews { get; set; }
        public Boolean IsPoliticallyExposedPerson { get; set; }
        public Boolean IsMemoReview { get; set; }
        public Boolean IsRiskRatingComplete { get; set; }
        public Boolean IsEnhancedDueDilligence { get; set; }
        public Boolean IsQualityComplete { get; set; }
        public Boolean IsQualityPass { get; set; }
        public Boolean IsComplete { get; set; }

        [JsonIgnore]
        public DateTime ActiveDT { get; set; }
        [JsonIgnore]
        public DateTime ExpireDT { get; set; } = DateTime.Parse("12/31/9999");
        [JsonIgnore]
        public DateTime InsertedDT { get; set; }
        [JsonIgnore]
        public DateTime UpdatedDT { get; set; }
        [JsonIgnore]
        public int InsertedByID { get; set; }
        [JsonIgnore]
        public int UpdatedByID { get; set; }
        [JsonIgnore]
        public virtual Employee InsertedBy { get; set; }
        [JsonIgnore]
        public virtual Employee UpdatedBy { get; set; }
        public virtual ICollection<Fields> Fields { get; set; }
        public virtual ICollection<Assignments> Assignments { get; set; }
        public virtual ICollection<Flags> Flags { get; set; }
        public virtual ClassificationDescription ClassificationDescription { get; set; }
        public virtual LobDescription LobDescription { get; set; }
        public virtual ICollection<Status> StatusHistory { get; set; }
        [NotMapped]
        public bool IsActive
        {
            get
            {
                return (this.ActiveDT < DateTime.Now && this.ExpireDT > DateTime.Now);
            }
        }

    }
    public class Fields
    {
        public int ID { get; set; }
        public int CaseID { get; set; }
        public int FieldDescriptionID { get; set; }
        public string InitialValue { get; set; }
        public string UpdatedValue { get; set; }
        public string OverrideValue { get; set; }
        public Boolean isMissingInfo { get; set; }
        public int SourceDocumentID { get; set; }
        public DateTime SourceDocumentDate { get; set; }
        public Boolean IsQualityValue { get; set; }
        public Boolean IsQualitySource { get; set; }

        public DateTime UpdatedDT { get; set; }
        [JsonIgnore]
        public virtual Employee InsertedBy { get; set; }
        [JsonIgnore]
        public virtual Employee UpdatedBy { get; set; }
    }

    public class Assignments
    {
        public int ID { get; set; }
        public int CaseID { get; set; }
        public int EmployeeID { get; set; }
        public int RoleID { get; set; }
        public DateTime ActiveDT { get; set; }
        public DateTime ExpireDT { get; set; } = DateTime.Parse("12/31/9999");
        public DateTime UpdatedDT { get; set; }
        public int UpdatedByID { get; set; }
        public DateTime InsertedDT { get; set; }
        public int InsertedByID { get; set; }
        [JsonIgnore]
        public virtual Employee InsertedBy { get; set; }
        [JsonIgnore]
        public virtual Employee UpdatedBy { get; set; }
        [JsonIgnore]
        public virtual Employee Employee { get; set; }
        public bool IsActive
        {
            get
            {
                return (this.ActiveDT < DateTime.Now && this.ExpireDT > DateTime.Now);
            }
        }

    }
    public class Role
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        [JsonIgnore]
        public DateTime ActiveDT { get; set; }
        [JsonIgnore]
        public DateTime ExpireDT { get; set; } = DateTime.Parse("12/31/9999");
        public DateTime UpdatedDT { get; set; }
        [JsonIgnore]
        public int UpdatedByID { get; set; }
        public DateTime InsertedDT { get; set; }
        public int InsertedByID { get; set; }
        [JsonIgnore]
        public virtual Employee InsertedBy { get; set; }
        [JsonIgnore]
        public virtual Employee UpdatedBy { get; set; }
        public bool IsActive
        {
            get
            {
                return (this.ActiveDT < DateTime.Now && this.ExpireDT > DateTime.Now);
            }
        }

    }

    public class Status
    {
        public int ID { get; set; }
        public int CaseID { get; set; }
        public int StatusDescriptionID { get; set; }
        [JsonIgnore]
        public DateTime ActiveDT { get; set; }
        [JsonIgnore]
        public DateTime ExpireDT { get; set; } = DateTime.Parse("12/31/9999");
        [JsonIgnore]
        public DateTime UpdatedDT { get; set; }
        [JsonIgnore]
        public int UpdatedByID { get; set; }
        public DateTime InsertedDT { get; set; }
        [JsonIgnore]
        public int InsertedByID { get; set; }
        [JsonIgnore]
        public virtual Employee InsertedBy { get; set; }
        [JsonIgnore]
        public virtual Employee UpdatedBy { get; set; }
        public virtual ICollection<StatusDescription> StatusDescriptionHistory { get; set; }
        public bool IsActive
        {
            get
            {
                return (this.ActiveDT < DateTime.Now && this.ExpireDT > DateTime.Now);
            }
        }

    }


    public class SourceDocIndex
    {
        public int ID { get; set; }
        public int SourceDocumentID { get; set; }
        public int ClassificationDescriptionID { get; set; }
        public int LobID { get; set; }
        public int FieldDescriptionID { get; set; }
        [JsonIgnore]
        public DateTime ActiveDT { get; set; }
        [JsonIgnore]
        public DateTime ExpireDT { get; set; } = DateTime.Parse("12/31/9999");
        [JsonIgnore]
        public DateTime UpdatedDT { get; set; }
        [JsonIgnore]
        public int UpdatedByID { get; set; }
        [JsonIgnore]
        public DateTime InsertedDT { get; set; }
        [JsonIgnore]
        public int InsertedByID { get; set; }
        [JsonIgnore]
        public virtual Employee InsertedBy { get; set; }
        [JsonIgnore]
        public virtual Employee UpdatedBy { get; set; }
        public virtual SourceDocument SourceDocument { get; set; }
        
        public bool IsActive
        {
            get
            {
                return (this.ActiveDT < DateTime.Now && this.ExpireDT > DateTime.Now);
            }
        }
    }

    public class Flags
    {
        public int ID { get; set; }
        public int CaseID { get; set; }
        public DateTime ActiveDT { get; set; }
        public DateTime ExpireDT { get; set; } = DateTime.Parse("12/31/9999");
        public DateTime UpdatedDT { get; set; }
        [JsonIgnore]
        public int UpdatedByID { get; set; }
        [JsonIgnore]
        public DateTime InsertedDT { get; set; }
        [JsonIgnore]
        public int InsertedByID { get; set; }
        [JsonIgnore]
        public virtual Employee InsertedBy { get; set; }
        [JsonIgnore]
        public virtual Employee UpdatedBy { get; set; }
        public virtual FlagDescription FlagDescription { get; set; }
        public bool IsActive
        {
            get
            {
                return (this.ActiveDT < DateTime.Now && this.ExpireDT > DateTime.Now);
            }
        }

    }

    public class StatusDescription
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        [JsonIgnore]
        public Boolean Primary { get; set;  }
        public DateTime ActiveDT { get; set; }
        [JsonIgnore]
        public DateTime ExpireDT { get; set; } = DateTime.Parse("12/31/9999");
        public DateTime UpdatedDT { get; set; }
        [JsonIgnore]
        public int UpdatedByID { get; set; }
        public DateTime InsertedDT { get; set; }
        [JsonIgnore]
        public int InsertedByID { get; set; }
        [JsonIgnore]
        public virtual Employee InsertedBy { get; set; }
        [JsonIgnore]
        public virtual Employee UpdatedBy { get; set; }
        public bool IsActive
        {
            get
            {
                return (this.ActiveDT < DateTime.Now && this.ExpireDT > DateTime.Now);
            }
        }
    }
    public class FlagDescription
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime ActiveDT { get; set; }
        public DateTime ExpireDT { get; set; } = DateTime.Parse("12/31/9999");
        public DateTime UpdatedDT { get; set; }
        [JsonIgnore]
        public int UpdatedByID { get; set; }
        public DateTime InsertedDT { get; set; }
        [JsonIgnore]
        public int InsertedByID { get; set; }
        [JsonIgnore]
        public virtual Employee InsertedBy { get; set; }
        [JsonIgnore]
        public virtual Employee UpdatedBy { get; set; }
        public bool IsActive
        {
            get
            {
                return (this.ActiveDT < DateTime.Now && this.ExpireDT > DateTime.Now);
            }
        }
    }

    public class SourceDocument
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        [JsonIgnore]
        public DateTime ActiveDT { get; set; }
        [JsonIgnore]
        public DateTime ExpireDT { get; set; } = DateTime.Parse("12/31/9999");
        [JsonIgnore]
        public DateTime UpdatedDT { get; set; }
        [JsonIgnore]
        public int UpdatedByID { get; set; }
        [JsonIgnore]
        public virtual Employee UpdatedBy { get; set; }
        public bool IsActive
        {
            get
            {
                return (this.ActiveDT < DateTime.Now && this.ExpireDT > DateTime.Now);
            }
        }
    }
    public class Reference
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int FieldDescritpionID { get; set; }
        public string FieldName { get; set; }
        public int ParentID { get; set; }
        [JsonIgnore]
        public DateTime ActiveDT { get; set; }
        [JsonIgnore]
        public DateTime ExpireDT { get; set; } = DateTime.Parse("12/31/9999");
        [JsonIgnore]
        public DateTime InsertedDT { get; set; }
        [JsonIgnore]
        public DateTime UpdtedDT { get; set; }
        [JsonIgnore]
        public int InsertedByID { get; set; }
        [JsonIgnore]
        public int UpdatedByID { get; set; }
        [JsonIgnore]
        public virtual Employee InsertedBy { get; set; }
        [JsonIgnore]
        public virtual Employee UpdatedBy { get; set; }
        public bool IsActive
        {
            get
            {
                return (this.ActiveDT < DateTime.Now && this.ExpireDT > DateTime.Now);
            }
        }
    }



    public class FieldDescription
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string InputType { get; set; }
        public string DataType { get; set; }
        public string ValidationText { get; set; }
        [JsonIgnore]
        public DateTime ActiveDT { get; set; }
        [JsonIgnore]
        public DateTime ExpireDT { get; set; } = DateTime.Parse("12/31/9999");
        [JsonIgnore]
        public DateTime UpdatedDT { get; set; }
        [JsonIgnore]
        public int UpdatedByID { get; set; }
        [JsonIgnore]
        public virtual Employee UpdatedBy { get; set; }
        [InverseProperty("FieldDescription")]
        public virtual RequirementDescription RequirementDescription { get; set; }
        public virtual ICollection<SourceDocIndex> SourceDocIndex { get; set; }
        public bool IsActive
        {
            get
            {
                return (this.ActiveDT < DateTime.Now && this.ExpireDT > DateTime.Now);
            }
        }


    }

    public class RequirementDescription
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        [JsonIgnore]
        public DateTime ActiveDT { get; set; }
        [JsonIgnore]
        public DateTime ExpireDT { get; set; } = DateTime.Parse("12/31/9999");
        [JsonIgnore]
        public DateTime UpdatedDT { get; set; }
        [JsonIgnore]
        public int UpdatedByID { get; set; }
        [JsonIgnore]
        public virtual Employee UpdatedBy { get; set; }
        [JsonIgnore]
        public virtual ICollection<FieldDescription> FieldDescription { get; set; }
        [InverseProperty("RequirementDescription")]
        public virtual CategoryDescription CategoryDescription { get; set; }
        public bool IsActive
        {
            get
            {
                return (this.ActiveDT < DateTime.Now && this.ExpireDT > DateTime.Now);
            }
        }
    }

    public class CategoryDescription
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        [JsonIgnore]
        public DateTime ActiveDT { get; set; }
        [JsonIgnore]
        public DateTime ExpireDT { get; set; } = DateTime.Parse("12/31/9999");
        [JsonIgnore]
        public DateTime UpdatedDT { get; set; }
        [JsonIgnore]
        public int UpdatedByID { get; set; }
        [JsonIgnore]
        public virtual Employee UpdatedBy { get; set; }
        [JsonIgnore]
        public virtual ICollection<RequirementDescription> RequirementDescription { get; set; }
        public bool IsActive
        {
            get
            {
                return (this.ActiveDT < DateTime.Now && this.ExpireDT > DateTime.Now);
            }
        }
    }

    public class ClassificationDescription
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        [JsonIgnore]
        public DateTime ActiveDT { get; set; }
        [JsonIgnore]
        public DateTime ExpireDT { get; set; } = DateTime.Parse("12/31/9999");
        [JsonIgnore]
        public DateTime UpdatedDT { get; set; }
        [JsonIgnore]
        public int UpdatedByID { get; set; }
        [JsonIgnore]
        public virtual Employee UpdatedBy { get; set; }
        public virtual ICollection<ClassificationFieldMatrix> ClassificationFieldMatrix { get; set; }
        public bool IsActive
        {
            get
            {
                return (this.ActiveDT < DateTime.Now && this.ExpireDT > DateTime.Now);
            }
        }

    }

    public class LobDescription
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        [JsonIgnore]
        public DateTime ActiveDT { get; set; }
        [JsonIgnore]
        public DateTime ExpireDT { get; set; } = DateTime.Parse("12/31/9999");
        [JsonIgnore]
        public DateTime UpdatedDT { get; set; }
        [JsonIgnore]
        public int UpdatedByID { get; set; }
        [JsonIgnore]
        public virtual Employee UpdatedBy { get; set; }
        public bool IsActive
        {
            get
            {
                return (this.ActiveDT < DateTime.Now && this.ExpireDT > DateTime.Now);
            }
        }

    }

    public class ClassificationFieldMatrix
    {
        public int ID { get; set; }
        [JsonIgnore]
        public DateTime ActiveDT { get; set; }
        [JsonIgnore]
        public DateTime ExpireDT { get; set; } = DateTime.Parse("12/31/9999");
        [JsonIgnore]
        public DateTime UpdatedDT { get; set; }
        [JsonIgnore]
        public int UpdatedByID { get; set; }
        [JsonIgnore]
        public virtual Employee UpdatedBy { get; set; }
        public virtual FieldDescription FieldDescription { get; set; }
        public bool IsActive
        {
            get
            {
                return (this.ActiveDT < DateTime.Now && this.ExpireDT > DateTime.Now);
            }
        }

    }


    //Add to this class before changing controller - copy api/Cases into new controller
    public class CaseOverview
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Internal { get; set; }
        public string InsertedByName { get; set; }
        public string UpdatedByName { get; set; }
        public string StatusName { get; set; }
        public string PriorityName { get; set; }
        [JsonConverter(typeof(DateFormatConverter),"M/d/yyyy")]
        [Column(TypeName = "DateTime2")]
        public DateTime LastUpdated { get; set; }
        public int Age { get; set; }
        public string BusinessPartner { get; set; }

    }
    



}