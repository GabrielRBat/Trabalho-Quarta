namespace marmitariaLeozitos.DTOs
{
    public class PedidoDTO
    {
        public int UsuarioId { get; set; }
        public List<MarmitaDTO> PedidoMarmita { get; set; }
    }

    public class MarmitaDTO
    {
        public int MarmitaId { get; set; }
        public int Quantidade { get; set; }
    }

}