using AccessHub.API.Data;
using AccessHub.API.Data.Seed;
using AccessHub.API.Services.Menus;
using AccessHub.API.Services.Roles;
using AccessHub.API.Services.Users;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Controllers da API
builder.Services.AddControllers();

// Banco + EF Core
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(
        builder.Configuration.GetConnectionString("DefaultConnection")
    )
);

// Documentação Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Injeção de dependência
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IMenuService, MenuService>();
builder.Services.AddScoped<IRoleService, RoleService>();

var app = builder.Build();

// Seed inicial do banco
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    RoleSeeder.Seed(context);
}

// Ambiente de desenvolvimento
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Redirecionamento HTTPS
app.UseHttpsRedirection();

// Middleware de autorização
app.UseAuthorization();

// Mapeamento dos controllers
app.MapControllers();

// Inicialização da aplicação
app.Run();
