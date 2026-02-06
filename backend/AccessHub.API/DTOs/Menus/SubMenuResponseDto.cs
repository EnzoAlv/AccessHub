namespace AccessHub.API.DTOs.Menus;

public class SubMenuResponseDto
{
    public Guid Id { get; set; }
    public string Nome { get; set; } = null!;
    public string Rota { get; set; } = null!;
}
