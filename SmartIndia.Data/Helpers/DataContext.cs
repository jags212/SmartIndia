using Microsoft.EntityFrameworkCore;
using SmartIndia.Data.Entities;
using SmartIndia.Data.Entities.UserManagement;
using System;
using System.Collections.Generic;
using System.Text;

namespace SmartIndia.Data.Helpers
{
    public class DataContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<UserRegistration> UserRegistrations { get; set; }

        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserRegistration>().Ignore(c => c.ACTIONCODE);
        }
    }
}
