using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Security.Principal;
using System.Threading.Tasks;

namespace React.Models
{
    public class Link
    {
        public Link(string longLink, string shortLink, string tag, int discount)
        {
            LongLink = longLink;
            ShortLink = shortLink;
            Tag = tag;
            Discount = discount;
        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public string ShortLink { get; set; }

        [Required]
        public string LongLink { get; set; }

        [Required]
        public string Tag { get; set; }

        [Required]
        public int Discount { get; set; }

        //old model
        //public Link(string longLink, string shortLink)
        //{
        //    LongLink = longLink;
        //    ShortLink = shortLink;

        //}

        //[Key]
        //[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        //public int Id { get; set; }

        //[Required]
        //public string ShortLink { get; set; }

        //[Required]
        //public string LongLink { get; set; }
    }
}
