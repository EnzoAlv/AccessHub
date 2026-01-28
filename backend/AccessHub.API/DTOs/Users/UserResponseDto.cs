namespace AccessHub.API.DTOs.Users;

public class UserResponseDto
{
    public Guid Id { get; set; }
    public string Nome { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string Role { get; set; } = null!;
}