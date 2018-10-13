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
    public class CasesController : ApiController
    {
        private ToolboxDBContext db = new ToolboxDBContext();

        // GET: api/Cases
        public IEnumerable<CaseOverview> GetCase()
        {
            return db.Case.ToList().Select(item => new CaseOverview
            {
                ID = item.ID,
                Internal = item.InternalID,
                Name = item.CustomerName,
                InsertedByName = item.InsertedBy.FullName,
                UpdatedByName = item.UpdatedBy.FullName,
                LastUpdated = item.UpdatedDT,
                Age = (DateTime.Now-item.UpdatedDT).Days,
                StatusName="New",
                PriorityName="High",
                BusinessPartner="Smith, Bob"

            }

                );
        }

        // GET: api/Cases/5
        [ResponseType(typeof(Case))]
        public IHttpActionResult GetCase(int id)
        {
            Case @case = db.Case.Find(id);
            if (@case == null)
            {
                return NotFound();
            }

            return Ok(@case);
        }

        // PUT: api/Cases/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutCase(int id, Case @case)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != @case.ID)
            {
                return BadRequest();
            }

            db.Entry(@case).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CaseExists(id))
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

        // POST: api/Cases
        [ResponseType(typeof(Case))]
        public IHttpActionResult PostCase(Case @case)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Case.Add(@case);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = @case.ID }, @case);
        }

        // DELETE: api/Cases/5
        [ResponseType(typeof(Case))]
        public IHttpActionResult DeleteCase(int id)
        {
            Case @case = db.Case.Find(id);
            if (@case == null)
            {
                return NotFound();
            }

            db.Case.Remove(@case);
            db.SaveChanges();

            return Ok(@case);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CaseExists(int id)
        {
            return db.Case.Count(e => e.ID == id) > 0;
        }
    }
}