using GaziQuiz.Models.Entities;
using GaziQuiz.Models.Entities.CrossTables;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace GaziQuiz.DataAccess.Contexts;

#nullable disable
public class GaziQuizDbContext : IdentityDbContext<User, IdentityRole<string>, string>
{
    public GaziQuizDbContext(DbContextOptions<GaziQuizDbContext> options) : base(options)
    {
        
    }

    public DbSet<Answer> Answers { get; set; }
    public DbSet<Lesson> Lessons { get; set; }
    public DbSet<Question> Questions { get; set; }
    public DbSet<Quiz> Quizs { get; set; }
    public DbSet<Result> Results { get; set; }
    public DbSet<Student> Students { get; set; }
    public DbSet<Teacher> Teachers { get; set; }
    public DbSet<Topic> Topics { get; set; }

    public DbSet<StudentLesson> StudentLessons { get; set; }
    public DbSet<StudentQuiz> StudentQuizs { get; set; }
    public DbSet<QuestionQuiz> QuestionQuiz { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
    }

    //public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    //{
    //    var datas = ChangeTracker.Entries<BaseEntity>();

    //    foreach (var data in datas)
    //    {
    //        _ = data.State switch
    //        {
    //            EntityState.Added => data.Entity.Id = Guid.NewGuid().ToString(),
    //            EntityState.Modified => null,
    //            _ => null
    //        };
    //    }

    //    return base.SaveChangesAsync(cancellationToken);
    //}
}