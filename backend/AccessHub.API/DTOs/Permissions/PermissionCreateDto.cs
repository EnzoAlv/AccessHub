using System.ComponentModel.DataAnnotations;

namespace AccessHub.API.DTOs.Permissions;

public class PermissionCreateDto
{
    [Required]
    public Guid RoleId { get; set; }

    public Guid? MenuId { get; set; }
    public Guid? SubMenuId { get; set; }
}