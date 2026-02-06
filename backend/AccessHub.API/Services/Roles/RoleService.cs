using AccessHub.API.Data;
using AccessHub.API.DTOs.Roles;
using AccessHub.API.Entities;
using Microsoft.EntityFrameworkCore;

namespace AccessHub.API.Services.Roles;

public class RoleService : IRoleService
{
    private readonly AppDbContext _context;

    public RoleService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<RoleResponseDto>> GetAllAsync()
    {
        return await _context.Roles
            .Select(r => new RoleResponseDto
            {
                Id = r.Id,
                Nome = r.Nome
            })
            .ToListAsync();
    }

    public async Task<RoleResponseDto?> GetByIdAsync(Guid id)
    {
        return await _context.Roles
            .Where(r => r.Id == id)
            .Select(r => new RoleResponseDto
            {
                Id = r.Id,
                Nome = r.Nome
            })
            .FirstOrDefaultAsync();
    }

    public async Task<Guid> CreateAsync(CreateRoleDto dto)
    {
        var exists = await _context.Roles.AnyAsync(r => r.Nome == dto.Nome);
        if (exists)
            throw new Exception("Role já existe");

        var role = new Role
        {
            Id = Guid.NewGuid(),
            Nome = dto.Nome
        };

        _context.Roles.Add(role);
        await _context.SaveChangesAsync();

        return role.Id;
    }

    public async Task<bool> UpdateAsync(Guid id, UpdateRoleDto dto)
    {
        var role = await _context.Roles.FindAsync(id);
        if (role == null) return false;

        role.Nome = dto.Nome;
        await _context.SaveChangesAsync();

        return true;
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var role = await _context.Roles
            .Include(r => r.Users)
            .FirstOrDefaultAsync(r => r.Id == id);

        if (role == null) return false;

        if (role.Users.Any())
            throw new Exception("Role possui usuários associados");

        _context.Roles.Remove(role);
        await _context.SaveChangesAsync();

        return true;
    }
}