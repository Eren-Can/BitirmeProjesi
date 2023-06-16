using System.ComponentModel.DataAnnotations;

namespace GaziQuiz.Models.ViewModels.Questions.Request;

public class AddQuestionRequest
{
    [Required(ErrorMessage = "Zorunlu Alan")]
    [MaxLength(50, ErrorMessage = "En fazla 50 karakter içermelidir")]
    public string TopicId { get; init; } = string.Empty;

    [Required(ErrorMessage = "Zorunlu Alan")]
    public int Difficulty { get; init; }

    [Required(ErrorMessage = "Zorunlu Alan")]
    public int Time { get; init; }

    [Required(ErrorMessage = "Zorunlu Alan")]
    [StringLength(1, ErrorMessage = "1 karakter içermelidir")]
    public string Answer { get; init; } = string.Empty;

    [Required(ErrorMessage = "Zorunlu Alan")]
    public string Content { get; init; } = string.Empty;
}
