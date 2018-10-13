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
    public class ReferencesForImtController : ApiController
    {
        private ToolboxDBContext db = new ToolboxDBContext();

        // GET: api/References
        public IQueryable<ReferenceForImt> GetReference()
        {
            return db.ReferenceForImt
                .OrderBy(item => item.ReferenceFieldName)
                .ThenBy(item => item.ReferenceLabel); 
        }


        public IQueryable<ReferenceForImt> GetReference(string groupName)
        {
            return db.ReferenceForImt
                .Where(item => item.ReferenceFieldName == groupName)
                .OrderBy(item => item.ReferenceFieldName)
                .ThenBy(item => item.ReferenceLabel);
       
        }

        // GET: api/References/5
        [ResponseType(typeof(ReferenceForImt))]
        public IHttpActionResult GetReference(int id)
        {
            ReferenceForImt reference = db.ReferenceForImt.Find(id);
            if (reference == null)
            {
                return NotFound();
            }

            return Ok(reference);
        }

        // PUT: api/References/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutReference(int id, ReferenceForImt reference)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != reference.Id)
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
        [ResponseType(typeof(ReferenceForImt))]
        public IHttpActionResult PostReference(ReferenceForImt reference)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.ReferenceForImt.Add(reference);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = reference.Id }, reference);
        }

        // DELETE: api/References/5
        [ResponseType(typeof(ReferenceForImt))]
        public IHttpActionResult DeleteReference(int id)
        {
            ReferenceForImt reference = db.ReferenceForImt.Find(id);
            if (reference == null)
            {
                return NotFound();
            }

            db.ReferenceForImt.Remove(reference);
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
            return db.ReferenceForImt.Count(e => e.Id == id) > 0;
        }
    }
}