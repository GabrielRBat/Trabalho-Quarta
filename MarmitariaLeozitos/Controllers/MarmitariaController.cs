using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using marmitariaLeozitos.Data;
using marmitariaLeozitos.Models;
using marmitariaLeozitos.DTOs;
using System.Text.Json;
using Microsoft.AspNetCore.Hosting;

namespace marmitariaLeozitos.Controllers
{
    [ApiController]
    [Route("api/")]
    public class MarmitariaController : ControllerBase 
    {
        private readonly AppDbContext _appDbContext;
        private readonly IWebHostEnvironment _environment;

        public MarmitariaController(AppDbContext appDbContext, IWebHostEnvironment environment)
        {
            _appDbContext = appDbContext;
            _environment = environment;
        }

        //MARMITAS
        [HttpGet("buscar-todas-marmitas")]
        public async Task<IActionResult> GetMarmitas()
        {
            var marmitas = await _appDbContext.Marmita.ToListAsync();
            return Ok(marmitas);
        }

        [HttpGet("buscar-marmita/{id}")]
        public async Task<IActionResult> GetMarmita(int id)
        {
            var marmita = await _appDbContext.Marmita.FindAsync(id);
            if (marmita == null)
            {
                return NotFound("Marmita não encontrada.");
            }
            return Ok(marmita);
        }

        [HttpPost("criar-marmita")]
        public async Task<IActionResult> AddMarmita([FromForm] string descricao, [FromForm] decimal valor, [FromForm] IFormFile imagem)
        {
            if (string.IsNullOrEmpty(descricao) || imagem == null || valor <= 0)
                return BadRequest("Preencha todos os campos corretamente.");

            // Define pasta de destino
            var pastaDestino = Path.Combine(_environment.WebRootPath, "imagens");

            if (!Directory.Exists(pastaDestino))
            {
                Directory.CreateDirectory(pastaDestino); 
            }

            var nomeArquivo = Guid.NewGuid().ToString() + Path.GetExtension(imagem.FileName);
            var caminhoCompleto = Path.Combine(pastaDestino, nomeArquivo);

            // Salva imagem fisicamente
            using (var stream = new FileStream(caminhoCompleto, FileMode.Create))
            {
                await imagem.CopyToAsync(stream);
            }

            // Gera a URL pública (ex: http://localhost:5294/imagens/foto.png)
            var urlImagem = $"{Request.Scheme}://{Request.Host}/imagens/{nomeArquivo}";

            // Cria marmita
            var novaMarmita = new Marmita
            {
                Descricao = descricao,
                Valor = valor,
                Imagem = urlImagem // aqui você salva só a URL
            };

            _appDbContext.Marmita.Add(novaMarmita);
            await _appDbContext.SaveChangesAsync();

            return StatusCode(201, novaMarmita);
        }


        [HttpPut("alterar-marmita/{id}")]
        public async Task<IActionResult> UpdateMarmita(int id, Marmita marmita)
        {
            if (marmita == null || marmita.Id != id)
            {
                return BadRequest("Dados inválidos.");
            }

            var marmitaExistente = await _appDbContext.Marmita.FindAsync(id);
            if (marmitaExistente == null)
            {
                return NotFound("Marmita não encontrada.");
            }

            marmitaExistente.Descricao = marmita.Descricao;
            marmitaExistente.Valor = marmita.Valor;

            _appDbContext.Marmita.Update(marmitaExistente);
            await _appDbContext.SaveChangesAsync();

            return Ok(marmitaExistente);
        }

        //Remover esse método da futuramente, coloquei ele pra facilitar os testes limpando a database
        //Apaga todas as marmitas que tem alg info vazia
        [HttpDelete("apagar-todas-marmitas")]
        public async Task<IActionResult> DeleteAllMarmita()
        {
            var marmitas = await _appDbContext.Marmita.ToListAsync();
            var count = 0;

            foreach (var marmita in marmitas)
            {
                if(marmita.Descricao == null || marmita.Valor == null)
                {
                    _appDbContext.Marmita.Remove(marmita);
                    count++;
                }
            }
            
            string retorno = (count > 0 && count != 1) ? count + " marmitas foram removidas com sucesso!" : "Nenhuma marmita foi removida";
            await _appDbContext.SaveChangesAsync();
            return Ok(retorno);
        }

        [HttpDelete("apagar-marmita/{id}")]
        public async Task<IActionResult> DeleteMarmita(int id)
        {
            var marmita = await _appDbContext.Marmita.FindAsync(id);
            if (marmita == null)
            {
                return NotFound("Marmita não encontrada.");
            }

            _appDbContext.Marmita.Remove(marmita);
            await _appDbContext.SaveChangesAsync();

            return Ok("Marmita removida com sucesso.");
        }
        //MARMITAS - END

        //PEDIDOS

        [HttpGet("buscar-todos-pedidos")]
        public async Task<IActionResult> GetPedidos() 
        {
            var pedidos = await _appDbContext.Pedido
            .Include(p => p.PedidoMarmita)
                .ThenInclude(pm => pm.Marmita)
            .Include(p => p.Usuario)
            .ToListAsync();

            if(pedidos.Count == 0)
            {
                return NotFound("Não foi encontrado nenhum pedido.");
            }
            return Ok(pedidos);
        }

        [HttpPost("criar-pedido")]
        public async Task<IActionResult> CriarPedido(PedidoDTO dto) 
        {
            if(dto == null )
            {
                return BadRequest("Dados inválidos!");
            }

            var pedido = new Pedido
            {
                UsuarioId = dto.UsuarioId,
                Data = DateTime.Now,
                PedidoMarmita = dto.PedidoMarmita.Select(m => new PedidoMarmita
                {
                    MarmitaId = m.MarmitaId,
                    Quantidade = m.Quantidade
                }).ToList()
            };

            _appDbContext.Pedido.Add(pedido);
            await _appDbContext.SaveChangesAsync();

            return StatusCode(201, pedido);
        }
        //PEDIDO - END

        //USUARIO
        [HttpPost("cadastrar-usuario")]
        public async Task<IActionResult> CadastrarUsuario(Usuario usuario)
        {
            if(usuario == null)
            {
                return BadRequest("Dados Inválidos!");
            }
            var usuarios = await _appDbContext.Usuario.ToListAsync();

            foreach (var user in usuarios)
            {
                if(user.email == usuario.email)
                {
                    return BadRequest("Email já está em uso.");
                }
            }
            
            _appDbContext.Usuario.Add(usuario);
            await _appDbContext.SaveChangesAsync();
            return StatusCode(201, usuario);
        }

        //Essa rota é utilizada pra atribuir um logradouro a um usuário já que o usuário recebe null de padrão
        [HttpPut("alterar-usuario/{id}")]
        public async Task<IActionResult> UpdateUsuario(int id, Logradouro logradouro)
        {

            if (logradouro == null)
            {
                return BadRequest("Dados inválidos.");
            }

            var usuario = await _appDbContext.Usuario.FindAsync(id);
            if (usuario == null)
            {
                return NotFound("Usuario não encontrado.");
            }
            _appDbContext.Logradouro.Add(logradouro);
            await _appDbContext.SaveChangesAsync();

            usuario.LogradouroId = logradouro.Id;

            _appDbContext.Usuario.Update(usuario);
            await _appDbContext.SaveChangesAsync();

            return Ok("Logradouro salvo e atribuido a o usuário com sucesso!");
        }

        [HttpPost("validar-login")]
        public async Task<IActionResult> CadastrarUsuario([FromBody] JsonElement dados)
        {
            string email = dados.GetProperty("email").GetString();
            string senha = dados.GetProperty("senha").GetString();

            if(senha == null || email == null)
            {
                return BadRequest("Dados Inválidos!");
            }

            var usuarios = await _appDbContext.Usuario.ToListAsync();

        foreach (var user in usuarios)
            {
                if(user.senha == senha && user.email == email)
                {
                    return Ok(new{
                        success = true,
                        message = "Usuário logado com sucesso!",
                        email = user.email,
                        tipo = user.tipo, 
                        id = user.Id
                    });
                }
            }

            return BadRequest("E-mail ou senha incorretos. Tente novamente.");
        }
        //USUARIO - FIM
        //LOGRADOURO
        [HttpGet("buscar-logradouro/{id}")]
        public async Task<IActionResult> BuscarLogradouro(int id)
        {
            Console.WriteLine($"[DEBUG] ID recebido na rota: {id}");
            var usuario = await _appDbContext.Usuario.FirstOrDefaultAsync(u => u.Id == id);
            if(usuario == null)
            {
                return BadRequest("Usuário não possui logradouro!" + id);
            }
            
            var logradouro = _appDbContext.Logradouro.FirstOrDefault(l => l.Id == usuario.LogradouroId);
            return Ok(logradouro);
        }

        // //LOGRADOURO - FIM
    }
}
