using GaziQuiz.Models.Constants;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace GaziQuiz.DataAccess.Configurations.Identity;

public class RoleConfiguration : IEntityTypeConfiguration<IdentityRole>
{
    public void Configure(EntityTypeBuilder<IdentityRole> builder)
    {

        builder.HasData(
            new IdentityRole
            {
                Name = Roles.Admin,
                NormalizedName = "ADMIN"
            },
            new IdentityRole
            {
                Name = Roles.Teacher,
                NormalizedName = "TEACHER"
            },
            new IdentityRole
            {
                Name = Roles.Student,
                NormalizedName = "STUDENT"
            });
    }
}