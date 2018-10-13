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
    public class VacancyRolesController : ApiController
    {
        private ToolboxDBContext db = new ToolboxDBContext();

        // GET: api/VacancyRoles
        public IQueryable<VacancyRole> GetVacancyRole()
        {
            return db.VacancyRole;
        }

        //GET Reference Count 
        [Route("api/Vacancies/LabelCount")]
        [HttpGet]
        [ResponseType(typeof(ReferenceLabelDTO))]
        public IHttpActionResult ActionMethordNam()
        {
            List<ReferenceLabelDTO> systems;
            systems = db.Vacancy
                        .GroupBy(c => c.VacancyRole.RoleDesc)
                        .Select(c => new ReferenceLabelDTO
                        {
                            ReferenceLabel = c.Key,
                            Count = c.Count()
                        })
                        .ToList();

            //db.Reference.Select(c => c.ReferenceFieldName == sid).ToList();

            return Ok(systems);
        }

        // GET: api/VacancyRoles/5
        [ResponseType(typeof(VacancyRole))]
        public IHttpActionResult GetVacancyRole(int id)
        {
            VacancyRole vacancyRole = db.VacancyRole.Find(id);
            if (vacancyRole == null)
            {
                return NotFound();
            }

            return Ok(vacancyRole);
        }

        // PUT: api/VacancyRoles/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutVacancyRole(int id, VacancyRole vacancyRole)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != vacancyRole.ID)
            {
                return BadRequest();
            }

            db.Entry(vacancyRole).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VacancyRoleExists(id))
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

        // POST: api/VacancyRoles
        [ResponseType(typeof(VacancyRole))]
        public IHttpActionResult PostVacancyRole(VacancyRole vacancyRole)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.VacancyRole.Add(vacancyRole);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = vacancyRole.ID }, vacancyRole);
        }

        // DELETE: api/VacancyRoles/5
        [ResponseType(typeof(VacancyRole))]
        public IHttpActionResult DeleteVacancyRole(int id)
        {
            VacancyRole vacancyRole = db.VacancyRole.Find(id);
            if (vacancyRole == null)
            {
                return NotFound();
            }

            db.VacancyRole.Remove(vacancyRole);
            db.SaveChanges();

            return Ok(vacancyRole);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool VacancyRoleExists(int id)
        {
            return db.VacancyRole.Count(e => e.ID == id) > 0;
        }
    }
}