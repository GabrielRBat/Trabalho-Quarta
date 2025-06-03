using Microsoft.OpenApi.Models;
using Microsoft.EntityFrameworkCore;
using marmitariaLeozitos.Data;

var builder = WebApplication.CreateBuilder(args);

builder.WebHost.UseWebRoot("wwwroot");

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<AppDbContext>(options =>
options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

// Adiciona serviços ao contêiner
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.Preserve;
        options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;

        options.JsonSerializerOptions.WriteIndented = true;
    });

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Marmitaria API",
        Version = "v1",
        Description = "API para gerenciar as marmitas da Marmitaria Leozitos"
    });
});

// Adiciona CORS para permitir requisições externas (se necessário)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy => policy.AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader());
});

var app = builder.Build();

// Configura middleware de erro
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/swagger/v1/swagger.json", "Marmitaria API v1");
        options.RoutePrefix = string.Empty; // Permite acessar via http://localhost:5000
    });
}
else
{
    // Em produção, Swagger pode ser opcional
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Aplica CORS
app.UseCors("AllowAll");

app.UseAuthorization();
app.MapControllers();

app.UseStaticFiles(); 


app.Run();
