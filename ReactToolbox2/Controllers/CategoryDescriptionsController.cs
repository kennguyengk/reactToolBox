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
    public class CategoryDescriptionsController : ApiController
    {
        private ToolboxDBContext db = new ToolboxDBContext();

        // GET: api/CategoryDescriptions
        public IQueryable<CategoryDescription> GetCategoryDescriptions()
        {
            return db.CategoryDescriptions;
        }

        // GET: api/CategoryDescriptions/5
        [ResponseType(typeof(CategoryDescription))]
        public IHttpActionResult GetCategoryDescription(int id)
        {
            CategoryDescription categoryDescription = db.CategoryDescriptions.Find(id);
            if (categoryDescription == null)
            {
                return NotFound();
            }

            return Ok(categoryDescription);
        }

        // PUT: api/CategoryDescriptions/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutCategoryDescription(int id, CategoryDescription categoryDescription)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != categoryDescription.ID)
            {
                return BadRequest();
            }

            db.Entry(categoryDescription).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CategoryDescriptionExists(id))
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

        // POST: api/CategoryDescriptions
        [ResponseType(typeof(CategoryDescription))]
        public IHttpActionResult PostCategoryDescription(CategoryDescription categoryDescription)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.CategoryDescriptions.Add(categoryDescription);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = categoryDescription.ID }, categoryDescription);
        }

        // DELETE: api/CategoryDescriptions/5
        [ResponseType(typeof(CategoryDescription))]
        public IHttpActionResult DeleteCategoryDescription(int id)
        {
            CategoryDescription categoryDescription = db.CategoryDescriptions.Find(id);
            if (categoryDescription == null)
            {
                return NotFound();
            }

            db.CategoryDescriptions.Remove(categoryDescription);
            db.SaveChanges();

            return Ok(categoryDescription);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CategoryDescriptionExists(int id)
        {
            return db.CategoryDescriptions.Count(e => e.ID == id) > 0;
        }
    }
}