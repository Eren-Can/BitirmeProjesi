using CorePackages.Utilities.Results;
using GaziQuiz.Models.ViewModels.Results.Request;

namespace GaziQuiz.Business.Services.Abstract;

public interface IResultService
{
    Task<ResponseModel> AddResult(AddResultRequest request, string studentId);
}
