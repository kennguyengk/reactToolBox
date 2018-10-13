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
    public class AnswerChoicesController : ApiController
    {
        private ToolboxDBContext db = new ToolboxDBContext();

        // GET: api/AnswerChoices
        public IQueryable<AnswerChoice> GetAnswerChoice()
        {
            return db.AnswerChoice;
        }

        // GET: api/AnswerChoices/5
        [ResponseType(typeof(AnswerChoice))]
        public IHttpActionResult GetAnswerChoice(int id)
        {
            AnswerChoice answerChoice = db.AnswerChoice.Find(id);
            if (answerChoice == null)
            {
                return NotFound();
            }

            return Ok(answerChoice);
        }

        // PUT: api/AnswerChoices/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutAnswerChoice(int id, AnswerChoice answerChoice)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != answerChoice.ID)
            {
                return BadRequest();
            }

            db.Entry(answerChoice).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AnswerChoiceExists(id))
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

        // POST: api/AnswerChoices
        [ResponseType(typeof(AnswerChoice))]
        public IHttpActionResult PostAnswerChoice(AnswerChoice answerChoice)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.AnswerChoice.Add(answerChoice);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = answerChoice.ID }, answerChoice);
        }

        // DELETE: api/AnswerChoices/5
        [ResponseType(typeof(AnswerChoice))]
        public IHttpActionResult DeleteAnswerChoice(int id)
        {
            AnswerChoice answerChoice = db.AnswerChoice.Find(id);
            if (answerChoice == null)
            {
                return NotFound();
            }

            db.AnswerChoice.Remove(answerChoice);
            db.SaveChanges();

            return Ok(answerChoice);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool AnswerChoiceExists(int id)
        {
            return db.AnswerChoice.Count(e => e.ID == id) > 0;
        }
    }
}