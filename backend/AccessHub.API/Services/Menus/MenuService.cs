using AccessHub.API.Data;
using AccessHub.API.DTOs.Menus;
using AccessHub.API.Entities;
using Microsoft.EntityFrameworkCore;

namespace AccessHub.API.Services.Menus;

public class MenuService : IMenuService
{
    private readonly AppDbContext _context;

    public MenuService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<MenuResponseDto>> GetAllAsync()
    {
        return await _context.Menus
            .Select(m => new MenuResponseDto
            {
                Id = m.Id,
                Nome = m.Nome,
                Icone = m.Icone,
                Rota = m.Rota
            })
            .ToListAsync();
    }

    public async Task<MenuResponseDto?> GetByIdAsync(Guid id)
    {
        return await _context.Menus
            .Where(m => m.Id == id)
            .Select(m => new MenuResponseDto
            {
                Id = m.Id,
                Nome = m.Nome,
                Icone = m.Icone,
                Rota = m.Rota
            })
            .FirstOrDefaultAsync();
    }

    public async Task<Guid> CreateAsync(CreateMenuDto dto)
    {
        var menu = new Menu
        {
            Id = Guid.NewGuid(),
            Nome = dto.Nome,
            Icone = dto.Icone,
            Rota = dto.Rota
        };

        _context.Menus.Add(menu);
        await _context.SaveChangesAsync();

        return menu.Id;
    }

    public async Task<bool> UpdateAsync(Guid id, UpdateMenuDto dto)
    {
        var menu = await _context.Menus.FindAsync(id);
        if (menu == null) return false;

        menu.Nome = dto.Nome;
        menu.Icone = dto.Icone;
        menu.Rota = dto.Rota;

        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var menu = await _context.Menus
            .Include(m => m.SubMenus)
            .Include(m => m.Permissions)
            .FirstOrDefaultAsync(m => m.Id == id);

        if (menu == null) return false;

        if (menu.SubMenus.Any() || menu.Permissions.Any())
            throw new Exception("Menu possui vínculos");

        _context.Menus.Remove(menu);
        await _context.SaveChangesAsync();

        return true;
    }
}