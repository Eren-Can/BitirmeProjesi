namespace GaziQuiz.Models.Entities.CrossTables;

#nullable disable
public class StudentQuiz
{
    public string StudentId { get; set; }
    public string QuizId { get; set; }

    public Student Student { get; set; }
    public Quiz Quiz { get; set; }
}
