using CorePackages.Utilities.Results;
using GaziQuiz.Models.ViewModels.Quizs.Request;
using GaziQuiz.Models.ViewModels.Quizs.Response;

namespace GaziQuiz.Business.Services.Abstract;

public interface IQuizService
{
    Task<ResponseModel> AddQuiz(AddQuizRequest request);
    Task<ResponseModel<InfoQuizResponse>> AddStudentToQuiz(AddStudentToQuizRequest request, string studentId);
    Task<ResponseModel<ICollection<ActiveQuizResponse>>> ListActiveQuizs(string studentId);
    Task<ResponseModel<ICollection<QuizTableInfoResponse>>> ListByTeacher(string teacherId);
    Task<ResponseModel<QuizDetailResponse>> QuizDetail(string quizId);
}
