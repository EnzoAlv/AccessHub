using AccessHub.API.Entities;

namespace AccessHub.API.Data.Seed;

public static class RoleSeeder
{
    public static void Seed(AppDbContext context)
    {
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