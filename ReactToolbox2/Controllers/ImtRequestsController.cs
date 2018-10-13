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
    public class ImtRequestsController : ApiController
    {
        private ToolboxDBContext db = new ToolboxDBContext();

        // GET: api/ImtRequests
        public IQueryable<ImtRequest> GetImtRequest()
        {
            return db.ImtRequest;
        }

        // GET: api/ImtRequests/5
        [ResponseType(typeof(ImtRequest))]
        public IHttpActionResult GetImtRequest(int id)
        {
            ImtRequest imtRequest = db.ImtRequest.Find(id);
            if (imtRequest == null)
            {
                return NotFound();
            }

            return Ok(imtRequest);
        }

        // PUT: api/ImtRequests/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutImtRequest(int id, ImtRequest imtRequest )
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != imtRequest.Id)
            {
                return BadRequest();
            }

           
           
            db.Entry(imtRequest).State = EntityState.Modified;

            try
            {
                if (imtRequest.StatusId == 5) //&& !imtRequest.ClosedByDate.HasValue)
                {
                    imtRequest.ClosedByDate = DateTime.Now;
                    imtRequest.StatusId = 1;
                }
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ImtRequestExists(id))
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

        // POST: api/ImtRequests
        [ResponseType(typeof(ImtRequest))]
        public IHttpActionResult PostImtRequest(ImtRequest imtRequest)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.ImtRequest.Add(imtRequest);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = imtRequest.Id }, imtRequest);
        }

        // DELETE: api/ImtRequests/5
        [ResponseType(typeof(ImtRequest))]
        public IHttpActionResult DeleteImtRequest(int id)
        {
            ImtRequest imtRequest = db.ImtRequest.Find(id);
            if (imtRequest == null)
            {
                return NotFound();
            }

            db.ImtRequest.Remove(imtRequest);
            db.SaveChanges();

            return Ok(imtRequest);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ImtRequestExists(int id)
        {
            return db.ImtRequest.Count(e => e.Id == id) > 0;
        }
    }
}