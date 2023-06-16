using GaziQuiz.DataAccess.Contexts;
using GaziQuiz.Models.Entities;
using Microsoft.AspNetCore.Identity;

namespace GaziQuiz.WebApi.Extensions;

public static class IdentityExtension
{
    public static void ConfigureIdentity(this IServiceCollection services)
    {
        services.AddIdentity<User, IdentityRole<string>>(option =>
        {
            option.Password.RequireDigit = false;
            option.Password.RequireLowercase = false;
            option.Password.RequireUppercase = false;
            option.Password.RequireNonAlphanumeric = false;
            option.Password.RequiredLength = 6;

            option.Lockout.MaxFailedAccessAttempts = 5; // Max hatalı giriş sayısı
            option.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5); // Bekleme süresi
            option.Lockout.AllowedForNewUsers = true; // Yeni kullanıcılarda geçerli olsun mu?

            option.User.RequireUniqueEmail = true;

            option.SignIn.RequireConfirmedPhoneNumber = false; // Giriş için telefon doğrulama şart mı?
            option.SignIn.RequireConfirmedEmail = false; // Giriş için email doğrulama şart mı?
        })
        .AddEntityFrameworkStores<GaziQuizDbContext>()
        .AddDefaultTokenProviders();
    }
}
