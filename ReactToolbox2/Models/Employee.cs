using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace ReactToolbox2.Models
{
    public class Employee
    {
        public int ID { get; set; }
        [MinLength(1)]
        [MaxLength(50)]
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string NickName { get; set; }
        public int EmployeeStatusID { get; set; } = 2;
        public int? EmployeeTitleID { get; set; }
        public int LocationID { get; set; }
        [JsonConverter(typeof(OnlyDateConverter))]
        [Column(TypeName = "DateTime2")]
        public DateTime HireDate { get; set; }
        [JsonConverter(typeof(OnlyDateConverter))]
        [Column(TypeName = "DateTime2")]
        public DateTime TermDate { get; set; } = DateTime.Parse("12/31/9999");
        public string PortalID { get; set; }
        public string Manager { get; set; }
        public bool OutofOfficeFlag { get; set; }
        [JsonConverter(typeof(OnlyDateConverter))]
        [Column(TypeName = "DateTime2")]
        public DateTime AssignmentStartDate { get; set; }
        [JsonConverter(typeof(OnlyDateConverter))]
        [Column(TypeName = "DateTime2")]
        public DateTime AssignmentEndDate { get; set; } = DateTime.Parse("12/31/9999");
        public string AssignmentNetworkIdentifer { get; set; }
        public string AssignmentSuite { get; set; }
        public string AssignmentLeader { get; set; }
        public string AssignmentEmailAddress { get; set; }
        public string AssignmentClientLaptopName { get; set; }
        [JsonConverter(typeof(OnlyDateConverter))]
        [Column(TypeName = "DateTime2")]
        public DateTime AssignmentClientLaptopReceivedDate { get; set; }
        [JsonConverter(typeof(OnlyDateConverter))]
        [Column(TypeName = "DateTime2")]
        public DateTime AssignmentClientLaptopReturnedDate { get; set; }
        public string AssignmentClientNetworkAccessName { get; set; }
        [JsonConverter(typeof(OnlyDateConverter))]
        [Column(TypeName = "DateTime2")]
        public DateTime AssignmentClientNetworkAccessReceivedDate { get; set; }
        [JsonConverter(typeof(OnlyDateConverter))]
        [Column(TypeName = "DateTime2")]
        public DateTime AssignmentClientNetworkAccessReturnedDate { get; set; } = DateTime.Parse("12/31/9999");
        public string AssignmentBillCodeName { get; set; }
        [JsonConverter(typeof(OnlyDateConverter))]
        [Column(TypeName = "DateTime2")]
        public DateTime AssignmentBillCodeStartDate { get; set; }
        [JsonConverter(typeof(OnlyDateConverter))]
        [Column(TypeName = "DateTime2")]
        public DateTime AssignmentBillCodeEndDate { get; set; } = DateTime.Parse("12/31/9999");
        public string AssignmentComments { get; set; }
        [JsonConverter(typeof(OnlyDateConverter))]
        [Column(TypeName = "DateTime2")]
        public DateTime StatusDate { get; set; }
        public virtual EmployeeStatus EmployeeStatus { get; set; }
        public virtual EmployeeTitle EmployeeTitle { get; set; }
        public virtual VacancyLocation VacancyLocation { get; set; }
        [InverseProperty("Employee")]
        public virtual ICollection<EmployeeModuleAccessLevel> EmployeeModuleAccessLevels { get; set; }
        [NotMapped]
        public string FullName {
            get {
                return this.LastName + ", " + this.FirstName;
            }
        }    
    }
    public class EmployeeStatus
    {
        public int ID { get; set; }
        public string StatusDesc { get; set; }

    }
    public class EmployeeTitle
    {
        public int ID { get; set; }
        public string TitleDesc { get; set; }

    }
    public class Module
    {
        public int ID { get; set; }
        public string ModuleDesc { get; set; }

    }
    public class ModuleAccessLevel
    {
        public int ID { get; set; }
        public int ModuleID { get; set; }
        public string ModuleAccessLevelDesc { get; set; }
        public virtual Module Module { get; set; }
    }
    public class EmployeeModuleAccessLevel
    {
        public int ID { get; set; }
        public int? EmployeeID { get; set; }
        public int? ModuleAccessLevelID { get; set; }
        public int? LOBID { get; set; }
        public int? TeamLeadID { get; set; }
        public bool ModuleAdmin { get; set; } = false;
        public virtual ModuleAccessLevel ModuleAccessLevel { get; set; }
        [JsonIgnore]
        [ForeignKey("TeamLeadID")]
        public virtual Employee TeamLead { get; set; }
        [JsonIgnore]
        [ForeignKey("EmployeeID")]
        public virtual Employee Employee { get; set; }
        public virtual LOB LOB { get; set; }
    }
    public class Vacancy
    {
        public int ID { get; set; }
        public int? VacancyRoleID { get; set; }
        public int? LOBID { get; set; }
        public int? EmployeeID { get; set; }
        public int? VacancyStatusID { get; set; }
        [JsonConverter(typeof(OnlyDateConverter))]
        [Column(TypeName = "DateTime2")]
        public DateTime OpenDate { get; set; }
        [JsonConverter(typeof(OnlyDateConverter))]
        [Column(TypeName = "DateTime2")]
        public DateTime StartDate { get; set; }
        public int? VacancyLocationID { get; set; }
        public string Manager { get; set; }
        public string SOWCode { get; set; }
        public string Comments { get; set; }
        public virtual VacancyStatus VacancyStatus { get; set; }
        public virtual VacancyRole VacancyRole { get; set; }
        public virtual VacancyLocation VacancyLocation { get; set; }
        public virtual Employee Employee { get; set; }
        public virtual LOB LOB { get; set; }
    }
    public class VacancyStatus
    {
        public int ID { get; set; }
        public string StatusDesc { get; set; }
    }
    public class VacancyRole
    {
        public int ID { get; set; }
        public string RoleDesc { get; set; }
    }
    public class VacancyLocation
    {
        public int ID { get; set; }
        public string LocationDesc { get; set; }
    }
    public class LOB
    {
        public int ID { get; set; }
        public string LOBDesc { get; set; }
    }

}