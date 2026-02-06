using AccessHub.API.Data;
using AccessHub.API.Data.Seed;
using AccessHub.API.Services.Menus;
using AccessHub.API.Services.Roles;
using AccessHub.API.Services.SubMenus;
using AccessHub.API.Services.Users;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

#region Controllers
builder.Services.AddControllers();
#endregion

#region Database
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(
        builder.Configuration.GetConnectionString("DefaultConnection")
    )
);
#endregion

#region Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
#endregion

#region Dependency Injection
builder.Services.AddScoped<IRoleService, RoleService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IMenuService, MenuService>();
builder.Services.AddScoped<ISubMenuService, SubMenuService>();
#endregion

var app = builder.Build();

#region Migration + Seed (safe)
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();

    try
    {
        context.Database.Migrate();
        RoleSeeder.Seed(context);
    }
    catch (Exception ex)
    {
        Console.WriteLine($"[DB INIT ERROR] {ex.Message}");
    }
}
#endregion

#region Middleware
if (app.Environment.IsDevelopment() || app.Environment.IsProduction())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.RoutePrefix = "swagger";
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "AccessHub API v1");
    });
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
#endregion

app.Run();