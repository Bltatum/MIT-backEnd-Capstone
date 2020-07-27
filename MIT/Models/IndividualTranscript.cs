using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MIT.Models
{
    public class IndividualTranscript
    {
        public int Id { get; set; }

        [Required]
        public string Text { get; set; }

        [Required]
        public DateTime StartDateTime { get; set; }

        [Required]
        public int UserProfileId { get; set; }

        [Required]
        public int IncidentId { get; set; }

        public UserProfile UserProfile { get; set; }
    }
}
