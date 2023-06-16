using GaziQuiz.Models.Entities.CrossTables;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace GaziQuiz.DataAccess.Configurations.CrossTables;

public class StudentQuizConfiguration : IEntityTypeConfiguration<StudentQuiz>
{
    public void Configure(EntityTypeBuilder<StudentQuiz> builder)
    {
        builder.HasKey(x => new { x.QuizId, x.StudentId });
        builder.ToTable("StudentQuizs");

        builder.HasOne(x => x.Quiz)
             .WithMany(x => x.Students)
             .HasForeignKey(x => x.QuizId)
            .OnDelete(DeleteBehavior.Cascade);
        //.OnDelete(DeleteBehavior.ClientSetNull);

        builder.HasOne(x => x.Student)
            .WithMany(x => x.Quizs)
            .HasForeignKey(x => x.StudentId)
            .OnDelete(DeleteBehavior.Cascade);
        //.OnDelete(DeleteBehavior.ClientSetNull);
    }
}
