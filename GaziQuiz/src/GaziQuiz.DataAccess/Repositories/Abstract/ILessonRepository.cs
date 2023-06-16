using CorePackages.DataAccess.Repositories;
using GaziQuiz.Models.Entities;
using GaziQuiz.Models.ViewModels.Lessons.Request;

namespace GaziQuiz.DataAccess.Repositories.Abstract;

public interface ILessonRepository : IRepositoryBase<Lesson>
{
    Task AddStudents(AddStudentsToLessonRequest model);
    Task<int> TotalStudents(string lessonId);
}
