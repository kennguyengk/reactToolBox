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
    public class RequirementDescriptionsController : ApiController
    {
        private ToolboxDBContext db = new ToolboxDBContext();

        // GET: api/RequirementDescriptions
        public IQueryable<RequirementDescription> GetRequirementDescriptions()
        {
            return db.RequirementDescriptions;
        }

        // GET: api/RequirementDescriptions/5
        [ResponseType(typeof(RequirementDescription))]
        public IHttpActionResult GetRequirementDescription(int id)
        {
            RequirementDescription requirementDescription = db.RequirementDescriptions.Find(id);
            if (requirementDescription == null)
            {
                return NotFound();
            }

            return Ok(requirementDescription);
        }

        // PUT: api/RequirementDescriptions/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutRequirementDescription(int id, RequirementDescription requirementDescription)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != requirementDescription.ID)
            {
                return BadRequest();
            }

            db.Entry(requirementDescription).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RequirementDescriptionExists(id))
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

        // POST: api/RequirementDescriptions
        [ResponseType(typeof(RequirementDescription))]
        public IHttpActionResult PostRequirementDescription(RequirementDescription requirementDescription)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.RequirementDescriptions.Add(requirementDescription);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = requirementDescription.ID }, requirementDescription);
        }

        // DELETE: api/RequirementDescriptions/5
        [ResponseType(typeof(RequirementDescription))]
        public IHttpActionResult DeleteRequirementDescription(int id)
        {
            RequirementDescription requirementDescription = db.RequirementDescriptions.Find(id);
            if (requirementDescription == null)
            {
                return NotFound();
            }

            db.RequirementDescriptions.Remove(requirementDescription);
            db.SaveChanges();

            return Ok(requirementDescription);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool RequirementDescriptionExists(int id)
        {
            return db.RequirementDescriptions.Count(e => e.ID == id) > 0;
        }
    }
}