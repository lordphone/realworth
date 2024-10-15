using Microsoft.EntityFrameworkCore;
using RealWorthspace.Models;

namespace RealWorthspace.Data
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<ExchangeRate> ExchangeRates { get; set; }

        public DbSet<PPPData> PPPData { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
        {
        }
    }
}