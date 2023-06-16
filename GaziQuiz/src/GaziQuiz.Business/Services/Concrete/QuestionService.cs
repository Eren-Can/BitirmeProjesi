using CorePackages.Utilities.Results;
using GaziQuiz.Business.Mapper;
using GaziQuiz.Business.Services.Abstract;
using GaziQuiz.DataAccess.UnitOfWork;
using GaziQuiz.Models.Entities;
using GaziQuiz.Models.Exceptions.Questions;
using GaziQuiz.Models.ViewModels.Questions.Request;

namespace GaziQuiz.Business.Services.Concrete;

public class QuestionService : BaseService, IQuestionService
{
    public QuestionService(IRepositoryManager repositoryManager) : base(repositoryManager)
    {
    }

    public async Task<ResponseModel> AddQuestion(AddQuestionRequest request)
    {
        var question = QuestionMapper.AddQuestionRequestToQuestion(request);

        await _repositoryManager.Question.AddAsync(question);

        await _repositoryManager.SaveAsync();

        return Response.Success("İlgili konuya soru eklendi.");
    }

    //public async Task<IDataResult<QuestionCountByTopicModel>> QuestionCountByTopicId(int topicId)
    //{
    //    var easyQuestionCount = await _questionRepository.GetList(x => x.TopicId == topicId && x.Difficulty == 1).CountAsync();
    //    var midQuestionCount = await _questionRepository.GetList(x => x.TopicId == topicId && x.Difficulty == 2).CountAsync();
    //    var hardQuestionCount = await _questionRepository.GetList(x => x.TopicId == topicId && x.Difficulty == 3).CountAsync();

    //    var questionCount = new QuestionCountByTopicModel
    //    {
    //        EasyQuestionCount = easyQuestionCount,
    //        MidQuestionCount = midQuestionCount,
    //        HardQuestionCount = hardQuestionCount
    //    };
    //    return new SuccessDataResult<QuestionCountByTopicModel>(questionCount);
    //}

    public async Task<bool> CheckAnswerByQuestion(string questionId, string reply)
    {
        var question = await GetQuestionById(questionId);

        return question.Answer == reply;
    }

    public async Task<Question> GetQuestionById(string questionId)
    {
        var question = await _repositoryManager.Question.SingleAsync(x => x.Id == questionId);

        if (question is null)
            throw new QuestionNotFoundException(questionId);

        return question;
    }
}
