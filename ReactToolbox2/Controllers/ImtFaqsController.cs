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
    public class ImtFaqsController : ApiController
    {
        private ToolboxDBContext db = new ToolboxDBContext();

        // GET: api/ImtFaqs
        public IQueryable<ImtFaq> GetImtFaqs()
        {
            return db.ImtFaqs;
        }

        // GET: api/ImtFaqs/5
        [ResponseType(typeof(ImtFaq))]
        public IHttpActionResult GetImtFaq(int id)
        {
            ImtFaq imtFaq = db.ImtFaqs.Find(id);
            if (imtFaq == null)
            {
                return NotFound();
            }

            return Ok(imtFaq);
        }

        // PUT: api/ImtFaqs/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutImtFaq(int id, ImtFaq imtFaq)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != imtFaq.Id)
            {
                return BadRequest();
            }

            db.Entry(imtFaq).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ImtFaqExists(id))
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

        // POST: api/ImtFaqs
        [ResponseType(typeof(ImtFaq))]
        public IHttpActionResult PostImtFaq(ImtFaq imtFaq)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.ImtFaqs.Add(imtFaq);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = imtFaq.Id }, imtFaq);
        }

        // DELETE: api/ImtFaqs/5
        [ResponseType(typeof(ImtFaq))]
        public IHttpActionResult DeleteImtFaq(int id)
        {
            ImtFaq imtFaq = db.ImtFaqs.Find(id);
            if (imtFaq == null)
            {
                return NotFound();
            }

            db.ImtFaqs.Remove(imtFaq);
            db.SaveChanges();

            return Ok(imtFaq);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ImtFaqExists(int id)
        {
            return db.ImtFaqs.Count(e => e.Id == id) > 0;
        }
    }
}