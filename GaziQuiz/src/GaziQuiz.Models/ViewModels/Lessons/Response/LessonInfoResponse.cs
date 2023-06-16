namespace GaziQuiz.Models.ViewModels.Lessons.Response;

public class LessonInfoResponse
{
    public string Id { get; init; } = string.Empty;
    public string Name { get; init; } = string.Empty;
    public int StudentCount { get; init; }
    public int TopicCount { get; init; }
}
