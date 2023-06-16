using System.ComponentModel.DataAnnotations;

namespace GaziQuiz.Models.ViewModels.Quizs.Request;

public class AddQuizRequest
{
    [Required(ErrorMessage = "Zorunlu Alan")]
    public string TopicId { get; init; } = string.Empty;

    [Required(ErrorMessage = "Zorunlu Alan")]
    [MaxLength(50, ErrorMessage = "En fazla 50 karakter içermelidir")]
    public string Name { get; init; } = string.Empty;

    public decimal Latitude { get; init; }
    public decimal Longitude { get; init; }
    public int Time { get; init; }
    public int EasyQuestionCount { get; init; }
    public int MidQuestionCount { get; init; }
    public int HardQuestionCount { get; init; }
}
