using CorePackages.DataAccess.Repositories;
using GaziQuiz.DataAccess.Contexts;
using GaziQuiz.DataAccess.Repositories.Abstract;
using GaziQuiz.Models.Entities;

namespace GaziQuiz.DataAccess.Repositories.Concrete;

public class AnswerRepository : RepositoryBase<Answer, GaziQuizDbContext>, IAnswerRepository
{
    public AnswerRepository(GaziQuizDbContext context) : base(context)
    {
        
    }
}
