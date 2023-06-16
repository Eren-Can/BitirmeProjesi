using System.ComponentModel.DataAnnotations;

namespace GaziQuiz.Models.ViewModels.Lessons.Request;

#nullable disable
public class AddStudentsToLessonRequest
{
    [Required(ErrorMessage = "Zorunlu Alan")]
    public List<string> StudentIds { get; init; }

    [Required(ErrorMessage = "Zorunlu Alan")]
    public string LessonId { get; init; }
}