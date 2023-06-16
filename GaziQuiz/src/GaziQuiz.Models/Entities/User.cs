using CorePackages.Models;
using Microsoft.AspNetCore.Identity;

namespace GaziQuiz.Models.Entities;

#nullable disable
public class User : IdentityUser<string>
{
    public string FullName { get; set; }
    public bool IsActive { get; set; }
    public DateTime CreatedDate { get; set; }
}

