using Microsoft.EntityFrameworkCore;
using marmitariaLeozitos.Models;

namespace marmitariaLeozitos.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options) {}

        public DbSet<Marmita> Marmita { get; set; }
        public DbSet<Pedido> Pedido {get; set;}
        public DbSet<Usuario> Usuario {get; set;}
        public DbSet<PedidoMarmita> PedidoMarmita {get; set;}
        public DbSet<Logradouro> Logradouro {get; set;}

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Marmita>()
                .Property(m => m.Valor)
                .HasPrecision(10, 2);
            
            modelBuilder.Entity<PedidoMarmita>()
                .HasKey(pm => new { pm.PedidoId, pm.MarmitaId });

            modelBuilder.Entity<PedidoMarmita>()
                .HasOne(pm => pm.Pedido)
                .WithMany(p => p.PedidoMarmita)
                .HasForeignKey(pm => pm.PedidoId);

            modelBuilder.Entity<PedidoMarmita>()
                .HasOne(pm => pm.Marmita)
                .WithMany() 
                .HasForeignKey(pm => pm.MarmitaId);

            base.OnModelCreating(modelBuilder);
        }
    }
}
