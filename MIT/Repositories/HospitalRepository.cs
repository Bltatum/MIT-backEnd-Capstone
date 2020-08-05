using MIT.Data;
using MIT.Models;
using System.Collections.Generic;
using System.Linq;


namespace MIT.Repositories
{
    public class HospitalRepository
    {
        private readonly ApplicationDbContext _context;

        public HospitalRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<Hospital> GetAll()
        {
            return _context.Hospital
                .OrderBy(h => h.Name)
                .ToList();
        }

        public Hospital GetById(int id)
        {
            return _context.Hospital.FirstOrDefault(c => c.Id == id);

        }
    }
}