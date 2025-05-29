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

        [HttpGet("buscar-todas-marmitas")]
        public async Task<IActionResult> GetMarmitas()
        {
            try
            {
                var marmitas = await _appDbContext.Marmita.ToListAsync();
                return Ok(marmitas);
            }
            catch
            {
                return StatusCode(500, "Erro ao buscar marmitas.");
            }
        }

        [HttpGet("buscar-marmita/{id}")]
        public async Task<IActionResult> GetMarmita(int id)
        {
            try
            {
                var marmita = await _appDbContext.Marmita.FindAsync(id);
                if (marmita == null)
                {
                    return NotFound("Marmita não encontrada.");
                }
                return Ok(marmita);
            }
            catch
            {
                return StatusCode(500, "Erro ao buscar marmita.");
            }
        }

        [HttpPost("criar-marmita")]
        public async Task<IActionResult> AddMarmita([FromForm] string nome, [FromForm] string descricao, [FromForm] decimal valor, [FromForm] IFormFile imagem)
        {
            try
            {
                if (string.IsNullOrEmpty(descricao) || imagem == null || valor <= 0)
                    return BadRequest("Preencha todos os campos corretamente.");

                var pastaDestino = Path.Combine(_environment.WebRootPath, "imagens");

                if (!Directory.Exists(pastaDestino))
                {
                    Directory.CreateDirectory(pastaDestino); 
                }

                var nomeArquivo = Guid.NewGuid().ToString() + Path.GetExtension(imagem.FileName);
                var caminhoCompleto = Path.Combine(pastaDestino, nomeArquivo);

                using (var stream = new FileStream(caminhoCompleto, FileMode.Create))
                {
                    await imagem.CopyToAsync(stream);
                }

                var urlImagem = $"{Request.Scheme}://{Request.Host}/imagens/{nomeArquivo}";

                var novaMarmita = new Marmita
                {
                    Nome = nome,
                    Descricao = descricao,
                    Valor = valor,
                    Imagem = urlImagem
                };

                _appDbContext.Marmita.Add(novaMarmita);
                await _appDbContext.SaveChangesAsync();

                return StatusCode(201, novaMarmita);
            }
            catch
            {
                return StatusCode(500, "Erro ao criar marmita.");
            }
        }

        [HttpPut("alterar-marmita/{id}")]
        public async Task<IActionResult> UpdateMarmita(int id, Marmita marmita)
        {
            try
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
            catch
            {
                return StatusCode(500, "Erro ao alterar marmita.");
            }
        }

        [HttpDelete("apagar-todas-marmitas")]
        public async Task<IActionResult> DeleteAllMarmita()
        {
            try
            {
                var marmitas = await _appDbContext.Marmita.ToListAsync();
                var count = 0;

                foreach (var marmita in marmitas)
                {
                    if (marmita.Descricao == null || marmita.Valor == null)
                    {
                        _appDbContext.Marmita.Remove(marmita);
                        count++;
                    }
                }

                string retorno = (count > 0 && count != 1) ? count + " marmitas foram removidas com sucesso!" : "Nenhuma marmita foi removida";
                await _appDbContext.SaveChangesAsync();
                return Ok(retorno);
            }
            catch
            {
                return StatusCode(500, "Erro ao apagar marmitas.");
            }
        }

        [HttpDelete("apagar-marmita/{id}")]
        public async Task<IActionResult> DeleteMarmita(int id)
        {
            try
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
            catch
            {
                return StatusCode(500, "Erro ao apagar marmita.");
            }
        }

        [HttpGet("buscar-todos-pedidos")]
        public async Task<IActionResult> GetPedidos() 
        {
            try
            {
                var pedidos = await _appDbContext.Pedido
                    .Include(p => p.PedidoMarmita)
                        .ThenInclude(pm => pm.Marmita)
                    .Include(p => p.Usuario)
                    .ToListAsync();

                if (pedidos.Count == 0)
                {
                    return NotFound("Não foi encontrado nenhum pedido.");
                }
                return Ok(pedidos);
            }
            catch
            {
                return StatusCode(500, "Erro ao buscar pedidos.");
            }
        }

        [HttpPost("criar-pedido")]
        public async Task<IActionResult> CriarPedido(PedidoDTO dto) 
        {
            try
            {
                if (dto == null)
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
            catch
            {
                return StatusCode(500, "Erro ao criar pedido.");
            }
        }

        [HttpPost("cadastrar-usuario")]
        public async Task<IActionResult> CadastrarUsuario(Usuario usuario)
        {
            try
            {
                if (usuario == null)
                {
                    return BadRequest("Dados Inválidos!");
                }

                var usuarios = await _appDbContext.Usuario.ToListAsync();

                foreach (var user in usuarios)
                {
                    if (user.email == usuario.email)
                    {
                        return BadRequest("Email já está em uso.");
                    }
                }

                _appDbContext.Usuario.Add(usuario);
                await _appDbContext.SaveChangesAsync();
                return StatusCode(201, usuario);
            }
            catch
            {
                return StatusCode(500, "Erro ao cadastrar usuário.");
            }
        }

        [HttpGet("buscar-usuario/{id}")]
        public async Task<IActionResult> BuscarUsuarioPorId(int id)
        {
            try
            {
                var usuario = await _appDbContext.Usuario.FindAsync(id);
                if (usuario == null)
                {
                    return NotFound("Usuário não encontrado.");
                }

                return Ok(new {
                    nome = usuario.nome,
                    email = usuario.email
                });
            }
            catch
            {
                return StatusCode(500, "Erro ao buscar usuário.");
            }
        }

        [HttpPut("alterar-usuario/{id}")]
        public async Task<IActionResult> UpdateUsuario(int id, Logradouro logradouro)
        {
            try
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
            catch
            {
                return StatusCode(500, "Erro ao alterar usuário.");
            }
        }

        [HttpPost("validar-login")]
        public async Task<IActionResult> CadastrarUsuario([FromBody] JsonElement dados)
        {
            try
            {
                string email = dados.GetProperty("email").GetString();
                string senha = dados.GetProperty("senha").GetString();

                if (senha == null || email == null)
                {
                    return BadRequest("Dados Inválidos!");
                }

                var usuarios = await _appDbContext.Usuario.ToListAsync();

                foreach (var user in usuarios)
                {
                    if (user.senha == senha && user.email == email)
                    {
                        return Ok(new {
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
            catch
            {
                return StatusCode(500, "Erro ao validar login.");
            }
        }

        [HttpGet("buscar-logradouro/{id}")]
        public async Task<IActionResult> BuscarLogradouro(int id)
        {
            try
            {
                var usuario = await _appDbContext.Usuario.FirstOrDefaultAsync(u => u.Id == id);
                if (usuario == null)
                {
                    return BadRequest("Usuário não possui logradouro!" + id);
                }

                var logradouro = _appDbContext.Logradouro.FirstOrDefault(l => l.Id == usuario.LogradouroId);
                return Ok(logradouro);
            }
            catch
            {
                return StatusCode(500, "Erro ao buscar logradouro.");
            }
        }
    }
}
