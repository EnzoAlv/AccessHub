using AccessHub.API.Data;
using AccessHub.API.DTOs.Menus;
using Microsoft.EntityFrameworkCore;

namespace AccessHub.API.Services.Menus;

public class MenuService : IMenuService
{
    private readonly AppDbContext _context;

    public MenuService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<MenuResponseDto>> GetMenusByRoleAsync(Guid roleId)
    {
        // Permissions da role
        var permissions = await _context.Permissions
            .Where(p => p.RoleId == roleId)
            .Include(p => p.Menu)
            .Include(p => p.SubMenu)
            .ToListAsync();

        // Menus permitidos
        var menus = permissions
            .Where(p => p.Menu != null)
            .Select(p => p.Menu!)
            .Distinct()
            .Select(menu => new MenuResponseDto
            {
                Id = menu.Id,
                Nome = menu.Nome,
                Icone = menu.Icone,
                Rota = menu.Rota,
                SubMenus = permissions
                    .Where(p => p.SubMenu != null && p.SubMenu.MenuId == menu.Id)
                    .Select(p => new SubMenuResponseDto
                    {
                        Id = p.SubMenu!.Id,
                        Nome = p.SubMenu.Nome,
                        Rota = p.SubMenu.Rota
                    })
                    .ToList()
            })
            .ToList();

        return menus;
    }
}
