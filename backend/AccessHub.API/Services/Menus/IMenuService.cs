using AccessHub.API.DTOs.Menus;

namespace AccessHub.API.Services.Menus;

public interface IMenuService
{
    Task<List<MenuResponseDto>> GetAllAsync();
    Task<MenuResponseDto?> GetByIdAsync(Guid id);
    Task<Guid> CreateAsync(CreateMenuDto dto);
    Task<bool> UpdateAsync(Guid id, UpdateMenuDto dto);
    Task<bool> DeleteAsync(Guid id);
}