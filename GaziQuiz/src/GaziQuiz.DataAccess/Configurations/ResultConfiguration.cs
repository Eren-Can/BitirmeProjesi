using GaziQuiz.Models.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace GaziQuiz.DataAccess.Configurations;

public class ResultConfiguration : IEntityTypeConfiguration<Result>
{
    public void Configure(EntityTypeBuilder<Result> builder)
    {
        builder.HasKey(x => x.Id);
        builder.ToTable("Results");

        builder.HasOne(x => x.Student)
           .WithMany(x => x.Results)
           .HasForeignKey(x => x.StudentId)
           .OnDelete(DeleteBehavior.ClientSetNull);

        builder.HasOne(x => x.Quiz)
           .WithMany(x => x.Results)
           .HasForeignKey(x => x.QuizId)
           .OnDelete(DeleteBehavior.ClientSetNull);
    }
}
