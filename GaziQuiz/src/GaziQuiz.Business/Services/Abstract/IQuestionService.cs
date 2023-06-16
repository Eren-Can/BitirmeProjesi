using CorePackages.Utilities.Results;
using GaziQuiz.Models.Entities;
using GaziQuiz.Models.ViewModels.Questions.Request;

namespace GaziQuiz.Business.Services.Abstract;

public interface IQuestionService
{
    Task<ResponseModel> AddQuestion(AddQuestionRequest request);

    Task<Question> GetQuestionById(string questionId);
    Task<bool> CheckAnswerByQuestion(string questionId, string reply);
}
