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
    public class FlagDescriptionsController : ApiController
    {
        private ToolboxDBContext db = new ToolboxDBContext();

        // GET: api/FlagDescriptions
        public IQueryable<FlagDescription> GetFlagDescriptions()
        {
            return db.FlagDescriptions;
        }

        // GET: api/FlagDescriptions/5
        [ResponseType(typeof(FlagDescription))]
        public IHttpActionResult GetFlagDescription(int id)
        {
            FlagDescription flagDescription = db.FlagDescriptions.Find(id);
            if (flagDescription == null)
            {
                return NotFound();
            }

            return Ok(flagDescription);
        }

        // PUT: api/FlagDescriptions/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutFlagDescription(int id, FlagDescription flagDescription)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != flagDescription.ID)
            {
                return BadRequest();
            }

            db.Entry(flagDescription).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FlagDescriptionExists(id))
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

        // POST: api/FlagDescriptions
        [ResponseType(typeof(FlagDescription))]
        public IHttpActionResult PostFlagDescription(FlagDescription flagDescription)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.FlagDescriptions.Add(flagDescription);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = flagDescription.ID }, flagDescription);
        }

        // DELETE: api/FlagDescriptions/5
        [ResponseType(typeof(FlagDescription))]
        public IHttpActionResult DeleteFlagDescription(int id)
        {
            FlagDescription flagDescription = db.FlagDescriptions.Find(id);
            if (flagDescription == null)
            {
                return NotFound();
            }

            db.FlagDescriptions.Remove(flagDescription);
            db.SaveChanges();

            return Ok(flagDescription);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool FlagDescriptionExists(int id)
        {
            return db.FlagDescriptions.Count(e => e.ID == id) > 0;
        }
    }
}