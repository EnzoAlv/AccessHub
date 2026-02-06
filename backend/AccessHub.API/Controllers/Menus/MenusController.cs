using AccessHub.API.DTOs.Menus;
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

    // GET api/menus
    [HttpGet]
    public async Task<IActionResult> GetMenus()
    {
        return Ok(await _menuService.GetAllAsync());
    }

    // GET api/menus/{id}
    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetMenuById(Guid id)
    {
        var menu = await _menuService.GetByIdAsync(id);
        if (menu == null) return NotFound();

        return Ok(menu);
    }

    // POST api/menus
    [HttpPost]
    public async Task<IActionResult> CreateMenu(CreateMenuDto dto)
    {
        var id = await _menuService.CreateAsync(dto);
        return CreatedAtAction(nameof(GetMenuById), new { id }, null);
    }

    // PUT api/menus/{id}
    [HttpPut("{id:guid}")]
    public async Task<IActionResult> UpdateMenu(Guid id, UpdateMenuDto dto)
    {
        var updated = await _menuService.UpdateAsync(id, dto);
        if (!updated) return NotFound();

        return NoContent();
    }

    // DELETE api/menus/{id}
    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> DeleteMenu(Guid id)
    {
        try
        {
            var deleted = await _menuService.DeleteAsync(id);
            if (!deleted) return NotFound();

            return NoContent();
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}