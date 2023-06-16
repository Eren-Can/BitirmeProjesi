using GaziQuiz.Models.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace GaziQuiz.DataAccess.Configurations;

public class QuizConfiguration : IEntityTypeConfiguration<Quiz>
{
    public void Configure(EntityTypeBuilder<Quiz> builder)
    {
        builder.HasKey(x => x.Id);
        builder.ToTable("Quizs");

        builder
            .Property(x => x.Name)
            .HasMaxLength(50)
            .IsRequired();

        builder
            .Property(x => x.Time)
            .IsRequired();

        builder
            .Property(x => x.Latitude)
            .HasPrecision(11, 7);

        builder
            .Property(x => x.Longitude)
            .HasPrecision(11, 7);

        builder.HasOne(x => x.Topic)
           .WithMany(x => x.Quizs)
           .HasForeignKey(x => x.TopicId)
           .OnDelete(DeleteBehavior.ClientSetNull);
    }
}