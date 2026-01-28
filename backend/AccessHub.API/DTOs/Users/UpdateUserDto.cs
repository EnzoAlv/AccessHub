namespace AccessHub.API.DTOs.Users;

public class UpdateUserDto
{
    public string Nome { get; set; } = null!;
    public string Email { get; set; } = null!;
    public Guid RoleId { get; set; }
}
