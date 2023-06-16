using GaziQuiz.Models.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace GaziQuiz.DataAccess.Configurations;

public class TopicConfiguration : IEntityTypeConfiguration<Topic>
{
    public void Configure(EntityTypeBuilder<Topic> builder)
    {
        builder.HasKey(x => x.Id);
        builder.ToTable("Topics");

        builder
            .Property(x => x.Name)
            .HasMaxLength(50)
            .IsRequired();

        builder.HasOne(x => x.Lesson)
           .WithMany(x => x.Topics)
           .HasForeignKey(x => x.LessonId)
           .OnDelete(DeleteBehavior.ClientSetNull);
    }
}
