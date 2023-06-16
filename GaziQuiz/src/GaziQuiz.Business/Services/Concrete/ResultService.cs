using CorePackages.Utilities.Results;
using GaziQuiz.Business.Services.Abstract;
using GaziQuiz.DataAccess.UnitOfWork;
using GaziQuiz.Models.Entities;
using GaziQuiz.Models.ViewModels.Results.Request;

namespace GaziQuiz.Business.Services.Concrete;

public class ResultService : BaseService, IResultService
{
    private readonly IAnswerService _answerService;

    public ResultService(IRepositoryManager repositoryManager, IAnswerService answerService) : base(repositoryManager)
    {
        _answerService = answerService;
    }

    public async Task<ResponseModel> AddResult(AddResultRequest request, string studentId)
    {
        var result = new Result()
        {
            Id = Guid.NewGuid().ToString(),
            QuizId = request.QuizId,
            TotalTime = request.TotalTime,
            StudentId = studentId,
        };

        await _repositoryManager.Result.AddAsync(result);

        await _repositoryManager.SaveAsync();

        //TODO bu kısım add range ile yapılabilir.
        foreach (var answer in request.Answers)
        {
            await _answerService.AddAnswer(answer, result.Id);
        }

        return Response.Success("Cevaplar başarıyla kaydedildi.");
    }
}
