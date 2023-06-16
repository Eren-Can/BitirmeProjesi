namespace GaziQuiz.Models.ViewModels.Quizs.Response;

#nullable disable
public class QuizTableInfoResponse
{ 
    public string Id { get; init; }
    public string Name { get; init; }
    public string LessonName { get; init; }
    public int StudentCount { get; init; }
    public DateTime Date { get; init; }
}