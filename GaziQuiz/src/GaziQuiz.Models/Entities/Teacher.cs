namespace GaziQuiz.Models.Entities;

public class Teacher : User
{
    public Teacher()
    {
        Lessons = new HashSet<Lesson>();
    }

    public ICollection<Lesson> Lessons { get; set; }
}

