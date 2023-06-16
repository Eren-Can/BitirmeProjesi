using CorePackages.Utilities.Results;
using GaziQuiz.Models.Entities;
using GaziQuiz.Models.ViewModels.Students.Response;

namespace GaziQuiz.Business.Services.Abstract;

public interface IStudentService
{
    Task<Student> GetStudentById(string userId);
    Task<ResponseModel<ICollection<StudentInfoResponse>>> ListStudentsByLesson(string lessonId, bool isRegister);
}
