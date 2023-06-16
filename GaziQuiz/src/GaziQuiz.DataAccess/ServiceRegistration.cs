using GaziQuiz.DataAccess.Contexts;
using GaziQuiz.DataAccess.UnitOfWork;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace GaziQuiz.DataAccess;

public static class ServiceRegistration
{
    public static void AddDataAccessServices(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddScoped<IRepositoryManager, RepositoryManager>();

        #region Database Context
        services.AddDbContext<GaziQuizDbContext>(options =>
        {
            options.UseSqlServer(configuration.GetConnectionString("Context"));
        });
        #endregion
    }
}
