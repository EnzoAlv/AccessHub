using AccessHub.API.Entities;

namespace AccessHub.API.Data.Seed;

public static class RoleSeeder
{
    public static void Seed(AppDbContext context)
    {
        if (!context.Roles.Any())
        {
            context.Roles.AddRange(
                new Role
                {
                    Id = Guid.NewGuid(),
                    Name = "Admin"
                },
                new Role
                {
                    Id = Guid.NewGuid(),
                    Name = "User"
                }
            );

            context.SaveChanges();
        }
    }
}
