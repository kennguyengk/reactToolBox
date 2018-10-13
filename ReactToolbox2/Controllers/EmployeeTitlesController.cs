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
    public class EmployeeTitlesController : ApiController
    {
        private ToolboxDBContext db = new ToolboxDBContext();

        // GET: api/EmployeeTitles
        public IQueryable<EmployeeTitle> GetEmployeeTitle()
        {
            return db.EmployeeTitle;
        }

        // GET: api/EmployeeTitles/5
        [ResponseType(typeof(EmployeeTitle))]
        public IHttpActionResult GetEmployeeTitle(int id)
        {
            EmployeeTitle employeeTitle = db.EmployeeTitle.Find(id);
            if (employeeTitle == null)
            {
                return NotFound();
            }

            return Ok(employeeTitle);
        }

        // PUT: api/EmployeeTitles/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutEmployeeTitle(int id, EmployeeTitle employeeTitle)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != employeeTitle.ID)
            {
                return BadRequest();
            }

            db.Entry(employeeTitle).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeeTitleExists(id))
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

        // POST: api/EmployeeTitles
        [ResponseType(typeof(EmployeeTitle))]
        public IHttpActionResult PostEmployeeTitle(EmployeeTitle employeeTitle)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.EmployeeTitle.Add(employeeTitle);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = employeeTitle.ID }, employeeTitle);
        }

        // DELETE: api/EmployeeTitles/5
        [ResponseType(typeof(EmployeeTitle))]
        public IHttpActionResult DeleteEmployeeTitle(int id)
        {
            EmployeeTitle employeeTitle = db.EmployeeTitle.Find(id);
            if (employeeTitle == null)
            {
                return NotFound();
            }

            db.EmployeeTitle.Remove(employeeTitle);
            db.SaveChanges();

            return Ok(employeeTitle);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool EmployeeTitleExists(int id)
        {
            return db.EmployeeTitle.Count(e => e.ID == id) > 0;
        }
    }
}