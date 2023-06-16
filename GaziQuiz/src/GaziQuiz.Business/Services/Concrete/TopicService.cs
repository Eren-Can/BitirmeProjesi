using CorePackages.Utilities.Results;
using GaziQuiz.Business.Services.Abstract;
using GaziQuiz.DataAccess.UnitOfWork;
using GaziQuiz.Models.Entities;
using GaziQuiz.Models.Exceptions.Lessons;
using GaziQuiz.Models.ViewModels.Topics.Request;
using GaziQuiz.Models.ViewModels.Topics.Response;
using Microsoft.EntityFrameworkCore;

namespace GaziQuiz.Business.Services.Concrete;

public class TopicService : BaseService, ITopicService
{
    private readonly ILessonService _lessonService;

    public TopicService(IRepositoryManager repositoryManager, ILessonService lessonService) : base(repositoryManager)
    {
        _lessonService = lessonService;
    }

    public async Task<ResponseModel> AddTopic(AddTopicRequest request, string teacherId)
    {
        var lesson = await _lessonService.GetLessonById(request.LessonId);

        if (lesson.TeacherId != teacherId)
            throw new LessontConsistentDataException();

        var topic = new Topic
        {
            Id = Guid.NewGuid().ToString(),
            Name = request.Name,
            LessonId = request.LessonId,
        };

        await _repositoryManager.Topic.AddAsync(topic);

        await _repositoryManager.SaveAsync();

        return Response.Success("İlgili derse ilgili konu eklenmiştir.");
    }

    public async Task<ResponseModel<ICollection<TopicInfoResponse>>> ListTopicsByTeacher(string teacherId)
    {
        var topics = await _repositoryManager.Topic
            .ListAll()
            .Include(x => x.Lesson)
            .Where(x => x.Lesson.TeacherId == teacherId)
            .Select(x => new TopicInfoResponse
            {
                Id = x.Id,
                Name = x.Name,
                LessonName = x.Lesson.Name,
                QuestionCount = x.Questions.Count(),
                QuizCount = x.Quizs.Count()
            })
            .ToListAsync();

        return DataResponse<ICollection<TopicInfoResponse>>.Success(topics, "İlgili öğretmenin konuları listelenmiştir.");
    }

    public async Task<ResponseModel<ICollection<TopicInfoResponse>>> ListTopicsByLesson(string lessonId)
    {
        var topics = await _repositoryManager.Topic
            .ListAll()
            .Where(x => x.Lesson.Id == lessonId)
            .Select(x => new TopicInfoResponse
            {
                Id = x.Id,
                Name = x.Name,
                QuestionCount = 1,
                QuizCount = 1
            })
            .ToListAsync();

        return DataResponse<ICollection<TopicInfoResponse>>.Success(topics, "İlgili dersin konuları listelenmiştir.");
    }
}
