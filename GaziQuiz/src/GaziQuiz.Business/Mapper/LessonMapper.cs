using GaziQuiz.Models.Entities;
using GaziQuiz.Models.ViewModels.Lessons.Request;

namespace GaziQuiz.Business.Mapper;

public static class LessonMapper
{
    public static Lesson AddLessonRequestToLesson(AddLessonRequest source)
    {
        return new Lesson
        {
            Id = Guid.NewGuid().ToString(),
            Name = source.Name,
        };
    }
}