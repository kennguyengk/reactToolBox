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
    public class AssignmentsController : ApiController
    {
        private ToolboxDBContext db = new ToolboxDBContext();

        // GET: api/Assignments
        public IQueryable<Assignments> GetAssignments()
        {
            return db.Assignments;
        }

        // GET: api/Assignments/5
        [ResponseType(typeof(Assignments))]
        public IHttpActionResult GetAssignments(int id)
        {
            Assignments assignments = db.Assignments.Find(id);
            if (assignments == null)
            {
                return NotFound();
            }

            return Ok(assignments);
        }

        // PUT: api/Assignments/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutAssignments(int id, Assignments assignments)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != assignments.ID)
            {
                return BadRequest();
            }

            db.Entry(assignments).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AssignmentsExists(id))
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

        // POST: api/Assignments
        [ResponseType(typeof(Assignments))]
        public IHttpActionResult PostAssignments(Assignments assignments)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Assignments.Add(assignments);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = assignments.ID }, assignments);
        }

        // DELETE: api/Assignments/5
        [ResponseType(typeof(Assignments))]
        public IHttpActionResult DeleteAssignments(int id)
        {
            Assignments assignments = db.Assignments.Find(id);
            if (assignments == null)
            {
                return NotFound();
            }

            db.Assignments.Remove(assignments);
            db.SaveChanges();

            return Ok(assignments);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool AssignmentsExists(int id)
        {
            return db.Assignments.Count(e => e.ID == id) > 0;
        }
    }
}