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
    public class SourceDocIndexesController : ApiController
    {
        private ToolboxDBContext db = new ToolboxDBContext();

        // GET: api/SourceDocIndexes
        public IQueryable<SourceDocIndex> GetSourceDocIndex()
        {
            return db.SourceDocIndex;
        }

        // GET: api/SourceDocIndexes/5
        [ResponseType(typeof(SourceDocIndex))]
        public IHttpActionResult GetSourceDocIndex(int id)
        {
            SourceDocIndex sourceDocIndex = db.SourceDocIndex.Find(id);
            if (sourceDocIndex == null)
            {
                return NotFound();
            }

            return Ok(sourceDocIndex);
        }

        // PUT: api/SourceDocIndexes/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutSourceDocIndex(int id, SourceDocIndex sourceDocIndex)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != sourceDocIndex.ID)
            {
                return BadRequest();
            }

            db.Entry(sourceDocIndex).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SourceDocIndexExists(id))
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

        // POST: api/SourceDocIndexes
        [ResponseType(typeof(SourceDocIndex))]
        public IHttpActionResult PostSourceDocIndex(SourceDocIndex sourceDocIndex)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.SourceDocIndex.Add(sourceDocIndex);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = sourceDocIndex.ID }, sourceDocIndex);
        }

        // DELETE: api/SourceDocIndexes/5
        [ResponseType(typeof(SourceDocIndex))]
        public IHttpActionResult DeleteSourceDocIndex(int id)
        {
            SourceDocIndex sourceDocIndex = db.SourceDocIndex.Find(id);
            if (sourceDocIndex == null)
            {
                return NotFound();
            }

            db.SourceDocIndex.Remove(sourceDocIndex);
            db.SaveChanges();

            return Ok(sourceDocIndex);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool SourceDocIndexExists(int id)
        {
            return db.SourceDocIndex.Count(e => e.ID == id) > 0;
        }
    }
}