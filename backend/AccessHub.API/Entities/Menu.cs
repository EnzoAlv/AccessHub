using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AccessHub.API.Entities;

public class Menu
{
    [Key]
    [Column("id")]
    public Guid Id { get; set; }

    [Column("nome")]
    public string Nome { get; set; } = null!;

    [Column("icone")]
    public string Icone { get; set; } = null!;

    [Column("rota")]
    public string Rota { get; set; } = null!;
    
    public ICollection<SubMenu> SubMenus { get; set; } = new List<SubMenu>();

    public ICollection<Permission> Permissions { get; set; } = new List<Permission>();
}