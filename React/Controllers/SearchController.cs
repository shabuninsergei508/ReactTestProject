using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using React.Models;

namespace React.Controllers
{
    [Route("api/[controller]")]
    public class SearchController : Controller
    {
        private LinkContext db;
        public SearchController(LinkContext context)
        {
            db = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var links = db.Links;

            List<string> allTags = new List<string>();
            List<string> tags = new List<string>();
            //для разнообразия, вывод тегов из базы, без создания доп таблицы под них
            foreach (Link link in links)
            {
                tags = link.Tag.Split(", ").ToList();
                foreach (string tag in tags)
                {
                    if (!allTags.Contains(tag))
                        allTags.Add(tag);
                }
            }
            return Ok(allTags);
        }



        [HttpPost]
        public IActionResult Post([FromBody]SearchFormModel searchFormModel)
        {
            var searchTag = searchFormModel.SearchTag;

            var links = db.Links;
            var newListLinks = new List<Link>();
            List<string> tags = new List<string>();

            foreach (Link link in links)
            {
                tags = link.Tag.Split(", ").ToList();
                foreach (string tag in tags)
                {
                    if (tag == searchTag)
                    {
                        //links.Add(link);
                        newListLinks.Add(link);
                    }

                }
            }
            if (newListLinks.Count() != 0)
            {
                return Ok(newListLinks);
            }
            else
            {
                return NotFound();
            };
        }
    }
}