using AccessHub.API.Services.Menus;
using Microsoft.AspNetCore.Mvc;

namespace AccessHub.API.Controllers.Menus;

[ApiController]
[Route("api/menus")]
public class MenusController : ControllerBase
{
    private readonly IMenuService _menuService;

    public MenusController(IMenuService menuService)
    {
        _menuService = menuService;
    }

    // GET api/menus/role/{roleId}
    [HttpGet("role/{roleId:guid}")]
    public async Task<IActionResult> GetMenusByRole(Guid roleId)
    {
        var menus = await _menuService.GetMenusByRoleAsync(roleId);
        return Ok(menus);
    }
}
