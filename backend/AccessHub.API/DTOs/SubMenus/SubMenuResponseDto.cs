namespace AccessHub.API.DTOs.SubMenus;

public class SubMenuResponseDto
{
    public Guid Id { get; set; }
    public string Nome { get; set; } = null!;
    public string Rota { get; set; } = null!;
    public Guid MenuId { get; set; }
    public string MenuNome { get; set; } = null!;
}