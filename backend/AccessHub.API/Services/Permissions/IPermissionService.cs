using AccessHub.API.DTOs.Permissions;

namespace AccessHub.API.Services.Permissions;

public interface IPermissionService
{
    Task<List<PermissionResponseDto>> GetAllAsync(Guid? roleId, Guid? menuId, Guid? subMenuId);
    Task<PermissionResponseDto?> GetByIdAsync(Guid id);

    Task<PermissionResponseDto> CreateAsync(PermissionCreateDto dto);
    Task<PermissionResponseDto?> UpdateAsync(Guid id, PermissionUpdateDto dto);
    Task<bool> DeleteAsync(Guid id);
}