using CorePackages.Models;

namespace GaziQuiz.Models.Entities;

#nullable disable
public class Answer : BaseEntity
{
    public string ResultId { get; set; }
    public string QuestionId { get; set; }
    public int Time { get; set; }
    public string Reply { get; set; }
    public bool IsTrue { get; set; }

    public Result Result { get; set; }
    public Question Question { get; set; }
}

