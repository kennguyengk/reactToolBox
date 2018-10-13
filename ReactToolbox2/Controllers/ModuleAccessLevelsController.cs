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
    public class ModuleAccessLevelsController : ApiController
    {
        private ToolboxDBContext db = new ToolboxDBContext();

        // GET: api/ModuleAccessLevels
        public IQueryable<ModuleAccessLevel> GetModuleAccessLevel()
        {
            return db.ModuleAccessLevel;
        }

        // GET: api/ModuleAccessLevels/5
        [ResponseType(typeof(ModuleAccessLevel))]
        public IHttpActionResult GetModuleAccessLevel(int id)
        {
            ModuleAccessLevel moduleAccessLevel = db.ModuleAccessLevel.Find(id);
            if (moduleAccessLevel == null)
            {
                return NotFound();
            }

            return Ok(moduleAccessLevel);
        }

        // PUT: api/ModuleAccessLevels/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutModuleAccessLevel(int id, ModuleAccessLevel moduleAccessLevel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != moduleAccessLevel.ID)
            {
                return BadRequest();
            }

            db.Entry(moduleAccessLevel).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ModuleAccessLevelExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/ModuleAccessLevels
        [ResponseType(typeof(ModuleAccessLevel))]
        public IHttpActionResult PostModuleAccessLevel(ModuleAccessLevel moduleAccessLevel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.ModuleAccessLevel.Add(moduleAccessLevel);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = moduleAccessLevel.ID }, moduleAccessLevel);
        }

        // DELETE: api/ModuleAccessLevels/5
        [ResponseType(typeof(ModuleAccessLevel))]
        public IHttpActionResult DeleteModuleAccessLevel(int id)
        {
            ModuleAccessLevel moduleAccessLevel = db.ModuleAccessLevel.Find(id);
            if (moduleAccessLevel == null)
            {
                return NotFound();
            }

            db.ModuleAccessLevel.Remove(moduleAccessLevel);
            db.SaveChanges();

            return Ok(moduleAccessLevel);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ModuleAccessLevelExists(int id)
        {
            return db.ModuleAccessLevel.Count(e => e.ID == id) > 0;
        }
    }
}