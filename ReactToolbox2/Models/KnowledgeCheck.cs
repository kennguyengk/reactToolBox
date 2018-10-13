using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace ReactToolbox2.Models
{
    public class KnowledgeCheck
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Summary { get; set; }
        [JsonConverter(typeof(OnlyDateConverter))]
        [Column(TypeName = "DateTime2")]
        public DateTime ActiveDT { get; set; }
        [JsonConverter(typeof(OnlyDateConverter))]
        [Column(TypeName = "DateTime2")]
        public DateTime ExpireDT { get; set; }
        [JsonConverter(typeof(OnlyDateConverter))]
        [Column(TypeName = "DateTime2")]
        public DateTime InsertedDT { get; set; }
        [JsonConverter(typeof(OnlyDateConverter))]
        [Column(TypeName = "DateTime2")]
        public DateTime UpdatedDT { get; set; }

        public virtual ICollection<Question> Questions { get; set; }
    }

    public class Question
    {
        public int ID { get; set; }
        public int KnowledgeCheckID { get; set; }
        public string Difficulty { get; set; }
        public string Category { get; set; }
        public string SubCategory { get; set; }
        public string Desc { get; set; }
        public bool IsActive { get; set; }

        public virtual ICollection<AnswerChoice> AnswerChoices { get; set; }

    }

    public class AnswerChoice
    {
        public int ID { get; set; }
        public int KnowledgeCheckID { get; set; }
        public int QuestionID { get; set; }
        public string Desc { get; set; }
        public string Explanation { get; set; }
        public bool IsCorrect { get; set; }
        public bool IsInactive { get; set; }
    }

    public class Attempt
    {
        public int ID { get; set; }
        public int EmployeeID { get; set; }
        public int KnowledgeCheckID { get; set; }
        [JsonConverter(typeof(OnlyDateConverter))]
        [Column(TypeName = "DateTime2")]
        public DateTime StartDT { get; set; }
        [JsonConverter(typeof(OnlyDateConverter))]
        [Column(TypeName = "DateTime2")]
        public DateTime? SubmitDT { get; set; }

        public virtual Employee Employee { get; set; }
        public virtual KnowledgeCheck KnowledgeCheck { get; set; }
        public virtual ICollection<Response> Responses { get; set; }
    }

    public class Response
    {
        public int ID { get; set; }
        public int AttemptID { get; set; }
        public int AnswerChoiceID { get; set; }

        public virtual AnswerChoice AnswerChoice { get; set; }
    }

    public class Exemption
    {
        public int ID { get; set; }
        public int KnowledgeCheckID { get; set; }
        public int EmployeeID { get; set; }
    }
}