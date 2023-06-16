using CorePackages.Models;
using GaziQuiz.Models.Entities.CrossTables;

namespace GaziQuiz.Models.Entities;

#nullable disable
public class Quiz : BaseEntity
{
    public string TopicId { get; set; }
    public string Name { get; set; }
    public int Time { get; set; }
    public decimal Latitude { get; set; }
    public decimal Longitude { get; set; }
    public DateTime CreatedDate { get; set; }

    public Quiz()
    {
        Results = new HashSet<Result>();
        Students = new HashSet<StudentQuiz>();
        Questions = new HashSet<QuestionQuiz>();
    }

    public Topic Topic { get; set; }
    public ICollection<Result> Results { get; set; }
    public ICollection<StudentQuiz> Students { get; set; }
    public ICollection<QuestionQuiz> Questions { get; set; }
}

