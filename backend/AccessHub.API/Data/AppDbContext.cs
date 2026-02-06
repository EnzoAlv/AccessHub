using AccessHub.API.Entities;
using Microsoft.EntityFrameworkCore;

namespace AccessHub.API.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    // Tabelas
    public DbSet<User> Users => Set<User>();
    public DbSet<Role> Roles => Set<Role>();
    public DbSet<Menu> Menus => Set<Menu>();
    public DbSet<SubMenu> SubMenus => Set<SubMenu>();
    public DbSet<Permission> Permissions => Set<Permission>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // User -> Role
        modelBuilder.Entity<User>()
            .HasOne(u => u.Role)
            .WithMany(r => r.Users)
            .HasForeignKey(u => u.RoleId)
            .OnDelete(DeleteBehavior.Restrict);

        // Menu -> SubMenu
        modelBuilder.Entity<SubMenu>()
            .HasOne(sm => sm.Menu)
            .WithMany(m => m.SubMenus)
            .HasForeignKey(sm => sm.MenuId)
            .OnDelete(DeleteBehavior.Cascade);

        // Permission -> Role
        modelBuilder.Entity<Permission>()
            .HasOne(p => p.Role)
            .WithMany(r => r.Permissions)
            .HasForeignKey(p => p.RoleId)
            .OnDelete(DeleteBehavior.Cascade);

        // Permission -> Menu
        modelBuilder.Entity<Permission>()
            .HasOne(p => p.Menu)
            .WithMany(m => m.Permissions)
            .HasForeignKey(p => p.MenuId)
            .OnDelete(DeleteBehavior.Restrict);

        // Permission -> SubMenu
        modelBuilder.Entity<Permission>()
            .HasOne(p => p.SubMenu)
            .WithMany(sm => sm.Permissions)
            .HasForeignKey(p => p.SubMenuId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}