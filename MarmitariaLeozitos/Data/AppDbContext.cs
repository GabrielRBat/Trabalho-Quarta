using Microsoft.EntityFrameworkCore;
using marmitariaLeozitos.Models;

namespace marmitariaLeozitos.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options) {}

        public DbSet<Marmita> Marmita { get; set; }


 
    }
}
