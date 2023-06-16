namespace GaziQuiz.Models.ViewModels.Quizs.Response;

#nullable disable
public class ActiveQuizResponse
{
    public string Id { get; init; }
    public string QuizName { get; init; }
    public string LessonName { get; init; }
    public string TopicName { get; init; }
    public DateTime LastEntryDate { get; init; }
}