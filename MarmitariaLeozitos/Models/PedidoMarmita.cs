namespace marmitariaLeozitos.Models 
{
    public class PedidoMarmita
    {
        public int PedidoId { get; set; }
        public Pedido Pedido { get; set; }

        public int MarmitaId { get; set; }
        public Marmita Marmita { get; set; }

        public int Quantidade {get; set;}
    }    
}