using GaziQuiz.Models.Entities.CrossTables;

namespace GaziQuiz.Models.Entities;

#nullable disable
public class Student : User
{
    public string SchoolNumber { get; set; }

    public Student()
    {
        Results = new HashSet<Result>();
        Lessons = new HashSet<StudentLesson>();
        Quizs = new HashSet<StudentQuiz>();
    }

    public virtual ICollection<Result> Results { get; set; }
    public virtual ICollection<StudentLesson> Lessons { get; set; }
    public virtual ICollection<StudentQuiz> Quizs { get; set; }
}

