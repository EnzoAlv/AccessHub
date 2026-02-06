namespace AccessHub.API.DTOs.SubMenus;

public class UpdateSubMenuDto
{
    public string Nome { get; set; } = null!;
    public string Rota { get; set; } = null!;
    public Guid MenuId { get; set; }
}