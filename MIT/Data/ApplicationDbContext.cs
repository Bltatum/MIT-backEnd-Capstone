using Microsoft.EntityFrameworkCore;
using MIT.Models;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MIT.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<UserProfile> UserProfile { get; set; }

        public DbSet<Incident> Incident { get; set; }

        public DbSet<IndividualTranscript> IndividualTranscript{ get; set; }
        public DbSet<Hospital> Hospital { get; set; }

    }
}
