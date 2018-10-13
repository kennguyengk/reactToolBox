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
    public class QAsController : ApiController
    {
        private ToolboxDBContext db = new ToolboxDBContext();

        // GET: api/QAs
        public IQueryable<QA> GetQAs()
        {
            return db.QA;
        }

        // GET: api/QAs/5
        [ResponseType(typeof(QA))]
        public IHttpActionResult GetQA(int id)
        {
            QA qA = db.QA.Find(id);
            if (qA == null)
            {
                return NotFound();
            }

            return Ok(qA);
        }

        // PUT: api/QAs/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutQA(int id, QA qA)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != qA.Id)
            {
                return BadRequest();
            }

            db.Entry(qA).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!QAExists(id))
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

        // POST: api/QAs
        [ResponseType(typeof(QA))]
        public IHttpActionResult PostQA(QA qA)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.QA.Add(qA);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = qA.Id }, qA);
        }

        // DELETE: api/QAs/5
        [ResponseType(typeof(QA))]
        public IHttpActionResult DeleteQA(int id)
        {
            QA qA = db.QA.Find(id);
            if (qA == null)
            {
                return NotFound();
            }

            db.QA.Remove(qA);
            db.SaveChanges();

            return Ok(qA);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool QAExists(int id)
        {
            return db.QA.Count(e => e.Id == id) > 0;
        }
    }
}