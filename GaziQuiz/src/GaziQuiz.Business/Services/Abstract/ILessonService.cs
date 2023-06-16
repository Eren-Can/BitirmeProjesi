using CorePackages.Utilities.Results;
using GaziQuiz.Models.Entities;
using GaziQuiz.Models.ViewModels.Lessons.Request;
using GaziQuiz.Models.ViewModels.Lessons.Response;

namespace GaziQuiz.Business.Services.Abstract;

public interface ILessonService
{
    Task<ResponseModel> AddLesson(AddLessonRequest request, string teacherId);
    Task<ResponseModel> AddStudentsToLesson(AddStudentsToLessonRequest request, string teacherId);
    Task<ResponseModel<ICollection<LessonInfoResponse>>> ListByTeacherId(string teacherId);

    Task<Lesson> GetLessonById(string lessonId);
}
