using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace React.Models
{
    public class LinkContext : DbContext
    {
        public DbSet<Link> Links { get; set; }

        public LinkContext(DbContextOptions<LinkContext> options)
            : base(options)
        {
            Database.EnsureCreated();
        }
    }
}
