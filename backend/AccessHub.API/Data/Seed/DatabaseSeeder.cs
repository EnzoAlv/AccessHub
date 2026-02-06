using AccessHub.API.Entities;
using Microsoft.EntityFrameworkCore;

namespace AccessHub.API.Data.Seed;

public static class RoleSeeder
{
    public static void Seed(AppDbContext context)
    {
        if (!context.Database.CanConnect())
            return;

        // Se a tabela ainda não existir, não tenta seed
        if (!context.Database.GetAppliedMigrations().Any())
            return;

        CreateRoleIfNotExists(context, "Admin");
        CreateRoleIfNotExists(context, "Editor");
        CreateRoleIfNotExists(context, "User");

        context.SaveChanges();
    }

    private static void CreateRoleIfNotExists(AppDbContext context, string nome)
    {
        if (!context.Roles.Any(r => r.Nome == nome))
        {
            context.Roles.Add(new Role
            {
                Id = Guid.NewGuid(),
                Nome = nome
            });
        }
    }
}