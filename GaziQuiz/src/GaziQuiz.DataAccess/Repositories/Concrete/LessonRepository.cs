using CorePackages.DataAccess.Repositories;
using GaziQuiz.DataAccess.Contexts;
using GaziQuiz.DataAccess.Repositories.Abstract;
using GaziQuiz.Models.Entities;
using GaziQuiz.Models.Entities.CrossTables;
using GaziQuiz.Models.ViewModels.Lessons.Request;
using Microsoft.EntityFrameworkCore;

namespace GaziQuiz.DataAccess.Repositories.Concrete;

public class LessonRepository : RepositoryBase<Lesson, GaziQuizDbContext>, ILessonRepository
{
    private readonly GaziQuizDbContext _context;

    public LessonRepository(GaziQuizDbContext context) : base(context)
    {
        _context = context;
    }

    public async Task AddStudents(AddStudentsToLessonRequest model)
    {
        var data = new List<StudentLesson>();

        foreach (var studentId in model.StudentIds)
        {
            data.Add(new()
            {
                StudentId = studentId,
                LessonId = model.LessonId,
            });
        }

        if (data.Count > 0)
        {
            await _context.AddRangeAsync(data);
            await _context.SaveChangesAsync();
        }
    }

    public Task<int> TotalStudents(string lessonId)
    {
        return _context.StudentLessons.Where(x => x.LessonId == lessonId).CountAsync();
    }
}
