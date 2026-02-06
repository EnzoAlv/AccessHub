namespace AccessHub.API.DTOs.Menus;

public class MenuResponseDto
{
    public Guid Id { get; set; }
    public string Nome { get; set; } = null!;
    public string Icone { get; set; } = null!;
    public string Rota { get; set; } = null!;
    public List<SubMenuResponseDto> SubMenus { get; set; } = new();
}
