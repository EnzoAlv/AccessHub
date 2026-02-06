using AccessHub.API.Data;
using AccessHub.API.DTOs.Users;
using AccessHub.API.Services.Security;
using Microsoft.EntityFrameworkCore;

namespace AccessHub.API.Services.Users;

public class UserService : IUserService
{
    private readonly AppDbContext _context;

    public UserService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<UserResponseDto>> GetAllAsync()
    {
        return await _context.Users
            .Include(u => u.Role)
            .Select(u => new UserResponseDto
            {
                Id = u.Id,
                Nome = u.Nome,
                Email = u.Email,
                Role = u.Role.Nome
            })
            .ToListAsync();
    }

    public async Task<UserResponseDto?> GetByIdAsync(Guid id)
    {
        return await _context.Users
            .Include(u => u.Role)
            .Where(u => u.Id == id)
            .Select(u => new UserResponseDto
            {
                Id = u.Id,
                Nome = u.Nome,
                Email = u.Email,
                Role = u.Role.Nome
            })
            .FirstOrDefaultAsync();
    }

    public async Task<Guid> CreateAsync(CreateUserDto dto)
    {
        var role = await _context.Roles.FindAsync(dto.RoleId);
        if (role == null)
            throw new Exception("Role inválida");

        var user = new User
        {
            Id = Guid.NewGuid(),
            Nome = dto.Nome,
            Email = dto.Email,
            SenhaHash = PasswordHasher.Hash(dto.Senha),
            RoleId = dto.RoleId
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return user.Id;
    }

    public async Task<bool> UpdateAsync(Guid id, UpdateUserDto dto)
    {
        var user = await _context.Users.FindAsync(id);
        if (user == null) return false;

        var role = await _context.Roles.FindAsync(dto.RoleId);
        if (role == null) return false;

        user.Nome = dto.Nome;
        user.Email = dto.Email;
        user.RoleId = dto.RoleId;

        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var user = await _context.Users.FindAsync(id);
        if (user == null) return false;

        _context.Users.Remove(user);
        await _context.SaveChangesAsync();
        return true;
    }
}
