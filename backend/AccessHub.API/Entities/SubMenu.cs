using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AccessHub.API.Entities;

public class SubMenu
{
    [Key]
    [Column("id")]
    public Guid Id { get; set; }

    [Column("nome")]
    public string Nome { get; set; } = null!;

    [Column("rota")]
    public string Rota { get; set; } = null!;

    [Column("menu_id")]
    public Guid MenuId { get; set; }

    public Menu Menu { get; set; } = null!;

    public ICollection<Permission> Permissions { get; set; } = new List<Permission>();
}
