using CorePackages.Models;

namespace GaziQuiz.Models.Entities;

#nullable disable
public class Topic : BaseEntity
{
    public string LessonId { get; set; }
    public string Name { get; set; }

    public Topic()
    {
        Questions = new HashSet<Question>();
        Quizs = new HashSet<Quiz>();
    }

    public Lesson Lesson { get; set; }
    public ICollection<Question> Questions { get; set; }
    public ICollection<Quiz> Quizs { get; set; }
}

