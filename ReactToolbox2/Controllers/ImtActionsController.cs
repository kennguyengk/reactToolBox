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
    public class ImtActionsController : ApiController
    {
        private ToolboxDBContext db = new ToolboxDBContext();

        // GET: api/ImtActions
        public IQueryable<ImtActions> GetImtActions()
        {
            return db.ImtActions;
        }

        // GET: api/ImtActions/5
        [ResponseType(typeof(ImtActions))]
        public IHttpActionResult GetImtActions(int id)
        {
            ImtActions imtActions = db.ImtActions.Find(id);
            if (imtActions == null)
            {
                return NotFound();
            }

            return Ok(imtActions);
        }

        // PUT: api/ImtActions/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutImtActions(int id, ImtActions imtActions)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != imtActions.Id)
            {
                return BadRequest();
            }

            db.Entry(imtActions).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ImtActionsExists(id))
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

        // POST: api/ImtActions
        [ResponseType(typeof(ImtActions))]
        public IHttpActionResult PostImtActions(ImtActions imtActions)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.ImtActions.Add(imtActions);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = imtActions.Id }, imtActions);
        }

        // DELETE: api/ImtActions/5
        [ResponseType(typeof(ImtActions))]
        public IHttpActionResult DeleteImtActions(int id)
        {
            ImtActions imtActions = db.ImtActions.Find(id);
            if (imtActions == null)
            {
                return NotFound();
            }

            db.ImtActions.Remove(imtActions);
            db.SaveChanges();

            return Ok(imtActions);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ImtActionsExists(int id)
        {
            return db.ImtActions.Count(e => e.Id == id) > 0;
        }
    }
}