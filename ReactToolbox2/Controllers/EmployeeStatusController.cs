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
    public class EmployeeStatusController : ApiController
    {
        private ToolboxDBContext db = new ToolboxDBContext();

        // GET: api/EmployeeStatus
        public IQueryable<EmployeeStatus> GetEmployeeStatus()
        {
            return db.EmployeeStatus;
        }

        // GET: api/EmployeeStatus/5
        [ResponseType(typeof(EmployeeStatus))]
        public IHttpActionResult GetEmployeeStatus(int id)
        {
            EmployeeStatus employeeStatus = db.EmployeeStatus.Find(id);
            if (employeeStatus == null)
            {
                return NotFound();
            }

            return Ok(employeeStatus);
        }

        // PUT: api/EmployeeStatus/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutEmployeeStatus(int id, EmployeeStatus employeeStatus)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != employeeStatus.ID)
            {
                return BadRequest();
            }

            db.Entry(employeeStatus).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeeStatusExists(id))
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

        // POST: api/EmployeeStatus
        [ResponseType(typeof(EmployeeStatus))]
        public IHttpActionResult PostEmployeeStatus(EmployeeStatus employeeStatus)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.EmployeeStatus.Add(employeeStatus);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = employeeStatus.ID }, employeeStatus);
        }

        // DELETE: api/EmployeeStatus/5
        [ResponseType(typeof(EmployeeStatus))]
        public IHttpActionResult DeleteEmployeeStatus(int id)
        {
            EmployeeStatus employeeStatus = db.EmployeeStatus.Find(id);
            if (employeeStatus == null)
            {
                return NotFound();
            }

            db.EmployeeStatus.Remove(employeeStatus);
            db.SaveChanges();

            return Ok(employeeStatus);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool EmployeeStatusExists(int id)
        {
            return db.EmployeeStatus.Count(e => e.ID == id) > 0;
        }
    }
}