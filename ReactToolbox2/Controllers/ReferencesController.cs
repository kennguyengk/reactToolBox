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
    public class ReferencesController : ApiController
    {
        private ToolboxDBContext db = new ToolboxDBContext();

        // GET: api/References
        public IQueryable<Reference> GetReference()
        {
            return db.Reference;
        }

        // GET: api/References/5
        [ResponseType(typeof(Reference))]
        public IHttpActionResult GetReference(int id)
        {
            Reference reference = db.Reference.Find(id);
            if (reference == null)
            {
                return NotFound();
            }

            return Ok(reference);
        }

        // PUT: api/References/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutReference(int id, Reference reference)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != reference.ID)
            {
                return BadRequest();
            }

            db.Entry(reference).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ReferenceExists(id))
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

        // POST: api/References
        [ResponseType(typeof(Reference))]
        public IHttpActionResult PostReference(Reference reference)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Reference.Add(reference);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = reference.ID }, reference);
        }

        // DELETE: api/References/5
        [ResponseType(typeof(Reference))]
        public IHttpActionResult DeleteReference(int id)
        {
            Reference reference = db.Reference.Find(id);
            if (reference == null)
            {
                return NotFound();
            }

            db.Reference.Remove(reference);
            db.SaveChanges();

            return Ok(reference);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ReferenceExists(int id)
        {
            return db.Reference.Count(e => e.ID == id) > 0;
        }
    }
}