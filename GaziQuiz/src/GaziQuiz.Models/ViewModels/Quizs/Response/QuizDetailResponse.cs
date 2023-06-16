namespace GaziQuiz.Models.ViewModels.Quizs.Response;

#nullable disable

public class QuizDetailResponse
{
    public QuizDetailResponse()
    {
        StudentsDetail = new List<QuizStudentDetailDto>();
    }

    public int CorrectCount { get; set; } = 0;
    public int WrongCount { get; set; } = 0;
    public int TotalStudentCount { get; set; } = 0;
    public int EntryStudentCount { get; set; } = 0;
    public List<QuizStudentDetailDto> StudentsDetail { get; init; }
}

public class QuizStudentDetailDto
{
    public string Id { get; init; }
    public string FullName { get; init; }
    public int CorrectCount { get; set; } = 0;
    public int WrongCount { get; set; } = 0;
}