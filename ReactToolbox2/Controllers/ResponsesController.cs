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
    public class ResponsesController : ApiController
    {
        private ToolboxDBContext db = new ToolboxDBContext();

        // GET: api/Responses
        public IQueryable<Response> GetResponse()
        {
            return db.Response;
        }

        // GET: api/Responses/5
        [ResponseType(typeof(Response))]
        public IHttpActionResult GetResponse(int id)
        {
            Response response = db.Response.Find(id);
            if (response == null)
            {
                return NotFound();
            }

            return Ok(response);
        }

        // PUT: api/Responses/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutResponse(int id, Response response)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != response.ID)
            {
                return BadRequest();
            }

            db.Entry(response).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ResponseExists(id))
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

        // POST: api/Responses
        [ResponseType(typeof(Response))]
        public IHttpActionResult PostResponse(Response response)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Response.Add(response);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = response.ID }, response);
        }

        // DELETE: api/Responses/5
        [ResponseType(typeof(Response))]
        public IHttpActionResult DeleteResponse(int id)
        {
            Response response = db.Response.Find(id);
            if (response == null)
            {
                return NotFound();
            }

            db.Response.Remove(response);
            db.SaveChanges();

            return Ok(response);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ResponseExists(int id)
        {
            return db.Response.Count(e => e.ID == id) > 0;
        }
    }
}