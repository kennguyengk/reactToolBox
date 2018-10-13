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
    public class FieldDescriptionsController : ApiController
    {
        private ToolboxDBContext db = new ToolboxDBContext();

        // GET: api/FieldDescriptions
        public IQueryable<FieldDescription> GetFieldDescriptions()
        {
            return db.FieldDescriptions;
        }

        // GET: api/FieldDescriptions/5
        [ResponseType(typeof(FieldDescription))]
        public IHttpActionResult GetFieldDescription(int id)
        {
            FieldDescription fieldDescription = db.FieldDescriptions.Find(id);
            if (fieldDescription == null)
            {
                return NotFound();
            }

            return Ok(fieldDescription);
        }

        // PUT: api/FieldDescriptions/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutFieldDescription(int id, FieldDescription fieldDescription)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != fieldDescription.ID)
            {
                return BadRequest();
            }

            db.Entry(fieldDescription).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FieldDescriptionExists(id))
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

        // POST: api/FieldDescriptions
        [ResponseType(typeof(FieldDescription))]
        public IHttpActionResult PostFieldDescription(FieldDescription fieldDescription)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.FieldDescriptions.Add(fieldDescription);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = fieldDescription.ID }, fieldDescription);
        }

        // DELETE: api/FieldDescriptions/5
        [ResponseType(typeof(FieldDescription))]
        public IHttpActionResult DeleteFieldDescription(int id)
        {
            FieldDescription fieldDescription = db.FieldDescriptions.Find(id);
            if (fieldDescription == null)
            {
                return NotFound();
            }

            db.FieldDescriptions.Remove(fieldDescription);
            db.SaveChanges();

            return Ok(fieldDescription);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool FieldDescriptionExists(int id)
        {
            return db.FieldDescriptions.Count(e => e.ID == id) > 0;
        }
    }
}