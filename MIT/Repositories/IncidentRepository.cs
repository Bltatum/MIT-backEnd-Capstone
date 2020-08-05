
using Microsoft.EntityFrameworkCore;
using MIT.Data;
using MIT.Models;
using System.Collections.Generic;
using System.Linq;


namespace MIT.Repositories
{
    public class IncidentRepository 
    {

        private readonly ApplicationDbContext _context;

        public IncidentRepository(ApplicationDbContext context)
        {
            _context = context;
        }


        public Incident GetById(int id)
        {
            return _context.Incident.Include(i => i.UserProfile)
                                   .Include(i => i.IndividualTranscript)
                                   .Include(i => i.Hospital)
                               .FirstOrDefault(i => i.Id == id);

        }


        public List<Incident> GetByUserProfileId(int id)
        {
            return _context.Incident.Include(i => i.UserProfile)
                              .Include(i => i.IndividualTranscript)
                            .Where(i => i.UserProfileId == id)
                            .OrderByDescending(i => i.BeginDateTime)
                            .ToList();
        }

        public List<Incident> Search(string criterion, bool sortDescending, int id)
        {
           
            var query = _context.Incident
                                .Include(i => i.UserProfile)
                                .Include(i => i.IndividualTranscript)
                                .Where(i => i.Address.Contains(criterion) && i.UserProfileId == id);

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
            var relatedTrans = _context.IndividualTranscript.Where(r => r.IncidentId == id);
            _context.IndividualTranscript.RemoveRange(relatedTrans);

            _context.Incident.Remove(incident);
            _context.SaveChanges();
        }



    }
}
