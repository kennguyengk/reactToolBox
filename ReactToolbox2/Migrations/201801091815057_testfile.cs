namespace ReactToolbox2.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class testfile : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.TestImport",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        CaseImportId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.TestImport");
        }
    }
}
