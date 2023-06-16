using CorePackages.Utilities.Results;
using GaziQuiz.Business.Mapper;
using GaziQuiz.Business.Services.Abstract;
using GaziQuiz.DataAccess.UnitOfWork;
using GaziQuiz.Models.Entities;
using GaziQuiz.Models.Entities.CrossTables;
using GaziQuiz.Models.Enums;
using GaziQuiz.Models.Exceptions.Quizs;
using GaziQuiz.Models.ViewModels.Quizs.Request;
using GaziQuiz.Models.ViewModels.Quizs.Response;
using Microsoft.EntityFrameworkCore;

namespace GaziQuiz.Business.Services.Concrete;

public class QuizService : BaseService, IQuizService
{
    public QuizService(IRepositoryManager repositoryManager) : base(repositoryManager)
    {
    }

    public async Task<ResponseModel> AddQuiz(AddQuizRequest request)
    {
        var quiz = QuizMapper.AddQuizRequestToQuiz(request);

        var totalQuestion = request.MidQuestionCount + request.HardQuestionCount + request.EasyQuestionCount;

        var allQuestions = await _repositoryManager.Question
            .List(x => x.TopicId == request.TopicId)
            .ToListAsync();

        if (allQuestions.Count < totalQuestion)
            return Response.Error("Konuya ait soru sayısı quiz sayısındaki soru sayısından küçük olamaz");

        var questions = new List<QuestionQuiz>();

        for (int i = 0; i < totalQuestion; i++)
        {
            questions.Add(new() { QuestionId = allQuestions[i].Id, QuizId = quiz.Id });
        }

        quiz.Questions = questions;

        await _repositoryManager.Quiz.AddAsync(quiz);
        await _repositoryManager.SaveAsync();

        return Response.Success("Quiz eklendi.");
    }

    public async Task<ResponseModel<InfoQuizResponse>> AddStudentToQuiz(AddStudentToQuizRequest request, string studentId)
    {
        var quiz = await GetQuizById(request.QuizId);

        if (DateTime.Now > quiz.CreatedDate.AddMinutes(quiz.Time))
            throw new TimeOutException(quiz.Id);

        await _repositoryManager.Quiz.AddStudent(request.QuizId, studentId);

        var response = await QuizInfoWithQuestion(studentId, quiz.Id);

        return DataResponse<InfoQuizResponse>.Success(response, "Öğrenci başarıyla quiz'e girdi");
    }

    public async Task<ResponseModel<ICollection<ActiveQuizResponse>>> ListActiveQuizs(string studentId)
    {
        var quizs = await _repositoryManager.Quiz
            .List(x => x.CreatedDate.AddMinutes(x.Time) > DateTime.Now)
            .Include(x => x.Topic)
            .ThenInclude(x => x.Lesson)
            .ThenInclude(x => x.Students)
            .Where(x => x.Topic.Lesson.Students.Any(x => x.StudentId == studentId))
            .Select(x => new ActiveQuizResponse
            {
                Id = x.Id,
                TopicName = x.Topic.Name,
                LessonName = x.Topic.Lesson.Name,
                QuizName = x.Name,
                LastEntryDate = x.CreatedDate.AddMinutes(x.Time),
            })
            .ToListAsync();

        return DataResponse<ICollection<ActiveQuizResponse>>.Success(quizs, "Aktif quizler listelendi");
    }

    public async Task<ResponseModel<ICollection<QuizTableInfoResponse>>> ListByTeacher(string teacherId)
    {
        var quizs = await _repositoryManager.Quiz
            .ListAll()
            .Include(x => x.Students)
            .Include(x => x.Topic)
            .ThenInclude(x => x.Lesson)
            .Where(x => x.Topic.Lesson.TeacherId == teacherId)
            .Select(x => new QuizTableInfoResponse
            {
                Id = x.Id,
                Name = x.Name,
                Date = x.CreatedDate,
                LessonName = x.Topic.Lesson.Name,
                StudentCount = x.Students.Count,
            })
            .ToListAsync();

        return DataResponse<ICollection<QuizTableInfoResponse>>.Success(quizs, "Quiz bilgileri listelendi");
    }

    public async Task<ResponseModel<QuizDetailResponse>> QuizDetail(string quizId)
    {
        var results = await _repositoryManager.Result
            .List(x => x.QuizId == quizId)
            .Include(x => x.Student)
            .Include(x => x.Quiz)
            .ThenInclude(x => x.Topic)
            .ToListAsync();

        var response = new QuizDetailResponse();

        if(results == null || results.Count <= 0)
            return DataResponse<QuizDetailResponse>.Success(response, "Quiz detayları listelendi");

        response.TotalStudentCount = await _repositoryManager.Lesson.TotalStudents(results[0].Quiz.Topic.LessonId);

        foreach (var result in results)
        {
            var answers = await _repositoryManager.Answer
                .List(x => x.ResultId == result.Id)
                .ToListAsync();

            int wrongCount = 0;
            int correctCount = 0;

            foreach (var answer in answers)
            {
                if (answer.IsTrue)
                    correctCount++;
                else
                    wrongCount++;
            }

            response.WrongCount += wrongCount;
            response.CorrectCount += correctCount;
            response.EntryStudentCount++;
            response.StudentsDetail.Add(new()
            {
                CorrectCount = correctCount,
                WrongCount = wrongCount,
                FullName = result.Student.FullName,
                Id = result.Student.Id,
            });
        }

        return DataResponse<QuizDetailResponse>.Success(response, "Quiz detayları listelendi");
    }

    private async Task<InfoQuizResponse> QuizInfoWithQuestion(string studentId, string quizId)
    {
        var quiz = await _repositoryManager.Quiz
            .List(x => x.Id == quizId)
            .Include(x => x.Questions)
            .ThenInclude(x => x.Question)
            .Where(x => x.Topic.Lesson.Students.Any(x => x.StudentId == studentId))
            .Select(x => new InfoQuizResponse
            {
                QuizId = x.Id,
                Questions = x.Questions.Select(x => new QuestionInfo
                {
                    QuestionId = x.Question.Id,
                    Difficulty = x.Question.Difficulty,
                    Content = x.Question.Content,
                    Time = x.Question.Time
                }).ToList()
            })
            .SingleOrDefaultAsync();

        if (quiz is null)
            throw new QuizNotFoundException(quizId);

        return quiz;
    }

    private async Task<Quiz> GetQuizById(string quizId)
    {
        var quiz = await _repositoryManager.Quiz.SingleAsync(x => x.Id == quizId);

        if (quiz is null)
            throw new QuizNotFoundException(quizId);

        return quiz;
    }
}
