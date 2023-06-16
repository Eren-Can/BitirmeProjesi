using CorePackages.Models;

namespace GaziQuiz.Models.Entities;

#nullable disable
public class Result : BaseEntity
{
    public string StudentId { get; set; }
    public string QuizId { get; set; }
    public int TotalTime { get; set; }

    public Result()
    {
        Answers = new HashSet<Answer>();
    }

    public Student Student { get; set; }
    public Quiz Quiz { get; set; }
    public ICollection<Answer> Answers { get; set; }
}

