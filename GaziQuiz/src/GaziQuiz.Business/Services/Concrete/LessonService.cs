using CorePackages.Utilities.Results;
using GaziQuiz.Business.Mapper;
using GaziQuiz.Business.Services.Abstract;
using GaziQuiz.DataAccess.UnitOfWork;
using GaziQuiz.Models.Entities;
using GaziQuiz.Models.Entities.CrossTables;
using GaziQuiz.Models.Exceptions.Lessons;
using GaziQuiz.Models.ViewModels.Lessons.Request;
using GaziQuiz.Models.ViewModels.Lessons.Response;
using Microsoft.EntityFrameworkCore;

namespace GaziQuiz.Business.Services.Concrete;

public class LessonService : BaseService, ILessonService
{
    public LessonService(IRepositoryManager repositoryManager) : base(repositoryManager)
    {

    }

    public async Task<ResponseModel> AddLesson(AddLessonRequest request, string teacherId)
    {
        Lesson lesson = LessonMapper.AddLessonRequestToLesson(request);

        lesson.TeacherId = teacherId;

        await _repositoryManager.Lesson.AddAsync(lesson);

        await _repositoryManager.SaveAsync();

        return Response.Success("Ders Eklendi");
    }

    public async Task<ResponseModel> AddStudentsToLesson(AddStudentsToLessonRequest request, string teacherId)
    {
        var lesson = await GetLessonById(request.LessonId);

        if (lesson.TeacherId != teacherId)
            throw new LessontConsistentDataException();

        await _repositoryManager.Lesson.AddStudents(request);

        return Response.Success("Öğrenciler ilgili derse eklendi.");
    }

    public async Task<ResponseModel<ICollection<LessonInfoResponse>>> ListByTeacherId(string teacherId)
    {
        //TODO öğrenci sayısı ve konu sayısının doğru döndüğünü test et!
        var response = await _repositoryManager.Lesson
            .List(x => x.TeacherId == teacherId)
            .Select(x => new LessonInfoResponse
            {
                Id = x.Id,
                Name = x.Name,
                StudentCount = x.Students.Count(), 
                TopicCount = x.Topics.Count(),
            })
            .ToListAsync();

        return DataResponse<ICollection<LessonInfoResponse>>.Success(response, "İlgili öğretmenin dersleri listelendi");
    }

    public async Task<Lesson> GetLessonById(string lessonId)
    {
        var lesson = await _repositoryManager.Lesson.SingleAsync(x => x.Id == lessonId);

        if (lesson is null)
            throw new LessontNotFoundException(lessonId);

        return lesson;
    }
}
