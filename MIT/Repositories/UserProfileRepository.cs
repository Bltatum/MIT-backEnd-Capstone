using MIT.Data;
using MIT.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace MIT.Repositories
{
    public class UserProfileRepository
    {

        private readonly ApplicationDbContext _context;

        public UserProfileRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public UserProfile GetByFirebaseUserId(string firebaseUserId)
        {
            return _context.UserProfile
                       .FirstOrDefault(up => up.FirebaseUserId == firebaseUserId);
        }

        public UserProfile GetByUserId(int id)
        {
            return _context.UserProfile
                       .FirstOrDefault(up => up.Id == id);
        }
        public void Add(UserProfile userProfile)
        {
            _context.Add(userProfile);
            _context.SaveChanges();
        }

        public void Update(UserProfile userProfile, UserProfile currentUserProfile)
        { 
            _context.Entry(userProfile).State = EntityState.Modified;
        }
    }
}
