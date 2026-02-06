namespace AccessHub.API.DTOs.SubMenus;

public class CreateSubMenuDto
{
    public string Nome { get; set; } = null!;
    public string Rota { get; set; } = null!;
    public Guid MenuId { get; set; }
}