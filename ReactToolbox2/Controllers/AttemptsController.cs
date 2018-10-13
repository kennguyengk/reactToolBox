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
    public class AttemptsController : ApiController
    {
        private ToolboxDBContext db = new ToolboxDBContext();

        // GET: api/Attempts
        public IQueryable<Attempt> GetAttempt()
        {
            return db.Attempt;
        }

        // GET: api/Attempts/5
        [ResponseType(typeof(Attempt))]
        public IHttpActionResult GetAttempt(int id)
        {
            Attempt attempt = db.Attempt.Find(id);
            if (attempt == null)
            {
                return NotFound();
            }

            return Ok(attempt);
        }

        // PUT: api/Attempts/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutAttempt(int id, Attempt attempt)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != attempt.ID)
            {
                return BadRequest();
            }

            db.Entry(attempt).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AttemptExists(id))
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

        // POST: api/Attempts
        [ResponseType(typeof(Attempt))]
        public IHttpActionResult PostAttempt(Attempt attempt)
        {
            attempt.StartDT = DateTime.Now;
            attempt.EmployeeID = 1; // TODO: Check for employee's ID

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Attempt.Add(attempt);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = attempt.ID }, attempt);
        }

        // DELETE: api/Attempts/5
        [ResponseType(typeof(Attempt))]
        public IHttpActionResult DeleteAttempt(int id)
        {
            Attempt attempt = db.Attempt.Find(id);
            if (attempt == null)
            {
                return NotFound();
            }

            db.Attempt.Remove(attempt);
            db.SaveChanges();

            return Ok(attempt);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool AttemptExists(int id)
        {
            return db.Attempt.Count(e => e.ID == id) > 0;
        }
    }
}