using Microsoft.EntityFrameworkCore;
using MIT.Data;
using MIT.Models;
using System.Collections.Generic;
using System.Linq;


namespace MIT.Repositories
{
    public class IndividualTranscriptRepository
    {
        private readonly ApplicationDbContext _context;
        public IndividualTranscriptRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<IndividualTranscript> GetAll()
        {
            return _context.IndividualTranscript
                           .Include(i => i.UserProfileId)
                           .ToList();
        }

        public void Add(IndividualTranscript individualTranscript)
        {
            _context.Add(individualTranscript);
            _context.SaveChanges();
        }

        //Test Driven development
        public List<IndividualTranscript> GetMostRecent(int numResults)
        {
            return _context.IndividualTranscript
                          .Take(numResults)
                          .OrderByDescending(i => i.StartDateTime)
                          .ToList();
        }

    }
}
