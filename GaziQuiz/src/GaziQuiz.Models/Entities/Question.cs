using CorePackages.Models;
using GaziQuiz.Models.Entities.CrossTables;

namespace GaziQuiz.Models.Entities;

#nullable disable
public class Question : BaseEntity
{
    public string TopicId { get; set; }
    public int Difficulty { get; set; }
    public int Time { get; set; }
    public string Answer { get; set; }
    public string Content { get; set; }
    public bool IsActive { get; set; }

    public Question()
    {
        Answers = new HashSet<Answer>();
        Quizs = new HashSet<QuestionQuiz>();
    }

    public Topic Topic { get; set; }
    public ICollection<Answer> Answers { get; set; }
    public ICollection<QuestionQuiz> Quizs { get; set; }
}

