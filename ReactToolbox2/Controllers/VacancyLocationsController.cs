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
    public class VacancyLocationsController : ApiController
    {
        private ToolboxDBContext db = new ToolboxDBContext();

        // GET: api/VacancyLocations
        public IQueryable<VacancyLocation> GetVacancyLocation()
        {
            return db.VacancyLocation;
        }

        // GET: api/VacancyLocations/5
        [ResponseType(typeof(VacancyLocation))]
        public IHttpActionResult GetVacancyLocation(int id)
        {
            VacancyLocation vacancyLocation = db.VacancyLocation.Find(id);
            if (vacancyLocation == null)
            {
                return NotFound();
            }

            return Ok(vacancyLocation);
        }

        // PUT: api/VacancyLocations/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutVacancyLocation(int id, VacancyLocation vacancyLocation)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != vacancyLocation.ID)
            {
                return BadRequest();
            }

            db.Entry(vacancyLocation).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VacancyLocationExists(id))
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

        // POST: api/VacancyLocations
        [ResponseType(typeof(VacancyLocation))]
        public IHttpActionResult PostVacancyLocation(VacancyLocation vacancyLocation)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.VacancyLocation.Add(vacancyLocation);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = vacancyLocation.ID }, vacancyLocation);
        }

        // DELETE: api/VacancyLocations/5
        [ResponseType(typeof(VacancyLocation))]
        public IHttpActionResult DeleteVacancyLocation(int id)
        {
            VacancyLocation vacancyLocation = db.VacancyLocation.Find(id);
            if (vacancyLocation == null)
            {
                return NotFound();
            }

            db.VacancyLocation.Remove(vacancyLocation);
            db.SaveChanges();

            return Ok(vacancyLocation);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool VacancyLocationExists(int id)
        {
            return db.VacancyLocation.Count(e => e.ID == id) > 0;
        }
    }
}