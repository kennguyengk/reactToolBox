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
    public class StatusDescriptionsController : ApiController
    {
        private ToolboxDBContext db = new ToolboxDBContext();

        // GET: api/StatusDescriptions
        public IQueryable<StatusDescription> GetStatusDescriptions()
        {
            return db.StatusDescriptions;
        }

        // GET: api/StatusDescriptions/5
        [ResponseType(typeof(StatusDescription))]
        public IHttpActionResult GetStatusDescription(int id)
        {
            StatusDescription statusDescription = db.StatusDescriptions.Find(id);
            if (statusDescription == null)
            {
                return NotFound();
            }

            return Ok(statusDescription);
        }

        // PUT: api/StatusDescriptions/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutStatusDescription(int id, StatusDescription statusDescription)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != statusDescription.ID)
            {
                return BadRequest();
            }

            db.Entry(statusDescription).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StatusDescriptionExists(id))
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

        // POST: api/StatusDescriptions
        [ResponseType(typeof(StatusDescription))]
        public IHttpActionResult PostStatusDescription(StatusDescription statusDescription)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.StatusDescriptions.Add(statusDescription);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = statusDescription.ID }, statusDescription);
        }

        // DELETE: api/StatusDescriptions/5
        [ResponseType(typeof(StatusDescription))]
        public IHttpActionResult DeleteStatusDescription(int id)
        {
            StatusDescription statusDescription = db.StatusDescriptions.Find(id);
            if (statusDescription == null)
            {
                return NotFound();
            }

            db.StatusDescriptions.Remove(statusDescription);
            db.SaveChanges();

            return Ok(statusDescription);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool StatusDescriptionExists(int id)
        {
            return db.StatusDescriptions.Count(e => e.ID == id) > 0;
        }
    }
}