using AccessHub.API.DTOs.Menus;

namespace AccessHub.API.Services.Menus;

public interface IMenuService
{
    Task<List<MenuResponseDto>> GetMenusByRoleAsync(Guid roleId);
}
