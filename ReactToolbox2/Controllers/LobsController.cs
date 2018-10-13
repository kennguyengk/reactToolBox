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
    public class LOBsController : ApiController
    {
        private ToolboxDBContext db = new ToolboxDBContext();

        // GET: api/LOBs
        public IQueryable<LOB> GetLOB()
        {
            return db.LOB;
        }

        // GET: api/LOBs/5
        [ResponseType(typeof(LOB))]
        public IHttpActionResult GetLOB(int id)
        {
            LOB lOB = db.LOB.Find(id);
            if (lOB == null)
            {
                return NotFound();
            }

            return Ok(lOB);
        }

        // PUT: api/LOBs/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutLOB(int id, LOB lOB)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != lOB.ID)
            {
                return BadRequest();
            }

            db.Entry(lOB).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LOBExists(id))
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

        // POST: api/LOBs
        [ResponseType(typeof(LOB))]
        public IHttpActionResult PostLOB(LOB lOB)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.LOB.Add(lOB);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = lOB.ID }, lOB);
        }

        // DELETE: api/LOBs/5
        [ResponseType(typeof(LOB))]
        public IHttpActionResult DeleteLOB(int id)
        {
            LOB lOB = db.LOB.Find(id);
            if (lOB == null)
            {
                return NotFound();
            }

            db.LOB.Remove(lOB);
            db.SaveChanges();

            return Ok(lOB);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool LOBExists(int id)
        {
            return db.LOB.Count(e => e.ID == id) > 0;
        }
    }
}