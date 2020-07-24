using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MIT.Models
{
    public class Incident
    {

        public int Id { get; set; }

        [Required]
        public int UserProfileId { get; set; }


        [Required]
        public string ImageLocation { get; set; }

        [Required]
        public string Address { get; set; }

        [Required]
        public string Comment { get; set; }

        [Required]
        public DateTime BeginDateTime { get; set; }


        [Required]
        public DateTime EndDateTime { get; set; }

        [Required]
        public int IncidentId { get; set; }
    }
}
