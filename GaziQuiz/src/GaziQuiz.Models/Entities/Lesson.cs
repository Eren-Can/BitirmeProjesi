using CorePackages.Models;
using GaziQuiz.Models.Entities.CrossTables;

namespace GaziQuiz.Models.Entities;

#nullable disable
public class Lesson : BaseEntity
{
    public string TeacherId { get; set; }
    public string Name { get; set; }

    public Lesson()
    {
        Topics = new HashSet<Topic>();
        Students = new HashSet<StudentLesson>();
    }

    public Teacher Teacher { get; set; }
    public ICollection<Topic> Topics { get; set; }
    public ICollection<StudentLesson> Students { get; set; }
}

