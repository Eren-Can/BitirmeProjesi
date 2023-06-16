namespace GaziQuiz.Models.Entities.CrossTables;

#nullable disable
public class QuestionQuiz
{
    public string QuestionId { get; set; }
    public string QuizId { get; set; }

    public Question Question { get; set; }
    public Quiz Quiz { get; set; }
}
