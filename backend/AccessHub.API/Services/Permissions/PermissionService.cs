using AccessHub.API.Data;
using AccessHub.API.DTOs.Permissions;
using AccessHub.API.Entities;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace AccessHub.API.Services.Permissions;

public class PermissionService : IPermissionService
{
    private readonly AppDbContext _db;

    public PermissionService(AppDbContext db)
    {
        _db = db;
    }

    public async Task<List<PermissionResponseDto>> GetAllAsync(Guid? roleId, Guid? menuId, Guid? subMenuId)
    {
        var query = _db.Permissions
            .AsNoTracking()
            .Include(p => p.Role)
            .Include(p => p.Menu)
            .Include(p => p.SubMenu)
            .AsQueryable();

        if (roleId.HasValue) query = query.Where(p => p.RoleId == roleId.Value);
        if (menuId.HasValue) query = query.Where(p => p.MenuId == menuId.Value);
        if (subMenuId.HasValue) query = query.Where(p => p.SubMenuId == subMenuId.Value);

        return await query
            .OrderBy(p => p.Role.Nome)
            .ThenBy(p => p.MenuId)
            .ThenBy(p => p.SubMenuId)
            .Select(MapToDtoExpr())
            .ToListAsync();
    }

    public async Task<PermissionResponseDto?> GetByIdAsync(Guid id)
    {
        var p = await _db.Permissions
            .AsNoTracking()
            .Include(x => x.Role)
            .Include(x => x.Menu)
            .Include(x => x.SubMenu)
            .FirstOrDefaultAsync(x => x.Id == id);

        return p is null ? null : Map(p);
    }

    public async Task<PermissionResponseDto> CreateAsync(PermissionCreateDto dto)
    {
        var resolved = await ResolveAndValidateAsync(dto.RoleId, dto.MenuId, dto.SubMenuId, ignorePermissionId: null);

        var entity = new Permission
        {
            Id = Guid.NewGuid(),
            RoleId = resolved.RoleId,
            MenuId = resolved.MenuId,
            SubMenuId = resolved.SubMenuId
        };

        _db.Permissions.Add(entity);
        await _db.SaveChangesAsync();

        var created = await _db.Permissions
            .AsNoTracking()
            .Include(p => p.Role)
            .Include(p => p.Menu)
            .Include(p => p.SubMenu)
            .FirstAsync(p => p.Id == entity.Id);

        return Map(created);
    }

    public async Task<PermissionResponseDto?> UpdateAsync(Guid id, PermissionUpdateDto dto)
    {
        var entity = await _db.Permissions.FirstOrDefaultAsync(p => p.Id == id);
        if (entity is null) return null;

        var resolved = await ResolveAndValidateAsync(dto.RoleId, dto.MenuId, dto.SubMenuId, ignorePermissionId: id);

        entity.RoleId = resolved.RoleId;
        entity.MenuId = resolved.MenuId;
        entity.SubMenuId = resolved.SubMenuId;

        await _db.SaveChangesAsync();

        var updated = await _db.Permissions
            .AsNoTracking()
            .Include(p => p.Role)
            .Include(p => p.Menu)
            .Include(p => p.SubMenu)
            .FirstAsync(p => p.Id == entity.Id);

        return Map(updated);
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var entity = await _db.Permissions.FirstOrDefaultAsync(p => p.Id == id);
        if (entity is null) return false;

        _db.Permissions.Remove(entity);
        await _db.SaveChangesAsync();
        return true;
    }

    // ✅ IMPORTANTE: Expression para o EF conseguir traduzir no SQL e manter IQueryable
    private static Expression<Func<Permission, PermissionResponseDto>> MapToDtoExpr() => p => new PermissionResponseDto
    {
        Id = p.Id,
        RoleId = p.RoleId,
        RoleNome = p.Role.Nome,
        MenuId = p.MenuId,
        MenuNome = p.Menu != null ? p.Menu.Nome : null,
        SubMenuId = p.SubMenuId,
        SubMenuNome = p.SubMenu != null ? p.SubMenu.Nome : null
    };

    private static PermissionResponseDto Map(Permission p) => new PermissionResponseDto
    {
        Id = p.Id,
        RoleId = p.RoleId,
        RoleNome = p.Role?.Nome,
        MenuId = p.MenuId,
        MenuNome = p.Menu?.Nome,
        SubMenuId = p.SubMenuId,
        SubMenuNome = p.SubMenu?.Nome
    };

    private async Task<(Guid RoleId, Guid? MenuId, Guid? SubMenuId)> ResolveAndValidateAsync(
        Guid roleId,
        Guid? menuId,
        Guid? subMenuId,
        Guid? ignorePermissionId
    )
    {
        if (menuId is null && subMenuId is null)
            throw new InvalidOperationException("MenuId or SubMenuId must be provided.");

        if (!await _db.Roles.AnyAsync(r => r.Id == roleId))
            throw new InvalidOperationException("RoleId is invalid.");

        Guid? finalMenuId = menuId;
        Guid? finalSubMenuId = subMenuId;

        if (finalSubMenuId is not null)
        {
            var sm = await _db.SubMenus.AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == finalSubMenuId.Value);

            if (sm is null)
                throw new InvalidOperationException("SubMenuId is invalid.");

            if (finalMenuId is null) finalMenuId = sm.MenuId;
            else if (finalMenuId.Value != sm.MenuId)
                throw new InvalidOperationException("MenuId must match SubMenu.MenuId.");
        }

        if (finalMenuId is not null)
        {
            if (!await _db.Menus.AnyAsync(m => m.Id == finalMenuId.Value))
                throw new InvalidOperationException("MenuId is invalid.");
        }

        var dupQuery = _db.Permissions.AsQueryable()
            .Where(p => p.RoleId == roleId && p.MenuId == finalMenuId && p.SubMenuId == finalSubMenuId);

        if (ignorePermissionId.HasValue)
            dupQuery = dupQuery.Where(p => p.Id != ignorePermissionId.Value);

        if (await dupQuery.AnyAsync())
            throw new InvalidOperationException("This permission already exists for this role.");

        return (roleId, finalMenuId, finalSubMenuId);
    }
}