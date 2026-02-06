using AccessHub.API.DTOs.SubMenus;
using AccessHub.API.Services.SubMenus;
using Microsoft.AspNetCore.Mvc;

namespace AccessHub.API.Controllers.SubMenus;

[ApiController]
[Route("api/submenus")]
public class SubMenusController : ControllerBase
{
    private readonly ISubMenuService _subMenuService;

    public SubMenusController(ISubMenuService subMenuService)
    {
        _subMenuService = subMenuService;
    }

    // GET api/submenus
    [HttpGet]
    public async Task<IActionResult> GetSubMenus()
    {
        return Ok(await _subMenuService.GetAllAsync());
    }

    // GET api/submenus/{id}
    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetSubMenuById(Guid id)
    {
        var subMenu = await _subMenuService.GetByIdAsync(id);
        if (subMenu == null) return NotFound();

        return Ok(subMenu);
    }

    // POST api/submenus
    [HttpPost]
    public async Task<IActionResult> CreateSubMenu(CreateSubMenuDto dto)
    {
        try
        {
            var id = await _subMenuService.CreateAsync(dto);
            return CreatedAtAction(nameof(GetSubMenuById), new { id }, null);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    // PUT api/submenus/{id}
    [HttpPut("{id:guid}")]
    public async Task<IActionResult> UpdateSubMenu(Guid id, UpdateSubMenuDto dto)
    {
        try
        {
            var updated = await _subMenuService.UpdateAsync(id, dto);
            if (!updated) return NotFound();

            return NoContent();
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    // DELETE api/submenus/{id}
    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> DeleteSubMenu(Guid id)
    {
        try
        {
            var deleted = await _subMenuService.DeleteAsync(id);
            if (!deleted) return NotFound();

            return NoContent();
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}