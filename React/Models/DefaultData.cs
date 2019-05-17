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
                int hashCodeLink = (longLink + "solt").GetHashCode();
                if (hashCodeLink <= 0)
                {
                    hashCodeLink = -hashCodeLink;
                }
                string shortLink = hashCodeLink.ToString();

                context.Links.AddRange(
                    new Link(longLink, shortLink)
                );
                context.SaveChanges();
            }
        }
    }
}
