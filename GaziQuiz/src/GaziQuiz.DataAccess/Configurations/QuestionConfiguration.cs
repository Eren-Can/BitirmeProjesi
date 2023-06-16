using GaziQuiz.Models.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace GaziQuiz.DataAccess.Configurations;

public class QuestionConfiguration : IEntityTypeConfiguration<Question>
{
    public void Configure(EntityTypeBuilder<Question> builder)
    {
        builder.HasKey(x => x.Id);
        builder.ToTable("Questions");

        builder
            .Property(x => x.TopicId)
            .IsRequired();

        builder
            .Property(x => x.Difficulty)
            .IsRequired();

        builder
            .Property(x => x.Answer)
            .HasMaxLength(2)
            .IsRequired();

        builder
            .Property(x => x.Content)
            .IsRequired();

        builder.HasOne(x => x.Topic)
           .WithMany(x => x.Questions)
           .HasForeignKey(x => x.TopicId)
           .OnDelete(DeleteBehavior.ClientSetNull);
    }
}