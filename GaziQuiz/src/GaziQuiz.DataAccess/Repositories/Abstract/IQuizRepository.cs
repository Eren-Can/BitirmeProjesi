using CorePackages.DataAccess.Repositories;
using GaziQuiz.Models.Entities;

namespace GaziQuiz.DataAccess.Repositories.Abstract;

public interface IQuizRepository : IRepositoryBase<Quiz>
{
    Task AddStudent(string quizId, string studentId);
}
