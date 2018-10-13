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
    public class LobDescriptionsController : ApiController
    {
        private ToolboxDBContext db = new ToolboxDBContext();

        // GET: api/LobDescriptions
        public IQueryable<LobDescription> GetLobDescriptions()
        {
            return db.LobDescriptions;
        }

        // GET: api/LobDescriptions/5
        [ResponseType(typeof(LobDescription))]
        public IHttpActionResult GetLobDescription(int id)
        {
            LobDescription lobDescription = db.LobDescriptions.Find(id);
            if (lobDescription == null)
            {
                return NotFound();
            }

            return Ok(lobDescription);
        }

        // PUT: api/LobDescriptions/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutLobDescription(int id, LobDescription lobDescription)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != lobDescription.ID)
            {
                return BadRequest();
            }

            db.Entry(lobDescription).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LobDescriptionExists(id))
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

        // POST: api/LobDescriptions
        [ResponseType(typeof(LobDescription))]
        public IHttpActionResult PostLobDescription(LobDescription lobDescription)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.LobDescriptions.Add(lobDescription);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = lobDescription.ID }, lobDescription);
        }

        // DELETE: api/LobDescriptions/5
        [ResponseType(typeof(LobDescription))]
        public IHttpActionResult DeleteLobDescription(int id)
        {
            LobDescription lobDescription = db.LobDescriptions.Find(id);
            if (lobDescription == null)
            {
                return NotFound();
            }

            db.LobDescriptions.Remove(lobDescription);
            db.SaveChanges();

            return Ok(lobDescription);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool LobDescriptionExists(int id)
        {
            return db.LobDescriptions.Count(e => e.ID == id) > 0;
        }
    }
}