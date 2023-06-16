using GaziQuiz.Models.Entities.CrossTables;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace GaziQuiz.DataAccess.Configurations.CrossTables;

public class QuestionQuizConfiguration : IEntityTypeConfiguration<QuestionQuiz>
{
    public void Configure(EntityTypeBuilder<QuestionQuiz> builder)
    {
        builder.HasKey(x => new { x.QuestionId, x.QuizId }); 
        builder.ToTable("QuestionQuizs");

        builder.HasOne(x => x.Question)
           .WithMany(x => x.Quizs)
           .HasForeignKey(x => x.QuestionId)
           .OnDelete(DeleteBehavior.Cascade);
        //.OnDelete(DeleteBehavior.ClientSetNull);

        builder.HasOne(x => x.Quiz)
            .WithMany(x => x.Questions)
            .HasForeignKey(x => x.QuizId)
            .OnDelete(DeleteBehavior.Cascade);
        //.OnDelete(DeleteBehavior.ClientSetNull);
    }
}
