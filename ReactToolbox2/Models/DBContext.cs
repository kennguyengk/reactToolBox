using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;

namespace ReactToolbox2.Models
{
    public class ToolboxDBContext : DbContext
    {
        public ToolboxDBContext() : base("ToolboxDBContext") { }
        
        public DbSet<Notification> Notifications { get; set; }
        public DbSet<Employee> Employee { get; set; }
        public DbSet<EmployeeStatus> EmployeeStatus { get; set; }
        public DbSet<EmployeeTitle> EmployeeTitle { get; set; }
        public DbSet<Module> Module { get; set; }
        public DbSet<ModuleAccessLevel> ModuleAccessLevel { get; set; }
        public DbSet<EmployeeModuleAccessLevel> EmployeeModuleAccessLevel { get; set; }
        public DbSet<VacancyRole> VacancyRole { get; set; }
        public DbSet<VacancyStatus> VacancyStatus { get; set; }
        public DbSet<VacancyLocation> VacancyLocation { get; set; }
        public DbSet<Vacancy> Vacancy { get; set; }
        public DbSet<LOB> LOB { get; set; }
        public DbSet<Attachment> Attachment { get; set; }
        public DbSet<TestImport> TestImport { get; set; }






        //Knowledge Check Specific Tables
        public DbSet<KnowledgeCheck> KnowledgeCheck { get; set; }
        public DbSet<Question> Question { get; set; }

        public DbSet<AnswerChoice> AnswerChoice { get; set; }
        public DbSet<Attempt> Attempt { get; set; }
        public DbSet<Response> Response { get; set; }
        public DbSet<Exemption> Exemption { get; set; }
        public DbSet<ImtActionComment> ImtActionComment { get; set; }
        public DbSet<ImtActions> ImtActions { get; set; }
        public DbSet<ImtReference> ImtReference { get; set; }
        public DbSet<ImtRelease> ImtRelease { get; set; }
        public DbSet<ImtReleaseNote> ImtReleaseNote { get; set; }
        public DbSet<ImtRequest> ImtRequest { get; set; }
        public DbSet<ImtRequestComment> ImtRequestComment { get; set; }
        public DbSet<ImtSection> ImtSection { get; set; }   
        public DbSet<ReferenceForImt> ReferenceForImt { get; set; }
        public DbSet<QA> QA { get; set; }



        //Case Tracker Specific Tables

        public DbSet<Assignments> Assignments { get; set; }
        public DbSet<Case> Case { get; set; }
        //public DbSet<CategoryDescription> CategoryDescription { get; set; }
        //public DbSet<ClassificationDescription> ClassificationDescription { get; set; }
        public DbSet<Fields> Fields { get; set; }
        public DbSet<Flags> Flags { get; set; }
        //public DbSet<LobDescription> LobDescription { get; set; }
        public DbSet<Reference> Reference { get; set; }
        //public DbSet<RequirementDescription> RequirementDescription { get; set; }
        public DbSet<SourceDocIndex> SourceDocIndex { get; set; }






        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
            modelBuilder.Conventions.Remove<OneToManyCascadeDeleteConvention>();
        }

        public System.Data.Entity.DbSet<ReactToolbox2.Models.CategoryDescription> CategoryDescriptions { get; set; }

        public System.Data.Entity.DbSet<ReactToolbox2.Models.ClassificationFieldMatrix> ClassificationFieldMatrices { get; set; }

        public System.Data.Entity.DbSet<ReactToolbox2.Models.FieldDescription> FieldDescriptions { get; set; }

        public System.Data.Entity.DbSet<ReactToolbox2.Models.RequirementDescription> RequirementDescriptions { get; set; }

        public System.Data.Entity.DbSet<ReactToolbox2.Models.SourceDocument> SourceDocuments { get; set; }

        public System.Data.Entity.DbSet<ReactToolbox2.Models.FlagDescription> FlagDescriptions { get; set; }

        public System.Data.Entity.DbSet<ReactToolbox2.Models.Role> Roles { get; set; }

        public System.Data.Entity.DbSet<ReactToolbox2.Models.ClassificationDescription> ClassificationDescriptions { get; set; }

        public System.Data.Entity.DbSet<ReactToolbox2.Models.LobDescription> LobDescriptions { get; set; }

        public System.Data.Entity.DbSet<ReactToolbox2.Models.Status> Status { get; set; }

        public System.Data.Entity.DbSet<ReactToolbox2.Models.StatusDescription> StatusDescriptions { get; set; }

        public System.Data.Entity.DbSet<ReactToolbox2.Models.ImtFaq> ImtFaqs { get; set; }
    }
}