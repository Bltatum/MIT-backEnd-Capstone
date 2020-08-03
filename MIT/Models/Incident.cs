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

        public UserProfile UserProfile { get; set; }


        [Required]
        public int UserProfileId { get; set; }


        public string ImageLocation { get; set; }

        [Required]
        public string Address { get; set; }

        public string Comment { get; set; }

        [Required]
        public DateTime BeginDateTime { get; set; }

        public int? Hospital { get; set; }

        public bool? Emergency { get; set; }


       
        public DateTime? EndDateTime { get; set; }

        public List<IndividualTranscript> IndividualTranscript { get; set; }

    }
}
