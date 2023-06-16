namespace GaziQuiz.Models.ViewModels.Topics.Response;

public class TopicInfoResponse
{
    public string Id { get; init; } = string.Empty;
    public string Name { get; init; } = string.Empty;
    public string LessonName { get; init; } = string.Empty;
    public int QuestionCount { get; init; }
    public int QuizCount { get; init; }
}
