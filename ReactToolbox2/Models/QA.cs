using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;


namespace ReactToolbox2.Models
{
    public class QA
    {


        public int Id { get; set; }
        public int ImportCaseID { get; set; }

        public int LobId { get; set; }
        public int MileStoneId { get; set; }


        public int ResponseId { get; set; }
        public int ReviewId { get; set; }
        public int StatusId { get; set; }
        public int QAStatusId { get; set; }
        public int QAResponseId { get; set; }
        public int CaseStatusId { get; set; }
        public Boolean SentToFinalReview { get; set; }
        public Boolean QAReviewComp { get; set; }


        [JsonConverter(typeof(OnlyDateConverter))]
        [Column(TypeName = "DateTime2")]
        public DateTime FindingRecdDate { get; set; }

        [JsonConverter(typeof(OnlyDateConverter))]
        [Column(TypeName = "DateTime2")]
        public DateTime RASentToQCDate { get; set; }

        [JsonConverter(typeof(OnlyDateConverter))]
        [Column(TypeName = "DateTime2")]
        public DateTime ReceivedDate { get; set; }

        [JsonConverter(typeof(OnlyDateConverter))]
        [Column(TypeName = "DateTime2")]
        public DateTime FinalDate { get; set; }

        [JsonConverter(typeof(OnlyDateConverter))]
        [Column(TypeName = "DateTime2")]
        public DateTime QCSentToLobDate { get; set; }



        public int AssignedRAId { get; set; }
        public int AssignedQAId { get; set; }
        public int AssignedQCId { get; set; }
        public int FindingId{ get; set; }





        public virtual Employee AssignedRa { get; set; }
        public virtual Employee AssignedQA { get; set; }
        public virtual Employee AssignedQC { get; set; }
        public virtual Employee Review { get; set; }

        public virtual Reference Lob { get; set; }
        public virtual Reference Milestone { get; set; }
        public virtual Reference CaseStatus { get; set; }
        public virtual Reference QAStatus { get; set; }
        public virtual Reference QAResponse { get; set; }
        public virtual Reference Finding { get; set; }
        public virtual Reference Response { get; set; }
        public virtual Reference Status { get; set; }









    }



}

