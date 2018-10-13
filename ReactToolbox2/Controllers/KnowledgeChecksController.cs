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
    public class KnowledgeChecksController : ApiController
    {
        private ToolboxDBContext db = new ToolboxDBContext();

        // GET: api/KnowledgeChecks
        public IQueryable<KnowledgeCheck> GetKnowledgeCheck()
        {
            return db.KnowledgeCheck;
        }

        // GET: api/KnowledgeChecks/5
        [ResponseType(typeof(KnowledgeCheck))]
        public IHttpActionResult GetKnowledgeCheck(int id)
        {
            KnowledgeCheck knowledgeCheck = db.KnowledgeCheck.Find(id);
            if (knowledgeCheck == null)
            {
                return NotFound();
            }

            return Ok(knowledgeCheck);
        }

        // PUT: api/KnowledgeChecks/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutKnowledgeCheck(int id, KnowledgeCheck knowledgeCheck)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != knowledgeCheck.ID)
            {
                return BadRequest();
            }

            db.Entry(knowledgeCheck).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!KnowledgeCheckExists(id))
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

        // POST: api/KnowledgeChecks
        [ResponseType(typeof(KnowledgeCheck))]
        public IHttpActionResult PostKnowledgeCheck(KnowledgeCheck knowledgeCheck)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.KnowledgeCheck.Add(knowledgeCheck);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = knowledgeCheck.ID }, knowledgeCheck);
        }

        // DELETE: api/KnowledgeChecks/5
        [ResponseType(typeof(KnowledgeCheck))]
        public IHttpActionResult DeleteKnowledgeCheck(int id)
        {
            KnowledgeCheck knowledgeCheck = db.KnowledgeCheck.Find(id);
            if (knowledgeCheck == null)
            {
                return NotFound();
            }

            db.KnowledgeCheck.Remove(knowledgeCheck);
            db.SaveChanges();

            return Ok(knowledgeCheck);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool KnowledgeCheckExists(int id)
        {
            return db.KnowledgeCheck.Count(e => e.ID == id) > 0;
        }
    }
}