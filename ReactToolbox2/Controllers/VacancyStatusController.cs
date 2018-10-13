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
    public class VacancyStatusController : ApiController
    {
        private ToolboxDBContext db = new ToolboxDBContext();

        // GET: api/VacancyStatus
        public IQueryable<VacancyStatus> GetVacancyStatus()
        {
            return db.VacancyStatus;
        }

        // GET: api/VacancyStatus/5
        [ResponseType(typeof(VacancyStatus))]
        public IHttpActionResult GetVacancyStatus(int id)
        {
            VacancyStatus vacancyStatus = db.VacancyStatus.Find(id);
            if (vacancyStatus == null)
            {
                return NotFound();
            }

            return Ok(vacancyStatus);
        }

        // PUT: api/VacancyStatus/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutVacancyStatus(int id, VacancyStatus vacancyStatus)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != vacancyStatus.ID)
            {
                return BadRequest();
            }

            db.Entry(vacancyStatus).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VacancyStatusExists(id))
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

        // POST: api/VacancyStatus
        [ResponseType(typeof(VacancyStatus))]
        public IHttpActionResult PostVacancyStatus(VacancyStatus vacancyStatus)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.VacancyStatus.Add(vacancyStatus);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = vacancyStatus.ID }, vacancyStatus);
        }

        // DELETE: api/VacancyStatus/5
        [ResponseType(typeof(VacancyStatus))]
        public IHttpActionResult DeleteVacancyStatus(int id)
        {
            VacancyStatus vacancyStatus = db.VacancyStatus.Find(id);
            if (vacancyStatus == null)
            {
                return NotFound();
            }

            db.VacancyStatus.Remove(vacancyStatus);
            db.SaveChanges();

            return Ok(vacancyStatus);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool VacancyStatusExists(int id)
        {
            return db.VacancyStatus.Count(e => e.ID == id) > 0;
        }
    }
}