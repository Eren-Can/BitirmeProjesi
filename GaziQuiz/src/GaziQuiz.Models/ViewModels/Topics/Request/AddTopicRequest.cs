using System.ComponentModel.DataAnnotations;

namespace GaziQuiz.Models.ViewModels.Topics.Request;

public class AddTopicRequest
{
    [Required(ErrorMessage = "Zorunlu Alan")]
    public string LessonId { get; init; } = string.Empty; 
    
    [Required(ErrorMessage = "Zorunlu Alan")]
    [MaxLength(50, ErrorMessage = "En fazla 50 karakter içermelidir")]
    public string Name { get; init; } = string.Empty;
}