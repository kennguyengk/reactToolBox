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
    public class ClassificationFieldMatricesController : ApiController
    {
        private ToolboxDBContext db = new ToolboxDBContext();

        // GET: api/ClassificationFieldMatrices
        public IQueryable<ClassificationFieldMatrix> GetClassificationFieldMatrices()
        {
            return db.ClassificationFieldMatrices;
        }

        // GET: api/ClassificationFieldMatrices/5
        [ResponseType(typeof(ClassificationFieldMatrix))]
        public IHttpActionResult GetClassificationFieldMatrix(int id)
        {
            ClassificationFieldMatrix classificationFieldMatrix = db.ClassificationFieldMatrices.Find(id);
            if (classificationFieldMatrix == null)
            {
                return NotFound();
            }

            return Ok(classificationFieldMatrix);
        }

        // PUT: api/ClassificationFieldMatrices/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutClassificationFieldMatrix(int id, ClassificationFieldMatrix classificationFieldMatrix)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != classificationFieldMatrix.ID)
            {
                return BadRequest();
            }

            db.Entry(classificationFieldMatrix).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClassificationFieldMatrixExists(id))
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

        // POST: api/ClassificationFieldMatrices
        [ResponseType(typeof(ClassificationFieldMatrix))]
        public IHttpActionResult PostClassificationFieldMatrix(ClassificationFieldMatrix classificationFieldMatrix)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.ClassificationFieldMatrices.Add(classificationFieldMatrix);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = classificationFieldMatrix.ID }, classificationFieldMatrix);
        }

        // DELETE: api/ClassificationFieldMatrices/5
        [ResponseType(typeof(ClassificationFieldMatrix))]
        public IHttpActionResult DeleteClassificationFieldMatrix(int id)
        {
            ClassificationFieldMatrix classificationFieldMatrix = db.ClassificationFieldMatrices.Find(id);
            if (classificationFieldMatrix == null)
            {
                return NotFound();
            }

            db.ClassificationFieldMatrices.Remove(classificationFieldMatrix);
            db.SaveChanges();

            return Ok(classificationFieldMatrix);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ClassificationFieldMatrixExists(int id)
        {
            return db.ClassificationFieldMatrices.Count(e => e.ID == id) > 0;
        }
    }
}