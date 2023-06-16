using System.ComponentModel.DataAnnotations;

namespace GaziQuiz.Models.ViewModels.Results.Request;

#nullable disable
public class AddResultRequest
{
    public AddResultRequest()
    {
        Answers = new List<AddAnswerDto>();
    }

    [Required(ErrorMessage = "Zorunlu Alan")]
    public string QuizId { get; init; }


    [Required(ErrorMessage = "Zorunlu Alan")]
    public ICollection<AddAnswerDto> Answers { get; init; }


    [Required(ErrorMessage = "Zorunlu Alan")]
    public int TotalTime { get; init; }
}

public class AddAnswerDto
{
    [Required(ErrorMessage = "Zorunlu Alan")]
    public string QuestionId { get; init; }


    [Required(ErrorMessage = "Zorunlu Alan")]
    public string Reply { get; init; } = string.Empty;


    [Required(ErrorMessage = "Zorunlu Alan")]
    public int Time { get; init; }
}
