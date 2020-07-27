using Microsoft.EntityFrameworkCore;
using MIT.Data;
using MIT.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MIT.Repositories
{
    public class IncidentRepository
    {

        private readonly ApplicationDbContext _context;

        public IncidentRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<Incident> GetAll()
        {
            return _context.Incident
                           .Include(i => i.UserProfile)
                           .Include(i => i.Comment)
                           .ToList();
        }

        public Incident GetById(int id)
        {
            return _context.Incident
                            .FirstOrDefault(i => i.Id == id);
        }


        public List<Incident> GetByUserProfileId(int id)
        {
            return _context.Incident.Include(i => i.UserProfile)
                                 .Include(i => i.Comment)
                            .Where(i => i.UserProfileId == id)
                            .OrderBy(i => i.Address)
                            .ToList();
        }

        public List<Incident> Search(string criterion, bool sortDescending)
        {
            var query = _context.Incident
                                .Include(i => i.UserProfile)
                                .Where(i => i.Address.Contains(criterion));

            return sortDescending
                ? query.OrderByDescending(i => i.BeginDateTime).ToList()
                : query.OrderBy(i => i.BeginDateTime).ToList();
         }

        public void Add(Incident incident)
        {
            _context.Add(incident);
            _context.SaveChanges();
        }

        public void Update(Incident incident)
        {
            _context.Entry(incident).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void Delete(int id)
        {

            var incident = GetById(id);
            _context.Incident.Remove(incident);
            _context.SaveChanges();
        }

        //Test Driven development
        public List<Incident> GetMostRecent(int numResults)
        {
            return _context.Incident
                          .Take(numResults)
                          .OrderByDescending(i => i.BeginDateTime)
                          .ToList();
        }

    }
}
