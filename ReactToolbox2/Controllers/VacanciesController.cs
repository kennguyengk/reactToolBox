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
    public class VacanciesController : ApiController
    {
        private ToolboxDBContext db = new ToolboxDBContext();

        // GET: api/Vacancies
        public IQueryable<Vacancy> GetVacancy()
        {
            return db.Vacancy;
        }

        // GET: api/Vacancies/5
        [ResponseType(typeof(Vacancy))]
        public IHttpActionResult GetVacancy(int id)
        {
            Vacancy vacancy = db.Vacancy.Find(id);
            if (vacancy == null)
            {
                 return NotFound();
            }

            return Ok(vacancy);
        }

        // PUT: api/Vacancies/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutVacancy(int id, Vacancy vacancy)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != vacancy.ID)
            {
                return BadRequest();
            }

            db.Entry(vacancy).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VacancyExists(id))
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

        // POST: api/Vacancies
        [ResponseType(typeof(Vacancy))]
        public IHttpActionResult PostVacancy(Vacancy vacancy)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Vacancy.Add(vacancy);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = vacancy.ID }, vacancy);
        }

        // DELETE: api/Vacancies/5
        [ResponseType(typeof(Vacancy))]
        public IHttpActionResult DeleteVacancy(int id)
        {
            Vacancy vacancy = db.Vacancy.Find(id);
            if (vacancy == null)
            {
                return NotFound();
            }

            db.Vacancy.Remove(vacancy);
            db.SaveChanges();

            return Ok(vacancy);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool VacancyExists(int id)
        {
            return db.Vacancy.Count(e => e.ID == id) > 0;
        }
    }
}