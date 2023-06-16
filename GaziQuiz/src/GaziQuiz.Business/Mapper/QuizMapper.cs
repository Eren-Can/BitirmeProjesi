using GaziQuiz.Models.Entities;
using GaziQuiz.Models.ViewModels.Quizs.Request;

namespace GaziQuiz.Business.Mapper;

public static class QuizMapper
{
    public static Quiz AddQuizRequestToQuiz(AddQuizRequest source)
    {
        return new Quiz
        {
            Id = Guid.NewGuid().ToString(),
            Latitude = source.Latitude,
            Longitude = source.Longitude,
            Name = source.Name,
            TopicId = source.TopicId,
            CreatedDate = DateTime.Now,
            Time = source.Time,
        };
    }
}