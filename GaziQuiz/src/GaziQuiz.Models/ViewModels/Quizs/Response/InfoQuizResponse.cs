namespace GaziQuiz.Models.ViewModels.Quizs.Response;

#nullable disable
public class InfoQuizResponse
{
    public InfoQuizResponse()
    {
        Questions = new List<QuestionInfo>();
    }

    public string QuizId { get; init; }
    public ICollection<QuestionInfo> Questions { get; init; }
}

public class QuestionInfo
{
    public string QuestionId { get; init; }
    public int Difficulty { get; init; }
    public int Time { get; init; }
    public string Content { get; init; }
}
