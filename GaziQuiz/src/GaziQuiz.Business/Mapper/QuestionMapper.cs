using GaziQuiz.Models.Entities;
using GaziQuiz.Models.ViewModels.Questions.Request;

namespace GaziQuiz.Business.Mapper;

public static class QuestionMapper
{
    public static Question AddQuestionRequestToQuestion(AddQuestionRequest source)
    {
        return new Question
        {
            Id = Guid.NewGuid().ToString(),
            TopicId = source.TopicId,
            Difficulty = source.Difficulty,
            Content = source.Content,
            Answer = source.Answer,
            Time = source.Time,
            IsActive = true,
        };
    }
}

