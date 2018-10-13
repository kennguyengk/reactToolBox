namespace ReactToolbox2.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Attachmentupdate : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Attachment", "FileName", c => c.Int(nullable: false));
            AddColumn("dbo.Attachment", "Type", c => c.String());
            AddColumn("dbo.Attachment", "Size", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Attachment", "Size");
            DropColumn("dbo.Attachment", "Type");
            DropColumn("dbo.Attachment", "FileName");
        }
    }
}
