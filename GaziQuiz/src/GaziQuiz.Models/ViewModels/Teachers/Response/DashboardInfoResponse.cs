namespace GaziQuiz.Models.ViewModels.Teachers.Response;

public class DashboardInfoResponse
{
    public DashboardInfoResponse()
    {
        LessonDetails = new List<LessonInfo>();
    }

    public int LessonCount { get; init; }
    public int QuestionCount { get; init; }
    public int TopicCount { get; init; }
    public int QuizCount { get; init; }
    public List<LessonInfo> LessonDetails { get; init; }
}

public class LessonInfo
{
    public string LessonId { get; init; } = string.Empty;
    public string LessonName { get; init; } = string.Empty;
    public int QuestionCount { get; set; }
    public int TopicCount { get; set; }
    public int QuizCount { get; set; }
}