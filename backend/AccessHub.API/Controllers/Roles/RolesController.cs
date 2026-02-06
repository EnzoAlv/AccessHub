using AccessHub.API.DTOs.Roles;
using AccessHub.API.Services.Roles;
using Microsoft.AspNetCore.Mvc;

namespace AccessHub.API.Controllers.Roles;

[ApiController]
[Route("api/roles")]
public class RolesController : ControllerBase
{
    private readonly IRoleService _roleService;

    public RolesController(IRoleService roleService)
    {
        _roleService = roleService;
    }

    // GET api/roles
    [HttpGet]
    public async Task<IActionResult> GetRoles()
    {
        var roles = await _roleService.GetAllAsync();
        return Ok(roles);
    }

    // GET api/roles/{id}
    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetRoleById(Guid id)
    {
        var role = await _roleService.GetByIdAsync(id);
        if (role == null)
            return NotFound();

        return Ok(role);
    }

    // POST api/roles
    [HttpPost]
    public async Task<IActionResult> CreateRole(CreateRoleDto dto)
    {
        try
        {
            var id = await _roleService.CreateAsync(dto);
            return CreatedAtAction(nameof(GetRoleById), new { id }, null);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    // PUT api/roles/{id}
    [HttpPut("{id:guid}")]
    public async Task<IActionResult> UpdateRole(Guid id, UpdateRoleDto dto)
    {
        var updated = await _roleService.UpdateAsync(id, dto);
        if (!updated)
            return NotFound();

        return NoContent();
    }

    // DELETE api/roles/{id}
    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> DeleteRole(Guid id)
    {
        try
        {
            var deleted = await _roleService.DeleteAsync(id);
            if (!deleted)
                return NotFound();

            return NoContent();
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}