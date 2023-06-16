namespace GaziQuiz.Models.Entities.CrossTables;

#nullable disable
public class StudentLesson
{
    public string StudentId { get; set; }
    public string LessonId { get; set; }

    public Student Student { get; set; }
    public Lesson Lesson { get; set; }
}
