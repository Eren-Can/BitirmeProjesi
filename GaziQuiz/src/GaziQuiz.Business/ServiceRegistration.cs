using GaziQuiz.Business.Security;
using GaziQuiz.Business.Services.Abstract;
using GaziQuiz.Business.Services.Concrete;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace GaziQuiz.Business;

public static class ServiceRegistration
{
    public static void AddBusinessServices(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddScoped<ITokenHandler, TokenHandler>();
        services.AddScoped<IAnswerService, AnswerService>();
        services.AddScoped<IAuthService, AuthService>();
        services.AddScoped<ILessonService, LessonService>();
        services.AddScoped<IQuestionService, QuestionService>();
        services.AddScoped<IQuizService, QuizService>();
        services.AddScoped<IResultService, ResultService>();
        services.AddScoped<IStudentService, StudentService>();
        services.AddScoped<ITeacherService, TeacherService>();
        services.AddScoped<ITopicService, TopicService>();
    }
}
