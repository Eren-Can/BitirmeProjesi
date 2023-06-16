using CorePackages.Utilities.Results;
using GaziQuiz.Business.Services.Abstract;
using GaziQuiz.DataAccess.UnitOfWork;
using GaziQuiz.Models.Entities;
using GaziQuiz.Models.ViewModels.Results.Request;

namespace GaziQuiz.Business.Services.Concrete;

public class AnswerService : BaseService, IAnswerService
{
    private readonly IQuestionService _questionService;

    public AnswerService(IRepositoryManager repositoryManager, IQuestionService questionService) : base(repositoryManager)
    {
        _questionService = questionService;
    }

    public async Task<ResponseModel> AddAnswer(AddAnswerDto model, string resultId)
    {
        Answer answer = new()
        {
            Id = Guid.NewGuid().ToString(),
            QuestionId = model.QuestionId,
            Reply = model.Reply,
            Time = model.Time,
            ResultId = resultId,
            IsTrue = await _questionService.CheckAnswerByQuestion(model.QuestionId, model.Reply)
        };

        await _repositoryManager.Answer.AddAsync(answer);

        await _repositoryManager.SaveAsync();

        return Response.Success("Cevap eklendi");
    }
}
