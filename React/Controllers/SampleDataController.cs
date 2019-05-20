using Microsoft.AspNetCore.Mvc;
using React.Models;
using System;
using System.Collections.Generic;
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

        [HttpPost("{SearchTag}")]
        public IActionResult Post(string searchTag)
        {
            //var links = db.Links;
            var links = new List<Link>();
            List<string> tags = new List<string>();
            
            foreach (Link link in links)
            {
                tags = link.Tag.Split(", ").ToList();
                foreach (string tag in tags)
                {
                    if (tag == searchTag)
                    {
                        links.Add(link);
                    }
                        
                }
            }
            if (links.Count() != 0)
            {
                return Ok(links);
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
                //���������� �������� ���������� ����������� �������� ������
                if (link.LongLink[0] == 'h')
                {
                    int firstChar = link.LongLink.IndexOf('/') + 1;
                    link.ShortLink = link.LongLink.Substring(firstChar + 1);
                    if (link.ShortLink.IndexOf('/') != -1)
                    {
                        link.ShortLink = link.ShortLink.Substring(0, link.ShortLink.IndexOf('/'));
                    }
                }
                if (link.ShortLink.IndexOf("www.") != -1)
                {
                    link.ShortLink = link.ShortLink.Substring(4);
                }
                link.ShortLink = link.ShortLink.Substring(0, link.ShortLink.LastIndexOf('.'));
                char newChar = link.ShortLink[0].ToString().ToUpper()[0];
                link.ShortLink = newChar + link.ShortLink.Substring(1);


                var newLink = new Link(link.LongLink, link.ShortLink, link.Tag, link.Discount);
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
