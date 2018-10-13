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
    public class SourceDocumentsController : ApiController
    {
        private ToolboxDBContext db = new ToolboxDBContext();

        // GET: api/SourceDocuments
        public IQueryable<SourceDocument> GetSourceDocuments()
        {
            return db.SourceDocuments;
        }

        // GET: api/SourceDocuments/5
        [ResponseType(typeof(SourceDocument))]
        public IHttpActionResult GetSourceDocument(int id)
        {
            SourceDocument sourceDocument = db.SourceDocuments.Find(id);
            if (sourceDocument == null)
            {
                return NotFound();
            }

            return Ok(sourceDocument);
        }

        // PUT: api/SourceDocuments/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutSourceDocument(int id, SourceDocument sourceDocument)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != sourceDocument.ID)
            {
                return BadRequest();
            }

            db.Entry(sourceDocument).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SourceDocumentExists(id))
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

        // POST: api/SourceDocuments
        [ResponseType(typeof(SourceDocument))]
        public IHttpActionResult PostSourceDocument(SourceDocument sourceDocument)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.SourceDocuments.Add(sourceDocument);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = sourceDocument.ID }, sourceDocument);
        }

        // DELETE: api/SourceDocuments/5
        [ResponseType(typeof(SourceDocument))]
        public IHttpActionResult DeleteSourceDocument(int id)
        {
            SourceDocument sourceDocument = db.SourceDocuments.Find(id);
            if (sourceDocument == null)
            {
                return NotFound();
            }

            db.SourceDocuments.Remove(sourceDocument);
            db.SaveChanges();

            return Ok(sourceDocument);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool SourceDocumentExists(int id)
        {
            return db.SourceDocuments.Count(e => e.ID == id) > 0;
        }
    }
}