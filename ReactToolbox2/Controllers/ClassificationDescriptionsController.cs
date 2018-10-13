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
    public class ClassificationDescriptionsController : ApiController
    {
        private ToolboxDBContext db = new ToolboxDBContext();

        // GET: api/ClassificationDescriptions
        public IQueryable<ClassificationDescription> GetClassificationDescriptions()
        {
            return db.ClassificationDescriptions;
        }

        // GET: api/ClassificationDescriptions/5
        [ResponseType(typeof(ClassificationDescription))]
        public IHttpActionResult GetClassificationDescription(int id)
        {
            ClassificationDescription classificationDescription = db.ClassificationDescriptions.Find(id);
            if (classificationDescription == null)
            {
                return NotFound();
            }

            return Ok(classificationDescription);
        }

        // PUT: api/ClassificationDescriptions/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutClassificationDescription(int id, ClassificationDescription classificationDescription)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != classificationDescription.ID)
            {
                return BadRequest();
            }

            db.Entry(classificationDescription).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClassificationDescriptionExists(id))
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

        // POST: api/ClassificationDescriptions
        [ResponseType(typeof(ClassificationDescription))]
        public IHttpActionResult PostClassificationDescription(ClassificationDescription classificationDescription)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.ClassificationDescriptions.Add(classificationDescription);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = classificationDescription.ID }, classificationDescription);
        }

        // DELETE: api/ClassificationDescriptions/5
        [ResponseType(typeof(ClassificationDescription))]
        public IHttpActionResult DeleteClassificationDescription(int id)
        {
            ClassificationDescription classificationDescription = db.ClassificationDescriptions.Find(id);
            if (classificationDescription == null)
            {
                return NotFound();
            }

            db.ClassificationDescriptions.Remove(classificationDescription);
            db.SaveChanges();

            return Ok(classificationDescription);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ClassificationDescriptionExists(int id)
        {
            return db.ClassificationDescriptions.Count(e => e.ID == id) > 0;
        }
    }
}