using AccessHub.API.DTOs.SubMenus;

namespace AccessHub.API.Services.SubMenus;

public interface ISubMenuService
{
    Task<List<SubMenuResponseDto>> GetAllAsync();
    Task<SubMenuResponseDto?> GetByIdAsync(Guid id);
    Task<Guid> CreateAsync(CreateSubMenuDto dto);
    Task<bool> UpdateAsync(Guid id, UpdateSubMenuDto dto);
    Task<bool> DeleteAsync(Guid id);
}