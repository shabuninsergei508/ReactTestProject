using Microsoft.AspNetCore.Mvc;
using React.Models;
using System;
using System.Linq;

namespace React.Controllers
{
    [Route("api/[controller]")]
    public class SampleDataController : Controller
    {
        private LinkContext db;
        public SampleDataController(LinkContext context)
        {
            db = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var links = db.Links;
            return Ok(links);
        }

        [HttpGet("{SearchLink}")]
        public IActionResult Get(string SearchLink)
        {
            var getLinks = db.Links;
            if (getLinks != null)
            {
                return Ok(getLinks);
            }
            else
            {
                return NotFound();
            };
        }




        [HttpPost]
        public IActionResult Post([FromBody]Link link)
        {
            var getLink = db.Links.Where(x => x.LongLink == link.LongLink).FirstOrDefault();
            if (getLink == null)
            {
                int hashCodeLink = (link.LongLink + "salt").GetHashCode();
                if (hashCodeLink <= 0)
                {
                    hashCodeLink = -hashCodeLink;
                }
                var newLink = new Link(link.LongLink, hashCodeLink.ToString());
                db.Add(newLink);
                db.SaveChanges();
                return Ok(newLink);
            }
            else
            {
                return Ok(getLink);
            }
        }

    }
}
