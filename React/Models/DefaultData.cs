using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace React.Models
{
    public static class DefaultData
    {
        public static void Initialize(LinkContext context)
        {
            if (!context.Links.Any())
            {

                string longLink = "https://www.google.ru/";

                context.Links.AddRange(
                    new Link(longLink, "testGoogle", "поиск, интернет-магазин", 15)
                );
                context.SaveChanges();
            }
        }
    }
}
