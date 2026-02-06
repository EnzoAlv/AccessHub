using AccessHub.API.DTOs.Roles;

namespace AccessHub.API.Services.Roles;

public interface IRoleService
{
    Task<List<RoleResponseDto>> GetAllAsync();
    Task<RoleResponseDto?> GetByIdAsync(Guid id);
    Task<Guid> CreateAsync(CreateRoleDto dto);
    Task<bool> UpdateAsync(Guid id, UpdateRoleDto dto);
    Task<bool> DeleteAsync(Guid id);
}