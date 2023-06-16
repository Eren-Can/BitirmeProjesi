using GaziQuiz.Models.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace GaziQuiz.DataAccess.Configurations;

public class AnswerConfiguration : IEntityTypeConfiguration<Answer>
{
    public void Configure(EntityTypeBuilder<Answer> builder)
    {
        builder.HasKey(x => x.Id);
        builder.ToTable("Answers");

        builder
            .Property(x => x.Reply)
            .HasMaxLength(2);

        builder.HasOne(x => x.Result)
           .WithMany(x => x.Answers)
           .HasForeignKey(x => x.ResultId)
           .OnDelete(DeleteBehavior.Cascade);
        //.OnDelete(DeleteBehavior.ClientSetNull);

        builder.HasOne(x => x.Question)
           .WithMany(x => x.Answers)
           .HasForeignKey(x => x.QuestionId)
           .OnDelete(DeleteBehavior.Cascade);
        //.OnDelete(DeleteBehavior.ClientSetNull);
    }
}
