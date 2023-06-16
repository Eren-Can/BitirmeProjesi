using System.ComponentModel.DataAnnotations;

namespace GaziQuiz.Models.ViewModels.Quizs.Request;

public class AddStudentToQuizRequest
{
    [Required(ErrorMessage = "Zorunlu Alan")]
    public string QuizId { get; init; } = string.Empty;

    [Required(ErrorMessage = "Zorunlu Alan")]
    public decimal Latitude { get; init; }

    [Required(ErrorMessage = "Zorunlu Alan")]
    public decimal Longitude { get; init; }
}
