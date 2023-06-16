using CorePackages.Utilities.Results;
using GaziQuiz.Business.Services.Abstract;
using GaziQuiz.DataAccess.UnitOfWork;
using GaziQuiz.Models.ViewModels.Teachers.Response;
using Microsoft.EntityFrameworkCore;

namespace GaziQuiz.Business.Services.Concrete;

public class TeacherService : BaseService, ITeacherService
{
    public TeacherService(IRepositoryManager repositoryManager) : base(repositoryManager)
    {

    }

    public async Task<ResponseModel<DashboardInfoResponse>> DashboardInfo(string teacherId)
    {
        var lessonInfo = await _repositoryManager.Lesson
            .List(x => x.TeacherId == teacherId)
            .Select(x => new LessonInfo
            {
                LessonId = x.Id,
                LessonName = x.Name,
                QuestionCount = 0,
                QuizCount = 0,
                TopicCount = 0,
            })
            .ToListAsync();

        foreach (var lesson in lessonInfo)
        {
            lesson.QuizCount = await _repositoryManager.Quiz
                .ListAll()
                .Include(x => x.Topic)
                .ThenInclude(x => x.Lesson)
                .CountAsync(x => x.Topic.Lesson.Id == lesson.LessonId);

            lesson.QuestionCount = await _repositoryManager.Question
                .ListAll()
                .Include(x => x.Topic)
                .ThenInclude(x => x.Lesson)
                .CountAsync(x => x.Topic.Lesson.Id == lesson.LessonId);

            lesson.TopicCount = await _repositoryManager.Topic
                .ListAll()
                .Include(x => x.Lesson)
                .CountAsync(x => x.Lesson.Id == lesson.LessonId);
        }

        var lessonCount = await _repositoryManager.Lesson.CountAsync(x => x.TeacherId == teacherId);

        var topicCount = await _repositoryManager.Topic
            .ListAll()
            .Include(x => x.Lesson)
            .CountAsync(x => x.Lesson.TeacherId == teacherId);

        var questionCount = await _repositoryManager.Question
            .ListAll()
            .Include(x => x.Topic)
            .ThenInclude(x => x.Lesson)
            .CountAsync(x => x.Topic.Lesson.TeacherId == teacherId);


        var quizCount = await _repositoryManager.Quiz
            .ListAll()
            .Include(x => x.Topic)
            .ThenInclude(x => x.Lesson)
            .CountAsync(x => x.Topic.Lesson.TeacherId == teacherId);

        var result = new DashboardInfoResponse
        {
            TopicCount = topicCount,
            QuestionCount = questionCount,
            QuizCount = quizCount,
            LessonCount = lessonCount,
            LessonDetails = lessonInfo,
        };

        return DataResponse<DashboardInfoResponse>.Success(result, "Dashboard verileri listelendi");
    }
}
