using Microsoft.EntityFrameworkCore;
using SmartIndia.Data.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace SmartIndia.Data.Helpers
{
    public class DataContext : DbContext
    {
        public DbSet<User> Users { get; set; }

        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
    }
}
