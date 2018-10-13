using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using ReactToolbox2.Models;


namespace ReactToolbox2.Controllers
{
    public class ModuleController : ApiController
    {
        private ToolboxDBContext db = new ToolboxDBContext();

        // GET: api/Module
        public IQueryable<Module> GetModule()
        {
            return db.Module;
        }
    }
}