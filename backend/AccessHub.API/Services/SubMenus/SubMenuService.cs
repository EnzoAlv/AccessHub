using AccessHub.API.Data;
using AccessHub.API.DTOs.SubMenus;
using AccessHub.API.Entities;
using Microsoft.EntityFrameworkCore;

namespace AccessHub.API.Services.SubMenus;

public class SubMenuService : ISubMenuService
{
    private readonly AppDbContext _context;

    public SubMenuService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<SubMenuResponseDto>> GetAllAsync()
    {
        return await _context.SubMenus
            .Include(sm => sm.Menu)
            .Select(sm => new SubMenuResponseDto
            {
                Id = sm.Id,
                Nome = sm.Nome,
                Rota = sm.Rota,
                MenuId = sm.MenuId,
                MenuNome = sm.Menu.Nome
            })
            .ToListAsync();
    }

    public async Task<SubMenuResponseDto?> GetByIdAsync(Guid id)
    {
        return await _context.SubMenus
            .Include(sm => sm.Menu)
            .Where(sm => sm.Id == id)
            .Select(sm => new SubMenuResponseDto
            {
                Id = sm.Id,
                Nome = sm.Nome,
                Rota = sm.Rota,
                MenuId = sm.MenuId,
                MenuNome = sm.Menu.Nome
            })
            .FirstOrDefaultAsync();
    }

    public async Task<Guid> CreateAsync(CreateSubMenuDto dto)
    {
        var menuExists = await _context.Menus.AnyAsync(m => m.Id == dto.MenuId);
        if (!menuExists)
            throw new Exception("Menu não encontrado");

        var subMenu = new SubMenu
        {
            Id = Guid.NewGuid(),
            Nome = dto.Nome,
            Rota = dto.Rota,
            MenuId = dto.MenuId
        };

        _context.SubMenus.Add(subMenu);
        await _context.SaveChangesAsync();

        return subMenu.Id;
    }

    public async Task<bool> UpdateAsync(Guid id, UpdateSubMenuDto dto)
    {
        var subMenu = await _context.SubMenus.FindAsync(id);
        if (subMenu == null) return false;

        var menuExists = await _context.Menus.AnyAsync(m => m.Id == dto.MenuId);
        if (!menuExists)
            throw new Exception("Menu não encontrado");

        subMenu.Nome = dto.Nome;
        subMenu.Rota = dto.Rota;
        subMenu.MenuId = dto.MenuId;

        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var subMenu = await _context.SubMenus
            .Include(sm => sm.Permissions)
            .FirstOrDefaultAsync(sm => sm.Id == id);

        if (subMenu == null) return false;

        if (subMenu.Permissions.Any())
            throw new Exception("SubMenu possui permissões associadas");

        _context.SubMenus.Remove(subMenu);
        await _context.SaveChangesAsync();

        return true;
    }
}