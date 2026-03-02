namespace AccessHub.API.DTOs.Permissions;

public class PermissionResponseDto
{
    public Guid Id { get; set; }

    public Guid RoleId { get; set; }
    public string? RoleNome { get; set; }

    public Guid? MenuId { get; set; }
    public string? MenuNome { get; set; }

    public Guid? SubMenuId { get; set; }
    public string? SubMenuNome { get; set; }
}