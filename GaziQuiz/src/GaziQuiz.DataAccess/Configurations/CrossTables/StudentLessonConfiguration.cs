using GaziQuiz.Models.Entities.CrossTables;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace GaziQuiz.DataAccess.Configurations.CrossTables;

public class StudentLessonConfiguration : IEntityTypeConfiguration<StudentLesson>
{
    public void Configure(EntityTypeBuilder<StudentLesson> builder)
    {
        builder.HasKey(x => new { x.StudentId, x.LessonId });
        builder.ToTable("StudentLessons");

        builder.HasOne(x => x.Lesson)
            .WithMany(x => x.Students)
            .HasForeignKey(x => x.LessonId)
           .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(x => x.Student)
            .WithMany(x => x.Lessons)
            .HasForeignKey(x => x.StudentId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
