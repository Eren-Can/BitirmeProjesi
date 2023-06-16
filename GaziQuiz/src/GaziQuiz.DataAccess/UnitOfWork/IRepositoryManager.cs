using GaziQuiz.DataAccess.Repositories.Abstract;

namespace GaziQuiz.DataAccess.UnitOfWork;

public interface IRepositoryManager
{
    IAnswerRepository Answer { get; }
    ILessonRepository Lesson { get; }
    IQuestionRepository Question { get; }
    IQuizRepository Quiz { get; }
    IStudentRepository Student { get; }
    ITeacherRepository Teacher { get; }
    IResultRepository Result { get; }
    ITopicRepository Topic { get; }

    Task SaveAsync();
}
