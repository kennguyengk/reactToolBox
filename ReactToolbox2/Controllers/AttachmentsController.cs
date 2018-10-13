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
    public class AttachmentsController : ApiController
    {
        private ToolboxDBContext db = new ToolboxDBContext();

        // GET: api/Attachment
        public IQueryable<Attachment> GetAttachments()
        {
            return db.Attachment;
        }

        // GET: api/Attachment/5
        [ResponseType(typeof(Attachment))]
        public IHttpActionResult GetAttachment(int id)
        {
            Attachment attachment = db.Attachment.Find(id);
            if (attachment == null)
            {
                return NotFound();
            }

            return Ok(attachment);
        }

        // PUT: api/Attachments/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutAttachment(int id, Attachment attachment)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != attachment.Id)
            {
                return BadRequest();
            }

            db.Entry(attachment).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AttachmentExists(id))
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

        // POST: api/Attachments
        [ResponseType(typeof(Attachment))]
        public IHttpActionResult PostAttachment(Attachment attachment)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Attachment.Add(attachment);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = attachment.Id }, attachment);
        }

        // DELETE: api/Attachments/5
        [ResponseType(typeof(Attachment))]
        public IHttpActionResult DeleteAttachment(int id)
        {
            Attachment attachment = db.Attachment.Find(id);
            if (attachment == null)
            {
                return NotFound();
            }

            db.Attachment.Remove(attachment);
            db.SaveChanges();

            return Ok(attachment);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool AttachmentExists(int id)
        {
            return db.Attachment.Count(e => e.Id == id) > 0;
        }
    }
}