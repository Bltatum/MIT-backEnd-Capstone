using Microsoft.EntityFrameworkCore;
using MIT.Data;
using MIT.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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

        public IndividualTranscript GetById(int id)
        {
            return _context.IndividualTranscript
                            .FirstOrDefault(i => i.Id == id);
        }


        public List<IndividualTranscript> GetByUserProfileId(int id)
        {
            return _context.IndividualTranscript.Include(i => i.UserProfile)
                            .Where(i => i.UserProfileId == id)
                            .OrderBy(i => i.StartDateTime)
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
