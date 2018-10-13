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
    public class FieldsController : ApiController
    {
        private ToolboxDBContext db = new ToolboxDBContext();

        // GET: api/Fields
        public IQueryable<Fields> GetFields()
        {
            return db.Fields;
        }

        // GET: api/Fields/5
        [ResponseType(typeof(Fields))]
        public IHttpActionResult GetFields(int id)
        {
            Fields fields = db.Fields.Find(id);
            if (fields == null)
            {
                return NotFound();
            }

            return Ok(fields);
        }

        // PUT: api/Fields/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutFields(int id, Fields fields)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != fields.ID)
            {
                return BadRequest();
            }

            db.Entry(fields).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FieldsExists(id))
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

        // POST: api/Fields
        [ResponseType(typeof(Fields))]
        public IHttpActionResult PostFields(Fields fields)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Fields.Add(fields);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = fields.ID }, fields);
        }

        // DELETE: api/Fields/5
        [ResponseType(typeof(Fields))]
        public IHttpActionResult DeleteFields(int id)
        {
            Fields fields = db.Fields.Find(id);
            if (fields == null)
            {
                return NotFound();
            }

            db.Fields.Remove(fields);
            db.SaveChanges();

            return Ok(fields);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool FieldsExists(int id)
        {
            return db.Fields.Count(e => e.ID == id) > 0;
        }
    }
}