namespace marmitariaLeozitos.Models 
{
    public class Pedido 
    {
        public int Id { get; set; }

        public int UsuarioId { get; set; }

        public Usuario Usuario { get; set; } 

        public List<PedidoMarmita> PedidoMarmita {get; set;} = new();

        public DateTime Data { get; set; }
    }
}
