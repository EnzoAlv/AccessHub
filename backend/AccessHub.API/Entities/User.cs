using AccessHub.API.Entities;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class User
{
    [Key]
    [Column("id")]
    public Guid Id { get; set; }

    [Column("nome")]
    public string Nome { get; set; } = null!;

    [Column("email")]
    public string Email { get; set; } = null!;

    [Column("senha_hash")]
    public string SenhaHash { get; set; } = null!;

    [Column("role_id")]
    [ForeignKey("Role")]
    public Guid RoleId { get; set; }

    public virtual Role Role { get; set; } = null!;
}
