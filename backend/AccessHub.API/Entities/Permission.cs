using AccessHub.API.Entities;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Permission
{
    [Key]
    [Column("id")]
    public Guid Id { get; set; }

    [Column("role_id")]
    public Guid RoleId { get; set; }

    public Role Role { get; set; } = null!;

    [Column("menu_id")]
    public Guid? MenuId { get; set; }

    public virtual Menu? Menu { get; set; }

    [Column("sub_menu_id")]
    public Guid? SubMenuId { get; set; }

    public SubMenu? SubMenu { get; set; }
}
