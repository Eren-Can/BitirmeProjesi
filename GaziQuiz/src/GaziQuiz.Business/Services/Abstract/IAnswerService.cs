using CorePackages.Utilities.Results;
using GaziQuiz.Models.ViewModels.Results.Request;

namespace GaziQuiz.Business.Services.Abstract;

public interface IAnswerService
{
    Task<ResponseModel> AddAnswer(AddAnswerDto model, string resultId);
}
