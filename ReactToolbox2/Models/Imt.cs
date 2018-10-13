
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using Newtonsoft.Json;

namespace ReactToolbox2.Models
{


    public class ImtActionComment
    {
        public int Id { get; set; }
        public int ImtActionsId { get; set; }
        [StringLength(250)]
        public string Comment { get; set; }
        public int CreatedById { get; set; }
        [JsonConverter(typeof(OnlyDateConverter))]
        [Column(TypeName = "DateTime2")]
        public DateTime CreatedDate { get; set; }
        public int UpdatedById { get; set; }
        [JsonConverter(typeof(OnlyDateConverter))]
        [Column(TypeName = "DateTime2")]
        public DateTime UpdatedDate { get; set; }
        public bool Inactive { get; set; }

        public virtual Employee CreatedBy { get; set; }
        public virtual Employee UpdatedBy { get; set; }


    }
    public class ImtActions
    {
        public int Id { get; set; }
        public int ImtRequestId { get; set; }
        public int AssignedToId { get; set; }
        public bool Complete { get; set; }
        [JsonConverter(typeof(OnlyDateConverter))]
        [Column(TypeName = "DateTime2")]
        public DateTime DueDate { get; set; }

        public int CreatedById { get; set; }
        [JsonConverter(typeof(OnlyDateConverter))]
        [Column(TypeName = "DateTime2")]
        public DateTime CreatedDate { get; set; }
        public int UpdatedById { get; set; }

        [JsonConverter(typeof(OnlyDateConverter))]
        [Column(TypeName = "DateTime2")]
        public DateTime UpdatedDate { get; set; }

        public virtual Employee CreatedBy { get; set; }
        public virtual Employee AssignedTo { get; set; }
        public virtual Employee UpdatedTo { get; set; }
        public virtual ICollection<ImtActionComment> ImtActionComments { get; set; }
    }



    public class ImtFaq
    {
        public int Id { get; set; }
        public string FaqDesc { get; set; }
        public string FaqResponse { get; set; }
    }

    public class ImtReference
    {

        public int Id { get; set; }

        [StringLength(250)]
        public string RefName { get; set; }

        [StringLength(250)]
        public string ReqFieldName { get; set; }

        [JsonConverter(typeof(OnlyDateConverter))]
        [Column(TypeName = "DateTime2")]
        public DateTime StartDate { get; set; }

        [JsonConverter(typeof(OnlyDateConverter))]
        [Column(TypeName = "DateTime2")]
        public DateTime EndDate { get; set; }
    }

    public class ImtRelease
    {
        public int Id { get; set; }
        [StringLength(250)]
        public string VersionNumber { get; set; }
        public int? CreatedbyId { get; set; }
        [JsonConverter(typeof(OnlyDateConverter))]
        [Column(TypeName = "DateTime2")]
        public DateTime? CreatedDate { get; set; }
        public int? UpdatedById { get; set; }
        [JsonConverter(typeof(OnlyDateConverter))]
        [Column(TypeName = "DateTime2")]
        public DateTime? UpdatedDate { get; set; }

        public virtual Employee CreatedBy { get; set; }
        public virtual Employee AssignedTo { get; set; }
    }

    public class ImtReleaseNote
    {
        public int Id { get; set; }
        public int? ReleaseId { get; set; }
        public string ReleaseNoteDesc { get; set; }
        public int? CreatedbyId { get; set; }
        [JsonConverter(typeof(OnlyDateConverter))]
        [Column(TypeName = "DateTime2")]
        public DateTime? CreatedDate { get; set; }
        public int? UpntdatedById { get; set; }
        [JsonConverter(typeof(OnlyDateConverter))]
        [Column(TypeName = "DateTime2")]
        public DateTime? UpdatedDate { get; set; }

        public virtual Employee CreatedBy { get; set; }
        public virtual Employee AssignedTo { get; set; }

        public virtual ICollection<ImtRelease> ImtReleaseId { get; set; }

    }


    public class ImtRequest
    {
        public int Id { get; set; }

        public string RequestName { get; set; }
        public string RequestDescription { get; set; }
        public int? RequestTypeId { get; set; }
        public int? PriorityId { get; set; }
        public int? StatusId { get; set; }
        [JsonConverter(typeof(OnlyDateConverter))]
        [Column(TypeName = "DateTime2")]
        public DateTime? DueDate { get; set; }
        public int? IdentById { get; set; }
        public DateTime? IdentDate { get; set; }
        public string TrainSubject { get; set; }
        public int? TrainMediumId { get; set; }
        public int? TrainAudienceId { get; set; }
        [JsonConverter(typeof(OnlyDateConverter))]
        [Column(TypeName = "DateTime2")]
        public DateTime? TrainTimeLineDate { get; set; }
        public int? TrainSourceId { get; set; }
        public string ToolDescription { get; set; }
        public int? ToolId { get; set; }
        public int? ToolSourceId { get; set; }
        [StringLength(250)]
        public string AttrName { get; set; }
        [StringLength(250)]
        public string AttrRequest { get; set; }
        public int? AttrId { get; set; }
        public int? AttrSourceId { get; set; }
        [StringLength(250)]
        public string AttrJustification { get; set; }
        public int? AttrApprovalId { get; set; }
        public int? RemedTypeId { get; set; }
        public int? RemedSourceId { get; set; }
        public int? RemedImpactId { get; set; }
        public int? RemedArtifactId { get; set; }
        [StringLength(250)]
        public string RemedArtifactOther { get; set; }
        [StringLength(250)]
        public string RemedImpactDesc { get; set; }
        [StringLength(250)]
        public string RemedJustification { get; set; }
        [StringLength(250)]
        public string RemedAdditionalInfo { get; set; }
        public int? MemoSourceId { get; set; }
        [StringLength(250)]
        public string MemoSourceOther { get; set; }
        public int? MemoTypeId { get; set; }
        [StringLength(250)]
        public string MemoJustification { get; set; }
        public int? MemoUpdateId { get; set; }
        [StringLength(250)]
        public string MemoActionReq { get; set; }
        public int? MemoArtifactId { get; set; }
        [StringLength(250)]
        public string MemoArtifactOther { get; set; }
        public int? MemoSectionId { get; set; }
        [StringLength(250)]
        public string MemoAdditionalInfo { get; set; }
        public int? ReportNew { get; set; }
        public int? ReportSourceId { get; set; }
        [StringLength(250)]
        public string ReportName { get; set; }
        [StringLength(250)]
        public string ReportDescription { get; set; }
        public int? ProdLocationId { get; set; }
        [StringLength(250)]
        public string ProdLocationOther { get; set; }
        public int? ProdToolId { get; set; }

        [JsonConverter(typeof(OnlyDateConverter))]
        [Column(TypeName = "DateTime2")]
        public DateTime? ProdIdentDate { get; set; }
        [StringLength(250)]
        public string ProdDescription { get; set; }
        [StringLength(250)]
        public string ProdReproduce { get; set; }
        [StringLength(250)]
        public string ProdCases { get; set; }
        public int? ProdModuleId { get; set; }
        [StringLength(250)]
        public string ProdImpact { get; set; }
        [StringLength(250)]
        public string ProdChange { get; set; }
        [StringLength(250)]
        public string ProdImpactProd { get; set; }

        public int? CreatedById { get; set; }
        [JsonConverter(typeof(OnlyDateConverter))]
        [Column(TypeName = "DateTime2")]
        public DateTime? CreatedDate { get; set; }
        public int? ClosedById { get; set; }
        [JsonConverter(typeof(OnlyDateConverter))]
        [Column(TypeName = "DateTime2")]
        public DateTime? ClosedByDate { get; set; }
        public int? AssignedToId { get; set; }

        [JsonConverter(typeof(OnlyDateConverter))]
        [Column(TypeName = "DateTime2")]
        public DateTime? AssignedDate { get; set; }

        public int? LastUpdatedById { get; set; }

        [JsonConverter(typeof(OnlyDateConverter))]
        [Column(TypeName = "DateTime2")]
        public DateTime? LastUpdatedDate { get; set; }
        [StringLength(250)]
        public string GeneralIssue { get; set; }
        [StringLength(250)]
        public string GeneralSource { get; set; }
        [StringLength(250)]
        public string GeneralImpact { get; set; }
        [StringLength(250)]
        public string GeneralAction { get; set; }
        [StringLength(250)]
        public string GeneralCaseIds { get; set; }
        public int? PhaseTypeId { get; set; }

        //
        public virtual Reference ImtPhaseType { get; set; }
        public virtual ImtActions ImtActions { get; set; }
        public virtual Employee CreatedBy { get; set; }
        public virtual ICollection<ImtRequestComment> ImtRequestComment { get; set; }
        public virtual Employee LastUpdatedBy { get; set; }
        public virtual Employee ClosedBy { get; set; }
        public virtual Reference Status { get; set; }
        public virtual Reference RequestType { get; set; }



    }

    public class ImtRequestComment
    {
        public int Id { get; set; }
        public int? ImtRequestId { get; set; }
        public string Comment { get; set; }
        public int? CreatedBy { get; set; }

        [JsonConverter(typeof(OnlyDateConverter))]
        [Column(TypeName = "DateTime2")]
        public DateTime? CreatedDate { get; set; }

        public string UpdatedBy { get; set; }

        [JsonConverter(typeof(OnlyDateConverter))]
        [Column(TypeName = "DateTime2")]
        public DateTime? UpdatedDate { get; set; }

        public bool Inactive { get; set; }
    }
    public class ImtSection
    {
        public int Id { get; set; }
        public int? RequestId { get; set; }
        public int? SectionId { get; set; }

        public int? UpdatedById { get; set; }
        [JsonConverter(typeof(OnlyDateConverter))]
        [Column(TypeName = "DateTime2")]
        public DateTime? UpdatedDate { get; set; }

        public virtual Employee UpdatedBy { get; set; }

    }
}



