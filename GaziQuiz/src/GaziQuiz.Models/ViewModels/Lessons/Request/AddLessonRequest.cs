using System.ComponentModel.DataAnnotations;

namespace GaziQuiz.Models.ViewModels.Lessons.Request;

public class AddLessonRequest
{
    [Required(ErrorMessage = "Zorunlu Alan")]
    [MaxLength(50, ErrorMessage = "En fazla 50 karakter içermelidir")]
    public string Name { get; init; } = string.Empty;
}
