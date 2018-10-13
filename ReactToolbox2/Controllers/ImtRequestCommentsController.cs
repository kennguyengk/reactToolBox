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
    public class ImtRequestCommentsController : ApiController
    {
        private ToolboxDBContext db = new ToolboxDBContext();

        // GET: api/ImtRequestComments
        public IQueryable<ImtRequestComment> GetImtRequestComment()
        {
            return db.ImtRequestComment;
        }

        // GET: api/ImtRequestComments/5
        [ResponseType(typeof(ImtRequestComment))]
        public IHttpActionResult GetImtRequestComment(int id)
        {
            ImtRequestComment imtRequestComment = db.ImtRequestComment.Find(id);
            if (imtRequestComment == null)
            {
                return NotFound();
            }

            return Ok(imtRequestComment);
        }

        // PUT: api/ImtRequestComments/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutImtRequestComment(int id, ImtRequestComment imtRequestComment)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != imtRequestComment.Id)
            {
                return BadRequest();
            }

            db.Entry(imtRequestComment).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ImtRequestCommentExists(id))
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

        // POST: api/ImtRequestComments
        [ResponseType(typeof(ImtRequestComment))]
        public IHttpActionResult PostImtRequestComment(ImtRequestComment imtRequestComment)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.ImtRequestComment.Add(imtRequestComment);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = imtRequestComment.Id }, imtRequestComment);
        }

        // DELETE: api/ImtRequestComments/5
        [ResponseType(typeof(ImtRequestComment))]
        public IHttpActionResult DeleteImtRequestComment(int id)
        {
            ImtRequestComment imtRequestComment = db.ImtRequestComment.Find(id);
            if (imtRequestComment == null)
            {
                return NotFound();
            }

            db.ImtRequestComment.Remove(imtRequestComment);
            db.SaveChanges();

            return Ok(imtRequestComment);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ImtRequestCommentExists(int id)
        {
            return db.ImtRequestComment.Count(e => e.Id == id) > 0;
        }
    }
}