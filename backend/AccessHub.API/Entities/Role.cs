using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AccessHub.API.Entities;

public class Role
{
    [Key]
    [Column("id")]
    public Guid Id { get; set; }
    [Column("name")]
    public string Nome { get; set; } = null!;

    public ICollection<User> Users { get; set; } = new List<User>();

    public ICollection<Permission> Permissions { get; set; } = new List<Permission>();
}

