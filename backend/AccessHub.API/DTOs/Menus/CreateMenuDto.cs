namespace AccessHub.API.DTOs.Menus;

public class CreateMenuDto
{
    public string Nome { get; set; } = null!;
    public string Icone { get; set; } = null!;
    public string Rota { get; set; } = null!;
}