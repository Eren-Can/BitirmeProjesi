using CorePackages.DataAccess.Repositories;
using GaziQuiz.DataAccess.Contexts;
using GaziQuiz.DataAccess.Repositories.Abstract;
using GaziQuiz.Models.Entities;
using GaziQuiz.Models.Entities.CrossTables;

namespace GaziQuiz.DataAccess.Repositories.Concrete;

public class QuizRepository : RepositoryBase<Quiz, GaziQuizDbContext>, IQuizRepository
{
    private readonly GaziQuizDbContext _context;

    public QuizRepository(GaziQuizDbContext context) : base(context)
    {
        _context = context;
    }

    public async Task AddStudent(string quizId, string studentId)
    {
        var data = new StudentQuiz
        {
            QuizId = quizId,
            StudentId = studentId,
        };

        try
        {
            await _context.StudentQuizs.AddAsync(data);
            await _context.SaveChangesAsync();
        }
        catch (Exception)
        {
        }
    }
}
